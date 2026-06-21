// ─────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT — single source of truth.
//  Edit this file to update your site, then commit & push.
//  (Tip: the Admin.dc.html editor from the design phase exports
//   the same shape — paste its values here.)
// ─────────────────────────────────────────────────────────────

export interface Link { label: string; href: string; handle: string; }
export interface Metric { value: string; label: string; }
export interface TechStack { core?: string[]; infra?: string[]; automation?: string[]; }
export interface ProjectDetails { overview: string; challenge: string; implementation: string; outcome: string; }
export interface Project {
  title: string;
  year: string;
  role: string;
  blurb: string;
  metrics: Metric[];
  tech: TechStack;
  details?: ProjectDetails;
  href: string;
}
export interface Service { title: string; desc: string; }
export interface SkillGroup { group: string; items: string[]; }
export interface ExperienceItem { company: string; role: string; period: string; points: string[]; }
export interface EducationItem { school: string; degree: string; detail: string; period: string; }
export interface Certification { name: string; issuer: string; date: string; credentialId?: string; }
export interface Award { title: string; issuer: string; date: string; detail?: string; }

export const profile = {
  name: "Mohamad Fajar Mahardika",
  role: "Cloud Infrastructure Engineer",
  tagline:
    "I run the OpenStack core platforms behind Indonesia's largest mobile networks: millions of subscribers, hundreds of gigabits of live traffic.",
  location: "South Jakarta, Indonesia. Open to remote or relocation",
  available: "Open to Cloud, DevOps, Platform and SRE roles",
  // Contact details come from the ENVIRONMENT so they're never committed to the public repo.
  email: import.meta.env.CONTACT_EMAIL ?? "",
  phone: import.meta.env.CONTACT_PHONE ?? "",
  photo: "/me.jpg", // put a file in /public (e.g. /public/me.jpg) and set this to "/me.jpg"
  links: [
    { label: "GitHub", href: "https://github.com/fajarmhr", handle: "fajarmhr" },
    { label: "LinkedIn", href: "https://linkedin.com/in/massffajar", handle: "massffajar" },
  ] as Link[],
};

// Résumé is pulled LIVE from your CV Builder app.
// Values come from the ENVIRONMENT so the token is never committed:
//   • locally:  copy .env.example → .env and fill it in
//   • on CI:    add them as GitHub repo Secrets (Settings → Secrets → Actions)
// Leave them unset to show the "Connect your CV Builder" message.
export const resume = {
  appUrl: import.meta.env.RESUME_APP_URL ?? "",
  token: import.meta.env.RESUME_TOKEN ?? "",
};

export const about: string[] = [
  "I'm a cloud infrastructure engineer at Huawei Indonesia, operating the OpenStack platforms (Huawei FusionSphere) that carry the 4G and 5G core networks for Indonesia's top three operators. This is work where reliability isn't optional: millions of subscribers and hundreds of gigabits of production traffic depend on it staying up.",
  "I'm happiest removing operational toil — Python health-checks, YAML-defined Infrastructure as Code, Linux administration, and the lifecycle management of virtualized (VNF) and containerized (CNF) network functions. I'm now looking for cloud platform, DevOps and SRE roles where that operational rigor is the whole job.",
];

// Each project leads with its IMPACT metrics, then grouped technology, then an
// optional expandable Challenge → Action → Result breakdown.
export const projects: Project[] = [
  {
    title: "Indosat Ooredoo Hutchison — 5G Core",
    year: "Jan 2026 – Present",
    role: "PS Core Network Engineer",
    blurb:
      "Returned to Indosat's packet core to scale the live 5G platform — deploying and integrating 5G UPF VNFs for South Sumatra and leading 5G SMF expansion for the Lampung region.",
    metrics: [
      { value: "350+ Gbps", label: "5G UPF capacity" },
      { value: "2M+", label: "subscribers served" },
      { value: "UPF + SMF", label: "5G core scope" },
    ],
    tech: {
      core: ["5G Core", "UPF", "SMF", "VNF"],
      infra: ["OpenStack", "FusionSphere"],
      automation: ["Python", "YAML"],
    },
    details: {
      overview:
        "An ongoing 5G packet-core scaling program at Indosat Ooredoo Hutchison, focused on user-plane and session-management capacity across Sumatra.",
      challenge:
        "Adding 5G UPF and SMF capacity to a live national core without disrupting the subscribers and traffic already running on it.",
      implementation:
        "Deployed and integrated 5G UPF VNFs for South Sumatra and planned and executed 5G SMF expansion for the Lampung region.",
      outcome:
        "Raised 5G user-plane capacity to 350+ Gbps in South Sumatra and extended SMF headroom for 2M+ subscribers in Lampung.",
    },
    href: "#",
  },
  {
    title: "Telkomsel 5G Core Migration",
    year: "Aug 2025 – Jan 2026",
    role: "PS Core Network Engineer",
    blurb:
      "Migrated international roaming traffic from Surabaya to Jakarta core sites with minimal service disruption, and commissioned the by.U APN with DPI across Telkomsel's nationwide SMF and UPF platforms.",
    metrics: [
      { value: "Nationwide", label: "5G core scope" },
      { value: "SMF / UPF", label: "platforms cut over" },
      { value: "Minimal", label: "service disruption" },
    ],
    tech: {
      core: ["5G Core", "SMF", "UPF", "DPI"],
      infra: ["FusionSphere", "Linux"],
      automation: ["Python"],
    },
    details: {
      overview:
        "Consolidation of Telkomsel's packet-switched core: relocating international roaming onto Jakarta core sites while extending nationwide 5G SMF/UPF coverage.",
      challenge:
        "International roaming is unforgiving of downtime: the cutover from Surabaya to Jakarta had to preserve live sessions and signalling for partner networks.",
      implementation:
        "Led the relocation of roaming traffic across core sites and commissioned the by.U APN with deep packet inspection across the nationwide SMF and UPF platforms.",
      outcome:
        "Roaming relocated with minimal service disruption; by.U gained APN-level policy control and DPI visibility across the national 5G core.",
    },
    href: "#",
  },
  {
    title: "Indosat Ooredoo Hutchison — 4G & Private LTE",
    year: "Apr 2024 – Jul 2025",
    role: "PS Core Network Engineer",
    blurb:
      "Delivered multi-region 4G CUPS capacity expansions across Sumatra and Kalimantan, and stood up a dedicated private LTE core (MME, SPGW-C/U, HSS) for enterprise client PT RAPP.",
    metrics: [
      { value: "4.5M+", label: "subscribers" },
      { value: "600+ Gbps", label: "4G capacity added" },
      { value: "Private LTE", label: "enterprise core" },
    ],
    tech: {
      core: ["4G CUPS", "MME", "SPGW-C/U", "HSS"],
      infra: ["OpenStack", "FusionSphere", "VNF"],
      automation: ["Python", "YAML"],
    },
    details: {
      overview:
        "A multi-region 4G packet-core capacity program across Indosat's network, plus a dedicated private LTE core for an enterprise customer.",
      challenge:
        "Expanding live 4G CUPS capacity across North Sumatra, West Kalimantan, and Central and South Sumatra without impacting the millions of subscribers already on the platform — while standing up an isolated enterprise core in parallel.",
      implementation:
        "Planned and executed 4G CUPS expansions across North Sumatra and West Kalimantan (4.5M+ subscribers, 360+ Gbps) and Central and South Sumatra (4M+ subscribers, 260+ Gbps), and installed and commissioned a private LTE core (MME, SPGW-C, SPGW-U, HSS) for PT RAPP.",
      outcome:
        "Added 600+ Gbps of 4G headroom across two regions serving 4.5M+ subscribers, and delivered a production private LTE core for enterprise connectivity.",
    },
    href: "#",
  },
  {
    title: "XL Axiata Jakarta Packet Core",
    year: "Jun 2023 – Mar 2024",
    role: "PS Core Network Engineer",
    blurb:
      "Installed, commissioned and cut over the 4G CUPS packet core for the Jakarta region, and migrated MME services for North Sumatra — platforms collectively serving 10M+ subscribers.",
    metrics: [
      { value: "10M+", label: "subscribers" },
      { value: "200+ Gbps", label: "capacity" },
      { value: "2", label: "regions migrated" },
    ],
    tech: {
      core: ["4G CUPS", "MME", "Packet Core"],
      infra: ["FusionSphere", "Linux"],
      automation: ["Python", "YAML"],
    },
    details: {
      overview:
        "A greenfield 4G CUPS packet core for the Jakarta region, paired with an MME service migration for North Sumatra.",
      challenge:
        "Bringing a new packet core into service and migrating MME for regions collectively serving 10M+ subscribers demanded careful commissioning and cutover sequencing.",
      implementation:
        "Installed, commissioned and cut over the Jakarta 4G CUPS packet core, then migrated North Sumatra MME services onto the platform.",
      outcome:
        "Two regions serving 10M+ subscribers carried on the new core, with 200+ Gbps of capacity running in production.",
    },
    href: "#",
  },
  {
    title: "Open-Source 5G Core Research",
    year: "Mar 2023",
    role: "Mobile Core Analyst",
    blurb:
      "Built and analyzed an open-source 5G core, tracing subscriber registration across AMF, SMF and UPF — the basis for a Sinta-2 indexed journal publication.",
    metrics: [
      { value: "Sinta-2", label: "indexed publication" },
      { value: "5G SA", label: "registration analysis" },
      { value: "Open5GS", label: "AMF / SMF / UPF" },
    ],
    tech: {
      core: ["5G Core", "AMF / SMF / UPF"],
      infra: ["Open5GS", "Linux", "Containers"],
      automation: ["Python"],
    },
    details: {
      overview: "A hands-on study of 5G standalone core internals using an open-source stack.",
      challenge:
        "Understanding and validating the 5G registration procedure end-to-end across AMF, SMF and UPF without vendor tooling.",
      implementation:
        "Built an open-source 5G core (Open5GS) and traced the subscriber registration flow across the AMF, SMF and UPF.",
      outcome: "Findings formed the basis of a Sinta-2 indexed journal publication.",
    },
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
    period: "Jun 2023 – Present",
    points: [
      "Administer large-scale OpenStack cloud infrastructure (Huawei FusionSphere) carrying mission-critical 4G/5G telecom core services at national scale.",
      "Build and maintain Python automation for infrastructure health checks, monitoring validation and operational reporting across cloud, server and storage.",
      "Lead deployment, commissioning, upgrade and capacity expansion of core network workloads across virtual machines and containerized (CNF) platforms, alongside multi-vendor engineering teams.",
      "Manage compute, storage and networking resources and the lifecycle of virtualized (VNF) and cloud-native 5G core functions, keeping nationwide services available and scalable.",
    ],
  },
  {
    company: "Basic & Applied Research, Telkom University",
    role: "Mobile Core Analyst",
    period: "Mar 2023",
    points: [
      "Analyzed 5G Core network functions (AMF, SMF, UPF), tracing the subscriber registration flow end-to-end to document how the 5G standalone core operates.",
      "Co-authored the resulting study into a Sinta-2 indexed journal publication on open-source 5G network implementation.",
    ],
  },
];

export const education: EducationItem[] = [
  { school: "Telkom University", degree: "B.Tech, Telecommunication Engineering", detail: "GPA 3.32", period: "Jan 2023" },
];

export const languages: string[] = ["Indonesian (Native)", "English (Advanced)"];

export const certifications: Certification[] = [
  { name: "HCIA – Cloud Computing", issuer: "Huawei", date: "Sep 2020", credentialId: "01010080280805089633746" },
  { name: "HCIA – Routing & Switching", issuer: "Huawei", date: "Oct 2020", credentialId: "01010010139780805481667025" },
  { name: "HCIA – Security", issuer: "Huawei", date: "Dec 2020", credentialId: "01010030139780806289767568" },
];

export const awards: Award[] = [
  {
    title: "Huawei ICT Cloud Competition — 2nd Place (National)",
    issuer: "Huawei Indonesia",
    date: "Dec 2020",
    detail: "National Cloud Computing 2020 ICT Competition",
  },
  {
    title: "Huawei ICT Cloud Selection — 3rd Place (Campus)",
    issuer: "Huawei Indonesia",
    date: "Dec 2020",
    detail: "Campus-level Cloud Computing 2020 ICT Competition",
  },
];
