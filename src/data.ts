import { Project, Experience, SkillCategory, ToolItem, EducationItem } from "./types";

export const PERSONAL_INFO = {
  fullName: "Gio Anthony S. Sabucido",
  preferredName: "Yong",
  tagline: "Amazon Virtual Assistant",
  specialties: "Listing Optimization | E-commerce Design | Administrative Support",
  positioningLine: "Most listings don't fail because of the product; they fail because of poor positioning, weak images, and keyword misuse. That's the gap Yong fills.",
  location: "Philippines",
  phone: "+63 963 638 3883",
  email: "gio.sabucido@gmail.com",
  linkedin: "",
  resumeUrl: "",
  bio: "Detail-oriented marketing and administrative professional transitioning into the Amazon Virtual Assistant industry, specializing in listing optimization, e-commerce graphic design, and administrative support for Amazon sellers. Currently training in Amazon Seller Central fundamentals, Helium 10 tools, Asana, and Notion, with hands-on experience in graphic design, customer service, marketing operations, and database management."
};

export const STATISTICS = [
  { value: "20+", label: "Product Images Optimized", period: "Monthly" },
  { value: "25+", label: "Promotional Materials Produced", period: "Monthly" },
  { value: "50+", label: "Customer Inquiries Resolved", period: "Daily" },
  { value: "40+", label: "Broker/Property Listings Managed", period: "Monthly" }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Amazon Listing Support",
    description: "Creating highly converting backend & frontend assets for optimal organic search discoverability and buyer session retention.",
    skills: ["Product Listing Preparation", "Product Image Optimization", "Background Removal", "SEO-Inspired Product Descriptions", "Bullet Point Writing"]
  },
  {
    title: "E-commerce Graphic Design",
    description: "Designing high-click-through visual assets, hero shots, infographics, and promotional templates reflecting clean brand guidelines.",
    skills: ["Adobe Photoshop", "Canva Mastery", "Product Image Editing", "Listing Image Layouts", "Visual Merch & Marketing Graphics"]
  },
  {
    title: "Administrative Support",
    description: "Organizing store files, preparing analytical reports, dealing with daily case backlog, and managing buyer communication.",
    skills: ["Data Entry & Cleansing", "Report Preparation", "Email & Chat Support", "Document Management", "Case Logs & Customer Services"]
  },
  {
    title: "Data & Operations",
    description: "Monitoring competitor movements, listing performance, stock counts, and providing structured reports to drive action.",
    skills: ["Inventory Monitoring", "Spreadsheet Tracking", "Market Intelligence", "Competitor Monitoring", "SOP Orchestration"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Marketing Associate / Graphic Artist",
    company: "Pamocor Group of Companies",
    period: "April 2025 – Present",
    achievements: [
      "Optimize 20+ item product images monthly using Photoshop and Canva to boost web appeal",
      "Draft SEO-inspired captions and structured copy with focused targeted key terms",
      "Conduct competitors research and monitor active placement trends daily for management",
      "Maintain organized spreadsheets, cloud assets directories, and campaign files"
    ],
    amazonSkills: ["Product Image Optimization", "Copywriting (SEO-Inspired)", "Visual Content Creation", "Market Research"]
  },
  {
    role: "Graphic Artist",
    company: "Gaisano Brothers Merchandising Inc.",
    period: "January 2024 – April 2025",
    achievements: [
      "Design 25+ visual promotional cards and digital banner placements monthly",
      "Edit 10+ store product photos weekly to maintain design continuity",
      "Style seasonal visual merchandising displays to represent store guidelines",
      "Collaborate with marketing teams to deliver optimized visual bundles on time"
    ],
    amazonSkills: ["E-commerce Graphics", "Product Image Editing", "Visual Merchandising", "Asset Management"]
  },
  {
    role: "Customer Service Associate",
    company: "Conduent Business Services Philippines Inc.",
    period: "March 2023 – September 2023",
    achievements: [
      "Handle 50+ live chat inquiries daily with top satisfaction scores and resolution accuracy",
      "Consult case notes and service logs to execute swift customer problem-solving",
      "Log transactions and buyer records meticulously into localized CRM database",
      "Coordinate service requests and escalate complex product logs safely"
    ],
    amazonSkills: ["Customer Support", "Case Log Management", "CRM Ticketing", "Order Dispute Resolution"]
  },
  {
    role: "Agent & Broker Coordinator",
    company: "Global One Realty & Property Management Corp.",
    period: "June 2022 – December 2022",
    achievements: [
      "Manage and execute daily ledger updates to reduce transaction matching delays",
      "Organize and audit 40+ dynamic item listings monthly to guarantee absolute data accuracy",
      "Design weekly property flyers and media postings to scale buyer interest",
      "Compile consolidated monthly reports and status overviews for leadership review"
    ],
    amazonSkills: ["Listing Consolidation", "Data Entry & Auditing", "Database Ledger Keeping", "Service Reporting"]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor of Science in Industrial Technology (Food Prep & Service Tech Focus)",
    school: "Southern Leyte State University"
  },
  {
    degree: "Completed Studies in Animation & Visual Graphics Design",
    school: "Hilongos National Vocational School"
  }
];

export const TOOLS_CATEGORIES = [
  {
    name: "Amazon & CRM E-commerce",
    tools: ["Amazon Seller Central", "Helium 10", "Asana", "Notion", "Google Workspace", "Microsoft 365"]
  },
  {
    name: "Design & Copywriting",
    tools: ["Adobe Photoshop", "Canva", "CapCut Video Editor", "ChatGPT", "Gemini AI", "Claude AI"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Efficient Amazon Listing Creation System",
    skills: ["Amazon FBA Operations", "Helium 10 Keyword Research", "Asana SOP Setup", "Listing Layouts"],
    description: "A comprehensive project template built using Asana to completely streamline the product launch process, integrating Helium 10 keyword analysis, layout workflows, and solid listing SOPs.",
    challenge: "Amazon sellers often lose momentum and organic rank during product launch due to chaotic file structures, unresearched list copy, and bottlenecked graphic workflows.",
    solution: "Designed a centralized launch schedule in Asana with pre-mapped milestones, integrating systematic Helium 10 Cerebro/Magnet keyword extraction, Copy templates (optimized title, bullet points, and search terms), and step-by-step product graphics preparation.",
    impact: "Provides a fail-proof pipeline reducing launch overhead by 40%, ensuring all SEO keywords, optimized listing graphics, and inventory constraints are addressed prior to publishing.",
    sopSteps: [
      "Phase 1: Keyword Harvesting via Helium 10 Cerebro (Cerebellum reverse ASIN on top 3 competitors)",
      "Phase 2: Text Optimization (Embedding high-volume search parameters inside Title first, then five bullets)",
      "Phase 3: Design Package (Staging 7 listing slides: Hero, Features, Infographic, Dimensions, and Lifestyle)",
      "Phase 4: Launch Checklist (Verifying Backend search terms, browse nodes, and item specs in Seller Central)"
    ]
  },
  {
    id: "project-2",
    title: "Automated Merchandise Inventory Tracker",
    skills: ["Google Sheets & Excel", "Inventory Control", "Automatic Visual Alerts", "Process Optimization"],
    description: "A real-time inventory monitoring structure tracking physical marketing collaterals and store merchandise, using automations to prevent shortages.",
    challenge: "Showroom marketing teams and graphic designers regularly experienced collateral stockouts during major campaign events due to offline, unmonitored tracking.",
    solution: "Programmed an automated tracking ledger in Google Sheets using conditional scripts, stock level logic, transaction log records, and high-visibility yellow/red alerts when items fall under safety thresholds.",
    impact: "Erased design material stockouts completely, streamlining local logistics and ensuring critical graphics were always ready for regional product events.",
    sopSteps: [
      "Setup dynamic ledger referencing central product SKU catalog",
      "Standardize checkout logs for showroom team to enter digital transactions easily",
      "Incorporate conditional visual cue rules alerting management on low-stock items",
      "Conduct simple weekly cycle counts to adjust database ledger accuracy"
    ]
  },
  {
    id: "project-3",
    title: "All-in-One Brand Design & Marketing",
    skills: ["Graphic Enhancement", "Adobe Photoshop / Canva", "Social Media Copy", "Brand Consistency"],
    description: "A complete end-to-end visual rollout across digital media platforms and physical showrooms, delivering absolute consistency for brand aesthetics.",
    challenge: "Inconsistent graphics and mismatched messaging between physical flyers and online landing pages deteriorated buyer confidence and brand trust.",
    solution: "Constructed a standard asset style kit (fonts, templates, color ranges) and rolled out congruent creatives—including Pinterest visual layout boards, Instagram carousel assets, Facebook banner items, and product displays.",
    impact: "Established a professional, unified, and memorable look at every customer touchpoint, elevating customer trust and increasing overall engagement by 25%.",
    sopSteps: [
      "Review target buyer demographics and establish core visual assets guidelines",
      "Construct a library of Canva/Photoshop starter templates for recurring product announcements",
      "Enhance lifestyle imagery via custom background removal & high-fidelity shadow rendering",
      "Deploy localized visual displays maintaining same styling as social campaigns"
    ]
  }
];

const amazon = "/tools/amazon.svg";
const asana = "/tools/asana.svg";
const canva = "/tools/canva.svg";
const capcut = "/tools/capcut.svg";
const drive = "/tools/drive.svg";
const excel = "/tools/excel.svg";
const facebook = "/tools/facebook.svg";
const gemini = "/tools/gemini.svg";
const gmail = "/tools/gmail.svg";
const googleCalendar = "/tools/google-calendar.svg";
const googleMeet = "/tools/google-meet.svg";
const helium = "/tools/helium.svg";
const instagram = "/tools/instagram.svg";
const linkedin = "/tools/linkedin.svg";
const notion = "/tools/notion.svg";
const openai = "/tools/openai.svg";
const outlook = "/tools/outlook.svg";
const photoshop = "/tools/photoshop.svg";
const powerpoint = "/tools/powerpoint.svg";
const tiktok = "/tools/tiktok.svg";
const word = "/tools/word.svg";

export const STACK_ICONS = [
  { name: "Photoshop", imgSrc: photoshop, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  { name: "Tiktok", imgSrc: tiktok, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  { name: "Canva", imgSrc: canva, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  { name: "CapCut", imgSrc: capcut, color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
  { name: "Notion", imgSrc: notion, color: "text-slate-800 dark:text-white bg-slate-500/10 border-slate-500/20" },
  { name: "Asana", imgSrc: asana, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  { name: "Amazon", imgSrc: amazon, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { name: "LinkedIn", imgSrc: linkedin, color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20" },
  { name: "ChatGPT", imgSrc: openai, color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
  { name: "Gemini", imgSrc: gemini, color: "text-sky-500 bg-sky-500/10 border-sky-500/20" },
  { name: "Excel", imgSrc: excel, color: "text-green-600 bg-green-500/10 border-green-500/20" },
  { name: "Word", imgSrc: word, color: "text-indigo-600 bg-indigo-500/10 border-indigo-500/20" },
  { name: "PowerPoint", imgSrc: powerpoint, color: "text-amber-600 bg-amber-500/10 border-amber-500/20" },
  { name: "Outlook", imgSrc: outlook, color: "text-sky-600 bg-sky-500/10 border-sky-500/20" },
  { name: "Gmail", imgSrc: gmail, color: "text-red-500 bg-red-500/10 border-red-500/20" },
  { name: "Drive", imgSrc: drive, color: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20" }
];

export const LANGUAGES = ["English (Professional)", "Tagalog (Native)"];

// Easy-to-edit logo placeholder data. Replace plain strings in imgSrc (e.g. "/logos/myicon.png") to load real SVGs/images.
export interface LogoItem {
  id: string;
  imgSrc: string;
  label: string;
}

export const ROW1_LOGOS: LogoItem[] = [
  { id: "1-1", imgSrc: photoshop, label: "Photoshop" },
  { id: "1-2", imgSrc: canva, label: "Canva" },
  { id: "1-3", imgSrc: capcut, label: "CapCut" },
  { id: "1-4", imgSrc: notion, label: "Notion" },
  { id: "1-5", imgSrc: asana, label: "Asana" },
  { id: "1-6", imgSrc: helium, label: "Helium 10" },
  { id: "1-7", imgSrc: amazon, label: "Amazon" }
];

export const ROW2_LOGOS: LogoItem[] = [
  { id: "2-1", imgSrc: excel, label: "Excel" },
  { id: "2-2", imgSrc: word, label: "Word" },
  { id: "2-3", imgSrc: outlook, label: "Outlook" },
  { id: "2-4", imgSrc: powerpoint, label: "Powerpoint" },
  { id: "2-5", imgSrc: drive, label: "Drive" },
  { id: "2-6", imgSrc: googleMeet, label: "Meet" },
  { id: "2-7", imgSrc: googleCalendar, label: "Calendar" }
];

export const ROW3_LOGOS: LogoItem[] = [
  { id: "3-1", imgSrc: openai, label: "ChatGPT" },
  { id: "3-2", imgSrc: gemini, label: "Gemini" },
  { id: "3-3", imgSrc: facebook, label: "Facebook" },
  { id: "3-4", imgSrc: instagram, label: "Instagram" },
  { id: "3-5", imgSrc: tiktok, label: "Tiktok" },
  { id: "3-6", imgSrc: gmail, label: "Gmail" },
  { id: "3-7", imgSrc: linkedin, label: "LinkedIn" }
];

