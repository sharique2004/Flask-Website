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

load_dotenv()

app = Flask(__name__, template_folder="templates", static_folder="static")

def get_personal_info(query: str) -> str:
    """Answer questions about you from MongoDB Atlas + Cohere.
       If the stack isn't available, return a helpful message."""
    if not RAG_OK:
        return f"RAG imports missing: {RAG_IMPORT_ERROR}"
    cohere_key = os.getenv("COHERE_API_KEY")
    atlas_uri = os.getenv("ATLAS_CONNECTION_STRING")

    if not cohere_key or not atlas_uri:
        return f"Missing env vars: COHERE_API_KEY={bool(cohere_key)} ATLAS_CONNECTION_STRING={bool(atlas_uri)}"
    llm = ChatCohere(model="command-a-03-2025", temperature=0.4)
    embeddings = CohereEmbeddings(
        cohere_api_key=os.getenv("COHERE_API_KEY"),
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

    results = vectorstore.similarity_search(query=query, k=6)
    context = ""
    for i, doc in enumerate(results, 1):
        context += f"Source {i}:\n{doc.page_content}\n\n"

    template = PromptTemplate(
        template=(
            "You have the following context about Sharique Khatri. "
            "Answer accurately and concisely. If it's not in the context, give the most accurate answer based on the context. If that is not possible then say I dont know.\n\n"
            "Context:\n{context}\n\nUser:\n{query}\n\nAnswer:"
        ),
        input_variables=["context", "query"],
    )
    chain = template | llm | StrOutputParser()
    return chain.invoke({"context": context, "query": query})

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
        return jsonify({"answer": "Please enter a question."}), 400
    try:
        answer = get_personal_info(q)
    except Exception as e:
        answer = f"Backend error: {type(e).__name__}: {e}"
    return jsonify({"answer": answer})

if __name__ == "__main__":
    # Use 0.0.0.0 in dev to be reachable from local network if needed
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5001)), debug=True)
