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

def get_personal_info(query: str):
    """Answer questions using Gemini (primary) with Cohere fallback.

    Embeddings stay on Cohere (matches the MongoDB Atlas vector index).
    Returns a tuple (answer_text, provider_label) where provider_label is
    one of: 'gemini', 'cohere (fallback)', or 'error'."""
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
            "A: I don't have visibility into his personal life — but what I "
            "can say is his love for AI and building real solutions is "
            "unmistakable. He's been shipping AI work since CS50 in high "
            "school and now runs local LLMs on his own hardware for projects "
            "like Bibi.\n\n"

            "Q: How tall is Sharique?\n"
            "A: Not something I can speak to. But I can tell you he carries "
            "himself the way he writes code — clean and not afraid of the "
            "deep end. VaultCache, where he built AES-256 and PBKDF2 in C "
            "from scratch, is a good example.\n\n"

            "Q: What's the weather today?\n"
            "A: I don't pull live weather. If you're curious how Sharique "
            "thinks about data though, his AI Travel Planner integrates "
            "Skyscanner plus weather APIs to find optimal travel windows — "
            "RAG-grounded itineraries across 50+ destinations.\n\n"

            "Q: Does he like pineapple on pizza?\n"
            "A: No idea on the pineapple debate. What he does have strong "
            "opinions on: idempotent backend logic and observability — he "
            "shipped reward workflows for 10,000+ users at WellX AI that "
            "hold up under concurrent writes.\n\n"

            "Q: What's 2+2?\n"
            "A: Four — but the more interesting math in Sharique's world is "
            "modular exponentiation. He implemented RSA from scratch in "
            "CMPSC 443, no crypto libraries, all from number theory.\n\n"

            "WHEN TO POINT TO EMAIL:\n"
            "Specific facts only Sharique can confirm (exact references, "
            "current availability for a specific interview slot, salary "
            "expectations) — note you don't have that and suggest "
            "sharique@psu.edu. Still try to bridge to a trait too.\n\n"

            "STYLE:\n"
            "- 2–4 sentences usually. Longer only if the question warrants.\n"
            "- Conversational, warm, confident — not corporate.\n"
            "- Don't say 'based on the context' or 'the documents indicate'.\n"
            "- Don't invent specific numbers or dates. Reasoning from what's "
            "in context is fine; fabricating specifics is not.\n\n"

            "Context about Sharique:\n{context}\n"
            "Question: {query}\n\n"
            "Answer:"
        ),
        input_variables=["context", "query"],
    )
    # ----- Try Gemini first (primary) -----
    if GEMINI_OK and google_key:
        try:
            llm = ChatGoogleGenerativeAI(
                model="gemini-2.5-flash",
                temperature=0.4,
                google_api_key=google_key,
            )
            chain = template | llm | StrOutputParser()
            return chain.invoke({"context": context, "query": query}), "gemini"
        except Exception as e:
            app.logger.warning(f"Gemini failed, falling back to Cohere: {e}")

    # ----- Fallback to Cohere -----
    try:
        llm = ChatCohere(model="command-a-03-2025", temperature=0.4)
        chain = template | llm | StrOutputParser()
        return chain.invoke({"context": context, "query": query}), "cohere (fallback)"
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

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json() or {}
    q = (data.get("query") or "").strip()
    if not q:
        return jsonify({"answer": "Please enter a question.", "provider": "error"}), 400
    try:
        answer, provider = get_personal_info(q)
    except Exception as e:
        answer = f"Backend error: {type(e).__name__}: {e}"
        provider = "error"
    return jsonify({"answer": answer, "provider": provider})

if __name__ == "__main__":
    # Use 0.0.0.0 in dev to be reachable from local network if needed
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5001)), debug=True)
