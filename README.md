# Mohamad Fajar Mahardika — Portfolio

A content-driven portfolio built with Astro and published on GitHub Pages. Editable
content lives in `src/data/content.json`; the `/admin/` editor commits changes to GitHub.

## Run locally

```bash
npm install
npm run dev
```

`npm run build` builds the static site. The admin API must be deployed and configured
before the login button can be used.

## Edit content

Open `/admin/` and sign in with the allowed GitHub account. The editor manages your
profile, social links, facts, about text, projects, side projects, work history, skills,
education, languages, certifications, and awards — everything held in
`src/data/content.json`, which is public.

Contact details and the CV Builder connection are deliberately not in that file, so they
never enter the repository. They come from the build environment instead and are not
available in the admin editor:

| Variable | Purpose |
| --- | --- |
| `CONTACT_EMAIL` | Address shown in the hero and contact section |
| `CONTACT_PHONE` | Optional; no phone is rendered when blank |
| `RESUME_APP_URL` | CV Builder origin, no path or trailing slash |
| `RESUME_TOKEN` | Share token of the published résumé |

For local builds, copy `.env.example` to `.env` and fill these in. For production, add
them under **Settings → Secrets and variables → Actions** — either as secrets or as
variables, since the workflow reads `secrets.X || vars.X` for each. The Pages workflow
injects them only while building the site.

These values are compiled into the generated HTML, so they stay visible on the published
page. Keeping them in the environment keeps them out of git history; it does not hide
them from the web. A production build missing any of them logs a warning and omits the
contact link or the résumé preview rather than failing.

## Configure the admin service

The admin interface is static on GitHub Pages. A Cloudflare Worker handles GitHub OAuth
and uses a repository-scoped GitHub App token to read and write content. Neither the
GitHub App private key nor its installation token is exposed to the browser.

### 1. Create GitHub apps

- Create a **GitHub OAuth App**. Set the homepage URL to `https://fajarmhr.github.io`.
  After deploying the Worker, set its callback URL to
  `https://<worker-host>/auth/callback`.
- Create a **GitHub App** with **Contents: Read and write** permission. Install it only
  on `fajarmhr/fajarmhr.github.io`. Record the App ID, installation ID, and private key.
  Do not grant Actions, administration, or other repository permissions.

### 2. Deploy the Cloudflare Worker

From `worker/`, install Wrangler and authenticate with Cloudflare:

```bash
npm install
npx wrangler login
```

Add these non-secret settings under `[vars]` in `worker/wrangler.toml`:
`GITHUB_OAUTH_CLIENT_ID`, `GITHUB_APP_ID`, and `GITHUB_APP_INSTALLATION_ID`. The repo,
branch, allowed login, and site origin are already configured there.

Store secrets in Cloudflare, not in Git:

```bash
npx wrangler secret put GITHUB_OAUTH_CLIENT_SECRET
npx wrangler secret put GITHUB_APP_PRIVATE_KEY
npx wrangler secret put SESSION_SECRET
npx wrangler deploy
```

Use a random `SESSION_SECRET` with at least 32 characters. The deployed Worker URL is
used for the OAuth callback and admin API.

### 3. Connect the site

Set the OAuth callback to `https://<worker-host>/auth/callback`. Put the deployed Worker
URL in `public/admin-config.json` as `apiUrl`, then deploy the site to GitHub Pages. The
admin page is not linked from the public portfolio. Its API allows only the configured
site origin and GitHub account `fajarmhr`.

Publishing commits directly to `main`, which starts the existing Pages workflow. GitHub
history can be used to inspect or revert a published edit.

## Deploy the site

The workflow at `.github/workflows/deploy.yml` builds and deploys on pushes to `main`.
Set GitHub Pages **Build and deployment → Source** to **GitHub Actions**.

## Project structure

```text
src/data/content.json        Editable portfolio content
src/data/profile.ts          Typed data exports used by Astro
src/pages/index.astro        Public portfolio
src/pages/admin.astro        Admin interface shell
public/admin.js              Admin editor
public/admin-config.json     Public Worker endpoint configuration
worker/src/index.js          OAuth and GitHub App API
worker/wrangler.toml         Worker configuration
.github/workflows/deploy.yml GitHub Pages deployment
```
