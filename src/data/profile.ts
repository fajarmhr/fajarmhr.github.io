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
// Values come from the ENVIRONMENT so the token is never committed:
//   • locally:  copy .env.example → .env and fill it in
//   • on CI:    add them as GitHub repo Secrets (Settings → Secrets → Actions)
// Leave them unset to show the "Connect your CV Builder" message.
export const resume = {
  appUrl: import.meta.env.RESUME_APP_URL ?? "",
  token: import.meta.env.RESUME_TOKEN ?? "",
};

export const about: string[] = [
  "I'm a Cloud Infrastructure Engineer at Huawei Indonesia, operating mission-critical OpenStack-based platforms (Huawei FusionSphere) that carry the 4G and 5G core networks behind Indonesia's largest mobile operators — millions of subscribers and hundreds of gigabits of live production traffic.",
  "My day-to-day is infrastructure deployment, capacity expansion, automation and lifecycle management of virtualized (VNF) and cloud-native (CNF) network functions — Linux administration, Python automation and YAML-based Infrastructure as Code. I'm now focused on Cloud, DevOps, Platform Engineering and SRE roles where that operational rigor is the core of the job.",
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
      "Planned and executed 4G CUPS and 5G UPF/SMF capacity expansions across Sumatra and Kalimantan, and stood up a private LTE core — MME, SPGW-C/U and HSS — for an enterprise client (PT RAPP).",
    stack: ["4G CUPS", "5G UPF/SMF", "Private LTE", "VNF"],
    metric: "4.5M+ subscribers · 360+ Gbps",
    href: "#",
  },
  {
    title: "XL Axiata — Jakarta Packet Core",
    year: "2023–24",
    role: "PS Core Network Engineer",
    blurb:
      "Installed, commissioned and cut over the 4G CUPS packet core for the Jakarta region, and migrated MME services for North Sumatra — each serving 10M+ subscribers.",
    stack: ["4G CUPS", "MME", "Packet Core"],
    metric: "10M+ subscribers · 200+ Gbps",
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
      "Administer large-scale Huawei FusionSphere (OpenStack-based) cloud infrastructure supporting mission-critical telecom core network services at national scale.",
      "Perform Linux administration, troubleshooting and performance optimization across virtualized compute, storage and networking environments.",
      "Build and maintain Python automation for infrastructure health checks, monitoring validation and operational reporting across cloud, server and storage.",
      "Support deployment, commissioning, upgrade and capacity expansion of 4G/5G core workloads on VMs and containers (VNF/CNF), across multi-vendor teams.",
    ],
  },
  {
    company: "Basic and Applied Research, Telkom University",
    role: "Mobile Core Analyst",
    period: "Mar 2023",
    points: [
      "Implemented and analyzed an open-source 5G network as a thesis follow-up, tracing the subscriber registration flow across 5G Core NFs (AMF, SMF, UPF) — published in a Sinta-2 indexed journal.",
    ],
  },
];

export const education: EducationItem[] = [
  { school: "Telkom University", degree: "B.Tech, Telecommunication Engineering", detail: "GPA 3.32", period: "2023" },
];

export const languages: string[] = ["Indonesian — Native", "English — Advanced"];
