// Single source of truth for the portfolio site — synced with portfolio_data.py

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
  x: "https://x.com/ShariqueKhatri",
  site: "https://shariquekhatri.com",
};

// Icon slug maps to SVG sprite symbol id and optional brand data-b value
export type IconSlug =
  | "mic" | "waveform" | "sparkles" | "map"
  | "python" | "flask" | "electron" | "ollama" | "claude"
  | "swift" | "audio" | "chip" | "calendar" | "nextjs" | "typescript"
  | "plug" | "terminal" | "eye" | "chart" | "postgres" | "fastapi"
  | "c" | "lock" | "drive" | "layers" | "html" | "css" | "js";

export const ICON_MAP: Record<IconSlug, { sym: string; brand?: string }> = {
  mic:        { sym: "i-mic" },
  waveform:   { sym: "i-waveform" },
  sparkles:   { sym: "i-sparkles" },
  map:        { sym: "i-pin" },
  python:     { sym: "i-python",     brand: "python" },
  flask:      { sym: "i-flask",      brand: "flask" },
  electron:   { sym: "i-electron",   brand: "electron" },
  ollama:     { sym: "i-ollama",     brand: "ollama" },
  claude:     { sym: "i-spark" },
  swift:      { sym: "i-swift",      brand: "swift" },
  audio:      { sym: "i-speaker" },
  chip:       { sym: "i-cpu" },
  calendar:   { sym: "i-calendar" },
  nextjs:     { sym: "i-nextjs",     brand: "next" },
  typescript: { sym: "i-typescript", brand: "ts" },
  plug:       { sym: "i-plug" },
  terminal:   { sym: "i-terminal" },
  eye:        { sym: "i-eye" },
  chart:      { sym: "i-chart" },
  postgres:   { sym: "i-postgresql", brand: "pg" },
  fastapi:    { sym: "i-fastapi",    brand: "fastapi" },
  c:          { sym: "i-c",          brand: "c" },
  lock:       { sym: "i-lock" },
  drive:      { sym: "i-drive" },
  layers:     { sym: "i-layers" },
  html:       { sym: "i-html5",      brand: "html" },
  css:        { sym: "i-css",        brand: "css" },
  js:         { sym: "i-javascript", brand: "js" },
};

export type StackPill = [IconSlug, string];

export interface Featured {
  slug: string;
  name: string;
  page: string;
  repo: string | null;
  download?: string;
  external?: boolean;
  wide?: boolean;
  award?: string;
  kicker: string;
  line: string;
  accent: string;
  poster: string | null;
  title_html: string;
  summary: string;
  thesis: string;
  tech: string;
  stack: StackPill[];
}

export const FEATURED: Featured[] = [
  {
    slug: "donna",
    name: "Donna",
    page: "https://donna.shariquekhatri.com/",
    repo: "https://github.com/sharique2004/Donna",
    external: true,
    wide: true,
    award: "2× Hackathon Winner",
    kicker: "won AI Supply Chain 2026 + ALIX hackathons · food banks + AI",
    line: "Takes a supplier's surplus-food call and routes each pallet to a food bank. Built in a day, won first place, then won the ALIX Hackathon.",
    accent: "orange",
    poster: "/donna-shot.jpg",
    title_html: "A voice dispatcher for food bank donations.",
    summary:
      "A supplier calls in surplus food. Donna answers, transcribes the call, pulls out each item, and decides on the spot: perishables that spoil fast get dispatched straight to a food bank, shelf stable goods go into inventory. A human approves before anything is dispatched. Built in a day, won first place at the AI Supply Chain Hackathon 2026, then won the ALIX Hackathon.",
    thesis: "The right call for a pallet of strawberries is not the right call for canned beans.",
    tech: "Voice intake · live transcription · LLM triage · map dispatch",
    stack: [
      ["mic", "Voice intake"],
      ["waveform", "Live transcription"],
      ["sparkles", "LLM triage"],
      ["map", "Map dispatch"],
    ],
  },
  {
    slug: "frontrun",
    name: "FrontRun",
    page: "https://frontrun-app-sigma.vercel.app/",
    repo: "https://github.com/sharique2004/Frontrun",
    external: true,
    kicker: "autonomous SDR · AI employee · live demo",
    line: "Detects a funding raise the moment it is filed, researches the company, and lands a personalized email the same day.",
    accent: "cyan",
    poster: "/frontrun-shot.jpg",
    title_html: "By the time the press releases, it is too late.",
    summary:
      "An autonomous SDR built as an AI employee, not a chatbot. It watches SEC Form D filings, researches each raise, finds the right contact, and runs the entire outreach conversation: send, reply triage, follow up, and booking. A human watches a funnel dashboard, not a prompt box. Built in under 8 hours at the Build Your Own AI Company hackathon.",
    thesis: "Ten agencies find out from the press release. You find out from the filing.",
    tech: "Next.js · InsForge · You.com · Resend",
    stack: [
      ["nextjs", "Next.js"],
      ["typescript", "TypeScript"],
      ["sparkles", "LLM research"],
      ["plug", "Outreach loop"],
    ],
  },
  {
    slug: "wisprit",
    name: "Wisprit",
    page: "https://wisprit.shariquekhatri.com/",
    repo: "https://github.com/sharique2004/Wisprit",
    external: true,
    award: "Pizza Hackathon Winner",
    kicker: "won the Pizza Hackathon · fully local dictation · macOS",
    line: "Hold a key, speak, release. Words appear at the cursor, cleaned up entirely on this machine.",
    accent: "orange",
    poster: "/wisprit-shot.jpg",
    title_html: "Dictation that never leaves your Mac.",
    summary:
      "A native Swift menu bar app. Hold the Fn key and words stream into the focused field while you are still speaking, through the same input method machinery Apple's own Dictation uses. Apple's on device speech engine transcribes on the Neural Engine with 69 to 108 ms from release to final text, on device Apple Intelligence fixes what the recognizer misheard inside a validation cage, and every failure path returns the verbatim transcript. No cloud, no account, no network calls anywhere in the app.",
    thesis: "The moat was never the acoustic model.",
    tech: "Swift · SpeechAnalyzer · Apple Intelligence · IMKit",
    stack: [
      ["swift", "Swift"],
      ["waveform", "SpeechAnalyzer"],
      ["chip", "Apple Intelligence"],
      ["mic", "Push to talk"],
    ],
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
    stack: [
      ["python", "Python"],
      ["flask", "Flask"],
      ["electron", "Electron"],
      ["waveform", "faster-whisper"],
      ["ollama", "Ollama"],
      ["claude", "Claude"],
    ],
  },
  {
    slug: "scribe",
    name: "MeetingScribe",
    page: "https://meetingscribe.shariquekhatri.com/",
    repo: "https://github.com/sharique2004/MeetingScribe",
    download:
      "https://github.com/sharique2004/MeetingScribe/releases/latest/download/MeetingScribe.dmg",
    external: true,
    kicker: "on device meeting transcription · macOS · MIT",
    line: "Records and transcribes your meetings entirely on your Mac. No bot joins, nothing leaves the device.",
    accent: "cyan",
    poster: "/scribe-shot.png",
    title_html: "Your meetings, transcribed. Never uploaded.",
    summary:
      "No bot joins the call. It records both sides at the OS audio layer and transcribes a 45 minute call in roughly 90 seconds on the Apple Neural Engine. Everything stays as plain files on your Mac.",
    thesis: "Granola removed the bot from your meeting. MeetingScribe removes the cloud.",
    tech: "Swift · CoreAudio · Apple Neural Engine · EventKit",
    stack: [
      ["swift", "Swift"],
      ["audio", "CoreAudio"],
      ["chip", "Neural Engine"],
      ["calendar", "EventKit"],
    ],
  },
  {
    slug: "aman",
    name: "Aman UAE",
    page: "https://amanuae.shariquekhatri.com",
    repo: null,
    external: true,
    kicker: "live news platform · LLM source verification",
    line: "A real-time UAE news platform with LLM source verification. The launch reached 26,000+ impressions.",
    accent: "cyan",
    poster: null,
    title_html: "Real time UAE news, verified by LLMs.",
    summary:
      "A real time UAE news platform with LLM based source verification. Built end to end with Claude Code in days, not weeks: Next.js, TypeScript, Tailwind, MCP server integrations. The launch post reached 26,000+ impressions on LinkedIn. Deployed through Vercel's Git integration; no custom CI pipeline, and it does not need one.",
    thesis: "Built end to end with Claude Code in days, not weeks.",
    tech: "Next.js · TypeScript · MCP · Claude Code",
    stack: [
      ["nextjs", "Next.js"],
      ["typescript", "TypeScript"],
      ["plug", "MCP"],
      ["terminal", "Claude Code"],
    ],
  },
];

export interface Case {
  name: string;
  kicker: string;
  on_paper: string;
  real_story: string;
  honest: string;
  links: [string, string][];
  tech: string;
  stack: StackPill[];
}

export const CASES: Case[] = [
  {
    name: "LinkedIn Curator",
    kicker: "content operating system · Claude Code",
    on_paper: "An AI system that writes LinkedIn posts in your voice.",
    real_story:
      "Not a prompt, a content operating system: it knows your background and projects, tracks what you posted and what worked, and drafts in your voice. Every recommendation is grounded in 750+ posts analyzed across 15 top creators: timing, format, hooks, length, media, CTAs.",
    honest: "It writes the drafts. What ships is still your call.",
    links: [["repo", "https://github.com/sharique2004/Linkedin_Curator"]],
    tech: "Claude Code · 750+ posts analyzed · voice profiles",
    stack: [
      ["claude", "Claude Code"],
      ["chart", "Post analytics"],
      ["sparkles", "Voice matching"],
    ],
  },
  {
    name: "ATS Scanner",
    kicker: "seven agents · runs on your Claude subscription",
    on_paper: "Scores your resume against a job description the way an ATS would.",
    real_story:
      "Seven specialized Claude agents parse a resume the way Workday, Greenhouse, Taleo, iCIMS and Lever actually parse it, then flag what is wrong, what is missing, and what to enhance for that specific JD. It shells out to the claude CLI, so a Claude subscription is the engine: no API key, no per call billing.",
    honest: "It shows you what the machine sees. The resume still has to be true.",
    links: [["repo", "https://github.com/sharique2004/ATS-System"]],
    tech: "Python · Claude CLI · multi agent scoring",
    stack: [
      ["python", "Python"],
      ["claude", "Claude agents"],
      ["chart", "JD scoring"],
    ],
  },
  {
    name: "OmniSch",
    kicker: "publication · accepted at ECCV 2026",
    on_paper: "Co author on a multimodal PCB schematic benchmark, arXiv:2604.00270.",
    real_story:
      "I owned the human annotation pipeline: 1,854 real world schematics, about 109.9K labeled instances aligning 423.4K semantic labels to visual regions. I wrote the validity spec and enforced annotator consistency. Benchmark numbers only mean something if the ground truth is consistent.",
    honest: "Mine: the annotation pipeline and its quality bar. Not mine: methodology design.",
    links: [["paper", "https://arxiv.org/abs/2604.00270"]],
    tech: "Computer vision · VLM benchmarking · data quality",
    stack: [
      ["eye", "Computer vision"],
      ["sparkles", "VLM benchmarking"],
      ["chart", "Data quality"],
    ],
  },
  {
    name: "Taazify",
    kicker: "iOS · the unglamorous fix",
    on_paper: "A SwiftUI app that scans grocery receipts and tracks expiry.",
    real_story:
      "The vision model kept hallucinating on POS abbreviations like BNLS SKNLS CKN BRST. Rather than throw a bigger model at it, I traced the failure and built a ReceiptNormalizer that expands abbreviations deterministically before the model ever sees the input. The unglamorous fix was the right one.",
    honest: "Not on the App Store. A working system I use, not a shipped product.",
    links: [["repo", "https://github.com/sharique2004/Taazify"]],
    tech: "SwiftUI · FastAPI · Qwen2-VL · PostgreSQL",
    stack: [
      ["swift", "SwiftUI"],
      ["fastapi", "FastAPI"],
      ["chip", "Qwen2-VL"],
      ["postgres", "PostgreSQL"],
    ],
  },
  {
    name: "VaultCache",
    kicker: "systems · C",
    on_paper: "An encrypted file system in C.",
    real_story:
      "AES-256 block encryption, SHA-256 integrity, PBKDF2 key derivation, crash recovery journaling, and a custom LRU cache that cut repeated file access latency 65%. I wanted to understand what actually happens at the block layer.",
    honest: "A learning build, and it taught me more about storage than any course did.",
    links: [["repo", "https://github.com/sharique2004/vaultcache"]],
    tech: "C · AES-256 · block I/O · LRU caching",
    stack: [
      ["c", "C"],
      ["lock", "AES-256"],
      ["drive", "Block I/O"],
      ["layers", "LRU cache"],
    ],
  },
  {
    name: "Intrsekt",
    kicker: "paid client work",
    on_paper: "A marketing site for a consulting firm.",
    real_story:
      "Hand coded solo in vanilla HTML, CSS, and JavaScript under a signed contractor agreement: shared component system, scroll reveals, an ambient canvas hero. Real client, real deadline, real invoice.",
    honest: "No framework because the job did not need one.",
    links: [["live", "https://intrsekt.com"]],
    tech: "HTML · CSS · JavaScript",
    stack: [
      ["html", "HTML"],
      ["css", "CSS"],
      ["js", "JavaScript"],
    ],
  },
];

export interface Experience {
  company: string;
  role: string;
  where: string;
  dates: string;
  highlight?: string;
  summary: string;
  real_story?: string;
  is_current?: boolean;
}

export const EXPERIENCE: Experience[] = [
  {
    company: "WellX AI",
    role: "Software Engineering Intern",
    where: "Dubai, remote",
    dates: "Dec 2025 – Mar 2026",
    highlight: "Production RAG serving 10,000+ users",
    summary:
      "Health tech startup, reported directly to the CTO. Built production RAG pipelines serving 10,000+ users over enterprise wearable data with Python, FastAPI, and vector search. Designed REST ingestion for Fitbit, Apple Watch, and WHOOP. Owned AI features from prompt design through offline evaluation, deployment, and monitoring.",
    real_story:
      "A chunk of the job was tracing an outsourced production stack, documenting what was actually running, and fixing the parts with no visibility. The real bottleneck was not building new things. It was understanding what was already there.",
    is_current: true,
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
      "Led BACnet integration on a real time HVAC simulation system: Python backend, React dashboard, historical weather playback so sponsor engineers could test behavior without touching live infrastructure. Coordinated weekly with the sponsor's team.",
  },
  {
    company: "SEERA Travel Group",
    role: "Frontend Web Development Intern",
    where: "Dubai, remote",
    dates: "Oct 2022 – Dec 2022",
    summary: "Built React UI components and customer facing booking flows on a travel platform.",
  },
];

export const PUBLICATION = {
  title: "OmniSch: A Multimodal PCB Schematic Benchmark For Structured Diagram Visual Reasoning",
  venue: "Accepted at ECCV 2026",
  arxiv: "arXiv:2604.00270",
  url: "https://arxiv.org/abs/2604.00270",
  advisor: "Advised by Prof. Mahanth Gowda, Penn State",
  contribution:
    "My contribution: the human annotation pipeline for 1,854 real world PCB schematics, about 109.9K labeled instances aligning 423.4K semantic labels to visual regions, plus the validity spec that kept annotators consistent.",
};

export const ARCHIVE: [string, string, string | null][] = [
  ["Gmail Recruitment Pipeline", "LLM classifier that turns recruiter email into structured pipeline state. I automated my own job search. Private repo.", null],
  ["AI Travel Planner", "LangChain agent with tool calls and a Ragas style offline eval harness measuring retrieval faithfulness.", "https://github.com/sharique2004/AITravelPlannar"],
  ["SkyPath", "Flight connection search with UTC normalization and layover window validation. React, Flask, Docker.", "https://github.com/sharique2004/skypath"],
  ["Multi Level Cache System", "L1/L2/L3 cache hierarchy simulator with MRU and LRU eviction and a benchmarking suite.", "https://github.com/sharique2004/Multi-Level-Cache-System-with-MRU-LRU-Eviction-Policies"],
  ["Pipelined MIPS Processor", "Five stage pipeline in Verilog with hazard detection and forwarding paths.", "https://github.com/sharique2004/Pipelined-MIPS-Processor-Datapath-Implementation"],
  ["Manual RSA Cryptosystem", "RSA from scratch in Python. Key generation, modular exponentiation, no crypto libraries.", "https://github.com/sharique2004/Manual-RSA-Cryptosystem-A-From-Scratch-Implementation-Without-External-Libraries"],
  ["Custom Parser", "Lexer, grammar, AST construction, scoping, and type checking for a small language.", "https://github.com/sharique2004/Parser"],
  ["Disk Read/Write", "Low level block I/O in C. Pairs with VaultCache.", "https://github.com/sharique2004/Disk-Read-Write"],
  ["Schedule Builder", "Java course planner with conflict detection.", "https://github.com/sharique2004/ScheduleBuilder"],
];

export const SKILLS: Record<string, string> = {
  "Applied AI": "Production RAG, agent harnesses and multi model routing, offline eval harnesses, prompt engineering, MCP servers, vector search (Pinecone, FAISS, Chroma, MongoDB), OpenAI, Anthropic, Cohere, local models via Ollama",
  Backend: "Python (primary), FastAPI, Flask, REST API design, PostgreSQL, MongoDB, C# .NET",
  Frontend: "TypeScript, JavaScript, React, Next.js, Tailwind, Swift and SwiftUI",
  Infra: "Docker, Azure DevOps CI/CD, GitHub Actions, Vercel, Linux, Git",
  "Systems & security": "C, AES-256, SHA-256, PBKDF2, block I/O, LRU caching, parameterized SQL, crash recovery journaling",
};
