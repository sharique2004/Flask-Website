"""
Populate MongoDB Atlas with bio + experience + project context for the
RAG assistant on Sharique's portfolio.

Usage:
    python populate_mongo.py            # append docs to bio_index
    python populate_mongo.py --reset    # drop bio_index docs first, then add

Requires: COHERE_API_KEY, ATLAS_CONNECTION_STRING in .env
"""
import argparse
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from langchain_cohere.embeddings import CohereEmbeddings
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_core.documents import Document

load_dotenv()


# ============================================================
# KNOWLEDGE BASE
# Each doc is a focused chunk so vector search returns precise hits.
# Keep chunks ~150-400 tokens and topical (one subject per doc).
# ============================================================

DOCUMENTS = [
    # ─────────── IDENTITY / PROFILE ───────────
    Document(
        page_content=(
            "Sharique Khatri is a senior Computer Science student at the Pennsylvania "
            "State University (University Park), graduating in May 2026. He is "
            "pursuing a Cybersecurity minor alongside his CS degree, and carries a "
            "3.6 / 4.0 GPA. He was born and raised in Dubai, UAE, and now lives in "
            "University Park, Pennsylvania. He goes by 'Sharique' (pronounced "
            "Sha-reek), and his handle online is @sharique2004."
        ),
        metadata={"category": "profile", "topic": "identity"},
    ),
    Document(
        page_content=(
            "Sharique builds backend systems, AI tooling, and the occasional "
            "security lab. He is most fluent in Python and JavaScript, and likes "
            "working at the intersection of distributed systems, retrieval / RAG, "
            "and pragmatic full-stack apps. His track record spans health-tech, "
            "enterprise modernization, applied AI consulting, education, and "
            "front-end engineering — four internships across three countries "
            "before his senior year."
        ),
        metadata={"category": "profile", "topic": "self-summary"},
    ),
    Document(
        page_content=(
            "Sharique is actively looking for Summer 2026 internships and "
            "new-graduate Software Engineer roles starting after his May 2026 "
            "graduation. He is open to backend, AI / ML platform, infrastructure, "
            "developer tools, and security-adjacent roles. Strong interest in "
            "companies doing real LLM tooling, agent systems, or systems-level "
            "infrastructure. Currently available to relocate. Best way to reach "
            "him is sharique@psu.edu."
        ),
        metadata={"category": "availability", "topic": "looking-for"},
    ),
    Document(
        page_content=(
            "Sharique's approach to building: he favours clean APIs, idempotent "
            "operations, observability from day one, and writing code that he or "
            "the next engineer can come back to in six months without dread. He's "
            "comfortable as the most junior person in a room of senior engineers "
            "and as the senior voice on a student team. He has shipped code in "
            "production environments touching 10,000+ end users (WellX AI) and "
            "graded peers' code in CMPSC 360 — so he has been on both sides of the "
            "code review."
        ),
        metadata={"category": "profile", "topic": "approach"},
    ),

    # ─────────── EXPERIENCE — WellX AI ───────────
    Document(
        page_content=(
            "Software Engineering Intern at WellX AI (December 2025 – March 2026, "
            "Remote). WellX is a digital health platform integrating real-time "
            "data from wearable devices including Fitbit, Apple Watch, and WHOOP. "
            "Sharique built backend ingestion pipelines for wearable data and "
            "shipped idempotent challenge and reward logic for over 10,000 users — "
            "specifically designed to eliminate race-condition risk under "
            "concurrent writes. He also contributed to data contracts and feature "
            "flag experiments for health goal definitions. Tech stack: Python, "
            "FastAPI, PostgreSQL, REST APIs, data pipelines. This was his most "
            "recent role before senior spring."
        ),
        metadata={"category": "experience", "company": "WellX AI", "role": "SWE Intern", "year": "2025-2026"},
    ),

    # ─────────── EXPERIENCE — Penn State ORIS ───────────
    Document(
        page_content=(
            "DevOps Intern at Penn State Office of Research Information Systems "
            "(ORIS), June – August 2025, University Park, PA. Sharique helped "
            "modernize the Research Accounting Navigator into a C# / .NET "
            "architecture. He delivered 11 user stories across 4 Scrum sprints, "
            "replaced inline SQL with parameterized queries (closing injection "
            "vectors), and contributed to CI/CD improvements on Azure DevOps that "
            "cut deploy time by approximately 40%. Tech stack: C#, .NET, Azure "
            "DevOps, SQL Server, Scrum / Agile."
        ),
        metadata={"category": "experience", "company": "Penn State ORIS", "role": "DevOps Intern", "year": "2025"},
    ),

    # ─────────── EXPERIENCE — Fourth Square ───────────
    Document(
        page_content=(
            "Data Science Intern at Fourth Square (June – August 2024, Texas, "
            "USA). Fourth Square is an AI consultancy. Sharique built cloud-backed "
            "AI applications on Microsoft Azure — RAG flows, prompt chaining, and "
            "document QA systems. He stood up retrieval pipelines using "
            "LangChain, Cohere, and OpenAI across more than 1,000 document "
            "queries. He also supported 5 production services with autoscaling "
            "and basic monitoring. This is where his hands-on RAG and LangChain "
            "experience began."
        ),
        metadata={"category": "experience", "company": "Fourth Square", "role": "Data Science Intern", "year": "2024"},
    ),

    # ─────────── EXPERIENCE — CMPSC 360 Grader ───────────
    Document(
        page_content=(
            "Computer Science Grader at Penn State, CMPSC 360 (Discrete Math for "
            "CS), August 2024 – January 2025. Sharique graded between 20 and 100 "
            "student assignments weekly, co-authored rubrics with faculty, "
            "proctored midterms and finals, and provided detailed code-review "
            "feedback. The role sharpened his ability to read unfamiliar code "
            "quickly and give actionable, kind feedback."
        ),
        metadata={"category": "experience", "company": "Penn State", "role": "CS Grader", "year": "2024-2025"},
    ),

    # ─────────── EXPERIENCE — Starbucks ───────────
    Document(
        page_content=(
            "Student Lead and Scheduler at Starbucks, Penn State campus, June "
            "2023 – May 2024. Sharique coordinated schedules for 15+ student "
            "staff against academic calendars, trained new hires from first shift "
            "to floor-ready, and led a 4–5 person team during peak hours. Not a "
            "tech role, but a real test of ops, comms, and leading peers — useful "
            "context for understanding how he handles team responsibility."
        ),
        metadata={"category": "experience", "company": "Starbucks", "role": "Student Lead", "year": "2023-2024"},
    ),

    # ─────────── EXPERIENCE — Seera Travel Group ───────────
    Document(
        page_content=(
            "Front-End Engineering Intern at Seera Travel Group, October – "
            "December 2022, Dubai, UAE. Seera is one of the largest travel "
            "conglomerates in the Middle East. Sharique shipped 15+ responsive "
            "pages for the travel booking flow, applied WCAG accessibility "
            "patterns, and reduced integration handoff time to the back-end team "
            "by roughly 30%. Tech: HTML, CSS, JavaScript, accessibility. This was "
            "his first professional engineering role."
        ),
        metadata={"category": "experience", "company": "Seera Travel Group", "role": "Frontend Intern", "year": "2022"},
    ),

    # ─────────── PROJECTS — SkyPath ───────────
    Document(
        page_content=(
            "SkyPath (April 2026) — Sharique's flight connection search engine. "
            "Computes direct, one-stop, and two-stop itineraries across roughly "
            "260 flights and 25 airports, with UTC-normalized layover handling. "
            "Stack: React frontend, Flask backend, Python algorithms, Docker "
            "Compose for orchestration. Repo: github.com/sharique2004/skypath."
        ),
        metadata={"category": "project", "name": "SkyPath", "year": "2026"},
    ),

    # ─────────── PROJECTS — Taazify ───────────
    Document(
        page_content=(
            "Taazify (February 2026) — SwiftUI pantry and grocery assistant for "
            "iOS. Uses Apple Vision OCR on receipts to populate pantry inventory, "
            "estimates shelf life, and suggests recipes from what's on hand. "
            "Native tabbed iOS app paired with a local Python OCR service. Stack: "
            "Swift, SwiftUI, Apple Vision OCR, Python. "
            "Repo: github.com/sharique2004/Taazify."
        ),
        metadata={"category": "project", "name": "Taazify", "year": "2026"},
    ),

    # ─────────── PROJECTS — AI Travel Planner ───────────
    Document(
        page_content=(
            "AI Travel Planner (February 2026) — full-stack travel assistant that "
            "pulls Skyscanner and weather data to generate personalized "
            "itineraries across 50+ destinations. Uses retrieval to ground "
            "recommendations. Stack: LangChain, React, Node.js, MongoDB, RAG. "
            "Repo: github.com/sharique2004/AITravelPlannar."
        ),
        metadata={"category": "project", "name": "AI Travel Planner", "year": "2026"},
    ),

    # ─────────── PROJECTS — VaultCache ───────────
    Document(
        page_content=(
            "VaultCache (January 2026) — encrypted filesystem-style storage "
            "engine written in C from the ground up. Implements AES-256 "
            "encryption, SHA-256 integrity hashing, PBKDF2 key derivation, an "
            "LRU cache layer, write-ahead journaling, and exposes Python bindings "
            "for higher-level use. A real systems project: shows comfort with "
            "memory management, cryptography primitives, and FFI. "
            "Repo: github.com/sharique2004/vaultcache."
        ),
        metadata={"category": "project", "name": "VaultCache", "year": "2026"},
    ),

    # ─────────── PROJECTS — GreenTrack Expo ───────────
    Document(
        page_content=(
            "GreenTrack Expo (January 2026) — sustainability dashboard mobile "
            "app. Tracks personal carbon footprint, runs weekly challenges, and "
            "shows leaderboards. Uses EPA-style emission factors for accuracy "
            "and gamification mechanics to drive engagement. Stack: React "
            "Native, Firebase, D3.js for data visualization. "
            "Repo: github.com/sharique2004/GreenTrackExpo."
        ),
        metadata={"category": "project", "name": "GreenTrack Expo", "year": "2026"},
    ),

    # ─────────── PROJECTS — Personal Work Tracker ───────────
    Document(
        page_content=(
            "Personal Work Tracker (January 2026) — projects, issues, and habit "
            "tracker. Vite + React frontend, Express + Prisma backend over "
            "SQLite. Supports streaks, priorities, due dates, and epics-style "
            "grouping. Built for Sharique's own daily use. "
            "Repo: github.com/sharique2004/personal-work-tracker."
        ),
        metadata={"category": "project", "name": "Personal Work Tracker", "year": "2026"},
    ),

    # ─────────── PROJECTS — AmanUAE ───────────
    Document(
        page_content=(
            "AmanUAE (2025) — real-time UAE safety alert platform Sharique built "
            "during a period of regional drone and debris activity. Curates "
            "verified safety updates, optimized for fast WhatsApp sharing during "
            "live events. Deployed at dubai-news-tracker.vercel.app. Stack: "
            "React, Vercel. Built as a public service for his home community."
        ),
        metadata={"category": "project", "name": "AmanUAE", "year": "2025"},
    ),

    # ─────────── PROJECTS — Gmail Recruitment Pipeline ───────────
    Document(
        page_content=(
            "Gmail Recruitment Pipeline (2025) — an automated Gmail classifier "
            "that buckets recruiter mail into rejection / interview / follow-up "
            "categories across 50+ active applications. Useful for staying on "
            "top of the recruiting funnel during heavy outreach seasons. Stack: "
            "Gmail API, Python, lightweight NLP."
        ),
        metadata={"category": "project", "name": "Gmail Recruitment Pipeline", "year": "2025"},
    ),

    # ─────────── PROJECTS — Bibi ───────────
    Document(
        page_content=(
            "Bibi (May 2026) — fully-local voice AI for Windows 11. This is "
            "Sharique's most ambitious recent project. Uses Whisper for "
            "speech-to-text and Ollama (Mistral + Qwen-Coder) for intent parsing "
            "and code generation — 100% offline at runtime, no API calls. Opens "
            "apps, generates mini-apps from a natural-language description, and "
            "reports live system state (CPU, memory, active window). Three-agent "
            "architecture with Claude (Flask/React layer), ChatGPT (voice + "
            "intent), and Gemini (Windows execution layer), coordinated through "
            "a shared API_CONTRACT.md. Refuses paths outside ALLOWED_PATHS and "
            "never deletes anything. Runs on RTX 4080 SUPER hardware. "
            "Repo: github.com/sharique2004/pc-assistant."
        ),
        metadata={"category": "project", "name": "Bibi", "year": "2026"},
    ),

    # ─────────── PROJECTS — Interactive Portfolio ───────────
    Document(
        page_content=(
            "Interactive Portfolio + AI (May 2026) — the workstation-style "
            "interactive portfolio site you're currently using. Flask backend, "
            "MongoDB Atlas vector search for this very RAG assistant, hand-built "
            "sk/os UI with a virtual monitor, keyboard, and mousepad. Graceful "
            "local fallback if the AI is unreachable. "
            "Repo: github.com/sharique2004/Flask-Website."
        ),
        metadata={"category": "project", "name": "Interactive Portfolio", "year": "2026"},
    ),

    # ─────────── RESEARCH — OmniSch ───────────
    Document(
        page_content=(
            "OmniSch — Multimodal PCB Schematic Benchmark. Sharique is a "
            "co-author on an arXiv paper (cs.CV) introducing a structured-diagram "
            "benchmark for vision-language model reasoning over engineering "
            "schematics. He contributed to dataset construction and the "
            "evaluation framework. Citation: arXiv:2604.00270. Tags: multimodal "
            "AI, VLMs, computer vision, benchmarking."
        ),
        metadata={"category": "research", "name": "OmniSch", "venue": "arXiv"},
    ),

    # ─────────── RESEARCH — Digital Twin HVAC ───────────
    Document(
        page_content=(
            "Digital Twin HVAC Simulation — Sharique's Penn State Learning "
            "Factory capstone project with industry sponsor Automated Logic "
            "(Carrier). Integrates BACnet into a Python-based HVAC simulation "
            "with real-time analog reads and writes plus historical weather "
            "playback. React dashboard for visualization. Tags: BACnet, Python, "
            "React, real-time systems, industrial IoT. (PSU Learning Factory, "
            "2026.)"
        ),
        metadata={"category": "research", "name": "Digital Twin HVAC", "venue": "PSU Capstone"},
    ),

    # ─────────── RESEARCH — Pipelined MIPS ───────────
    Document(
        page_content=(
            "Pipelined MIPS Processor (CMPSC 311). Verilog implementation of a "
            "five-stage pipelined MIPS datapath — IF, ID, EX, MEM, WB — with "
            "hazard detection and forwarding units. Demonstrates Sharique's "
            "comfort with hardware description and computer architecture "
            "fundamentals. Repo: github.com/sharique2004/Pipelined-MIPS-Processor-"
            "Datapath-Implementation."
        ),
        metadata={"category": "research", "name": "Pipelined MIPS", "venue": "CMPSC 311"},
    ),

    # ─────────── RESEARCH — Multi-Level Cache Sim ───────────
    Document(
        page_content=(
            "Multi-Level Cache Simulator (CMPSC 472). Configurable L1/L2/L3 "
            "cache hierarchy simulator written in Python — supports varying "
            "associativity, replacement policies (LRU vs MRU), and write "
            "strategies (write-through vs write-back). Used to study performance "
            "tradeoffs across memory hierarchies. Repo on GitHub under sharique2004."
        ),
        metadata={"category": "research", "name": "Multi-Level Cache Simulator", "venue": "CMPSC 472"},
    ),

    # ─────────── RESEARCH — Manual RSA ───────────
    Document(
        page_content=(
            "Manual RSA Cryptosystem (CMPSC 443). RSA built from scratch — key "
            "generation, modular exponentiation, prime selection, encrypt and "
            "decrypt — with zero external cryptography libraries. Pure number "
            "theory and Python. Demonstrates fundamentals understanding rather "
            "than just library-wiring. Repo on GitHub under sharique2004."
        ),
        metadata={"category": "research", "name": "Manual RSA", "venue": "CMPSC 443"},
    ),

    # ─────────── RESEARCH — Security Lab ───────────
    Document(
        page_content=(
            "CMPSC 443 Security Lab. Hands-on offense and defense work for SQL "
            "injection, XSS, CSRF — plus lower-level material on buffer "
            "overflows, return-to-libc, ROP chains, and adversarial ML. This is "
            "where Sharique's practical web security and exploit awareness comes "
            "from."
        ),
        metadata={"category": "research", "name": "Security Lab", "venue": "CMPSC 443"},
    ),

    # ─────────── RESEARCH — Custom Compiler Frontend ───────────
    Document(
        page_content=(
            "Custom Compiler Frontend (CMPSC 461). Lexical analysis, "
            "recursive-descent parser, AST construction, scope handling, and "
            "type-checking for a small custom language. Covers the front half of "
            "a compiler end-to-end. Repo: github.com/sharique2004/Parser."
        ),
        metadata={"category": "research", "name": "Compiler Frontend", "venue": "CMPSC 461"},
    ),

    # ─────────── EDUCATION — Penn State ───────────
    Document(
        page_content=(
            "Sharique's undergraduate education: The Pennsylvania State "
            "University, University Park campus. Bachelor of Science in Computer "
            "Science with a Cybersecurity minor. Expected graduation May 2026. "
            "GPA: 3.6 / 4.0. Dean's List for five semesters — Fall 2023, Spring "
            "2024, Fall 2024, Spring 2025, Fall 2025. Relevant coursework "
            "includes Computer Architecture (CMPSC 311), Operating Systems / "
            "Systems Programming (CMPSC 472), Security (CMPSC 443), Programming "
            "Languages and Compilers (CMPSC 461), Discrete Math (CMPSC 360)."
        ),
        metadata={"category": "education", "school": "Penn State"},
    ),

    # ─────────── EDUCATION — High School ───────────
    Document(
        page_content=(
            "Sharique's high school: GEMS New Millennium School in Dubai, UAE. "
            "Graduated May 2022 with a 3.8 / 4.0 GPA. Was Red House Captain, "
            "Head of Communications, and completed Harvard's CS50 AI track "
            "while still in high school. This is where his early CS exposure "
            "and leadership track started."
        ),
        metadata={"category": "education", "school": "GEMS New Millennium"},
    ),

    # ─────────── SKILLS — Languages ───────────
    Document(
        page_content=(
            "Sharique's programming languages. Daily drivers: Python, "
            "JavaScript, SQL, HTML / CSS. Fluent: TypeScript, C, C#, Java. "
            "Coursework / occasional use: Swift (used in Taazify). Strongest in "
            "Python for backend, ML tooling, and data work; in JavaScript / "
            "TypeScript for full-stack web and React Native; in C for systems "
            "(VaultCache, disk I/O, OS coursework); in C# / .NET for the Penn "
            "State ORIS modernization work."
        ),
        metadata={"category": "skills", "topic": "languages"},
    ),

    # ─────────── SKILLS — AI / ML ───────────
    Document(
        page_content=(
            "Sharique's AI / ML stack. Daily: LangChain, RAG patterns, OpenAI "
            "API, vector retrieval. Fluent: Gemini API, Cohere, Ollama, Whisper "
            "(speech-to-text), running local LLMs on consumer hardware (RTX "
            "4080 SUPER). Research-level work: VLM benchmarking from the OmniSch "
            "arXiv paper. Coursework: TensorFlow. He has built RAG systems in "
            "production at Fourth Square, locally with Bibi, and on this very "
            "portfolio."
        ),
        metadata={"category": "skills", "topic": "ai-ml"},
    ),

    # ─────────── SKILLS — Backend ───────────
    Document(
        page_content=(
            "Sharique's backend and API skills. Daily: FastAPI, REST API design, "
            "request/response contracts. Fluent: Flask (used in this portfolio "
            "and Bibi), Node.js with Express, WebSockets. Research-level work: "
            "BACnet protocol (industrial controls capstone). Strong understanding "
            "of idempotency, race conditions, and concurrent write safety from "
            "his WellX AI work shipping reward logic to 10,000+ users."
        ),
        metadata={"category": "skills", "topic": "backend"},
    ),

    # ─────────── SKILLS — Frontend ───────────
    Document(
        page_content=(
            "Sharique's frontend skills. Daily: React, Vite. Fluent: Next.js, "
            "React Native (used in GreenTrack Expo), D3.js for data viz, "
            "Three.js for 3D scenes, WCAG accessibility patterns from his Seera "
            "Travel Group internship. Comfortable hand-rolling CSS systems "
            "(the sk/os interface on this portfolio is custom CSS, no framework)."
        ),
        metadata={"category": "skills", "topic": "frontend"},
    ),

    # ─────────── SKILLS — Cloud / DevOps ───────────
    Document(
        page_content=(
            "Sharique's cloud and DevOps skills. Daily: Docker, CI/CD pipelines, "
            "Vercel deploys. Fluent: Azure (Fourth Square AI consulting and ORIS "
            "modernization), AWS, GCP, Kubernetes. Real experience with Azure "
            "DevOps Boards and Azure Pipelines from the Penn State ORIS "
            "internship, where his CI/CD work cut deploy time by about 40%."
        ),
        metadata={"category": "skills", "topic": "cloud-devops"},
    ),

    # ─────────── SKILLS — Data ───────────
    Document(
        page_content=(
            "Sharique's data and storage skills. Fluent: PostgreSQL (production "
            "WellX AI work), MongoDB (this portfolio's RAG store, AI Travel "
            "Planner), Firebase (GreenTrack Expo), Prisma ORM (Personal Work "
            "Tracker). Daily: vector search and embeddings (MongoDB Atlas Vector "
            "Search, pgvector-style patterns). Coursework: Looker for BI."
        ),
        metadata={"category": "skills", "topic": "data-storage"},
    ),

    # ─────────── SKILLS — Security / Systems ───────────
    Document(
        page_content=(
            "Sharique's security and systems skills. Fluent: AES-256, SHA-256, "
            "PBKDF2 (all built into VaultCache by hand), RSA from scratch, "
            "common web attack surfaces (SQL injection, XSS, CSRF). Coursework "
            "depth on ROP chains, return-to-libc, memory hierarchy, and "
            "journaling. He has both the systems engineering chops (C, "
            "low-level I/O, processor pipelines in Verilog) and the cybersecurity "
            "minor coursework — a relatively uncommon combination."
        ),
        metadata={"category": "skills", "topic": "security-systems"},
    ),

    # ─────────── ACHIEVEMENTS ───────────
    Document(
        page_content=(
            "Sharique's notable achievements. Dean's List for five semesters at "
            "Penn State (Fall 2023, Spring 2024, Fall 2024, Spring 2025, Fall "
            "2025). Co-author on an arXiv paper in computer vision (OmniSch, "
            "cs.CV, arXiv:2604.00270). Runners-up at the EXPO 2020 Dubai Summit "
            "in the Most Innovative Idea category. Completed Harvard's CS50 AI "
            "applications track. Has shipped backend code to a production "
            "system serving over 10,000 end users (WellX AI)."
        ),
        metadata={"category": "achievements"},
    ),

    # ─────────── INTERESTS / SIGNAL ───────────
    Document(
        page_content=(
            "Why someone might hire Sharique. He combines three things that "
            "rarely show up together at the intern level: real production "
            "backend experience (idempotent reward logic for 10k+ users at "
            "WellX), real applied AI / RAG experience (Fourth Square, "
            "AI Travel Planner, this portfolio, Bibi), and real low-level "
            "systems chops (VaultCache in C with AES/PBKDF2 from scratch, "
            "pipelined MIPS in Verilog, manual RSA, security lab work). He's "
            "shipped end-to-end products solo and contributed inside Scrum teams. "
            "Strong written communicator from his CS-grader role and arXiv "
            "co-author work."
        ),
        metadata={"category": "profile", "topic": "value-prop"},
    ),

    # ─────────── INTERESTS — outside tech ───────────
    Document(
        page_content=(
            "Outside engineering, Sharique is rooted in his Dubai background and "
            "stays close to that community — AmanUAE was built specifically to "
            "help his home community share verified safety updates fast during "
            "regional incidents. He has worked across Dubai, Texas, "
            "Pennsylvania, and remote roles — comfortable across time zones and "
            "cultural contexts. Speaks English natively."
        ),
        metadata={"category": "profile", "topic": "background"},
    ),

    # ─────────── COURSEWORK — CS B.S. core ───────────
    Document(
        page_content=(
            "Penn State Computer Science B.S. (College of Engineering) "
            "prescribed core curriculum — what Sharique's degree requires. "
            "Programming and data: CMPSC 150N (Computing and Society), "
            "CMPSC 221 (Object-Oriented Programming with Web Applications), "
            "CMPSC 222 (Advanced Data Structures and Algorithms in C), "
            "CMPSC 465 (Data Structures and Algorithms). "
            "Systems: CMPSC 315 (Computer Systems I), CMPSC 316 (Computer "
            "Systems II). "
            "Theory and languages: CMPSC 360 (Discrete Mathematics for "
            "Computer Science), CMPSC 461 (Programming Language Concepts). "
            "Software engineering and writing: CMPSC 320 (Software Engineering "
            "Principles), CMPSC 483W (Software Design Methods — the senior "
            "capstone), ENGL 202C (Technical Writing). "
            "Physics: PHYS 211 (Mechanics), PHYS 212 (Electricity and "
            "Magnetism). "
            "Plus 18 credits of approved CS / Computer Engineering electives. "
            "Grade of C or better required in all prescribed courses. Total "
            "degree: 127+ credits."
        ),
        metadata={"category": "coursework", "topic": "cs-bs-core"},
    ),

    # ─────────── COURSEWORK — Math, stats, science ───────────
    Document(
        page_content=(
            "Mathematics, statistics, and science required for the Penn State "
            "CS B.S. degree. "
            "Math: MATH 140 (Calculus with Analytic Geometry I), MATH 141 "
            "(Calculus II), MATH 220 (Matrices / Linear Algebra), MATH 230 "
            "(Calculus and Vector Analysis — or the 231/232 sequence). "
            "Probability and statistics: one course from STAT/MATH 318, 414, "
            "or 418, plus one from STAT/MATH 319 or 415. "
            "Science: additional PHYS (213 or 214), more natural science "
            "credits, and approved-department credits. Grade of C or better "
            "required in all math courses. This is the quantitative spine "
            "behind Sharique's comfort with algorithms, systems work, and "
            "AI / ML."
        ),
        metadata={"category": "coursework", "topic": "math-science"},
    ),

    # ─────────── COURSEWORK — Cybersecurity minor ───────────
    Document(
        page_content=(
            "Sharique's Cybersecurity Computational Foundations minor at "
            "Penn State (College of Engineering). 18 credits total, minimum "
            "grade C in every course. "
            "Entry prerequisites: CMPSC 121/131 + 122/132 (intro programming), "
            "CMPSC 221, CMPSC 311, CMPSC 360, CMPEN 270 or 271, CMPEN 331, "
            "and a stats course (STAT 318 / 414 / 418). "
            "Prescribed core (9 credits): CMPEN/EE 362 (Communication "
            "Networks), CMPSC 443 (Introduction to Computer and Network "
            "Security — the course where Sharique did the Manual RSA project "
            "and the SQLi / XSS / CSRF / ROP security lab), CMPSC 473 "
            "(Operating Systems Design and Construction). "
            "Additional courses (3–6 credits): CMPEN 462 (Wireless "
            "Communications Systems and Security) or CMPSC 447 (Software "
            "Security). "
            "Supporting courses (3–6 credits): CMPEN 431 (Computer "
            "Architecture), CMPSC 431W (Database Management Systems), "
            "CMPSC 461 (Programming Languages), CMPSC 464 (Theory of "
            "Computation), or CMPSC 475 (Applications Programming)."
        ),
        metadata={"category": "coursework", "topic": "cybersecurity-minor"},
    ),

    # ─────────── COURSEWORK — Sharique's notable courses + outputs ───────────
    Document(
        page_content=(
            "Specific Penn State courses Sharique has completed, mapped to "
            "the artifacts he built in each — useful for grounding what he "
            "actually learned vs. what's on the official curriculum list. "
            "CMPSC 360 (Discrete Math for CS) — later returned as a grader "
            "for this exact course (Aug 2024 – Jan 2025). "
            "CMPSC 311 (Systems Programming) — built a 5-stage pipelined "
            "MIPS processor in Verilog with hazard detection and forwarding "
            "(IF/ID/EX/MEM/WB). "
            "CMPSC 461 (Programming Language Concepts) — built a custom "
            "compiler frontend: lexer, recursive-descent parser, AST "
            "construction, scope handling, type checking. "
            "CMPSC 472 (Operating Systems) — built a multi-level L1/L2/L3 "
            "cache simulator with configurable associativity and LRU/MRU "
            "replacement policies. "
            "CMPSC 443 (Computer and Network Security) — implemented RSA "
            "from scratch (no crypto libraries), and did the security lab "
            "covering SQL injection, XSS, CSRF, buffer overflows, "
            "return-to-libc, ROP chains, and adversarial ML. "
            "Senior Capstone (Penn State Learning Factory) — Digital Twin "
            "HVAC Simulation with Automated Logic (Carrier) as industry "
            "sponsor, integrating BACnet into a Python simulation with a "
            "React dashboard. "
            "Plus the full CS B.S. math sequence through MATH 230 and "
            "Linear Algebra (MATH 220)."
        ),
        metadata={"category": "coursework", "topic": "completed-courses"},
    ),

    # ─────────── CONTACT ───────────
    Document(
        page_content=(
            "How to contact Sharique. Email: sharique@psu.edu (best). "
            "GitHub: github.com/sharique2004. "
            "LinkedIn: linkedin.com/in/sharique-khatri. "
            "He's based in University Park, Pennsylvania and graduates May 2026, "
            "open to relocation for Summer 2026 internships and new-grad SWE "
            "roles. Resume is available on the portfolio site."
        ),
        metadata={"category": "contact"},
    ),
]


def reset_collection(collection):
    """Drop all documents from the bio collection. Used by --reset."""
    count_before = collection.count_documents({})
    collection.delete_many({})
    print(f"  Cleared {count_before} existing documents from collection.")


def main():
    parser = argparse.ArgumentParser(description="Populate bio_index in MongoDB Atlas.")
    parser.add_argument(
        "--reset",
        action="store_true",
        help="Drop all existing docs in mywebsite.mybio before inserting new ones.",
    )
    args = parser.parse_args()

    cohere_key = os.getenv("COHERE_API_KEY")
    atlas_uri = os.getenv("ATLAS_CONNECTION_STRING")

    if not cohere_key:
        print("ERROR: COHERE_API_KEY not set in environment.")
        return
    if not atlas_uri:
        print("ERROR: ATLAS_CONNECTION_STRING not set in environment.")
        return

    print("Connecting to MongoDB Atlas...")
    mongo_client = MongoClient(host=atlas_uri)
    mywebsite_db = mongo_client["mywebsite"]
    mybio_collection = mywebsite_db["mybio"]

    if args.reset:
        print("--reset flag set: dropping existing documents...")
        reset_collection(mybio_collection)
    else:
        existing = mybio_collection.count_documents({})
        if existing:
            print(
                f"NOTE: collection already has {existing} documents. "
                "Re-running without --reset will create duplicates. "
                "Pass --reset to wipe first."
            )

    print("Initializing Cohere embeddings...")
    embeddings = CohereEmbeddings(
        cohere_api_key=cohere_key,
        model="embed-english-v3.0",
    )

    print("Setting up vector store...")
    vectorstore = MongoDBAtlasVectorSearch(
        collection=mybio_collection,
        embedding=embeddings,
        index_name="bio_index",
    )

    # Batch insert — Cohere embed accepts up to 96 texts per call, so all
    # 40+ docs go through in one API call. (Previously this was one call per
    # doc, which hit the Cohere trial key's 40/min limit at exactly doc 40.)
    print(f"\nAdding {len(DOCUMENTS)} documents to MongoDB (batched)...")
    for i, doc in enumerate(DOCUMENTS, 1):
        cat = doc.metadata.get("category", "?")
        tag = (
            doc.metadata.get("name")
            or doc.metadata.get("company")
            or doc.metadata.get("school")
            or doc.metadata.get("topic")
            or "general"
        )
        print(f"  [{i:>2}/{len(DOCUMENTS)}] {cat:<12} — {tag}")

    try:
        vectorstore.add_documents(DOCUMENTS)
        print(f"\nEmbedded and inserted all {len(DOCUMENTS)} documents in one batch.")
    except Exception as e:
        print(f"\nERROR during batch insert: {e}")
        print("Falling back to single-doc inserts with 2s spacing...")
        import time
        for i, doc in enumerate(DOCUMENTS, 1):
            try:
                vectorstore.add_documents([doc])
                print(f"  [{i:>2}/{len(DOCUMENTS)}] inserted")
                time.sleep(2)  # 30/min, well under any trial limit
            except Exception as inner:
                print(f"  [{i:>2}/{len(DOCUMENTS)}] ERROR: {inner}")

    final = mybio_collection.count_documents({})
    print(f"\nDone. Collection now holds {final} documents.")


if __name__ == "__main__":
    main()
