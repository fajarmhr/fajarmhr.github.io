const API = "https://api.github.com";
const SESSION_SECONDS = 30 * 60;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return cors(new Response(null, { status: 204 }), env);

    try {
      if (url.pathname === "/auth/login" && request.method === "GET") return login(request, env);
      if (url.pathname === "/auth/callback" && request.method === "GET") return callback(request, env);
      if (url.pathname === "/auth/logout" && request.method === "POST") return cors(json({ ok: true }), env);
      if (url.pathname === "/api/session" && request.method === "GET") {
        const user = await getSession(request, env);
        return cors(json({ authenticated: !!user, user }), env);
      }
      if (url.pathname === "/api/content" && request.method === "GET") {
        const user = await requireSession(request, env);
        if (user instanceof Response) return cors(user, env);
        const file = await githubRequest(env, `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${env.GITHUB_CONTENT_PATH}?ref=${encodeURIComponent(env.GITHUB_BRANCH)}`);
        if (!file.ok) return cors(await githubError(file), env);
        const payload = await file.json();
        const bytes = Uint8Array.from(atob(payload.content.replace(/\s/g, "")), (c) => c.charCodeAt(0));
        return cors(json({ content: JSON.parse(new TextDecoder().decode(bytes)), sha: payload.sha, user }), env);
      }
      if (url.pathname === "/api/content" && request.method === "PUT") {
        const user = await requireSession(request, env);
        if (user instanceof Response) return cors(user, env);
        const body = await request.json();
        if (!body?.content || typeof body.content !== "object" || !body.sha) return cors(json({ error: "Invalid content payload." }, 400), env);
        const serialized = `${JSON.stringify(body.content, null, 2)}\n`;
        if (serialized.length > 100_000) return cors(json({ error: "Content is too large." }, 413), env);
        const bytes = new TextEncoder().encode(serialized);
        let binary = "";
        for (const byte of bytes) binary += String.fromCharCode(byte);
        const result = await githubRequest(env, `/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${env.GITHUB_CONTENT_PATH}`, {
          method: "PUT",
          body: JSON.stringify({
            message: `Update portfolio content via admin (${user.login})`,
            content: btoa(binary),
            sha: body.sha,
            branch: env.GITHUB_BRANCH,
          }),
        });
        if (!result.ok) return cors(await githubError(result), env);
        const saved = await result.json();
        return cors(json({ ok: true, sha: saved.content.sha, commit: saved.commit.html_url }), env);
      }
      return cors(json({ error: "Not found." }, 404), env);
    } catch (error) {
      return cors(json({ error: error instanceof Error ? error.message : "Unexpected server error." }, 500), env);
    }
  },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });
}

function cors(response, env) {
  const headers = new Headers(response.headers);
  headers.set("access-control-allow-origin", env.SITE_ORIGIN);
  headers.set("access-control-allow-methods", "GET, PUT, POST, OPTIONS");
  headers.set("access-control-allow-headers", "authorization, content-type");
  headers.set("vary", "Origin");
  headers.set("x-content-type-options", "nosniff");
  headers.set("referrer-policy", "no-referrer");
  return new Response(response.body, { status: response.status, headers });
}

function base64url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function fromBase64url(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4)), (c) => c.charCodeAt(0));
}

function randomToken(size = 32) {
  return base64url(crypto.getRandomValues(new Uint8Array(size)));
}

function cookie(request, name) {
  return request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1);
}

function login(request, env) {
  const state = randomToken();
  const redirect = new URL("https://github.com/login/oauth/authorize");
  redirect.searchParams.set("client_id", env.GITHUB_OAUTH_CLIENT_ID);
  redirect.searchParams.set("redirect_uri", `${new URL(request.url).origin}/auth/callback`);
  redirect.searchParams.set("state", state);
  redirect.searchParams.set("scope", "read:user");
  return new Response(null, { status: 302, headers: { location: redirect.href, "set-cookie": `admin_oauth_state=${state}; Path=/auth/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=300` } });
}

async function callback(request, env) {
  const url = new URL(request.url);
  const clearCookie = "admin_oauth_state=; Path=/auth/callback; HttpOnly; Secure; SameSite=Lax; Max-Age=0";
  if (url.searchParams.get("state") !== cookie(request, "admin_oauth_state") || !url.searchParams.get("code")) {
    return new Response("OAuth state validation failed. Close this window and try again.", { status: 400, headers: { "set-cookie": clearCookie } });
  }
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json", "user-agent": "FajarPortfolioAdmin" },
    body: JSON.stringify({ client_id: env.GITHUB_OAUTH_CLIENT_ID, client_secret: env.GITHUB_OAUTH_CLIENT_SECRET, code: url.searchParams.get("code") }),
  });
  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok || !tokenData.access_token) return new Response("GitHub login failed. Close this window and try again.", { status: 401, headers: { "set-cookie": clearCookie } });
  const profileResponse = await fetch("https://api.github.com/user", { headers: { authorization: `Bearer ${tokenData.access_token}`, accept: "application/vnd.github+json", "user-agent": "FajarPortfolioAdmin" } });
  const profile = await profileResponse.json();
  if (!profileResponse.ok || profile.login?.toLowerCase() !== env.ALLOWED_GITHUB_LOGIN.toLowerCase()) {
    return new Response("This GitHub account is not allowed to use this admin.", { status: 403, headers: { "set-cookie": clearCookie } });
  }
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const payload = base64url(new TextEncoder().encode(JSON.stringify({ login: profile.login, exp: expires })));
  const signature = await sign(payload, env.SESSION_SECRET);
  const session = `${payload}.${signature}`;
  const html = `<!doctype html><meta charset="utf-8"><title>Signed in</title><script>if(window.opener){window.opener.postMessage({type:"portfolio-admin-auth",token:${JSON.stringify(session)},user:${JSON.stringify(profile.login)}},${JSON.stringify(env.SITE_ORIGIN)});window.close()}else{document.body.textContent="Login complete. You can close this window."}</script>`;
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "content-security-policy": `default-src 'none'; script-src 'unsafe-inline'; frame-ancestors 'none'`, "set-cookie": clearCookie, "cache-control": "no-store" } });
}

async function sign(payload, secret) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64url(new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))));
}

async function getSession(request, env) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;
  const expected = await sign(payload, env.SESSION_SECRET);
  if (signature.length !== expected.length) return null;
  const left = fromBase64url(signature);
  const right = fromBase64url(expected);
  let mismatch = 0;
  for (let i = 0; i < left.length; i++) mismatch |= left[i] ^ right[i];
  if (mismatch) return null;
  const user = JSON.parse(new TextDecoder().decode(fromBase64url(payload)));
  if (user.exp < Date.now() / 1000 || user.login?.toLowerCase() !== env.ALLOWED_GITHUB_LOGIN.toLowerCase()) return null;
  return { login: user.login, expiresAt: user.exp };
}

async function requireSession(request, env) {
  const user = await getSession(request, env);
  return user || json({ error: "Sign in again to continue." }, 401);
}

async function githubAppToken(env) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(new TextEncoder().encode(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const payload = base64url(new TextEncoder().encode(JSON.stringify({ iat: now - 30, exp: now + 540, iss: env.GITHUB_APP_ID })));
  const signingInput = `${header}.${payload}`;
  const pem = env.GITHUB_APP_PRIVATE_KEY.replace(/-----BEGIN [^-]+-----|-----END [^-]+-----|\s/g, "");
  const key = await crypto.subtle.importKey("pkcs8", fromBase64url(pem.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const signature = base64url(new Uint8Array(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(signingInput))));
  const response = await fetch(`${API}/app/installations/${env.GITHUB_APP_INSTALLATION_ID}/access_tokens`, {
    method: "POST",
    headers: { authorization: `Bearer ${signingInput}.${signature}`, accept: "application/vnd.github+json", "content-type": "application/json", "user-agent": "FajarPortfolioAdmin" },
    body: JSON.stringify({ repositories: [env.GITHUB_REPO], permissions: { contents: "write" } }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`GitHub App token error: ${data.message || response.status}`);
  return data.token;
}

async function githubRequest(env, path, init = {}) {
  const token = await githubAppToken(env);
  return fetch(`${API}${path}`, {
    ...init,
    headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "content-type": "application/json", "x-github-api-version": "2022-11-28", "user-agent": "FajarPortfolioAdmin", ...init.headers },
  });
}

async function githubError(response) {
  const data = await response.json().catch(() => ({}));
  const status = response.status === 409 || response.status === 422 ? 409 : response.status;
  const message = status === 409 ? "Konten berubah di GitHub sejak panel dibuka. Muat ulang sebelum menyimpan." : (data.message || `GitHub API returned ${response.status}.`);
  return json({ error: message }, status);
}
