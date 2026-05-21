import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

# Optional RAG stack (won't crash if not installed)
RAG_OK = True
RAG_IMPORT_ERROR = None
try:
    from pymongo import MongoClient
    from langchain_cohere import ChatCohere
    from langchain_cohere.embeddings import CohereEmbeddings
    from langchain_mongodb import MongoDBAtlasVectorSearch
    from langchain_core.prompts import PromptTemplate
    from langchain_core.output_parsers import StrOutputParser
except ImportError as e:
    RAG_OK = False
    RAG_IMPORT_ERROR = repr(e)

# Gemini (primary LLM). If not installed or unkeyed, /ask falls back to Cohere.
GEMINI_OK = True
GEMINI_IMPORT_ERROR = None
try:
    from langchain_google_genai import ChatGoogleGenerativeAI
except ImportError as e:
    GEMINI_OK = False
    GEMINI_IMPORT_ERROR = repr(e)

load_dotenv()

app = Flask(__name__, template_folder="templates", static_folder="static")

def get_personal_info(query: str, request_meta: dict | None = None):
    """Answer questions using Gemini (primary) with Cohere fallback.

    Embeddings stay on Cohere (matches the MongoDB Atlas vector index).
    Returns a tuple (answer_text, provider_label) where provider_label is
    one of: 'gemini', 'cohere (fallback)', or 'error'.

    request_meta is an optional dict of Flask request info (ip, ua,
    referrer) — attached to LangSmith traces so you can see who's
    actually asking questions on the portfolio."""
    request_meta = request_meta or {}
    if not RAG_OK:
        return f"RAG imports missing: {RAG_IMPORT_ERROR}", "error"
    cohere_key = os.getenv("COHERE_API_KEY")
    atlas_uri = os.getenv("ATLAS_CONNECTION_STRING")
    google_key = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")

    if not cohere_key or not atlas_uri:
        return (
            f"Missing env vars: COHERE_API_KEY={bool(cohere_key)} "
            f"ATLAS_CONNECTION_STRING={bool(atlas_uri)}"
        ), "error"
    embeddings = CohereEmbeddings(
        cohere_api_key=cohere_key,
        model="embed-english-v3.0",
    )
    mongo_client = MongoClient(host=os.getenv("ATLAS_CONNECTION_STRING"))
    mywebsite_db = mongo_client["mywebsite"]
    mybio_collection = mywebsite_db["mybio"]
    vectorstore = MongoDBAtlasVectorSearch(
        collection=mybio_collection,
        embedding=embeddings,
        index_name="bio_index",
    )

    results = vectorstore.similarity_search(query=query, k=8)
    context = ""
    for i, doc in enumerate(results, 1):
        context += f"Source {i}:\n{doc.page_content}\n\n"

    template = PromptTemplate(
        template=(
            "You are the AI assistant on Sharique Khatri's portfolio website. "
            "You speak about him in the third person ('Sharique', 'he'), warmly "
            "and confidently — like a friend who knows him well.\n\n"

            "HOW TO ANSWER:\n"
            "- Use the retrieved context below as your source of truth.\n"
            "- If the exact answer isn't spelled out, SYNTHESIZE from what is — "
            "connect his experience, projects, and skills to reason about the "
            "question.\n"
            "- For open-ended questions ('strongest skill', 'why hire him', "
            "'could he do X', 'what's he like'), give a real answer grounded in "
            "his track record.\n\n"

            "ALWAYS PIVOT, NEVER COLDLY REFUSE:\n"
            "- For personal questions you can't know (dating, family, finances, "
            "health, age, address, looks, etc.), DON'T just say 'I don't know' "
            "and stop. Briefly acknowledge, then PIVOT to something real and "
            "positive about him — a passion, a strength, a recent project, a "
            "trait shown in his work.\n"
            "- For questions completely unrelated to him (weather, math, "
            "current events, random jokes), same move: brief acknowledgment, "
            "then bridge back to something true about Sharique.\n"
            "- The pivot should feel natural and earned, not forced. Pull from "
            "his real traits: curiosity about local AI, comfort with low-level "
            "systems, willingness to build from scratch (RSA, VaultCache), care "
            "for the Dubai community (AmanUAE), shipped production backend at "
            "scale (WellX AI), thoughtful written communicator (CS grader, "
            "arXiv co-author), etc.\n\n"

            "EXAMPLES OF THE PIVOT PATTERN:\n\n"
            "Q: Who is Sharique dating right now?\n"
            "A: No clue, honestly. I can tell you what he's into though — "
            "he's been deep in local LLM stuff lately, built a voice "
            "assistant called Bibi that runs entirely offline on his own "
            "machine.\n\n"

            "Q: How tall is Sharique?\n"
            "A: Couldn't tell you. He does have receipts on the technical "
            "side if that's useful — wrote VaultCache, an encrypted "
            "filesystem in C with AES-256 and PBKDF2, just to actually "
            "understand crypto instead of calling a library.\n\n"

            "Q: What's the weather today?\n"
            "A: Don't have live weather. He did build an AI travel planner "
            "though that pulls weather and flight data to figure out when "
            "to actually go somewhere, if that's interesting.\n\n"

            "Q: Does he like pineapple on pizza?\n"
            "A: No idea on the pizza take. The thing he's actually "
            "opinionated about is backend hygiene — idempotency, retry "
            "safety, that kind of thing. Came up a lot in his WellX AI "
            "internship doing reward logic.\n\n"

            "Q: What's 2+2?\n"
            "A: Four. If you want actual interesting math, he did RSA from "
            "scratch in CMPSC 443 — key generation, modular exponentiation, "
            "no libraries.\n\n"

            "WHEN TO POINT TO EMAIL:\n"
            "Specific facts only Sharique can confirm (exact references, "
            "current availability for a specific interview slot, salary "
            "expectations) — note you don't have that and suggest "
            "sharique@psu.edu. Still try to bridge to a trait too.\n\n"

            "STYLE — sound like a human, not an AI:\n"
            "- 2–4 sentences usually. Longer only if warranted.\n"
            "- Write like a friend explaining him to another person, not "
            "like a corporate bio.\n"
            "- AVOID these AI tells: em-dash + restatement ('X — a real Y'); "
            "stacked superlatives ('production-grade', 'robust', 'from the "
            "ground up', 'real-time' all in one sentence); tricolons / "
            "rule-of-three lists with elegant symmetry; rehearsed "
            "cleverness ('he carries himself the same way he writes code: "
            "clean, careful, and unafraid…'); cramming a metric into every "
            "sentence; closers like 'in short', 'ultimately', or 'what "
            "stands out is…'.\n"
            "- Vary sentence length. Some short. Some longer. Use plain "
            "phrasing. Drop adjectives you don't need.\n"
            "- Don't say 'based on the context' or 'the documents indicate'.\n"
            "- Don't invent specific numbers or dates.\n\n"

            "Context about Sharique:\n{context}\n"
            "Question: {query}\n\n"
            "Answer:"
        ),
        input_variables=["context", "query"],
    )
    def _run_config(provider_tag: str):
        """LangSmith config — tags + metadata so traces are filterable
        by provider and you can spot recruiter traffic vs your own
        testing in the LangSmith UI."""
        return {
            "run_name": "portfolio-ask",
            "tags": ["portfolio", f"provider:{provider_tag}"],
            "metadata": {
                "provider": provider_tag,
                "query_preview": query[:80],
                **request_meta,
            },
        }

    # ----- Try Gemini first (primary) -----
    if GEMINI_OK and google_key:
        try:
            llm = ChatGoogleGenerativeAI(
                model="gemini-2.5-flash",
                temperature=0.4,
                google_api_key=google_key,
            )
            chain = template | llm | StrOutputParser()
            answer = chain.invoke(
                {"context": context, "query": query},
                config=_run_config("gemini"),
            )
            return answer, "gemini"
        except Exception as e:
            app.logger.warning(f"Gemini failed, falling back to Cohere: {e}")

    # ----- Fallback to Cohere -----
    try:
        llm = ChatCohere(model="command-a-03-2025", temperature=0.4)
        chain = template | llm | StrOutputParser()
        answer = chain.invoke(
            {"context": context, "query": query},
            config=_run_config("cohere-fallback"),
        )
        return answer, "cohere (fallback)"
    except Exception as e:
        return (
            f"Both Gemini and Cohere failed. Last error: {type(e).__name__}: {e}",
            "error",
        )

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/achievements")
def achievements():
    return render_template("achievements.html")

@app.route("/education")
def education():
    return render_template("education.html")

@app.route("/experience")
def experience():
    return render_template("experience.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")

@app.route("/assistant")
def assistant():
    return render_template("assistant.html")

def _client_ip():
    """Best-effort client IP. Behind Heroku / a CDN, X-Forwarded-For has
    the real IP as the first comma-separated value."""
    xff = request.headers.get("X-Forwarded-For", "")
    if xff:
        return xff.split(",")[0].strip()
    return request.remote_addr or "unknown"


@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json() or {}
    q = (data.get("query") or "").strip()
    if not q:
        return jsonify({"answer": "Please enter a question.", "provider": "error"}), 400

    # Build metadata for LangSmith traces — lets you see WHO is asking
    # what on the portfolio (IP, browser, where they came from).
    request_meta = {
        "client_ip": _client_ip(),
        "user_agent": request.headers.get("User-Agent", "")[:200],
        "referrer": request.referrer or "(direct)",
        "host": request.host,
    }

    try:
        answer, provider = get_personal_info(q, request_meta=request_meta)
    except Exception as e:
        answer = f"Backend error: {type(e).__name__}: {e}"
        provider = "error"
    return jsonify({"answer": answer, "provider": provider})

if __name__ == "__main__":
    # Use 0.0.0.0 in dev to be reachable from local network if needed
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5001)), debug=True)
