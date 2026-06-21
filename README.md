# Mohamad Fajar Mahardika — Portfolio

A fast, content-driven portfolio built with [Astro](https://astro.build). Ships almost
zero JavaScript, and **all content lives in one file** — `src/data/profile.ts`. Edit that,
commit, push, and GitHub Pages rebuilds automatically.

---

## 1. Run it locally

You need **Node 18+** and a terminal.

```bash
cd astro-portfolio
npm install        # one time
npm run dev        # open http://localhost:4321
```

- `npm run build` → production build into `dist/`
- `npm run preview` → preview the production build locally

## 2. Edit your content

Everything is in **`src/data/profile.ts`** — profile, links, projects, experience,
skills, education, languages, and the résumé connection. No layout code to touch.

- **Add a photo:** drop an image in `public/` (e.g. `public/me.jpg`) and set
  `profile.photo = "/me.jpg"`.
- **Change the accent / colors:** edit the CSS variables at the top of
  `src/styles/global.css` (`--accent` is the Clay highlight; `--bg`, `--ink`, etc.).

## 3. Connect the live résumé (CV Builder)

The "View résumé" button shows an **on-screen preview that always reflects your latest
published CV** — no re-deploy needed.

1. In your CV Builder app, **publish** a résumé and copy its **share token**.
2. In `src/data/profile.ts`, set:
   ```ts
   export const resume = {
     appUrl: "https://your-cv-app.vercel.app", // your deployed CV Builder
     token:  "the-share-token",
   };
   ```
3. Commit & push. Updating your CV in the CV Builder updates the portfolio automatically.

Until configured, the modal shows a friendly "Connect your CV Builder" message.

---

## 4. Deploy to GitHub Pages

This repo includes a workflow at `.github/workflows/deploy.yml` that builds and deploys
on every push to `main`.

### A. Pick your repo type — and set `astro.config.mjs` to match

| Your goal | Repo name | `astro.config.mjs` `base` |
|---|---|---|
| **Main site** at `https://fajarmhr.github.io` | `fajarmhr.github.io` | `base: "/"` ✅ (default) |
| A project site at `https://fajarmhr.github.io/portfolio` | `portfolio` (any name) | `base: "/portfolio"` |

> The config is preset for the **main site**. If you use a project repo, uncomment the
> `base: "/portfolio"` line and match it to your repo name.

### B. Push the code

If the Astro project is at the **repo root**, move the contents of `astro-portfolio/` up
one level first (so `package.json` sits at the repo root). Otherwise, keep the folder and
uncomment the `path: ./astro-portfolio` lines in `deploy.yml`.

```bash
git init
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/fajarmhr/fajarmhr.github.io.git
git push -u origin main
```

### C. Turn on Pages (one time)

On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

That's it. The Action runs on push; when it finishes (green check in the **Actions** tab),
your site is live at the URL above. Every future `git push` redeploys automatically.

---

## Project structure

```
astro-portfolio/
├─ src/
│  ├─ data/profile.ts      ← YOUR CONTENT (the only file you normally edit)
│  ├─ pages/index.astro    ← page layout + résumé modal + scroll reveal
│  └─ styles/global.css    ← Fog & Slate palette + all styles
├─ public/                 ← static assets (photo, .nojekyll)
├─ astro.config.mjs        ← site URL + base path
└─ .github/workflows/deploy.yml  ← auto-deploy to GitHub Pages
```

## Troubleshooting

- **CSS/JS 404s or unstyled site** → your `base` doesn't match the repo. See the table above.
- **Action fails** → confirm Pages Source is set to **GitHub Actions** (step C).
- **Résumé preview blank** → check `appUrl` + `token`; the CV Builder résumé must be
  *published*. Some mobile browsers don't render PDFs inline — the modal's **Open ↗** /
  **Download** buttons always work.
