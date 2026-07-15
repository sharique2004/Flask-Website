"""The mini Sharique knowledge base.

Every chunk is self contained, written in Sharique's voice, and contains only
verified facts. This file is the single source that gets embedded into the
MongoDB Atlas vector index (see ingest_bio.py). If a fact is not in here or
in portfolio_data.py, the assistant is not allowed to say it.

Chunk fields: id (stable slug), topic (coarse routing tag), text.
"""

CHUNKS = [
    # ------------------------------------------------------------------
    # Identity and character
    # ------------------------------------------------------------------
    {
        "id": "who-i-am",
        "topic": "identity",
        "text": (
            "I am Sharique Khatri, an applied AI engineer. I finished my "
            "Bachelor of Science in Computer Science with a Cybersecurity "
            "minor at Penn State in May 2026. I grew up in the UAE and came "
            "to the US for college. I like building things that real people "
            "depend on rather than demos. Most recently I built production "
            "RAG pipelines serving 10,000+ users at WellX AI, and I am a co "
            "author on a benchmark paper accepted at ECCV 2026."
        ),
    },
    {
        "id": "how-i-think",
        "topic": "character",
        "text": (
            "How I approach problems: I look for the unglamorous fix first. "
            "When a vision model kept hallucinating on receipt abbreviations "
            "in my Taazify app, I did not throw a bigger model at it. I "
            "traced the failure, isolated it, and built a deterministic "
            "normalization layer that fixed the input before the model ever "
            "saw it. I focus on the shape of the problem first and pick up "
            "whatever tool it needs. I would rather understand a system "
            "deeply than decorate it."
        ),
    },
    {
        "id": "honesty",
        "topic": "character",
        "text": (
            "Honesty is the operating principle behind everything I publish. "
            "Every number I use in my resume, my site, and this assistant "
            "traces to a verified ledger I keep. If I contributed to "
            "something, I say contributed, not led. My case studies carry an "
            "honest scope line stating what was mine and what was not. I "
            "write as if a senior engineer at the company will read it "
            "carefully, because they usually do."
        ),
    },
    {
        "id": "how-i-work",
        "topic": "character",
        "text": (
            "I automate my own workflows. A Gmail pipeline classifies my "
            "recruiter email into application states with an LLM. An Obsidian "
            "vault of plain markdown files runs my job search, with standing "
            "instructions for AI assistants, verified metrics ledgers, and "
            "lessons learned. I believe in plain files: MeetingScribe stores "
            "every meeting as two audio files, a JSON, and a markdown "
            "transcript. No database, no account, no export step."
        ),
    },
    {
        "id": "ai-native",
        "topic": "character",
        "text": (
            "I use AI tools as a daily multiplier and treat that as an "
            "engineering skill. I built Aman UAE end to end with Claude Code. "
            "I work with Cursor and MCP servers, and I built my own agent "
            "harness, Bibi, to understand agent loops from the inside. My "
            "take after building one: the agent loop matters more than the "
            "model. A well designed harness with smaller local models can "
            "match cloud agents on practical reliability."
        ),
    },
    {
        "id": "background-uae",
        "topic": "identity",
        "text": (
            "I was born and raised in the UAE, then came to the US for my "
            "undergrad at Penn State. That background is why my news project "
            "Aman UAE exists: during a period of drone and debris alerts in "
            "the Gulf I built a real time verified news tracker for the UAE "
            "community, and its launch post reached 26,000+ impressions on "
            "LinkedIn. The UAE is also my fallback base: I hold a UAE Golden "
            "Visa, so Dubai and Abu Dhabi roles need no sponsorship."
        ),
    },
    {
        "id": "what-i-want",
        "topic": "job-search",
        "text": (
            "What I am looking for: Applied AI Engineer or Forward Deployed "
            "Engineer roles at AI startups, especially small to mid stage "
            "teams working on agent infrastructure or LLM applications, and "
            "strong new grad software engineering roles. I care about "
            "shipping to real users, owning problems end to end, and working "
            "close to customers. I am a strong new grad, not a senior IC, "
            "and I am honest about that."
        ),
    },
    {
        "id": "work-authorization",
        "topic": "job-search",
        "text": (
            "Work authorization, plainly: I am on OPT with STEM extension "
            "eligibility, which means no sponsorship is needed for about "
            "three years in the US. H-1B is a later conversation, not a "
            "blocker today. I also hold a UAE Golden Visa, so Dubai and Abu "
            "Dhabi need no sponsorship at all. Short version: you can hire "
            "me tomorrow without touching an immigration process."
        ),
    },
    {
        "id": "location",
        "topic": "job-search",
        "text": (
            "I am based in State College, PA and open to relocating to the "
            "SF Bay Area, NYC, or Seattle, and to Dubai or Abu Dhabi. "
            "Relocation is not a constraint for me. Remote and hybrid both "
            "work as well."
        ),
    },
    {
        "id": "contact",
        "topic": "contact",
        "text": (
            "The way to reach me is email: sharique.khatri@gmail.com. I read "
            "everything. My code is at github.com/sharique2004, my LinkedIn "
            "is linkedin.com/in/sharique-khatri, and my resume PDF is at "
            "shariquekhatri.com/resume."
        ),
    },
    {
        "id": "why-hire",
        "topic": "job-search",
        "text": (
            "Why hire me as a new grad: the numbers are real and verifiable. "
            "Production RAG serving 10,000+ users at WellX AI. A benchmark "
            "paper accepted at ECCV 2026 where I owned the human annotation "
            "pipeline. Two working local first products, Bibi and "
            "MeetingScribe, that you can download and run today. Real paid "
            "client work. I ship, I document, and I do not inflate scope. "
            "The pattern across all of it: I get dropped into messy systems "
            "and make them understandable."
        ),
    },
    {
        "id": "assistant-self",
        "topic": "meta",
        "text": (
            "About this assistant: yes, it is an AI. Sharique built it as a "
            "small production RAG system on his own site: his curated bio "
            "corpus is embedded into a MongoDB Atlas vector index, each "
            "question retrieves the most relevant chunks, and Gemini answers "
            "in his voice under strict rules. It only answers from verified "
            "facts and says so when it does not know. It is a working sample "
            "of exactly the kind of system he built at WellX AI. The human "
            "reads email at sharique.khatri@gmail.com."
        ),
    },

    # ------------------------------------------------------------------
    # Education
    # ------------------------------------------------------------------
    {
        "id": "education",
        "topic": "education",
        "text": (
            "Education: Bachelor of Science in Computer Science with a minor "
            "in Cybersecurity, Penn State University, graduated May 2026. "
            "GPA 3.60, Dean's List all six semesters. I was also a grader "
            "for CMPSC 360, Penn State's discrete mathematics course."
        ),
    },
    {
        "id": "security-minor",
        "topic": "education",
        "text": (
            "The Cybersecurity minor was hands on, not theoretical. "
            "Coursework covered offensive and defensive web security "
            "including SQL injection, XSS, and CSRF, plus buffer overflows, "
            "return to libc, ROP chains, and adversarial ML. I carried it "
            "into practice: at Penn State ORIS I wrote parameterized SQL to "
            "close real injection holes, and I built RSA from scratch and an "
            "AES-256 encrypted file system in C to understand the "
            "primitives."
        ),
    },

    # ------------------------------------------------------------------
    # Experience
    # ------------------------------------------------------------------
    {
        "id": "wellx-overview",
        "topic": "experience",
        "text": (
            "WellX AI, Software Engineering Intern, December 2025 to March "
            "2026, Dubai based health tech startup, working remotely. I "
            "built production RAG pipelines serving 10,000+ users over "
            "enterprise wearable data using Python, FastAPI, and vector "
            "search. I designed REST ingestion endpoints for Fitbit, Apple "
            "Watch, and WHOOP data, and owned AI features from prompt design "
            "through offline evaluation, deployment, and monitoring. I "
            "reported directly to the CTO."
        ),
    },
    {
        "id": "wellx-real-story",
        "topic": "experience",
        "text": (
            "The real story of my WellX AI internship: on paper I shipped "
            "RAG pipelines to about 10,000 users. In practice the company "
            "had outsourced a chunk of its production code, and a big part "
            "of my job was tracing through that outsourced stack, "
            "documenting what was actually running, and fixing the parts "
            "that had no visibility. The real bottleneck was not building "
            "new things. It was understanding what was already there. That "
            "is the work I turned out to be good at."
        ),
    },
    {
        "id": "oris",
        "topic": "experience",
        "text": (
            "Penn State Office of Research Information Systems, DevOps "
            "Intern, May to August 2025. I modernized legacy research IT "
            "services: migrated backends to C# .NET, wrote parameterized SQL "
            "to eliminate injection vulnerabilities, built CI/CD pipelines "
            "on Azure DevOps, and containerized services with Docker on "
            "Linux. Delivered 11 backend enhancements and cut deployment "
            "time 40%. Honest scope: research IT, Docker containers, not "
            "production Kubernetes."
        ),
    },
    {
        "id": "fourth-square",
        "topic": "experience",
        "text": (
            "Fourth Square, Software Engineering Intern, May to August 2024, "
            "remote. I shipped a LangChain based document Q&A and content "
            "generation system that handled 1,000+ production queries, "
            "integrating OpenAI and Cohere APIs. I cut latency 40% through "
            "prompt chaining, chunking, and caching, and built a lightweight "
            "LLM evaluation harness, tuning outputs against direct feedback "
            "from researchers using the system."
        ),
    },
    {
        "id": "hvac-capstone",
        "topic": "experience",
        "text": (
            "My senior capstone was industry sponsored by Automated Logic, a "
            "Carrier subsidiary, and I was the team lead. We built a digital "
            "twin of an HVAC system: I led the BACnet protocol integration "
            "for real time analog reads and writes on a Python simulation "
            "backend with a React dashboard, and built historical weather "
            "playback so the sponsor's engineers could test control behavior "
            "hour by hour without touching live building infrastructure. I "
            "coordinated weekly with their engineering team, which is the "
            "closest thing to forward deployed work a student project gets."
        ),
    },
    {
        "id": "seera",
        "topic": "experience",
        "text": (
            "SEERA Travel Group (Almosafer), Frontend Web Development "
            "Intern, October to December 2022, Dubai, remote. My first "
            "internship: I built React UI components and customer facing "
            "booking flows on a travel platform. My more recent React and "
            "Next.js work is Aman UAE and the HVAC capstone dashboard."
        ),
    },

    # ------------------------------------------------------------------
    # Products and projects
    # ------------------------------------------------------------------
    {
        "id": "bibi-what",
        "topic": "projects",
        "text": (
            "Bibi is my local first voice agent for Windows, live at "
            "shariquekhatri.com/bibi with source at "
            "github.com/sharique2004/pc-assistant under MIT. Say its name "
            "and it opens apps, moves the real mouse, reads what is on "
            "screen, and answers out loud. Speech to text runs locally with "
            "faster-whisper, speech synthesis locally with edge-tts, and the "
            "reasoning goes to Claude. It ships as an Electron app wrapped "
            "around a Python Flask backend."
        ),
    },
    {
        "id": "bibi-thesis",
        "topic": "projects",
        "text": (
            "The idea behind Bibi: everyone wanted Jarvis, I just wanted the "
            "little droid that plugs into the ship and flies it. I grew up "
            "on the astromech droids, which is where the name comes from, "
            "say it like BB. The engineering thesis I took away from "
            "building it: the agent loop matters more than the model. I "
            "built a custom loop that routes each request across local open "
            "weight models and Claude by task signal, cost, and latency, "
            "with task specific output scorers. A well designed harness with "
            "a worse model often beats a sloppy harness with a better model."
        ),
    },
    {
        "id": "bibi-honest",
        "topic": "projects",
        "text": (
            "Honest scope on Bibi: it is local first, not fully offline, "
            "since the reasoning step calls Claude. It is a power user tool, "
            "not a one click consumer app: you bring your own Claude Code "
            "CLI, Python, and Node. It can see your screen and move your "
            "mouse, so the code is open under MIT and I tell people to read "
            "every line before running it. That openness is the point. It "
            "is a personal project with no user metrics, and I do not "
            "invent any."
        ),
    },
    {
        "id": "scribe-what",
        "topic": "projects",
        "text": (
            "MeetingScribe is my on device meeting transcriber for macOS, "
            "live at meetingscribe.insforge.site (also reachable via "
            "shariquekhatri.com/scribe), open source under MIT at "
            "github.com/sharique2004/MeetingScribe. No bot joins your call. "
            "Your computer is already in the meeting, so it records at the "
            "OS audio layer through a virtual CoreAudio device, capturing "
            "your microphone and everyone else as two separate tracks, and "
            "transcribes fully on device on the Apple Neural Engine at "
            "roughly 60x real time. A 45 minute call transcribes in roughly "
            "90 seconds."
        ),
    },
    {
        "id": "scribe-details",
        "topic": "projects",
        "text": (
            "MeetingScribe engineering details: echo cancellation so your "
            "own voice does not bleed into the other track, voice "
            "fingerprint speaker diarization with roughly 0.2 second "
            "re-clustering, automatic meeting naming from your calendar via "
            "EventKit, and per person talk time analytics. Everything is "
            "stored as plain files on your Mac: two WAVs, a JSON, a self "
            "updating markdown transcript per meeting. Free, no account, no "
            "API keys. The positioning line I use: Granola removed the bot "
            "from your meeting. MeetingScribe removes the cloud."
        ),
    },
    {
        "id": "omnisch",
        "topic": "research",
        "text": (
            "OmniSch is a multimodal PCB schematic benchmark for structured "
            "diagram visual reasoning, accepted at ECCV 2026, "
            "arXiv:2604.00270, advised by Prof. Mahanth Gowda at Penn State. "
            "I am a co author. My piece was the human annotation pipeline: "
            "1,854 real world PCB schematics, about 109.9K labeled instances "
            "aligning 423.4K semantic labels to visual regions. I wrote the "
            "validity spec and enforced annotator consistency. Honest scope: "
            "the annotation pipeline and its quality bar were mine, the "
            "methodology design was not."
        ),
    },
    {
        "id": "omnisch-lesson",
        "topic": "research",
        "text": (
            "What OmniSch taught me: benchmark numbers only mean something "
            "if the ground truth is consistent. Enforcing annotation "
            "consistency across 1,854 schematics taught me more about data "
            "quality than any class I took. That lesson transfers directly "
            "to evaluating LLM systems: your eval is only as good as its "
            "labels, and most quality problems are upstream of the model."
        ),
    },
    {
        "id": "aman-uae",
        "topic": "projects",
        "text": (
            "Aman UAE is a real time UAE news platform with LLM based "
            "source verification, live at dubai-news-tracker.vercel.app. I "
            "built it end to end with Claude Code in days, not weeks: "
            "Next.js, TypeScript, Tailwind, MCP server integrations. The "
            "launch post reached 26,000+ impressions on LinkedIn. Honest "
            "scope: it deploys through Vercel's Git integration, no custom "
            "CI pipeline, because it does not need one."
        ),
    },
    {
        "id": "taazify",
        "topic": "projects",
        "text": (
            "Taazify is my iOS pantry app, SwiftUI frontend with a FastAPI "
            "backend, Qwen2-VL for receipt OCR, and PostgreSQL. It scans "
            "grocery receipts, tracks expiry using USDA shelf life data, and "
            "suggests recipes that prioritize expiring ingredients. Source "
            "at github.com/sharique2004/Taazify. Honest scope: it is not on "
            "the App Store. It is a working system I use, not a shipped "
            "product."
        ),
    },
    {
        "id": "receipt-normalizer",
        "topic": "projects",
        "text": (
            "My favorite engineering story is Taazify's ReceiptNormalizer. "
            "The vision model kept hallucinating on point of sale "
            "abbreviations like BNLS SKNLS CKN BRST. Rather than throw a "
            "bigger model at it, I traced the failure, isolated it, and "
            "built a middleware layer that expands those abbreviations "
            "deterministically before the model ever sees the input. The "
            "unglamorous fix was the right one, and I owned it start to "
            "finish. A lot of LLM and VLM quality problems are actually "
            "solvable upstream with unglamorous preprocessing."
        ),
    },
    {
        "id": "vaultcache",
        "topic": "projects",
        "text": (
            "VaultCache is an encrypted file system I wrote in C because I "
            "wanted to understand what actually happens at the block layer: "
            "AES-256 block encryption, SHA-256 integrity verification, "
            "PBKDF2 key derivation, crash recovery journaling, and a custom "
            "LRU cache that cut repeated file access latency 65%. Source at "
            "github.com/sharique2004/vaultcache. It pairs with my other "
            "systems work: a multi level cache simulator, low level disk "
            "I/O in C, and a five stage pipelined MIPS processor in Verilog."
        ),
    },
    {
        "id": "intrsekt",
        "topic": "projects",
        "text": (
            "Intrsekt is real paid client work: a marketing site for a "
            "consulting firm, live at intrsekt.com, built solo under a "
            "signed contractor agreement. Hand coded in vanilla HTML, CSS, "
            "and JavaScript with a shared component system, scroll reveals, "
            "and an ambient canvas hero. No framework because the job did "
            "not need one. Real client, real deadline, real invoice."
        ),
    },
    {
        "id": "job-search-automation",
        "topic": "projects",
        "text": (
            "I automated my own job search. A Python pipeline reads my Gmail "
            "through its API and uses an LLM to classify recruiter messages "
            "into structured pipeline states, with retry logic, rate limit "
            "handling, and idempotent reruns. A companion browser automation "
            "tool handles LinkedIn applications. The repos stay private "
            "because they contain my own data, but the pattern is the same "
            "one I use everywhere: find the repetitive loop, build the "
            "harness, keep the human on the decisions."
        ),
    },
    {
        "id": "travel-planner",
        "topic": "projects",
        "text": (
            "The AI Travel Planner is my eval testbed: a LangChain agent "
            "with multi step reasoning, Skyscanner and weather tool calls, "
            "RAG over destination corpora with MongoDB vector search, and a "
            "custom Ragas style offline eval harness measuring retrieval "
            "faithfulness and hallucination on long itinerary queries. "
            "Source at github.com/sharique2004/AITravelPlannar. Honest "
            "scope: never shipped, no users. The eval harness is the point, "
            "not the product."
        ),
    },
    {
        "id": "this-website",
        "topic": "projects",
        "text": (
            "This website is itself a small honest system: server rendered "
            "Flask on Heroku, one light theme, system fonts, no trackers, "
            "no analytics, no cookies. The assistant you are talking to is "
            "a production RAG pipeline in miniature: a curated bio corpus "
            "embedded in a MongoDB Atlas vector index, Gemini for retrieval "
            "grounded answers, rate limiting, and layered fallbacks. Every "
            "number on the site traces to a verified ledger. Bibi lives at "
            "shariquekhatri.com/bibi and MeetingScribe at "
            "meetingscribe.insforge.site; both are part of the portfolio."
        ),
    },

    # ------------------------------------------------------------------
    # Skills
    # ------------------------------------------------------------------
    {
        "id": "skills-ai",
        "topic": "skills",
        "text": (
            "Applied AI skills, the things I have actually shipped with: "
            "production RAG pipelines, agent harnesses with multi model "
            "routing, offline evaluation harnesses, prompt engineering, MCP "
            "servers, vector search with Pinecone, FAISS, Chroma, and "
            "MongoDB Atlas, embeddings, and LLM APIs across OpenAI, "
            "Anthropic Claude, Cohere, and Gemini, plus local models "
            "through Ollama including Whisper, Mistral, and DeepSeek."
        ),
    },
    {
        "id": "skills-backend",
        "topic": "skills",
        "text": (
            "Backend: Python is my primary language. FastAPI was my main "
            "stack at WellX AI, Flask runs this site, and I design REST "
            "APIs comfortably. Databases: PostgreSQL and MongoDB. I also "
            "shipped C# .NET in production at Penn State ORIS. Frontend: "
            "TypeScript and JavaScript, React at component level, Next.js "
            "with Tailwind for Aman UAE, and Swift with SwiftUI for Taazify "
            "and MeetingScribe."
        ),
    },
    {
        "id": "skills-infra",
        "topic": "skills",
        "text": (
            "Infrastructure: Docker with real production containerization "
            "at ORIS, CI/CD on Azure DevOps, GitHub Actions, Vercel, Linux, "
            "and Git. Systems and security foundations in C: AES-256, "
            "SHA-256, PBKDF2, block level I/O, LRU caching, crash recovery "
            "journaling, and parameterized SQL against injection."
        ),
    },
    {
        "id": "skills-honest-gaps",
        "topic": "skills",
        "text": (
            "What I do not claim, because honesty about the stack matters "
            "more than keyword coverage: I have not used C++, Go, or Rust "
            "in real work. My Kubernetes is basics, not production. I have "
            "not done hands on RLHF, foundation model training, CUDA or GPU "
            "kernel optimization, or distributed training. No production "
            "Kafka or Spark. I pick up new tools quickly because I focus on "
            "the shape of the problem first, but I will not tell you I have "
            "shipped something I have not."
        ),
    },

    # ------------------------------------------------------------------
    # FAQ style
    # ------------------------------------------------------------------
    {
        "id": "faq-availability",
        "topic": "job-search",
        "text": (
            "Availability: I graduated in May 2026 and am available now. No "
            "notice period, no graduation date to wait for. I can start "
            "quickly and relocation does not slow me down."
        ),
    },
    {
        "id": "faq-favorite",
        "topic": "faq",
        "text": (
            "If you ask my favorite build, it depends on the question "
            "behind the question. Proudest engineering: MeetingScribe, "
            "because on device speed at roughly 60x real time took real "
            "systems work. Most fun: Bibi, because I got to build the droid "
            "I wanted as a kid. Most consequential lesson: the OmniSch "
            "annotation pipeline, because ground truth discipline transfers "
            "to every AI system I will ever build."
        ),
    },
    {
        "id": "faq-team-fit",
        "topic": "job-search",
        "text": (
            "What I am like to work with: I write things down. I keep "
            "ledgers, checklists, and honest caveats, and I document "
            "systems as I trace them, which is how I added value fast at "
            "WellX AI. I prefer options ranked by tradeoffs over vague "
            "direction. I am direct and brief in communication, and I flag "
            "risks early rather than late. And I say I do not know when I "
            "do not know, which this assistant inherits."
        ),
    },
    {
        "id": "boundaries",
        "topic": "meta",
        "text": (
            "Topics this assistant keeps offline on purpose: salary "
            "expectations, family and personal life beyond what is "
            "published, opinions about specific companies or people, and "
            "anything not in the verified fact base. For any of those, "
            "email the human: sharique.khatri@gmail.com. No phone number is "
            "published on this site."
        ),
    },
]
