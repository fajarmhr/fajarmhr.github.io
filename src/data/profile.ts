// ─────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT — single source of truth.
//  Edit this file to update your site, then commit & push.
//  Facts, dates and figures mirror the published CV Builder résumé.
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
    "I run the large-scale OpenStack private clouds that carry real production traffic for Indonesia's 4G and 5G core networks — millions of subscribers, hundreds of gigabits.",
  location: "South Jakarta, Indonesia",
  available: "Open to remote & international opportunities",
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
  "I'm a cloud infrastructure engineer with three years of hands-on experience running large-scale OpenStack private clouds that carry real production traffic. At Huawei Indonesia I operate the platforms behind the 4G and 5G core networks of Indonesia's major operators — Telkomsel, Indosat Ooredoo Hutchison and XL Axiata — serving millions of subscribers and handling hundreds of Gbps.",
  "Day to day I focus on capacity expansion, Linux systems, Python automation, and keeping services stable through migrations and growth: YAML deployment templates that keep production sites consistent, health-check scripting that removes operational toil, and lifecycle management of virtualized (VNF) and cloud-native (CNF) network functions. I'm looking for cloud engineering or platform roles where reliability and automation matter.",
];

// Each project leads with its IMPACT metrics, then grouped technology, then an
// optional expandable Challenge → Action → Result breakdown.
export const projects: Project[] = [
  {
    title: "Indosat Ooredoo Hutchison — 5G Core",
    year: "Jan 2026 – Present",
    role: "PS Core Network Engineer",
    blurb:
      "Back on Indosat's packet core to scale the live 5G platform — deploying 5G Core workloads in South Sumatra past 350 Gbps and rolling out IaaS bare-metal container user-plane capacity across Indonesia.",
    metrics: [
      { value: "350+ Gbps", label: "5G platform capacity" },
      { value: "Nationwide", label: "bare-metal user plane" },
      { value: "4G + 5G", label: "production operations" },
    ],
    tech: {
      core: ["5G Core", "UPF", "VNF / CNF"],
      infra: ["OpenStack", "Bare-Metal Containers", "Linux"],
      automation: ["Python", "YAML"],
    },
    details: {
      overview:
        "An ongoing 5G packet-core scaling program at Indosat Ooredoo Hutchison, covering user-plane capacity growth and day-to-day operations of live 4G and 5G core environments.",
      challenge:
        "Adding 5G Core capacity and a new bare-metal container user plane to a national network that is already carrying production subscribers and traffic.",
      implementation:
        "Deployed 5G Core workloads in South Sumatra, deployed and configured IaaS bare-metal containers for the user plane across Indonesia, and supported expansion plus daily operations for production 4G and 5G Core environments.",
      outcome:
        "Platform capacity increased beyond 350 Gbps, with user-plane capacity now running on bare-metal containers nationwide.",
    },
    href: "#",
  },
  {
    title: "Telkomsel Core Site Migration",
    year: "Aug 2025 – Dec 2025",
    role: "PS Core Network Engineer",
    blurb:
      "Migrated production traffic between geographically separate core sites with no service interruption — relocating international roaming from Surabaya to Jakarta — and commissioned the by.U APN with DPI across the distributed 5G Core.",
    metrics: [
      { value: "Zero", label: "service interruption" },
      { value: "SMF / UPF", label: "platforms integrated" },
      { value: "Distributed", label: "5G Core scope" },
    ],
    tech: {
      core: ["5G Core", "SMF", "UPF", "DPI"],
      infra: ["Linux", "VNF"],
      automation: ["Python"],
    },
    details: {
      overview:
        "Consolidation of Telkomsel's packet-switched core: relocating production traffic onto Jakarta core sites while delivering service integration across the distributed 5G Core platforms.",
      challenge:
        "International roaming is unforgiving of downtime — moving it between geographically separate core sites had to preserve live sessions and signalling for partner networks throughout.",
      implementation:
        "Led the relocation of roaming traffic across core sites, then delivered service integration and configuration changes — including commissioning the by.U APN with deep packet inspection — across the distributed 5G Core.",
      outcome:
        "Traffic migrated between sites with no service interruption, and by.U gained APN-level policy control and DPI visibility across the core.",
    },
    href: "#",
  },
  {
    title: "Indosat Ooredoo Hutchison — 4G Growth & Private LTE",
    year: "Apr 2024 – Jul 2025",
    role: "PS Core Network Engineer",
    blurb:
      "Delivered multi-region 4G Core capacity expansions across Sumatra and Kalimantan, grew 5G Core capacity in Lampung, and built and handed over a dedicated private LTE core for enterprise client PT RAPP.",
    metrics: [
      { value: "8.5M+", label: "subscribers supported" },
      { value: "600+ Gbps", label: "capacity added" },
      { value: "Private LTE", label: "enterprise core" },
    ],
    tech: {
      core: ["4G Core", "5G Core", "MME", "SPGW-C/U", "HSS"],
      infra: ["OpenStack", "Linux", "VNF"],
      automation: ["Python", "YAML"],
    },
    details: {
      overview:
        "A multi-region packet-core capacity program across Indosat's network, plus a dedicated private LTE core delivered for an enterprise customer.",
      challenge:
        "Expanding live 4G and 5G core capacity across North Sumatra, West Kalimantan, Central/South Sumatra and Lampung without impacting the millions of subscribers already on the platform — while standing up an isolated enterprise core in parallel.",
      implementation:
        "Expanded 4G Core capacity to support 4.5M+ subscribers and 360+ Gbps across North Sumatra and West Kalimantan, grew virtualized infrastructure in Central/South Sumatra (4M+ subscribers, 260+ Gbps) and 5G Core capacity in Lampung (2M+ subscribers), and built and handed over a private LTE Core for PT RAPP including integration, validation and production readiness.",
      outcome:
        "600+ Gbps of additional headroom across four regions serving 8.5M+ subscribers, and a production-ready private LTE core delivered to the enterprise customer.",
    },
    href: "#",
  },
  {
    title: "XL Axiata Packet Core Cutover",
    year: "Jun 2023 – Mar 2024",
    role: "PS Core Network Engineer",
    blurb:
      "Took a virtualized 4G Core platform from installation through commissioning and live cutover, and handled commissioning and migration for production services in North Sumatra. The platform now serves 10M+ subscribers and carries 200+ Gbps.",
    metrics: [
      { value: "10M+", label: "subscribers served" },
      { value: "200+ Gbps", label: "traffic carried" },
      { value: "Install → cutover", label: "full lifecycle" },
    ],
    tech: {
      core: ["4G Core", "MME", "Packet Core"],
      infra: ["OpenStack", "Linux", "VNF"],
      automation: ["Python", "YAML"],
    },
    details: {
      overview:
        "A virtualized 4G packet core taken end-to-end from installation to live production, paired with a service migration for North Sumatra.",
      challenge:
        "Bringing a new packet core into service and migrating live production services demanded careful commissioning and cutover sequencing on a platform destined to carry 10M+ subscribers.",
      implementation:
        "Installed, commissioned and cut over the virtualized 4G Core platform, then handled commissioning and migration for production services in North Sumatra.",
      outcome:
        "The platform runs in production today, serving 10M+ subscribers and carrying 200+ Gbps.",
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
  { title: "Cloud Platform Operations", desc: "Running and expanding OpenStack private clouds that stay available under real production load." },
  { title: "Automation & IaC", desc: "Python operational scripting and YAML deployment templates that keep production sites consistent and repeatable." },
  { title: "Reliability at Scale", desc: "Capacity planning, high availability and live migrations for platforms serving millions of subscribers." },
];

export const skills: SkillGroup[] = [
  { group: "Cloud & Virtualization", items: ["OpenStack (Advanced)", "Huawei FusionSphere", "IaaS", "Bare-metal Containers", "VNF / CNF", "Private Cloud"] },
  { group: "Automation", items: ["Python", "YAML Templates", "Infrastructure as Code", "Operational Scripting"] },
  { group: "Systems", items: ["Linux (Advanced)", "Performance Tuning", "Troubleshooting", "Production Operations"] },
  { group: "Infrastructure", items: ["Capacity Planning", "Live Migrations", "High Availability", "Virtual Networking", "4G / 5G Core Environments"] },
  { group: "Tools", items: ["Git", "Microsoft Office", "Google Workspace"] },
];

export const experience: ExperienceItem[] = [
  {
    company: "Huawei Indonesia",
    role: "Cloud Infrastructure Engineer (OpenStack)",
    period: "Jun 2023 – Present",
    points: [
      "Run and expand OpenStack private cloud platforms used by major Indonesian operators for 4G and 5G core networks (Telkomsel, IOH, and XL Axiata).",
      "Plan and deliver capacity growth across compute, storage, and networking so platforms can absorb higher traffic without downtime.",
      "Run and maintain Python scripts for infrastructure health checks, operational reporting, and daily operational tasks.",
      "Maintain YAML deployment templates so new capacity and configuration changes stay consistent across production sites.",
      "Manage the underlying Linux systems — troubleshooting, performance tuning, and day-to-day operational support.",
      "Operate virtualized and cloud-native network functions (VNF/CNF) running on these OpenStack clusters.",
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
  {
    school: "Telkom University",
    degree: "Bachelor of Technology, Telecommunication Engineering",
    detail: "GPA 3.32 / 4.00",
    period: "Aug 2017 – Dec 2022",
  },
];

export const languages: string[] = ["Indonesian (Native)", "English (Advanced)"];

export const certifications: Certification[] = [
  { name: "HCIA Cloud Computing", issuer: "Huawei", date: "Sep 2020", credentialId: "01010080280805089633746" },
  { name: "HCIA Routing & Switching", issuer: "Huawei", date: "Oct 2020", credentialId: "01010010139780805481667025" },
  { name: "HCIA Security", issuer: "Huawei", date: "Dec 2020", credentialId: "01010030139780806289767568" },
];

export const awards: Award[] = [
  {
    title: "Huawei ICT Cloud Competition — 2nd Place (National)",
    issuer: "Huawei",
    date: "Dec 2020",
    detail: "National level, Cloud Computing track",
  },
  {
    title: "Huawei ICT Cloud Selection — 3rd Place (Campus)",
    issuer: "Huawei",
    date: "Dec 2020",
    detail: "Campus level, Cloud Computing track",
  },
];
