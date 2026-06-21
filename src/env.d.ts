/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** CV Builder base URL, e.g. https://your-cv-app.vercel.app */
  readonly RESUME_APP_URL?: string;
  /** Published résumé share token — keep out of the public repo. */
  readonly RESUME_TOKEN?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}