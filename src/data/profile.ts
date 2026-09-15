// ─────────────────────────────────────────────────────────────
//  PORTFOLIO CONTENT — single source of truth.
//  Edit this file to update your site, then commit & push.
//  Facts, dates and figures mirror the published CV Builder résumé.
//  Copy is written for international cloud / platform recruiters:
//  lead with platforms and scale, keep telecom acronyms in the breakdowns.
// ─────────────────────────────────────────────────────────────

export interface Link { label: string; href: string; handle: string; }
export interface Metric { value: string; label: string; }
export interface ProjectDetails { overview: string; challenge: string; implementation: string; outcome: string; }
export interface Project {
  title: string;
  org: string;      // client or institution
  context: string;  // how the work was delivered (employer, programme)
  year: string;
  blurb: string;
  metrics: Metric[];
  stack: string[];  // platforms and tooling first, telecom-specific terms last
  details?: ProjectDetails;
}
export interface SkillGroup { group: string; items: string[]; }
export interface ExperienceItem { company: string; role: string; period: string; points: string[]; }
export interface EducationItem { school: string; degree: string; detail: string; period: string; }
export interface Certification { name: string; issuer: string; date: string; credentialId?: string; }
export interface Award { title: string; issuer: string; date: string; detail?: string; }

export const profile = {
  name: "Mohamad Fajar Mahardika",
  role: "Cloud Infrastructure Engineer",
  headline: "Cloud Infrastructure & Platform Engineer", // <title>, link previews, structured data
  tagline:
    "I build and run the OpenStack private clouds behind Indonesia's biggest mobile networks. Hundreds of gigabits of live traffic go through them every day, so keeping them up is the job.",
  metaDescription:
    "Cloud infrastructure and platform engineer running production OpenStack at telecom scale. Kubernetes, Terraform, Python, GCP. Open to relocation or remote.",
  location: "Jakarta, Indonesia (GMT+7)",
  available: "Open to relocation (EU, US, AU, SG) or remote",
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

// The "at a glance" strip under the hero: the numbers a recruiter should
// leave with even if they read nothing else.
export const facts: Metric[] = [
  { value: "3+ years", label: "Running production OpenStack" },
  { value: "10M+", label: "Subscribers on one platform" },
  { value: "360+ Gbps", label: "Largest regional expansion" },
  { value: "Zero", label: "Downtime in a live site migration" },
];

export const about: string[] = [
  "I'm a cloud infrastructure engineer at Huawei Indonesia. For the last three years I've run the OpenStack private clouds that Telkomsel, Indosat Ooredoo Hutchison and XL Axiata use for their 4G and 5G core networks. That's real production load: millions of subscribers, hundreds of gigabits a second, and very little room for downtime.",
  "Most of my work is about capacity. I plan and roll out new compute, storage and networking, move live traffic between sites without interrupting anyone, and keep the Linux hosts underneath healthy. Day to day I work with Python, Terraform, Docker and Kubernetes, and use Prometheus and Grafana to keep an eye on platform health.",
  "I'm now looking for a cloud infrastructure or platform role, whether that means relocating to the EU, US, Australia or Singapore or joining a team remotely.",
];

// Newest first. Each project leads with its scale, then a plain-English
// summary, then the stack; telecom detail lives in the expandable breakdown.
export const projects: Project[] = [
  {
    title: "Scaling Indosat's 5G platform past 350 Gbps",
    org: "Indosat Ooredoo Hutchison",
    context: "Huawei Indonesia",
    year: "Jan 2026 – Present",
    blurb:
      "I deployed 5G core workloads in South Sumatra and rolled out bare-metal containers for the user plane across Indonesia, while keeping Indosat's live 4G and 5G platforms running day to day.",
    metrics: [
      { value: "350+ Gbps", label: "platform capacity" },
      { value: "Nationwide", label: "bare-metal container rollout" },
      { value: "4G + 5G", label: "production platforms supported" },
    ],
    stack: ["OpenStack", "Bare-metal Containers", "Linux", "VNF / CNF", "5G Core"],
    details: {
      overview:
        "Ongoing capacity work on Indosat's national 5G core, plus day-to-day operations for its 4G and 5G production platforms.",
      challenge:
        "Add capacity, and a new bare-metal container user plane, to a network that is already carrying live subscriber traffic.",
      implementation:
        "Deployed 5G core workloads in South Sumatra, deployed and configured IaaS bare-metal containers for the user plane (UPF) across Indonesia, and supported expansion and daily operations on the production 4G and 5G cores.",
      outcome:
        "Platform capacity is now above 350 Gbps, with user-plane capacity running on bare-metal containers nationwide.",
    },
  },
  {
    title: "Zero-downtime traffic migration for Telkomsel",
    org: "Telkomsel",
    context: "Huawei Indonesia",
    year: "Aug 2025 – Dec 2025",
    blurb:
      "I moved live international roaming traffic from Telkomsel's Surabaya site to Jakarta without a single service interruption, then rolled out integration and configuration changes across its distributed 5G core.",
    metrics: [
      { value: "Zero", label: "service interruption" },
      { value: "Live", label: "roaming traffic moved" },
      { value: "Distributed", label: "5G core integration" },
    ],
    stack: ["Linux", "VNF", "5G Core (SMF / UPF)", "DPI"],
    details: {
      overview:
        "A consolidation of Telkomsel's packet core: moving production traffic onto Jakarta sites and integrating services across the distributed 5G core.",
      challenge:
        "Roaming traffic from partner networks can't drop mid-session, so moving it between geographically separate sites had to be invisible to subscribers.",
      implementation:
        "Planned and ran the move of international roaming from Surabaya to Jakarta, then delivered service integration and configuration changes across the SMF and UPF platforms, including commissioning the by.U APN with deep packet inspection.",
      outcome:
        "Traffic moved between sites with no service interruption, and by.U gained APN-level policy control and traffic visibility across the core.",
    },
  },
  {
    title: "Growing Indosat's core capacity across four regions",
    org: "Indosat Ooredoo Hutchison",
    context: "Huawei Indonesia",
    year: "Apr 2024 – Jul 2025",
    blurb:
      "I expanded Indosat's virtualized core in North Sumatra, West Kalimantan, Central and South Sumatra and Lampung, and built a private LTE core for the enterprise client PT RAPP, from integration through to production handover.",
    metrics: [
      { value: "360+ Gbps", label: "N. Sumatra & W. Kalimantan" },
      { value: "4 regions", label: "capacity expanded" },
      { value: "Private LTE", label: "built for PT RAPP" },
    ],
    stack: ["OpenStack", "Linux", "VNF", "4G / 5G Core", "Private LTE"],
    details: {
      overview:
        "Capacity growth for Indosat's virtualized 4G and 5G core in four regions, plus a dedicated private LTE core for an enterprise customer.",
      challenge:
        "Add capacity to live platforms serving millions of subscribers without disrupting them, while building an isolated enterprise core in parallel.",
      implementation:
        "Expanded 4G core capacity to support 4.5M+ subscribers and 360+ Gbps in North Sumatra and West Kalimantan, grew virtualized infrastructure in Central and South Sumatra (4M+ subscribers, 260+ Gbps) and 5G core capacity in Lampung (2M+ subscribers), and built a private LTE core (MME, SPGW, HSS) for PT RAPP through integration, validation and production readiness.",
      outcome:
        "Four regions now run on expanded capacity, and PT RAPP took over a production-ready private LTE core.",
    },
  },
  {
    title: "Taking XL Axiata's 4G platform from install to live cutover",
    org: "XL Axiata",
    context: "Huawei Indonesia",
    year: "Jun 2023 – Mar 2024",
    blurb:
      "My first project at Huawei. I took a virtualized 4G core from installation through commissioning to live cutover, and handled the migration of production services in North Sumatra. It now serves 10M+ subscribers.",
    metrics: [
      { value: "10M+", label: "subscribers served" },
      { value: "200+ Gbps", label: "traffic carried" },
      { value: "Install → live", label: "full lifecycle" },
    ],
    stack: ["OpenStack", "Linux", "VNF", "4G Core (MME)"],
    details: {
      overview:
        "A new virtualized 4G packet core for XL Axiata, taken from installation to production, with a service migration in North Sumatra.",
      challenge:
        "Bringing up a new core and moving live services onto it needed careful commissioning and cutover planning, on a platform built to carry 10M+ subscribers.",
      implementation:
        "Installed and commissioned the virtualized 4G core, ran the live cutover, then handled commissioning and migration of production services in North Sumatra.",
      outcome:
        "The platform is in production today, serving 10M+ subscribers and carrying 200+ Gbps.",
    },
  },
  {
    title: "Tracing 5G registration on an open-source core",
    org: "Telkom University",
    context: "Basic & Applied Research",
    year: "Mar 2023",
    blurb:
      "I set up an open-source 5G core and followed a subscriber's registration step by step through the AMF, SMF and UPF. The write-up became a peer-reviewed journal paper.",
    metrics: [
      { value: "Peer-reviewed", label: "journal paper" },
      { value: "Open5GS", label: "open-source 5G core" },
      { value: "5G SA", label: "registration traced" },
    ],
    stack: ["Open5GS", "Linux", "Containers", "Python", "5G Core"],
    details: {
      overview:
        "A hands-on study of how a standalone 5G core works, using open-source software instead of vendor tooling.",
      challenge:
        "Validate the 5G registration procedure end to end across the AMF, SMF and UPF without commercial test equipment.",
      implementation:
        "Built a 5G core with Open5GS and traced the subscriber registration flow across each network function.",
      outcome:
        "Published in a peer-reviewed journal accredited Sinta 2 by Indonesia's national journal index.",
    },
  },
  {
    title: "Serving a disaster-detection model on Google Cloud",
    org: "Bangkit Academy",
    context: "Cloud Computing path, led by Google",
    year: "Feb 2021 – Jul 2021",
    blurb:
      "For our capstone, I provisioned and managed GCP Compute Engine instances to host the team's FastAPI service, so our image-based disaster-detection model could be used as a working API.",
    metrics: [
      { value: "GCP", label: "Compute Engine hosting" },
      { value: "FastAPI", label: "model served as an API" },
      { value: "Capstone", label: "team project" },
    ],
    stack: ["GCP", "Compute Engine", "FastAPI", "Python"],
  },
];

export const skills: SkillGroup[] = [
  { group: "Cloud & Platforms", items: ["OpenStack (Advanced)", "GCP", "Huawei FusionSphere", "Private Cloud / IaaS", "Bare-metal Containers"] },
  { group: "Containers & IaC", items: ["Kubernetes", "Docker", "Terraform", "YAML Templates"] },
  { group: "Automation & Monitoring", items: ["Python", "Git", "Prometheus", "Grafana"] },
  { group: "Systems & Reliability", items: ["Linux (Advanced)", "Capacity Planning", "High Availability", "Live Migrations", "Performance Tuning", "Troubleshooting"] },
  { group: "Networking", items: ["Virtual Networking", "VNF / CNF", "4G / 5G Core"] },
];

export const experience: ExperienceItem[] = [
  {
    company: "Huawei Indonesia",
    role: "Cloud Infrastructure Engineer (OpenStack)",
    period: "Jun 2023 – Present",
    points: [
      "Run and grow the OpenStack private clouds that Telkomsel, Indosat Ooredoo Hutchison and XL Axiata use for their 4G and 5G core networks.",
      "Plan and deliver compute, storage and network capacity so each platform can take more traffic without downtime.",
      "Write and maintain Python scripts for health checks, reporting and routine operations, plus YAML deployment templates that keep every production site configured the same way.",
      "Look after the Linux hosts underneath: troubleshooting, performance tuning and day-to-day support.",
      "Operate virtualized and cloud-native network functions (VNF/CNF) running on these clusters.",
      "Work day to day with Docker, Kubernetes and Terraform, and use Prometheus and Grafana for monitoring.",
    ],
  },
  {
    company: "Basic & Applied Research, Telkom University",
    role: "Mobile Core Analyst",
    period: "Mar 2023",
    points: [
      "Set up an open-source 5G core and traced subscriber registration step by step across the AMF, SMF and UPF.",
      "Co-authored the resulting study, published in a peer-reviewed, nationally accredited (Sinta 2) journal.",
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
  { title: "2nd Place, Huawei ICT Cloud Competition", issuer: "Huawei", date: "Dec 2020", detail: "National level" },
  { title: "3rd Place, Huawei ICT Cloud Selection", issuer: "Huawei", date: "Dec 2020", detail: "Campus level" },
];
