import content from "./content.json";

export interface Link { label: string; href: string; handle: string; }
export interface Metric { value: string; label: string; }
export interface ProjectDetails { overview: string; challenge: string; implementation: string; outcome: string; }
export interface Project {
  title: string;
  org: string;
  context: string;
  year: string;
  blurb: string;
  metrics: Metric[];
  stack: string[];
  details?: ProjectDetails;
}
export interface SkillGroup { group: string; items: string[]; level?: string; }
export interface SideProject {
  name: string;
  year: string;
  tagline: string;
  points: string[];
  stack: string[];
  href?: string;
  hrefLabel?: string;
  /**
   * Set to "resume" instead of `href` to link at the published résumé. The URL
   * is built from the environment at render time, so neither the CV Builder
   * host nor the share token is stored in content.json.
   */
  linkTo?: string;
}
export interface ExperienceItem { company: string; role: string; period: string; points: string[]; }
export interface EducationItem { school: string; degree: string; detail: string; period: string; }
export interface Certification { name: string; issuer: string; date: string; credentialId?: string; }
export interface Award { title: string; issuer: string; date: string; detail?: string; }

// Editable site content is kept in content.json and is public.
//
// Contact details and the CV Builder connection are deliberately NOT in
// content.json: they come from the build environment (a local .env, or GitHub
// Actions secrets/variables) so they are never committed to the public repo.
// They are still baked into the generated HTML, so they remain visible on the
// deployed site — this keeps them out of git history, not off the web.
export const profile = {
  ...content.profile,
  email: import.meta.env.CONTACT_EMAIL ?? "",
  phone: import.meta.env.CONTACT_PHONE ?? "",
};
export const resume = {
  appUrl: import.meta.env.RESUME_APP_URL ?? "",
  token: import.meta.env.RESUME_TOKEN ?? "",
};

// A production build with these unset silently drops the contact link and the
// résumé preview, which is easy to miss — so say so in the build log.
if (import.meta.env.PROD) {
  const missing = [
    ["CONTACT_EMAIL", profile.email],
    ["RESUME_APP_URL", resume.appUrl],
    ["RESUME_TOKEN", resume.token],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    console.warn(
      `[portfolio] Missing build environment: ${missing.join(", ")}. ` +
        "The contact address and/or résumé preview will be omitted from this build."
    );
  }
}
export const facts: Metric[] = content.facts;
export const about: string[] = content.about;
export const projects: Project[] = content.projects;
export const sideProjects: SideProject[] = content.sideProjects ?? [];
export const skills: SkillGroup[] = content.skills;
export const experience: ExperienceItem[] = content.experience;
export const education: EducationItem[] = content.education;
export const languages: string[] = content.languages;
export const certifications: Certification[] = content.certifications;
export const awards: Award[] = content.awards;
