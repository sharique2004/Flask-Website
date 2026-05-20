/* ============================================================
   sk/os — portfolio data (from portfolio_data.py)
============================================================ */

const EXPERIENCE = [
  {
    role: "Software Engineering Intern",
    org: "WellX AI",
    loc: "Remote",
    date: { from: "Dec 2025", to: "Mar 2026" },
    current: false,
    bullets: [
      "Built backend ingestion for wearable data from Fitbit, Apple Watch & WHOOP.",
      "Shipped idempotent challenge & reward logic for 10,000+ users to reduce race-condition risk.",
      "Contributed to data contracts and feature flag experiments for health goals.",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL", "REST", "Pipelines"],
  },
  {
    role: "DevOps Intern",
    org: "Penn State ORIS",
    loc: "University Park, PA",
    date: { from: "Jun 2025", to: "Aug 2025" },
    bullets: [
      "Modernized Research Accounting Navigator into a C#/.NET architecture.",
      "Delivered 11 user stories across 4 Scrum sprints; replaced inline SQL with parameterized queries.",
      "Contributed to CI/CD that cut deploy time by ~40%.",
    ],
    tags: ["C# .NET", "Azure DevOps", "CI/CD", "SQL", "Scrum"],
  },
  {
    role: "Data Science Intern",
    org: "Fourth Square",
    loc: "Texas, USA",
    date: { from: "Jun 2024", to: "Aug 2024" },
    bullets: [
      "Built cloud-backed AI apps on Azure — RAG flows, prompt chaining, document QA.",
      "Stood up retrieval pipelines with LangChain, Cohere & OpenAI across 1,000+ doc queries.",
      "Supported 5 services with autoscaling and basic monitoring.",
    ],
    tags: ["Azure", "LangChain", "RAG", "Cohere", "OpenAI", "Python"],
  },
  {
    role: "Computer Science Grader",
    org: "Penn State (CMPSC 360)",
    loc: "University Park, PA",
    date: { from: "Aug 2024", to: "Jan 2025" },
    bullets: [
      "Graded 20–100 student assignments weekly; co-authored rubrics with faculty.",
      "Proctored midterms and finals; provided detailed code-review feedback.",
    ],
    tags: ["CS Education", "Code Review", "Mentoring"],
  },
  {
    role: "Student Lead & Scheduler",
    org: "Starbucks",
    loc: "University Park, PA",
    date: { from: "Jun 2023", to: "May 2024" },
    bullets: [
      "Coordinated schedules for 15+ student staff against academic calendars.",
      "Trained new hires from first shift to floor-ready; led a 4–5 person team.",
    ],
    tags: ["Workforce", "Ops", "Comms"],
  },
  {
    role: "Front-End Engineering Intern",
    org: "Seera Travel Group",
    loc: "Dubai, UAE",
    date: { from: "Oct 2022", to: "Dec 2022" },
    bullets: [
      "Shipped 15+ responsive pages for a travel booking flow.",
      "Applied WCAG patterns; reduced integration handoff time ~30%.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "A11y"],
  },
];

const PROJECTS = [
  {
    name: "SkyPath",
    cat: "Full-Stack",
    url: "https://github.com/sharique2004/skypath",
    summary: "Flight connection search engine — direct, one-stop, two-stop itineraries across ~260 flights, 25 airports. UTC-normalized layovers, Docker Compose.",
    tech: ["React", "Flask", "Python", "Docker", "Algorithms"],
    updated: "Apr 2026",
  },
  {
    name: "Taazify",
    cat: "Mobile",
    url: "https://github.com/sharique2004/Taazify",
    summary: "SwiftUI pantry & grocery assistant — receipt OCR, shelf-life estimation, recipe gen. Native tabbed iOS with a local Python OCR service.",
    tech: ["Swift", "SwiftUI", "Vision OCR", "Python"],
    updated: "Feb 2026",
  },
  {
    name: "AI Travel Planner",
    cat: "AI",
    url: "https://github.com/sharique2004/AITravelPlannar",
    summary: "Full-stack travel assistant that pulls Skyscanner + weather data to generate personalized itineraries across 50+ destinations.",
    tech: ["LangChain", "React", "Node.js", "MongoDB", "RAG"],
    updated: "Feb 2026",
  },
  {
    name: "VaultCache",
    cat: "Systems",
    url: "https://github.com/sharique2004/vaultcache",
    summary: "Encrypted filesystem-style storage in C — AES-256, SHA-256 integrity, PBKDF2 keys, LRU caching, journaling, Python bindings.",
    tech: ["C", "AES-256", "LRU", "Systems", "Python"],
    updated: "Jan 2026",
  },
  {
    name: "GreenTrack Expo",
    cat: "Mobile",
    url: "https://github.com/sharique2004/GreenTrackExpo",
    summary: "Sustainability dashboard — carbon footprint, weekly challenges, leaderboards. EPA-style emission factors + gamification in React Native.",
    tech: ["React Native", "Firebase", "D3.js", "Data Viz"],
    updated: "Jan 2026",
  },
  {
    name: "Personal Work Tracker",
    cat: "Full-Stack",
    url: "https://github.com/sharique2004/personal-work-tracker",
    summary: "Projects/issues/habits app — Vite + React frontend, Express + Prisma backend over SQLite. Streaks, priorities, due dates, epics.",
    tech: ["React", "Vite", "Express", "Prisma", "SQLite"],
    updated: "Jan 2026",
  },
  {
    name: "AmanUAE",
    cat: "Full-Stack",
    url: "https://dubai-news-tracker.vercel.app",
    summary: "Real-time UAE safety alert platform — curated drone/debris/threat updates designed for fast WhatsApp sharing during live events.",
    tech: ["React", "Vercel", "News Curation"],
    updated: "2025",
  },
  {
    name: "Gmail Recruitment Pipeline",
    cat: "Automation",
    url: "https://github.com/sharique2004",
    summary: "Automated Gmail classifier that buckets recruiter mail into rejection / interview / follow-up across 50+ active applications.",
    tech: ["Gmail API", "Python", "NLP"],
    updated: "2025",
  },
  {
    name: "Bibi",
    cat: "AI",
    url: "https://github.com/sharique2004/pc-assistant",
    summary: "Fully-local voice AI for Windows 11 — Whisper STT + Ollama (Mistral / Qwen-Coder) for intent and code-gen, 100% offline at runtime. Opens apps, generates mini-apps, reports live system state. Three-agent architecture (Claude · ChatGPT · Gemini) handed off through a shared API contract.",
    tech: ["Whisper", "Ollama", "Flask", "React", "Vite", "Windows"],
    updated: "May 2026",
  },
  {
    name: "Interactive Portfolio + AI",
    cat: "AI",
    url: "https://github.com/sharique2004/Flask-Website",
    summary: "This portfolio's predecessor — a workstation-style interactive site with a Gemini-backed assistant and graceful local fallback.",
    tech: ["Flask", "Gemini API", "JS", "CSS"],
    updated: "May 2026",
  },
];

const RESEARCH = [
  {
    title: "OmniSch — Multimodal PCB Schematic Benchmark",
    cat: "arXiv · Computer Vision",
    desc: "Co-authored arXiv paper on a structured-diagram benchmark for VLM reasoning over engineering schematics. Contributed dataset & evaluation framework.",
    tags: ["Multimodal AI", "VLMs", "CV", "Benchmarking"],
    url: "https://arxiv.org/abs/2604.00270",
    cite: "arXiv:2604.00270",
  },
  {
    title: "Digital Twin HVAC Simulation",
    cat: "Capstone · Automated Logic",
    desc: "Penn State Learning Factory capstone integrating BACnet into a Python HVAC simulation. Real-time analog reads/writes + historical weather playback through a React dashboard.",
    tags: ["BACnet", "Python", "React", "Real-Time"],
    cite: "PSU LF · 2026",
  },
  {
    title: "Pipelined MIPS Processor",
    cat: "Computer Architecture",
    desc: "Verilog implementation of a five-stage pipelined MIPS datapath with hazard detection and forwarding. IF/ID/EX/MEM/WB.",
    tags: ["Verilog", "MIPS", "Pipelining"],
    url: "https://github.com/sharique2004/Pipelined-MIPS-Processor-Datapath-Implementation",
    cite: "CMPSC 311",
  },
  {
    title: "Multi-Level Cache Simulator",
    cat: "Systems",
    desc: "L1/L2/L3 cache hierarchy simulator — configurable associativity, replacement policies (LRU/MRU), and write strategies. Performance tradeoff study.",
    tags: ["Python", "Memory Hierarchy", "LRU"],
    url: "https://github.com/sharique2004/Multi-Level-Cache-System-with-MRU-LRU-Eviction-Policies",
    cite: "CMPSC 472",
  },
  {
    title: "Manual RSA Cryptosystem",
    cat: "Security · Cryptography",
    desc: "RSA from scratch — key generation, modular exponentiation, prime selection, encrypt/decrypt — no external crypto libraries.",
    tags: ["Cryptography", "Number Theory"],
    url: "https://github.com/sharique2004/Manual-RSA-Cryptosystem-A-From-Scratch-Implementation-Without-External-Libraries",
    cite: "CMPSC 443",
  },
  {
    title: "CMPSC 443 Security Lab",
    cat: "Web Security",
    desc: "Hands-on offense + defense for SQL injection, XSS, CSRF — also covers buffer overflows, return-to-libc, ROP chains, adversarial ML.",
    tags: ["SQLi", "XSS", "CSRF", "ROP"],
    cite: "CMPSC 443",
  },
  {
    title: "Custom Compiler Frontend",
    cat: "PL · Compilers",
    desc: "Lexical analysis, recursive-descent parser, AST construction, scope handling, type-checking — for a small language-like input.",
    tags: ["Compilers", "AST", "Type Checking"],
    url: "https://github.com/sharique2004/Parser",
    cite: "CMPSC 461",
  },
];

const PROJECT_CATS = ["All", "Full-Stack", "AI", "Mobile", "Systems", "Automation"];

const SKILLS = {
  Languages: [
    { name: "Python",      lvl: "daily" },
    { name: "JavaScript",  lvl: "daily" },
    { name: "TypeScript",  lvl: "fluent" },
    { name: "C",           lvl: "fluent" },
    { name: "C#",          lvl: "fluent" },
    { name: "Java",        lvl: "fluent" },
    { name: "Swift",       lvl: "coursework" },
    { name: "SQL",         lvl: "daily" },
    { name: "HTML / CSS",  lvl: "daily" },
  ],
  "AI / ML": [
    { name: "LangChain",   lvl: "daily" },
    { name: "RAG",         lvl: "daily" },
    { name: "OpenAI API",  lvl: "daily" },
    { name: "Gemini API",  lvl: "fluent" },
    { name: "Cohere",      lvl: "fluent" },
    { name: "Ollama",      lvl: "fluent" },
    { name: "Whisper",     lvl: "fluent" },
    { name: "Local LLMs",  lvl: "fluent" },
    { name: "VLM Bench",   lvl: "research" },
    { name: "TensorFlow",  lvl: "coursework" },
  ],
  "Backend & API": [
    { name: "FastAPI",     lvl: "daily" },
    { name: "Flask",       lvl: "fluent" },
    { name: "Node + Express", lvl: "fluent" },
    { name: "REST",        lvl: "daily" },
    { name: "BACnet",      lvl: "research" },
    { name: "WebSockets",  lvl: "fluent" },
  ],
  "Frontend": [
    { name: "React",       lvl: "daily" },
    { name: "Next.js",     lvl: "fluent" },
    { name: "React Native", lvl: "fluent" },
    { name: "Vite",        lvl: "daily" },
    { name: "D3.js",       lvl: "fluent" },
    { name: "Three.js",    lvl: "fluent" },
    { name: "WCAG",        lvl: "fluent" },
  ],
  "Cloud & DevOps": [
    { name: "Azure",       lvl: "fluent" },
    { name: "AWS",         lvl: "fluent" },
    { name: "GCP",         lvl: "fluent" },
    { name: "Docker",      lvl: "daily" },
    { name: "Kubernetes",  lvl: "fluent" },
    { name: "CI/CD",       lvl: "daily" },
    { name: "Vercel",      lvl: "daily" },
  ],
  "Data & Storage": [
    { name: "PostgreSQL",  lvl: "fluent" },
    { name: "MongoDB",     lvl: "fluent" },
    { name: "Firebase",    lvl: "fluent" },
    { name: "Prisma",      lvl: "fluent" },
    { name: "Vector search", lvl: "daily" },
    { name: "Looker",      lvl: "coursework" },
  ],
  "Security & Systems": [
    { name: "AES-256",     lvl: "fluent" },
    { name: "SHA-256",     lvl: "fluent" },
    { name: "PBKDF2",      lvl: "fluent" },
    { name: "RSA",         lvl: "fluent" },
    { name: "XSS / CSRF",  lvl: "fluent" },
    { name: "ROP Chains",  lvl: "coursework" },
    { name: "Memory Hierarchy", lvl: "coursework" },
  ],
};

const PROFILE = {
  name: "Sharique Khatri",
  handle: "sharique2004",
  bio: "Senior CS at Penn State '26 with a Cybersecurity minor. I build backend systems, AI tooling, and the occasional security lab. Currently open to summer '26 and new-grad SWE roles.",
  stats: [
    { k: "based in",   v: "University Park, PA" },
    { k: "from",       v: "Dubai, UAE" },
    { k: "graduating", v: "May 2026" },
    { k: "looking",    v: "summer '26 / new grad" },
  ],
};

const EDUCATION = [
  {
    school: "The Pennsylvania State University",
    deg: "B.S. Computer Science · Cybersecurity Minor",
    rows: [
      { k: "expected",   v: "May 2026" },
      { k: "GPA",        v: "3.6 / 4.0" },
      { k: "campus",     v: "University Park" },
    ],
    badges: ["Dean's List · F23", "S24", "F24", "S25", "F25"],
  },
  {
    school: "GEMS New Millennium School",
    deg: "High School Diploma",
    rows: [
      { k: "graduated", v: "May 2022" },
      { k: "GPA",       v: "3.8 / 4.0" },
      { k: "campus",    v: "Dubai, UAE" },
    ],
    badges: ["Red House Captain", "Head of Comms", "CS50 AI"],
  },
];

window.SKDATA = { EXPERIENCE, PROJECTS, RESEARCH, PROJECT_CATS, SKILLS, PROFILE, EDUCATION };
