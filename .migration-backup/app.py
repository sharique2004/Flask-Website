import os
import time
from collections import defaultdict, deque

from dotenv import load_dotenv
from flask import (
    Flask,
    Response,
    jsonify,
    redirect,
    render_template,
    request,
    send_from_directory,
)

import portfolio_data as data
import rag
from assistant import answer

load_dotenv()

app = Flask(__name__, template_folder="templates", static_folder="static")

CANONICAL = "https://shariquekhatri.com"

# Sync the assistant's knowledge base and vector index on boot. Idempotent
# and fully guarded: a no-op when unchanged or when the keys are absent, and
# any failure is swallowed so the app always comes up.
#
# Skip on serverless (Vercel): there is no persistent process to own a
# background thread, and spawning one per cold start could race on the Atlas
# index. On serverless, retrieval just queries whatever index already exists;
# ingestion is a one-time step run from a real process (e.g. a local run or a
# Heroku dyno). See rag.ensure_ready_in_background.
if not os.getenv("VERCEL"):
    rag.ensure_ready_in_background()


# ---------------------------------------------------------------------------
# Pages
# ---------------------------------------------------------------------------


@app.route("/")
def index():
    has_photo = os.path.exists(os.path.join(app.static_folder, "headshot.jpg"))
    return render_template(
        "index.html",
        has_photo=has_photo,
        identity=data.IDENTITY,
        links=data.LINKS,
        featured=data.FEATURED,
        cases=data.CASES,
        experience=data.EXPERIENCE,
        publication=data.PUBLICATION,
        archive=data.ARCHIVE,
        canonical=CANONICAL,
    )


@app.route("/bibi")
def bibi():
    return render_template("bibi.html")


SCRIBE_URL = "https://meetingscribe.insforge.site/"


@app.route("/scribe")
def scribe():
    # The real MeetingScribe product site lives off-domain. Keep the printed
    # shariquekhatri.com/scribe link (resume, Apple deck) resolving to it.
    return redirect(SCRIBE_URL, code=302)


@app.route("/resume")
def resume():
    # The PDF is served from /static by the CDN (and by Flask locally); point
    # the friendly /resume link at it rather than reading the file in-process,
    # which keeps it working on serverless where static is not in the bundle.
    return redirect("/static/resume.pdf", code=302)


@app.route("/llms.txt")
def llms():
    return send_from_directory(app.root_path, "llms.txt", mimetype="text/plain")


# Legacy deep links from old resumes and outreach keep resolving.
_LEGACY = {
    "/projects": "/#work",
    "/experience": "/#experience",
    "/research": "/#work",
    "/education": "/#ask",
    "/achievements": "/#ask",
    "/assistant": "/#ask",
}

for _path, _target in _LEGACY.items():

    def _make(target):
        def _redirect():
            return redirect(target, code=301)

        return _redirect

    app.add_url_rule(_path, f"legacy_{_path.strip('/')}", _make(_target))


# ---------------------------------------------------------------------------
# Assistant endpoint, rate limited
# ---------------------------------------------------------------------------

_WINDOW_SECONDS = 60
_PER_IP_LIMIT = 8
_GLOBAL_LIMIT = 40
_ip_hits: dict[str, deque] = defaultdict(deque)
_global_hits: deque = deque()


def _rate_limited(ip: str) -> bool:
    now = time.monotonic()
    bucket = _ip_hits.get(ip)
    if bucket:
        while bucket and now - bucket[0] > _WINDOW_SECONDS:
            bucket.popleft()
        if not bucket:
            del _ip_hits[ip]
            bucket = None
    while _global_hits and now - _global_hits[0] > _WINDOW_SECONDS:
        _global_hits.popleft()
    if (bucket and len(bucket) >= _PER_IP_LIMIT) or len(_global_hits) >= _GLOBAL_LIMIT:
        return True
    if len(_ip_hits) > 5_000:
        # flood of distinct keys: drop buckets that are already empty or stale
        for key in [k for k, v in _ip_hits.items() if not v or now - v[-1] > _WINDOW_SECONDS]:
            del _ip_hits[key]
    _ip_hits[ip].append(now)
    _global_hits.append(now)
    return False


def _client_ip() -> str:
    # Heroku's router appends the real client IP as the LAST value of
    # X-Forwarded-For; anything earlier is client controlled and spoofable.
    xff = request.headers.get("X-Forwarded-For", "")
    if xff:
        return xff.rsplit(",", 1)[-1].strip()
    return request.remote_addr or "?"


@app.route("/ask", methods=["POST"])
def ask():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        payload = {}
    raw = payload.get("query")
    query = raw.strip() if isinstance(raw, str) else ""
    if not query:
        return jsonify({"answer": "Ask me something first.", "source": "none"}), 400
    if len(query) > 500:
        return (
            jsonify(
                {
                    "answer": "That is a lot of question. Keep it under 500 characters, "
                    "or just email sharique.khatri@gmail.com.",
                    "source": "none",
                }
            ),
            400,
        )
    if _rate_limited(_client_ip()):
        return (
            jsonify(
                {
                    "answer": "You are asking faster than I can think. Give it a minute, "
                    "or email sharique.khatri@gmail.com.",
                    "source": "none",
                }
            ),
            429,
        )
    history = []
    raw_history = payload.get("history")
    if isinstance(raw_history, list):
        for turn in raw_history[-8:]:
            if (
                isinstance(turn, dict)
                and turn.get("role") in ("user", "assistant")
                and isinstance(turn.get("text"), str)
            ):
                history.append(
                    {"role": turn["role"], "text": turn["text"][:500]}
                )
    text, source = answer(query, history)
    return jsonify({"answer": text, "source": source})


# ---------------------------------------------------------------------------
# Discovery plumbing
# ---------------------------------------------------------------------------


@app.route("/robots.txt")
def robots():
    body = f"User-agent: *\nAllow: /\nSitemap: {CANONICAL}/sitemap.xml\n"
    return Response(body, mimetype="text/plain")


@app.route("/sitemap.xml")
def sitemap():
    # /scribe 302s off-domain, so it is intentionally not in the sitemap.
    pages = ["/", "/bibi"]
    urls = "".join(
        f"<url><loc>{CANONICAL}{p}</loc><changefreq>monthly</changefreq></url>"
        for p in pages
    )
    body = (
        '<?xml version="1.0" encoding="UTF-8"?>'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        f"{urls}</urlset>"
    )
    return Response(body, mimetype="application/xml")


@app.errorhandler(404)
def not_found(_err):
    return render_template("404.html"), 404


@app.after_request
def headers(resp: Response) -> Response:
    resp.headers.setdefault("X-Content-Type-Options", "nosniff")
    resp.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    resp.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    resp.headers.setdefault(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self' 'unsafe-inline'; "
        "style-src 'self' 'unsafe-inline'; font-src 'self'; "
        "img-src 'self' data:; connect-src 'self'; frame-ancestors 'self'",
    )
    if request.path.startswith("/static/"):
        resp.headers.setdefault("Cache-Control", "public, max-age=86400")
    return resp


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", 5001)),
        debug=os.getenv("FLASK_DEBUG") == "1",
    )
