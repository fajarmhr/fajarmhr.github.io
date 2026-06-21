// ─────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT — single source of truth.
//  Edit this file to update your site, then commit & push.
//  (Tip: the Admin.dc.html editor from the design phase exports
//   the same shape — paste its values here.)
// ─────────────────────────────────────────────────────────────

export interface Link { label: string; href: string; handle: string; }
export interface Project { title: string; year: string; role: string; blurb: string; stack: string[]; metric: string; href: string; }
export interface Service { title: string; desc: string; }
export interface SkillGroup { group: string; items: string[]; }
export interface ExperienceItem { company: string; role: string; period: string; points: string[]; }
export interface EducationItem { school: string; degree: string; detail: string; period: string; }

export const profile = {
  name: "Mohamad Fajar Mahardika",
  role: "Cloud Infrastructure Engineer",
  tagline:
    "I run the OpenStack cloud platforms behind Indonesia's largest mobile networks — keeping millions of subscribers and hundreds of gigabits of live traffic online.",
  location: "South Jakarta, Indonesia · open to remote / relocation",
  available: "Open to Cloud · DevOps · Platform · SRE roles",
  email: "mf.mahardika@gmail.com",
  photo: "", // put a file in /public (e.g. /public/me.jpg) and set this to "/me.jpg"
  links: [
    { label: "GitHub", href: "https://github.com/fajarmhr", handle: "fajarmhr" },
    { label: "LinkedIn", href: "https://linkedin.com/in/massffajar", handle: "massffajar" },
  ] as Link[],
};

// Résumé is pulled LIVE from your CV Builder app (deployed on Vercel).
// Publish a résumé there, copy its share token, and paste both below.
// The portfolio shows an on-screen preview that always reflects the latest version.
export const resume = {
  appUrl: "https://your-cv-app.vercel.app", // your CV Builder base URL
  token: "",                                // the published résumé's share token
};

export const about: string[] = [
  "I'm a cloud infrastructure engineer at Huawei Indonesia, operating mission-critical OpenStack platforms that carry the 4G and 5G core networks for the country's top three operators. My work lives where reliability isn't optional — millions of subscribers and hundreds of gigabits of production traffic.",
  "I'm most at home removing operational toil: Python health-checks, YAML-defined infrastructure, and lifecycle management of virtualized and containerized network functions. I'm now focused on cloud platform, DevOps and SRE roles where that operational rigor is the job.",
];

export const projects: Project[] = [
  {
    title: "Telkomsel — 5G Core Migration",
    year: "2025–26",
    role: "PS Core Network Engineer",
    blurb:
      "Migrated international roaming traffic from Surabaya to Jakarta core sites with minimal service disruption, and commissioned by.U APN + DPI across nationwide SMF and UPF platforms.",
    stack: ["5G Core", "SMF", "UPF", "DPI"],
    metric: "Nationwide 5G Core",
    href: "#",
  },
  {
    title: "Indosat Ooredoo Hutchison",
    year: "2024–26",
    role: "PS Core Network Engineer",
    blurb:
      "Planned and executed 4G CUPS and 5G UPF/SMF capacity expansions across Sumatra and Kalimantan, and stood up a private LTE core (MME, SPGW-C/U, HSS) for an enterprise client.",
    stack: ["4G CUPS", "5G UPF", "VNF", "MME"],
    metric: "4.5M+ subscribers · 360+ Gbps",
    href: "#",
  },
  {
    title: "XL Axiata — Jakarta Packet Core",
    year: "2023–24",
    role: "PS Core Network Engineer",
    blurb:
      "Installed, commissioned and cut over the 4G CUPS packet core for the Jakarta region, and migrated MME services for North Sumatra — both serving 10M+ subscribers.",
    stack: ["4G CUPS", "MME", "Packet Core"],
    metric: "10M+ subscribers · 200+ Gbps",
    href: "#",
  },
  {
    title: "Open-Source 5G Core Research",
    year: "2023",
    role: "Mobile Core Analyst",
    blurb:
      "Built and analyzed an open-source 5G core, tracing subscriber registration across AMF, SMF and UPF — the basis for a Sinta-2 indexed journal publication.",
    stack: ["5G Core", "AMF / SMF / UPF", "Open5GS"],
    metric: "Published research",
    href: "#",
  },
];

export const services: Service[] = [
  { title: "Cloud Platform Operations", desc: "Running OpenStack and virtualized infrastructure that stays available under real production load." },
  { title: "Automation & IaC", desc: "Replacing operational toil with Python and YAML-defined, repeatable infrastructure." },
  { title: "Reliability at Scale", desc: "Capacity planning, lifecycle management and zero-disruption migrations for systems serving millions." },
];

export const skills: SkillGroup[] = [
  { group: "Cloud & Virtualization", items: ["OpenStack", "Huawei FusionSphere", "VNF / CNF", "KVM"] },
  { group: "Automation & IaC", items: ["Python", "YAML", "Bash", "Infrastructure as Code"] },
  { group: "Platform & Linux", items: ["Linux Administration", "Containers", "Compute & Storage", "Networking"] },
  { group: "Telecom Core", items: ["4G CUPS", "5G Core (AMF/SMF/UPF)", "MME", "Packet Core"] },
];

export const experience: ExperienceItem[] = [
  {
    company: "Huawei Indonesia",
    role: "Intermediate Cloud Core Engineer",
    period: "Jun 2023 — Present",
    points: [
      "Operate large-scale OpenStack (Huawei FusionSphere) infrastructure carrying mission-critical telecom core services at national scale.",
      "Build Python automation for infrastructure health checks, monitoring validation and operational reporting across cloud, server and storage.",
      "Lead deployment, upgrade and capacity expansion of 4G/5G core workloads on VMs and containers, across multi-vendor teams.",
    ],
  },
  {
    company: "Basic & Applied Research, Telkom University",
    role: "Mobile Core Analyst",
    period: "Mar 2023",
    points: [
      "Analyzed 5G Core network functions (AMF, SMF, UPF), tracing the subscriber registration flow for a Sinta-2 journal publication.",
    ],
  },
];

export const education: EducationItem[] = [
  { school: "Telkom University", degree: "B.Tech, Telecommunication Engineering", detail: "GPA 3.32", period: "2023" },
];

export const languages: string[] = ["Indonesian — Native", "English — Advanced"];
