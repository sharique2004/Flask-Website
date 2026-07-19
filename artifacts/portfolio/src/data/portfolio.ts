// Single source of truth for the portfolio site — ported from portfolio_data.py

export const IDENTITY = {
  name: "Sharique Khatri",
  role: "Applied AI engineer",
  line: "I like building things that real people depend on rather than demos.",
  degree: "Bachelor of Science in Computer Science, minor in Cybersecurity",
  school: "Penn State University",
  graduated: "May 2026",
  gpa: "3.60",
  deans_list: "Dean's List all six semesters",
  base: "San Francisco, CA",
  open_to: "New York, Seattle, Dubai, and the Bay Area",
  status: "Actively looking for Applied AI, Forward Deployed Engineer, and new grad SWE roles",
  work_auth:
    "US work authorization on OPT with STEM extension eligibility, " +
    "about three years of runway with no sponsorship needed. " +
    "UAE Golden Visa holder, so Dubai and Abu Dhabi need no sponsorship either.",
};

export const LINKS = {
  email: "sharique.khatri@gmail.com",
  github: "https://github.com/sharique2004",
  linkedin: "https://linkedin.com/in/sharique-khatri",
  site: "https://shariquekhatri.com",
};

export interface Featured {
  slug: string;
  name: string;
  page: string;
  repo: string;
  external?: boolean;
  wide?: boolean;
  award?: string;
  kicker: string;
  line: string;
  accent: string;
  poster: string;
  title_html: string;
  summary: string;
  thesis: string;
  tech: string;
}

export const FEATURED: Featured[] = [
  {
    slug: "donna",
    name: "Donna",
    page: "https://donna.shariquekhatri.com/",
    repo: "https://github.com/sharique2004/Donna",
    external: true,
    wide: true,
    award: "1st place · AI Supply Chain Hackathon 2026",
    kicker: "hackathon winner · food banks + AI · live demo",
    line: "Takes a supplier's surplus-food call and routes each pallet to a food bank. Built in a day, won first place.",
    accent: "orange",
    poster: "/donna-shot.jpg",
    title_html: "A voice dispatcher for food bank donations.",
    summary:
      "A supplier calls in surplus food. Donna answers, transcribes the call, pulls out each item, and decides on the spot: perishables that spoil fast get dispatched straight to a food bank, shelf stable goods go into inventory. A human approves before anything is dispatched. Built in a day and won first place.",
    thesis: "The right call for a pallet of strawberries is not the right call for canned beans.",
    tech: "Voice intake · live transcription · LLM triage · map dispatch",
  },
  {
    slug: "bibi",
    name: "Bibi",
    page: "/bibi",
    repo: "https://github.com/sharique2004/pc-assistant",
    kicker: "local first voice agent · windows · MIT",
    line: "Say its name and it opens apps, moves the real mouse, and reads your screen out loud.",
    accent: "orange",
    poster: "/bibi-poster.jpg",
    title_html: "A voice agent that flies a real PC.",
    summary:
      "Say its name and it opens apps, moves the real mouse, reads the screen, and answers out loud. A custom agent loop routes each request across local models and Claude by task signal, cost, and latency.",
    thesis: "The agent loop matters more than the model.",
    tech: "Python · Flask · Electron · faster-whisper · Ollama · Claude",
  },
  {
    slug: "scribe",
    name: "MeetingScribe",
    page: "/scribe",
    repo: "https://github.com/sharique2004/MeetingScribe",
    kicker: "on device meeting transcription · macOS · MIT",
    line: "Records and transcribes your meetings entirely on your Mac. No bot joins, nothing leaves the device.",
    accent: "cyan",
    poster: "/scribe-shot.png",
    title_html: "Your meetings, transcribed. Never uploaded.",
    summary:
      "No bot joins the call. It records both sides at the OS audio layer and transcribes a 45 minute call in roughly 90 seconds on the Apple Neural Engine. Everything stays as plain files on your Mac.",
    thesis: "Granola removed the bot from your meeting. MeetingScribe removes the cloud.",
    tech: "Swift · CoreAudio · Apple Neural Engine · EventKit",
  },
];

export interface Case {
  name: string;
  kicker: string;
  line: string;
  on_paper: string;
  real_story: string;
  honest: string;
  links: [string, string][];
  tech: string;
}

export const CASES: Case[] = [
  {
    name: "OmniSch",
    kicker: "publication · accepted at ECCV 2026",
    line: "I owned the human-annotation pipeline behind the benchmark: 1,854 schematics, about 109.9K labeled instances.",
    on_paper: "Co author on a multimodal PCB schematic benchmark, arXiv:2604.00270.",
    real_story:
      "I owned the human annotation pipeline: 1,854 real world schematics, about 109.9K labeled instances aligning 423.4K semantic labels to visual regions. I wrote the validity spec and enforced annotator consistency across the team. The vision model architecture and training were the advisor's work.",
    honest:
      "I did not train the model or design the architecture. My contribution was the benchmark dataset and the pipeline that made it trustworthy.",
    links: [
      ["arXiv", "https://arxiv.org/abs/2604.00270"],
      ["paper", "https://arxiv.org/abs/2604.00270"],
    ],
    tech: "Python · annotation tooling · data validation · benchmark design",
  },
  {
    name: "WellX AI",
    kicker: "production RAG · 10,000+ users · startup",
    line: "Built and maintained the production RAG pipelines that powered the core product.",
    on_paper:
      "Applied AI internship at a health tech startup. Built production RAG pipelines serving 10,000+ users.",
    real_story:
      "Health tech startup, reported directly to the CTO. Built production RAG pipelines serving 10,000+ users over enterprise wearable data with Python, FastAPI, and vector search. Designed REST ingestion for Fitbit, Apple Watch, and WHOOP. Owned AI features from prompt design through offline evaluation, deployment, and monitoring.",
    honest:
      "A chunk of the job was tracing an outsourced production stack, documenting what was actually running, and fixing the parts with no visibility. The real bottleneck was not building new things. It was understanding what was already there.",
    links: [],
    tech: "Python · FastAPI · vector search · Fitbit · Apple Watch · WHOOP",
  },
];

export interface Experience {
  company: string;
  role: string;
  where: string;
  dates: string;
  summary: string;
  real_story?: string;
}

export const EXPERIENCE: Experience[] = [
  {
    company: "WellX AI",
    role: "Applied AI Intern",
    where: "Remote",
    dates: "Sep 2025 – Mar 2026",
    summary:
      "Health tech startup, reported directly to the CTO. Built production RAG pipelines serving 10,000+ users over enterprise wearable data with Python, FastAPI, and vector search. Designed REST ingestion for Fitbit, Apple Watch, and WHOOP. Owned AI features from prompt design through offline evaluation, deployment, and monitoring.",
    real_story:
      "A chunk of the job was tracing an outsourced production stack, documenting what was actually running, and fixing the parts with no visibility. The real bottleneck was not building new things. It was understanding what was already there.",
  },
  {
    company: "Penn State ORIS",
    role: "DevOps Intern",
    where: "University Park, PA",
    dates: "May 2025 – Aug 2025",
    summary:
      "Modernized legacy research IT services: migrated backends to C# .NET, wrote parameterized SQL to close injection holes, built CI/CD on Azure DevOps, containerized services with Docker. Delivered 11 backend enhancements and cut deployment time 40%.",
  },
  {
    company: "Fourth Square",
    role: "Software Engineering Intern",
    where: "Texas, remote",
    dates: "May 2024 – Aug 2024",
    summary:
      "Shipped a LangChain document Q&A and content generation system that handled 1,000+ production queries, integrating OpenAI and Cohere. Cut latency 40% with prompt chaining, chunking, and caching. Built a lightweight LLM eval harness and tuned outputs against direct researcher feedback.",
  },
  {
    company: "HVAC Digital Twin",
    role: "Capstone Team Lead",
    where: "Penn State · sponsored by Automated Logic (Carrier)",
    dates: "2025 – 2026",
    summary:
      "Led BACnet integration on a real time HVAC simulation system: Python backend, React dashboard, historical weather playback so sponsor engineers could test behavior without touching live systems.",
  },
];

export const PUBLICATION = {
  title: "OmniSch: A Comprehensive Benchmark for PCB Schematic Understanding",
  venue: "ECCV 2026",
  arxiv: "arXiv:2604.00270",
  url: "https://arxiv.org/abs/2604.00270",
  advisor: "Advised by Dr. Amulya Yadav.",
  contribution:
    "I owned the human annotation pipeline: 1,854 schematics, 109.9K labeled instances, 423.4K semantic labels.",
};

export const ARCHIVE: [string, string, string][] = [
  ["Taazify", "Receipt scanning app with deterministic normalization layer", "https://github.com/sharique2004/Taazify"],
  ["Donna", "1st place at AI Supply Chain Hackathon 2026", "https://donna.shariquekhatri.com/"],
  ["Gmail AI Pipeline", "Classifies recruiter email into application states with an LLM", ""],
  ["Obsidian vault", "Automated knowledge base that links notes, projects, and metrics", ""],
];

export const SKILLS: Record<string, string> = {
  Languages: "Python, TypeScript/JavaScript, Swift, C#, SQL",
  "AI/ML": "Gemini, OpenAI, Claude, LangChain, vector search, RAG, prompt engineering, offline evaluation",
  Backend: "FastAPI, Flask, Express, Node.js, REST, BACnet",
  Frontend: "React, Vite, SwiftUI, Electron",
  Infra: "Azure DevOps, Docker, CI/CD, Drizzle ORM, PostgreSQL, MongoDB Atlas",
};
