"""Retrieval layer for the mini Sharique assistant.

Gemini embeddings + MongoDB Atlas vector search. The corpus lives in
bio_corpus.py and is ingested automatically: on boot the app compares a hash
of the corpus against a meta document in Atlas and re-embeds only when the
corpus changed. No manual ingestion step, ever.

Required env: ATLAS_CONNECTION_STRING, GEMINI_API_KEY. Missing either one
just disables retrieval; the assistant falls back gracefully.
"""

import hashlib
import os
import threading
import time

from bio_corpus import CHUNKS

DB_NAME = "mywebsite"
COLLECTION = "mybio"
INDEX_NAME = "bio_index"
EMBED_MODEL = "gemini-embedding-001"
DIMS = 768
META_ID = "corpus_meta"

_client = None
_lock = threading.Lock()


def _collection():
    global _client
    uri = os.getenv("ATLAS_CONNECTION_STRING") or os.getenv("MONGODB_URI")
    if not uri:
        return None
    with _lock:
        if _client is None:
            from pymongo import MongoClient

            _client = MongoClient(
                uri,
                serverSelectionTimeoutMS=8000,
                connectTimeoutMS=8000,
                socketTimeoutMS=10000,
            )
    return _client[DB_NAME][COLLECTION]


def _genai_client():
    key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not key:
        return None
    from google import genai

    return genai.Client(api_key=key)


def _embed(client, texts: list[str], task: str) -> list[list[float]]:
    from google.genai import types

    config = types.EmbedContentConfig(task_type=task, output_dimensionality=DIMS)
    vectors: list[list[float]] = []
    batch_size = 20
    for start in range(0, len(texts), batch_size):
        result = client.models.embed_content(
            model=EMBED_MODEL,
            contents=texts[start : start + batch_size],
            config=config,
        )
        vectors.extend(e.values for e in result.embeddings)
    return vectors


def corpus_hash() -> str:
    h = hashlib.sha256()
    for chunk in CHUNKS:
        h.update(chunk["id"].encode())
        h.update(chunk["text"].encode())
    h.update(f"{EMBED_MODEL}:{DIMS}".encode())
    return h.hexdigest()


def ensure_ingested() -> tuple[bool, str]:
    """Embed and upsert the corpus if it changed. Idempotent."""
    col = _collection()
    if col is None:
        return False, "no ATLAS_CONNECTION_STRING"
    client = _genai_client()
    if client is None:
        return False, "no GEMINI_API_KEY"

    fresh = corpus_hash()
    meta = col.find_one({"_id": META_ID})
    if meta and meta.get("hash") == fresh:
        return True, "corpus up to date"

    vectors = _embed(client, [c["text"] for c in CHUNKS], "RETRIEVAL_DOCUMENT")
    docs = [
        {
            "_id": chunk["id"],
            "id": i,
            "topic": chunk["topic"],
            "text": chunk["text"],
            "source": "bio_corpus",
            "author": "Sharique Khatri",
            "embedding": vector,
        }
        for i, (chunk, vector) in enumerate(zip(CHUNKS, vectors))
    ]
    col.delete_many({"_id": {"$ne": META_ID}})
    col.insert_many(docs, ordered=False)
    col.replace_one(
        {"_id": META_ID},
        {
            "_id": META_ID,
            "hash": fresh,
            "model": EMBED_MODEL,
            "dims": DIMS,
            "count": len(docs),
        },
        upsert=True,
    )
    return True, f"ingested {len(docs)} chunks"


def ensure_index() -> tuple[bool, str]:
    """Make sure bio_index is a vectorSearch index of the right dimension.

    Idempotent: a no-op when the index already matches, so ordinary dyno
    restarts do not rebuild it. Only rebuilds when the index is missing, the
    wrong type (a legacy knnVector 'search' index), or the wrong dimension.
    """
    col = _collection()
    if col is None:
        return False, "no ATLAS_CONNECTION_STRING"
    try:
        indexes = {i["name"]: i for i in col.list_search_indexes()}
    except Exception as exc:
        return False, f"list indexes failed: {exc!r}"

    idx = indexes.get(INDEX_NAME)
    if idx and idx.get("type") == "vectorSearch":
        fields = (idx.get("latestDefinition") or {}).get("fields", [])
        vec = next((f for f in fields if f.get("type") == "vector"), None)
        if vec and vec.get("numDimensions") == DIMS:
            return True, "index already correct"

    from pymongo.operations import SearchIndexModel

    if idx:
        col.drop_search_index(INDEX_NAME)
        for _ in range(60):
            time.sleep(5)
            if INDEX_NAME not in {i["name"] for i in col.list_search_indexes()}:
                break

    col.create_search_index(
        SearchIndexModel(
            definition={
                "fields": [
                    {
                        "type": "vector",
                        "path": "embedding",
                        "numDimensions": DIMS,
                        "similarity": "cosine",
                    },
                    {"type": "filter", "path": "topic"},
                ]
            },
            name=INDEX_NAME,
            type="vectorSearch",
        )
    )
    for _ in range(72):
        time.sleep(5)
        cur = next(
            (i for i in col.list_search_indexes() if i["name"] == INDEX_NAME), None
        )
        if cur and cur.get("status") == "READY" and cur.get("queryable"):
            return True, f"index rebuilt ({DIMS}d vectorSearch)"
    return True, "index building (Atlas will finish on its own)"


def ensure_ready_in_background() -> None:
    """Fire and forget on app boot: re-embed the corpus if it changed, then
    make the vector index match. Runs in a daemon thread so a slow Atlas
    search-index build never blocks the web server, and every failure is
    swallowed so the app stays up (the assistant just answers from core
    facts until retrieval is ready).

    Order matters: re-embed the documents first so the index builds over
    correct-dimension vectors, then reconcile the index.
    """

    def _run():
        try:
            _ok, msg = ensure_ingested()
            print(f"[rag] corpus sync: {msg}")
        except Exception as exc:
            print(f"[rag] corpus sync failed: {type(exc).__name__}: {exc}")
        try:
            _ok, msg = ensure_index()
            print(f"[rag] index sync: {msg}")
        except Exception as exc:
            print(f"[rag] index sync failed: {type(exc).__name__}: {exc}")

    threading.Thread(target=_run, daemon=True).start()


def retrieve(query: str, k: int = 5) -> list[dict]:
    """Return the k most relevant corpus chunks, or [] on any failure."""
    try:
        col = _collection()
        client = _genai_client()
        if col is None or client is None:
            return []
        qvec = _embed(client, [query], "RETRIEVAL_QUERY")[0]
        pipeline = [
            {
                "$vectorSearch": {
                    "index": INDEX_NAME,
                    "path": "embedding",
                    "queryVector": qvec,
                    "numCandidates": 80,
                    "limit": k,
                }
            },
            {
                "$project": {
                    "text": 1,
                    "topic": 1,
                    "score": {"$meta": "vectorSearchScore"},
                }
            },
        ]
        return list(col.aggregate(pipeline))
    except Exception:
        return []
