import { defineConfig } from "astro/config";

// ─────────────────────────────────────────────────────────────
//  Deploy target: GitHub Pages
//
//  ▸ USER/ORG SITE  (repo named exactly  fajarmhr.github.io)
//      site: "https://fajarmhr.github.io",
//      base: "/",                      ← keep as-is below
//
//  ▸ PROJECT SITE   (repo named e.g.  portfolio)
//      site: "https://fajarmhr.github.io",
//      base: "/portfolio",             ← uncomment + match your repo name
// ─────────────────────────────────────────────────────────────

export default defineConfig({
  site: "https://fajarmhr.github.io",
  base: "/",
  // base: "/portfolio",   // ← use this instead if it's a project repo
});
