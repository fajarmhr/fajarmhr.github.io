/// <reference path="../.astro/types.d.ts" />

/**
 * Values kept out of the public repo and supplied at build time instead —
 * from a local .env, or from GitHub Actions secrets/variables in CI.
 * See .env.example for the full list.
 */
interface ImportMetaEnv {
  /** Contact address shown in the hero and contact section. */
  readonly CONTACT_EMAIL?: string;
  /** Optional contact phone number; omitted from the page when blank. */
  readonly CONTACT_PHONE?: string;
  /** CV Builder origin, e.g. https://cv-builder.example.com (no trailing path). */
  readonly RESUME_APP_URL?: string;
  /** Published résumé share token. */
  readonly RESUME_TOKEN?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
