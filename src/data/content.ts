export const identity = {
  name: "Jerico Dane Sanchez",
  initials: "JDS",
  title: "Full-Stack & AI Developer",
  location: "Pateros, Metro Manila, Philippines",
  tagline: "Engineering intelligence into everyday experiences.",
  summary:
    "Computer Science student at UP Los Baños shipping full-stack and AI products end to end. From offline-first mobile architectures and on-device inference to production changes in a C++ browser engine.",
  education: {
    school: "University of the Philippines Los Baños",
    degree: "Bachelor of Science in Computer Science",
    years: "2022-2026",
    coursework: [
      "Software Engineering",
      "Artificial Intelligence",
      "Database Systems",
      "Operating Systems",
    ],
  },
};

export const contact = {
  email: "sanchezjericodane@gmail.com",
  phone: "+63 956 762 2733",
  location: "Pateros, Metro Manila",
  github: "https://github.com/jd-sanchez",
  linkedin: "https://www.linkedin.com/in/jerico-dane-sanchez-91810a1bb/",
  facebook: "https://www.facebook.com/jericodane.sanchez",
};

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    company: "CINTERLabs",
    role: "Full Stack Developer",
    location: "Los Baños",
    start: "Sep 2025",
    end: "May 2026",
    highlights: [
      "Developed a Flutter wellness tracking app targeting university constituents, built on an offline-first architecture where data is written to SQLite locally first, then synced to an Express.js/MongoDB backend on connectivity.",
      "Delivered offline-capable meal tracking with on-device YOLOv11 AI detection across 95+ Filipino food classes and a gamification system to drive sustained healthy behavior.",
      "Enabled real campus event participation by building an admin event management system with full CRUD and attendance tracking, secured via Google OAuth and role-based JWT authentication across constituent and admin flows.",
    ],
  },
  {
    company: "Moonchild Productions",
    role: "Software Engineering Intern",
    location: "Motala",
    start: "Jun 2025",
    end: "Jul 2025",
    highlights: [
      "Extended the Goanna rendering engine's CSS parser to support 5 comparison operators in production, modifying token scanning, expression evaluation, and serialization.",
      "Eliminated a legacy vendor-prefixed dead codepath from the production CSS parser by refactoring style property tables, parser definitions, and computed style handling, reducing the parser codebase by 15% and enforcing modern web standards.",
      "Delivered multiple production changes in a large C++ browser engine codebase, independently expanding beyond assigned tasks to resolve additional parser-related issues within 2 months.",
    ],
  },
  {
    company: "Stable Studio",
    role: "Full Stack Developer",
    location: "Hong Kong",
    start: "Nov 2024",
    end: "Mar 2025",
    highlights: [
      "Delivered full-stack internal web applications across 10+ client projects as part of a 3-person development team, owning schema design and Next.js + Tailwind frontend implementation.",
      "Owned the full request lifecycle from API to UI, coordinating contracts with teammates before implementation to minimize integration bugs at client handoff.",
      "Gathered and clarified requirements directly with clients, translating business needs into API contracts and technical specs that guided implementation.",
    ],
  },
];

export type ProjectEntry = {
  name: string;
  tagline: string;
  date: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
};

export const projects: ProjectEntry[] = [
  {
    name: "Rubric",
    tagline: "AI-Powered Essay Feedback Platform",
    date: "May 2026",
    description:
      "Full-stack essay feedback platform with an async PDF pipeline that turns submissions into rubric-aligned, per-criterion scoring in seconds.",
    tech: ["Next.js", "FastAPI", "Supabase", "AWS S3/Lambda", "Groq API", "Llama 3.3 70B"],
    liveUrl: "https://feedback-platform-app.vercel.app/",
    image: "/projects/rubric.png",
  },
  {
    name: "Sinehan",
    tagline: "AI Movie Recommendation Web App",
    date: "Mar 2026",
    description:
      "AI movie recommendation app with a 4-step mood-to-pick pipeline and automated weekly email digests for 30+ users.",
    tech: ["Next.js", "Groq API", "TMDb API", "n8n", "Google OAuth", "JWT"],
    liveUrl: "https://sinehan-ashen.vercel.app/",
    image: "/projects/sinehan.png",
  },
  {
    name: "Proxy",
    tagline: "RAG-Powered Portfolio Chatbot",
    date: "Feb 2026",
    description:
      "RAG-powered portfolio chatbot grounding Llama 3.3 70B in a local knowledge base for accurate, cost-efficient answers.",
    tech: ["LangChain", "ChromaDB", "FastEmbed", "Llama 3.3 70B"],
    liveUrl: "https://proxy-chatbot-virid.vercel.app/",
    image: "/projects/proxy.png",
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "JavaScript", "TypeScript", "Dart", "SQL", "C", "C++"],
  },
  {
    label: "Frontend",
    items: ["React.js", "Next.js", "Tailwind", "Flutter", "TypeScript"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "FastAPI"],
  },
  {
    label: "AI / ML",
    items: [
      "LangChain",
      "OpenAI API",
      "Groq API",
      "RAG Pipelines",
      "ChromaDB",
      "TensorFlow",
      "PyTorch",
    ],
  },
  {
    label: "AI Workflow",
    items: ["Claude Code", "n8n", "Label Studio"],
  },
  {
    label: "Databases",
    items: ["MongoDB", "Supabase", "Firebase", "PostgreSQL", "SQLite", "MySQL"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS (S3, Lambda)", "Docker", "Git", "GitHub"],
  },
];

export type CertificationEntry = {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
};

export const certifications: CertificationEntry[] = [
  {
    name: "AI Engineer for Developers Associate",
    issuer: "DataCamp",
    date: "2026",
  },
  {
    name: "SQL Associate",
    issuer: "DataCamp",
    date: "2026",
  },
  {
    name: "Claude Code 101",
    issuer: "Anthropic",
    date: "2026",
  },
];

export const stats = [
  { value: 3, suffix: "+", label: "Internships & industry roles" },
  { value: 3, suffix: "", label: "Full-stack AI products shipped" },
  { value: 95, suffix: "+", label: "Food classes in on-device detection" },
  { value: 2, suffix: "mo", label: "Shipping in a C++ browser engine" },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
