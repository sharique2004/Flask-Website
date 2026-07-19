"""Single source of truth for shariquekhatri.com.

Every number in this file traces to the verified metrics ledger in the
personal vault. Nothing here is estimated, rounded up, or invented.
The same data renders the pages and grounds the /ask assistant.
"""

IDENTITY = {
    "name": "Sharique Khatri",
    "role": "Applied AI engineer",
    "line": "I like building things that real people depend on rather than demos.",
    "degree": "Bachelor of Science in Computer Science, minor in Cybersecurity",
    "school": "Penn State University",
    "graduated": "May 2026",
    "gpa": "3.60",
    "deans_list": "Dean's List all six semesters",
    "base": "San Francisco, CA",
    "open_to": "New York, Seattle, Dubai, and the Bay Area",
    "status": "Actively looking for Applied AI, Forward Deployed Engineer, and new grad SWE roles",
    "work_auth": (
        "US work authorization on OPT with STEM extension eligibility, "
        "about three years of runway with no sponsorship needed. "
        "UAE Golden Visa holder, so Dubai and Abu Dhabi need no sponsorship either."
    ),
}

LINKS = {
    "email": "sharique.khatri@gmail.com",
    "github": "https://github.com/sharique2004",
    "linkedin": "https://linkedin.com/in/sharique-khatri",
    "site": "https://shariquekhatri.com",
}

# ---------------------------------------------------------------------------
# Featured products. Each has its own page on this domain.
# ---------------------------------------------------------------------------

FEATURED = [
    {
        "slug": "donna",
        "name": "Donna",
        "page": "https://donna.shariquekhatri.com/",
        "repo": "https://github.com/sharique2004/Donna",
        "external": True,
        "wide": True,
        "award": "1st place · AI Supply Chain Hackathon 2026",
        "kicker": "hackathon winner · food banks + AI · live demo",
        "line": "Takes a supplier's surplus-food call and routes each pallet to a food bank. Built in a day, won first place.",
        "accent": "orange",
        "poster": "/static/donna-shot.jpg",
        "title_html": "A voice dispatcher for food bank donations.",
        "summary": (
            "A supplier calls in surplus food. Donna answers, transcribes the "
            "call, pulls out each item, and decides on the spot: perishables "
            "that spoil fast get dispatched straight to a food bank, shelf "
            "stable goods go into inventory. A human approves before anything "
            "is dispatched. Built in a day and won first place."
        ),
        "thesis": "The right call for a pallet of strawberries is not the right call for canned beans.",
        "tech": "Voice intake · live transcription · LLM triage · map dispatch",
        "stack": [
            ("mic", "Voice intake"),
            ("waveform", "Live transcription"),
            ("sparkles", "LLM triage"),
            ("map", "Map dispatch"),
        ],
    },
    {
        "slug": "bibi",
        "name": "Bibi",
        "page": "/bibi",
        "repo": "https://github.com/sharique2004/pc-assistant",
        "kicker": "local first voice agent · windows · MIT",
        "line": "Say its name and it opens apps, moves the real mouse, and reads your screen out loud.",
        "accent": "orange",
        "poster": "/static/bibi-poster.jpg",
        "title_html": "A voice agent that flies a real PC.",
        "summary": (
            "Say its name and it opens apps, moves the real mouse, reads the "
            "screen, and answers out loud. A custom agent loop routes each "
            "request across local models and Claude by task signal, cost, and latency."
        ),
        "thesis": "The agent loop matters more than the model.",
        "tech": "Python · Flask · Electron · faster-whisper · Ollama · Claude",
        "stack": [
            ("python", "Python"),
            ("flask", "Flask"),
            ("electron", "Electron"),
            ("waveform", "faster-whisper"),
            ("ollama", "Ollama"),
            ("claude", "Claude"),
        ],
    },
    {
        "slug": "scribe",
        "name": "MeetingScribe",
        "page": "/scribe",
        "repo": "https://github.com/sharique2004/MeetingScribe",
        "kicker": "on device meeting transcription · macOS · MIT",
        "line": "Records and transcribes your meetings entirely on your Mac. No bot joins, nothing leaves the device.",
        "accent": "cyan",
        "poster": "/static/scribe-shot.png",
        "title_html": "Your meetings, transcribed. Never uploaded.",
        "summary": (
            "No bot joins the call. It records both sides at the OS audio layer "
            "and transcribes a 45 minute call in roughly 90 seconds on the Apple "
            "Neural Engine. Everything stays as plain files on your Mac."
        ),
        "thesis": "Granola removed the bot from your meeting. MeetingScribe removes the cloud.",
        "tech": "Swift · CoreAudio · Apple Neural Engine · EventKit",
        "stack": [
            ("swift", "Swift"),
            ("audio", "CoreAudio"),
            ("chip", "Neural Engine"),
            ("calendar", "EventKit"),
        ],
    },
    {
        "slug": "aman",
        "name": "Aman UAE",
        "page": "https://dubai-news-tracker.vercel.app",
        "repo": None,
        "external": True,
        "kicker": "live news platform · LLM source verification",
        "line": "A real-time UAE news platform with LLM source verification. The launch reached 26,000+ impressions.",
        "accent": "cyan",
        "poster": None,
        "title_html": "Real time UAE news, verified by LLMs.",
        "summary": (
            "A real time UAE news platform with LLM based source verification. "
            "Built end to end with Claude Code in days, not weeks: Next.js, "
            "TypeScript, Tailwind, MCP server integrations. The launch post "
            "reached 26,000+ impressions on LinkedIn. Deployed through "
            "Vercel's Git integration; no custom CI pipeline, and it does "
            "not need one."
        ),
        "thesis": "Built end to end with Claude Code in days, not weeks.",
        "tech": "Next.js · TypeScript · MCP · Claude Code",
        "stack": [
            ("nextjs", "Next.js"),
            ("typescript", "TypeScript"),
            ("plug", "MCP"),
            ("terminal", "Claude Code"),
        ],
    },
]

# ---------------------------------------------------------------------------
# Case studies. on_paper / real_story is how Sharique actually pitches.
# ---------------------------------------------------------------------------

CASES = [
    {
        "name": "OmniSch",
        "kicker": "publication · accepted at ECCV 2026",
        "line": "I owned the human-annotation pipeline behind the benchmark: 1,854 schematics, about 109.9K labeled instances.",
        "on_paper": "Co author on a multimodal PCB schematic benchmark, arXiv:2604.00270.",
        "real_story": (
            "I owned the human annotation pipeline: 1,854 real world schematics, "
            "about 109.9K labeled instances aligning 423.4K semantic labels to "
            "visual regions. I wrote the validity spec and enforced annotator "
            "consistency. Benchmark numbers only mean something if the ground "
            "truth is consistent."
        ),
        "honest": "Mine: the annotation pipeline and its quality bar. Not mine: methodology design.",
        "links": [("paper", "https://arxiv.org/abs/2604.00270")],
        "tech": "Computer vision · VLM benchmarking · data quality",
        "stack": [
            ("eye", "Computer vision"),
            ("sparkles", "VLM benchmarking"),
            ("chart", "Data quality"),
        ],
    },
    {
        "name": "Taazify",
        "kicker": "iOS · the unglamorous fix",
        "on_paper": "A SwiftUI app that scans grocery receipts and tracks expiry.",
        "real_story": (
            "The vision model kept hallucinating on POS abbreviations like "
            "BNLS SKNLS CKN BRST. Rather than throw a bigger model at it, I "
            "traced the failure and built a ReceiptNormalizer that expands "
            "abbreviations deterministically before the model ever sees the "
            "input. The unglamorous fix was the right one."
        ),
        "honest": "Not on the App Store. A working system I use, not a shipped product.",
        "links": [("repo", "https://github.com/sharique2004/Taazify")],
        "tech": "SwiftUI · FastAPI · Qwen2-VL · PostgreSQL",
        "stack": [
            ("swift", "SwiftUI"),
            ("fastapi", "FastAPI"),
            ("chip", "Qwen2-VL"),
            ("postgres", "PostgreSQL"),
        ],
    },
    {
        "name": "VaultCache",
        "kicker": "systems · C",
        "on_paper": "An encrypted file system in C.",
        "real_story": (
            "AES-256 block encryption, SHA-256 integrity, PBKDF2 key derivation, "
            "crash recovery journaling, and a custom LRU cache that cut repeated "
            "file access latency 65%. I wanted to understand what actually "
            "happens at the block layer."
        ),
        "honest": "A learning build, and it taught me more about storage than any course did.",
        "links": [("repo", "https://github.com/sharique2004/vaultcache")],
        "tech": "C · AES-256 · block I/O · LRU caching",
        "stack": [
            ("c", "C"),
            ("lock", "AES-256"),
            ("drive", "Block I/O"),
            ("layers", "LRU cache"),
        ],
    },
    {
        "name": "Intrsekt",
        "kicker": "paid client work",
        "on_paper": "A marketing site for a consulting firm.",
        "real_story": (
            "Hand coded solo in vanilla HTML, CSS, and JavaScript under a signed "
            "contractor agreement: shared component system, scroll reveals, an "
            "ambient canvas hero. Real client, real deadline, real invoice."
        ),
        "honest": "No framework because the job did not need one.",
        "links": [("live", "https://intrsekt.com")],
        "tech": "HTML · CSS · JavaScript",
        "stack": [
            ("html", "HTML"),
            ("css", "CSS"),
            ("js", "JavaScript"),
        ],
    },
]

# ---------------------------------------------------------------------------
# Experience. Verified numbers only.
# ---------------------------------------------------------------------------

EXPERIENCE = [
    {
        "company": "WellX AI",
        "role": "Software Engineering Intern",
        "where": "Dubai, remote",
        "dates": "Dec 2025 – Mar 2026",
        "highlight": "Production RAG serving 10,000+ users",
        "summary": (
            "Health tech startup, reported directly to the CTO. Built production "
            "RAG pipelines serving 10,000+ users over enterprise wearable data "
            "with Python, FastAPI, and vector search. Designed REST ingestion "
            "for Fitbit, Apple Watch, and WHOOP. Owned AI features from prompt "
            "design through offline evaluation, deployment, and monitoring."
        ),
        "real_story": (
            "A chunk of the job was tracing an outsourced production stack, "
            "documenting what was actually running, and fixing the parts with "
            "no visibility. The real bottleneck was not building new things. "
            "It was understanding what was already there."
        ),
    },
    {
        "company": "Penn State ORIS",
        "role": "DevOps Intern",
        "where": "University Park, PA",
        "dates": "May 2025 – Aug 2025",
        "summary": (
            "Modernized legacy research IT services: migrated backends to C# "
            ".NET, wrote parameterized SQL to close injection holes, built CI/CD "
            "on Azure DevOps, containerized services with Docker. Delivered 11 "
            "backend enhancements and cut deployment time 40%."
        ),
        "real_story": None,
    },
    {
        "company": "Fourth Square",
        "role": "Software Engineering Intern",
        "where": "Texas, remote",
        "dates": "May 2024 – Aug 2024",
        "summary": (
            "Shipped a LangChain document Q&A and content generation system that "
            "handled 1,000+ production queries, integrating OpenAI and Cohere. "
            "Cut latency 40% with prompt chaining, chunking, and caching. Built "
            "a lightweight LLM eval harness and tuned outputs against direct "
            "researcher feedback."
        ),
        "real_story": None,
    },
    {
        "company": "HVAC Digital Twin",
        "role": "Capstone Team Lead",
        "where": "Penn State · sponsored by Automated Logic (Carrier)",
        "dates": "2025 – 2026",
        "summary": (
            "Led BACnet integration on a real time HVAC simulation system: "
            "Python backend, React dashboard, historical weather playback so "
            "sponsor engineers could test behavior without touching live "
            "infrastructure. Coordinated weekly with the sponsor's team."
        ),
        "real_story": None,
    },
    {
        "company": "SEERA Travel Group",
        "role": "Frontend Web Development Intern",
        "where": "Dubai, remote",
        "dates": "Oct 2022 – Dec 2022",
        "summary": (
            "Built React UI components and customer facing booking flows on a "
            "travel platform."
        ),
        "real_story": None,
    },
]

# ---------------------------------------------------------------------------
# Archive: one line each, everything linked.
# ---------------------------------------------------------------------------

ARCHIVE = [
    ("Gmail Recruitment Pipeline", "LLM classifier that turns recruiter email into structured pipeline state. I automated my own job search. Private repo.", None),
    ("AI Travel Planner", "LangChain agent with tool calls and a Ragas style offline eval harness measuring retrieval faithfulness.", "https://github.com/sharique2004/AITravelPlannar"),
    ("SkyPath", "Flight connection search with UTC normalization and layover window validation. React, Flask, Docker.", "https://github.com/sharique2004/skypath"),
    ("Multi Level Cache System", "L1/L2/L3 cache hierarchy simulator with MRU and LRU eviction and a benchmarking suite.", "https://github.com/sharique2004/Multi-Level-Cache-System-with-MRU-LRU-Eviction-Policies"),
    ("Pipelined MIPS Processor", "Five stage pipeline in Verilog with hazard detection and forwarding paths.", "https://github.com/sharique2004/Pipelined-MIPS-Processor-Datapath-Implementation"),
    ("Manual RSA Cryptosystem", "RSA from scratch in Python. Key generation, modular exponentiation, no crypto libraries.", "https://github.com/sharique2004/Manual-RSA-Cryptosystem-A-From-Scratch-Implementation-Without-External-Libraries"),
    ("Custom Parser", "Lexer, grammar, AST construction, scoping, and type checking for a small language.", "https://github.com/sharique2004/Parser"),
    ("Disk Read/Write", "Low level block I/O in C. Pairs with VaultCache.", "https://github.com/sharique2004/Disk-Read-Write"),
    ("Schedule Builder", "Java course planner with conflict detection.", "https://github.com/sharique2004/ScheduleBuilder"),
]

PUBLICATION = {
    "title": "OmniSch: A Multimodal PCB Schematic Benchmark For Structured Diagram Visual Reasoning",
    "venue": "Accepted at ECCV 2026",
    "arxiv": "arXiv:2604.00270",
    "url": "https://arxiv.org/abs/2604.00270",
    "advisor": "Advised by Prof. Mahanth Gowda, Penn State",
    "contribution": (
        "My contribution: the human annotation pipeline for 1,854 real world "
        "PCB schematics, about 109.9K labeled instances aligning 423.4K "
        "semantic labels to visual regions, plus the validity spec that kept "
        "annotators consistent."
    ),
}

# ABOUT and SKILLS feed only the assistant's fact sheet; nothing on the page
# renders them. Ask the agent.
ABOUT = [
    (
        "I grew up in the UAE and came to the US for Penn State, where I "
        "finished a Bachelor of Science in Computer Science with a "
        "Cybersecurity minor in May 2026. Dean's List all six semesters, "
        "GPA 3.60."
    ),
    (
        "I automate my own workflows. A Gmail pipeline classifies my recruiter "
        "email into application states. An Obsidian vault with standing AI "
        "instructions runs my job search. The assistant on this page is built "
        "the same way: grounded in a ledger of verified facts, because I would "
        "rather it say less than make something up."
    ),
    (
        "Work authorization, since it always comes up: OPT plus STEM extension "
        "means no sponsorship needed for about three years in the US. I also "
        "hold a UAE Golden Visa, so Dubai and Abu Dhabi need no sponsorship at "
        "all. I am targeting Applied AI and Forward Deployed Engineer roles at "
        "AI startups, and new grad SWE roles."
    ),
]

SKILLS = {
    "Applied AI": "Production RAG, agent harnesses and multi model routing, offline eval harnesses, prompt engineering, MCP servers, vector search (Pinecone, FAISS, Chroma, MongoDB), OpenAI, Anthropic, Cohere, local models via Ollama",
    "Backend": "Python (primary), FastAPI, Flask, REST API design, PostgreSQL, MongoDB, C# .NET",
    "Frontend": "TypeScript, JavaScript, React, Next.js, Tailwind, Swift and SwiftUI",
    "Infra": "Docker, Azure DevOps CI/CD, GitHub Actions, Vercel, Linux, Git",
    "Systems & security": "C, AES-256, SHA-256, PBKDF2, block I/O, LRU caching, parameterized SQL, crash recovery journaling",
}

# ---------------------------------------------------------------------------
# Assistant grounding. The persona is defined in assistant.py; this is the
# fact sheet it is allowed to draw from.
# ---------------------------------------------------------------------------


def _cases_text() -> str:
    parts = []
    for c in CASES:
        links = " ".join(f"{k}: {v}" for k, v in c["links"])
        parts.append(
            f"{c['name']} ({c['kicker']}). On paper: {c['on_paper']} "
            f"Real story: {c['real_story']} Honest scope: {c['honest']} "
            f"Stack: {c['tech']}. {links}"
        )
    return "\n".join(parts)


def _experience_text() -> str:
    parts = []
    for e in EXPERIENCE:
        extra = f" Real story: {e['real_story']}" if e["real_story"] else ""
        parts.append(
            f"{e['company']} | {e['role']} | {e['where']} | {e['dates']}. "
            f"{e['summary']}{extra}"
        )
    return "\n".join(parts)


def _featured_text() -> str:
    parts = []
    for f in FEATURED:
        page = f["page"]
        if page.startswith("/"):
            page = f"https://shariquekhatri.com{page}"
        repo = f" Repo: {f['repo']}" if f.get("repo") else ""
        parts.append(
            f"{f['name']} ({f['kicker']}). {f['summary']} Thesis: {f['thesis']} "
            f"Stack: {f['tech']}. Page: {page}.{repo}"
        )
    return "\n".join(parts)


def _archive_text() -> str:
    return "\n".join(f"{n}: {d} ({u})" for n, d, u in ARCHIVE)


PORTFOLIO_CONTEXT = f"""
IDENTITY
{IDENTITY['name']}. {IDENTITY['role']}. {IDENTITY['line']}
{IDENTITY['degree']}, {IDENTITY['school']}, graduated {IDENTITY['graduated']}. GPA {IDENTITY['gpa']}. {IDENTITY['deans_list']}.
Based in {IDENTITY['base']}. Open to {IDENTITY['open_to']}. {IDENTITY['status']}.
Work authorization: {IDENTITY['work_auth']}

CONTACT
Email: {LINKS['email']}
GitHub: {LINKS['github']}
LinkedIn: {LINKS['linkedin']}
Site: {LINKS['site']} (resume PDF at {LINKS['site']}/resume)

FEATURED PRODUCTS
{_featured_text()}

CASE STUDIES
{_cases_text()}

EXPERIENCE
{_experience_text()}

PUBLICATION
{PUBLICATION['title']}. {PUBLICATION['venue']} ({PUBLICATION['arxiv']}, {PUBLICATION['url']}). {PUBLICATION['advisor']}. {PUBLICATION['contribution']}

SKILLS
{chr(10).join(f"{k}: {v}" for k, v in SKILLS.items())}

ABOUT
{chr(10).join(ABOUT)}
""".strip()
