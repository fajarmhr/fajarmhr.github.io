(() => {
  const sections = [
    ["profile", "Profile", "Your name, role, introduction, links, and portrait."],
    ["facts", "At a glance", "The metrics shown below your introduction."],
    ["about", "About", "Your personal introduction paragraphs."],
    ["projects", "Selected work", "Projects, impact metrics, stack, and breakdowns."],
    ["sideProjects", "Built on the side", "Personal builds shown after the professional work."],
    ["experience", "Experience", "Roles and responsibility highlights."],
    ["skills", "Skills", "Skill groups and tools."],
    ["education", "Education", "Education history."],
    ["languages", "Languages", "Languages shown on the site."],
    ["certifications", "Certifications", "Professional certifications."],
    ["awards", "Awards", "Awards and recognition."],
  ];
  const labels = {
    name: "Name", role: "Role", headline: "Headline", tagline: "Introduction", metaDescription: "Search description",
    location: "Location", available: "Availability", email: "Email", phone: "Phone", photo: "Portrait image path",
    links: "Social links", label: "Label", href: "URL", handle: "Handle", appUrl: "CV Builder URL",
    value: "Value", title: "Title", org: "Organization", context: "Delivered through", year: "Period", blurb: "Summary",
    metrics: "Impact metrics", stack: "Tools and platforms", details: "Project breakdown", overview: "Overview",
    challenge: "Challenge", implementation: "Implementation", outcome: "Outcome", group: "Group", items: "Items",
    level: "Evidence level", hrefLabel: "Link label", tagline: "One-line summary",
    company: "Company", period: "Period", points: "Highlights", school: "Institution", degree: "Degree", detail: "Details",
    issuer: "Issuer", date: "Date", credentialId: "Credential ID", facts: "Facts", about: "About paragraphs",
  };
  const titles = Object.fromEntries(sections.map(([key, title]) => [key, title]));
  const $ = (selector) => document.querySelector(selector);
  let apiUrl = "";
  let token = "";
  let draft = null;
  let sha = "";
  let active = "profile";
  let dirty = false;
  let saveInFlight = false;

  const setStatus = (message, state = "") => {
    const el = $("#save-status");
    el.textContent = message;
    el.dataset.state = state;
  };
  const request = async (path, options = {}) => {
    const response = await fetch(`${apiUrl}${path}`, {
      ...options,
      headers: { ...(token ? { authorization: `Bearer ${token}` } : {}), ...(options.body ? { "content-type": "application/json" } : {}), ...options.headers },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
    return data;
  };
  const showLogin = (message = "") => {
    $("#login-view").hidden = false;
    $("#editor-view").hidden = true;
    $("#logout-button").hidden = true;
    $("#account-label").textContent = "Private workspace";
    $("#login-message").textContent = message;
  };
  const loadContent = async (user) => {
    const data = await request("/api/content");
    draft = data.content;
    sha = data.sha;
    $("#login-view").hidden = true;
    $("#editor-view").hidden = false;
    $("#logout-button").hidden = false;
    $("#account-label").textContent = `Signed in as ${user}`;
    dirty = false;
    setStatus("All changes published", "saved");
    renderNav();
    renderSection();
    renderPreview();
  };
  const renderNav = () => {
    const nav = $("#section-nav");
    nav.replaceChildren();
    sections.forEach(([key, title], index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `admin-nav-item${active === key ? " active" : ""}`;
      button.innerHTML = `<span class="admin-nav-index">${String(index + 1).padStart(2, "0")}</span><span>${title}</span>`;
      button.addEventListener("click", () => { active = key; renderNav(); renderSection(); });
      nav.append(button);
    });
  };
  const pretty = (key) => labels[key] || key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
  const pathValue = (path) => path.reduce((value, part) => value?.[part], draft);
  const writeValue = (path, value) => {
    let parent = draft;
    for (const part of path.slice(0, -1)) parent = parent[part];
    parent[path[path.length - 1]] = value;
    dirty = true;
    setStatus("Unsaved changes", "dirty");
    $("#publish-button").disabled = false;
    renderPreview();
  };
  const controlFor = (key, value, path) => {
    const wrap = document.createElement("label");
    wrap.className = "admin-field";
    const caption = document.createElement("span");
    caption.className = "admin-field-label";
    caption.textContent = pretty(key);
    let control;
    if (typeof value === "string" && (value.length > 100 || ["tagline", "blurb", "metaDescription", "overview", "challenge", "implementation", "outcome", "detail"].includes(key))) {
      control = document.createElement("textarea");
      control.rows = Math.min(7, Math.max(3, Math.ceil(value.length / 75)));
    } else {
      control = document.createElement("input");
      control.type = "text";
      if (["token", "credentialId"].includes(key)) control.autocomplete = "off";
    }
    control.value = value ?? "";
    control.addEventListener("input", () => writeValue(path, control.value));
    wrap.append(caption, control);
    return wrap;
  };
  const shapeOf = (value) => Array.isArray(value) ? value.length ? structuredClone(value[0]) : "" : typeof value === "object" && value ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shapeOf(v)])) : typeof value === "string" ? "" : value;
  const renderNode = (key, value, path) => {
    if (Array.isArray(value)) {
      const group = document.createElement("section");
      group.className = "admin-array";
      const head = document.createElement("div");
      head.className = "admin-array-head";
      const title = document.createElement("h3");
      title.textContent = pretty(key);
      const add = document.createElement("button");
      add.type = "button";
      add.className = "admin-add";
      add.textContent = "+ Add";
      add.addEventListener("click", () => { pathValue(path).push(shapeOf(value[0])); dirty = true; setStatus("Unsaved changes", "dirty"); $("#publish-button").disabled = false; renderSection(); renderPreview(); });
      head.append(title, add);
      group.append(head);
      value.forEach((item, index) => {
        const entry = document.createElement("details");
        entry.className = "admin-entry";
        entry.open = value.length <= 3;
        const summary = document.createElement("summary");
        const name = typeof item === "object" && item ? item.title || item.label || item.group || item.company || item.school || item.value || pretty(key) : `${pretty(key)} ${index + 1}`;
        summary.textContent = `${String(index + 1).padStart(2, "0")}  ${name}`;
        const remove = document.createElement("button");
        remove.type = "button"; remove.className = "admin-remove"; remove.textContent = "Remove";
        remove.addEventListener("click", (event) => { event.preventDefault(); event.stopPropagation(); pathValue(path).splice(index, 1); dirty = true; setStatus("Unsaved changes", "dirty"); $("#publish-button").disabled = false; renderSection(); renderPreview(); });
        summary.append(remove);
        entry.append(summary);
        if (item && typeof item === "object" && !Array.isArray(item)) {
          const fields = document.createElement("div"); fields.className = "admin-entry-fields";
          Object.entries(item).forEach(([childKey, child]) => fields.append(renderNode(childKey, child, [...path, index, childKey])));
          entry.append(fields);
        } else entry.append(controlFor(key, item, [...path, index]));
        group.append(entry);
      });
      return group;
    }
    if (value && typeof value === "object") {
      const group = document.createElement("fieldset"); group.className = "admin-object";
      const legend = document.createElement("legend"); legend.textContent = pretty(key); group.append(legend);
      Object.entries(value).forEach(([childKey, child]) => group.append(renderNode(childKey, child, [...path, childKey])));
      return group;
    }
    return controlFor(key, value, path);
  };
  const renderSection = () => {
    const [key, title, description] = sections.find(([name]) => name === active);
    const heading = $("#section-heading");
    heading.replaceChildren();
    const eyebrow = document.createElement("span"); eyebrow.className = "admin-eyebrow"; eyebrow.textContent = "Content section";
    const h2 = document.createElement("h2"); h2.textContent = title;
    const p = document.createElement("p"); p.textContent = description;
    heading.append(eyebrow, h2, p);
    const form = $("#content-form"); form.replaceChildren();
    form.append(renderNode(key, draft[key], [key]));
  };
  const renderPreview = () => {
    if (!draft) return;
    const target = $("#preview-content"); target.replaceChildren();
    const profile = draft.profile || {};
    const eyebrow = document.createElement("span"); eyebrow.className = "admin-eyebrow"; eyebrow.textContent = profile.available || "Portfolio";
    const h2 = document.createElement("h2"); h2.textContent = profile.name || "Your name";
    const role = document.createElement("p"); role.className = "preview-role"; role.textContent = `${profile.role || ""} · ${profile.location || ""}`;
    const intro = document.createElement("p"); intro.className = "preview-intro"; intro.textContent = profile.tagline || "Your introduction appears here.";
    target.append(eyebrow, h2, role, intro);
    (draft.facts || []).slice(0, 4).forEach((fact) => {
      const row = document.createElement("div"); row.className = "preview-fact";
      const strong = document.createElement("strong"); strong.textContent = fact.value;
      const label = document.createElement("span"); label.textContent = fact.label;
      row.append(strong, label); target.append(row);
    });
    const workTitle = document.createElement("h3"); workTitle.textContent = "Selected work"; target.append(workTitle);
    (draft.projects || []).slice(0, 3).forEach((project, index) => {
      const article = document.createElement("article"); article.className = "preview-project";
      const count = document.createElement("span"); count.className = "admin-eyebrow"; count.textContent = String(index + 1).padStart(2, "0");
      const name = document.createElement("h4"); name.textContent = project.title;
      const meta = document.createElement("p"); meta.textContent = `${project.org} · ${project.year}`;
      article.append(count, name, meta); target.append(article);
    });
  };
  const login = () => {
    const popup = window.open(`${apiUrl}/auth/login`, "portfolio-admin-login", "width=600,height=720,noopener=false");
    if (!popup) $("#login-message").textContent = "Allow popups for this site, then try again.";
  };
  window.addEventListener("message", async (event) => {
    if (event.origin !== new URL(apiUrl).origin || event.data?.type !== "portfolio-admin-auth") return;
    token = event.data.token;
    try { await loadContent(event.data.user); }
    catch (error) { token = ""; showLogin(error.message); }
  });

  $("#login-button").addEventListener("click", login);
  $("#publish-button").addEventListener("click", async () => {
    if (!dirty || saveInFlight) return;
    saveInFlight = true; $("#publish-button").disabled = true; setStatus("Publishing to GitHub…");
    try {
      const result = await request("/api/content", { method: "PUT", body: JSON.stringify({ content: draft, sha }) });
      sha = result.sha; dirty = false; setStatus("Published · GitHub Actions is building", "saved");
      $("#publish-button").textContent = "Published ✓";
      setTimeout(() => { $("#publish-button").innerHTML = 'Publish changes <span aria-hidden="true">↗</span>'; }, 2200);
    } catch (error) {
      setStatus(error.message, "error");
      if (/sign in again/i.test(error.message)) { token = ""; showLogin(error.message); }
      else if (/changed in GitHub/i.test(error.message)) $("#publish-button").disabled = false;
    } finally { saveInFlight = false; }
  });
  $("#logout-button").addEventListener("click", () => { token = ""; draft = null; sha = ""; showLogin("You have signed out."); });
  window.addEventListener("beforeunload", (event) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } });

  fetch("/admin-config.json", { cache: "no-store" }).then((response) => response.json()).then((config) => {
    apiUrl = config.apiUrl.replace(/\/$/, "");
    if (apiUrl.includes("YOUR-WORKER")) { $("#login-button").disabled = true; showLogin("Admin API is not configured yet. Add the deployed Worker URL to admin-config.json."); return; }
    showLogin();
  }).catch(() => showLogin("Could not load admin configuration."));
})();
