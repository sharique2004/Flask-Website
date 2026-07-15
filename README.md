# shariquekhatri.com

Personal site of Sharique Khatri. Server rendered Flask, one template per
page, one stylesheet, and a small grounded assistant. No trackers, no
analytics, no build step.

## Pages

- `/` — who I am, selected work with honest scope, experience, publication, archive
- `/bibi` — Bibi, a local first voice agent for Windows ([repo](https://github.com/sharique2004/pc-assistant))
- `/scribe` — MeetingScribe, on device meeting transcription for macOS ([repo](https://github.com/sharique2004/MeetingScribe))
- `/resume` — resume PDF
- `POST /ask` — the "mini Sharique" assistant: a small production RAG
  system. The bio corpus (`bio_corpus.py`) is embedded with Gemini and
  stored in a MongoDB Atlas vector index; each question retrieves the most
  relevant chunks and Gemini answers in Sharique's voice under a strict
  persona, with short conversation history. Ingestion is automatic: on boot
  the app hashes the corpus and re-embeds only when it changed. Falls back
  to Gemini without retrieval, then to curated answers. Rate limited per IP
  and globally.

## Structure

```
app.py             # routes, rate limiting, security headers, sitemap/robots
portfolio_data.py  # single source of truth: every fact and verified number
bio_corpus.py      # the assistant's knowledge base, chunked for retrieval
rag.py             # Gemini embeddings + Atlas vector search + auto ingest
assistant.py       # persona, retrieval grounded answers, curated fallback
templates/         # index, bibi, scribe, 404
static/            # site.css, site.js, fonts, images
```

Every number on the site traces to a verified metrics ledger. If a claim
cannot be verified, it does not ship.

## Run locally

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # optionally add GEMINI_API_KEY
python app.py          # http://localhost:5001
```

## Deploy

Heroku: `Procfile` runs gunicorn, Python version pinned in `.python-version`.
Set `GEMINI_API_KEY` (and optionally `GEMINI_MODEL`) as config vars.
