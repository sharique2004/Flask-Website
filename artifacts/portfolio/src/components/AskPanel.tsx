import { useState, useRef } from "react";

interface HistoryTurn {
  role: "user" | "assistant";
  text: string;
}

function esc(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderMarkdown(text: string): string {
  const safe = esc(text).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const blocks: string[] = [];
  let list: string[] | null = null;
  safe.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      if (!list) list = [];
      list.push("<li>" + trimmed.slice(2) + "</li>");
      return;
    }
    if (list) {
      blocks.push("<ul>" + list.join("") + "</ul>");
      list = null;
    }
    if (trimmed) blocks.push("<p>" + trimmed + "</p>");
  });
  if (list) blocks.push("<ul>" + (list as string[]).join("") + "</ul>");
  return blocks.join("");
}

export function AskPanel() {
  const [answer, setAnswer] = useState<{ q: string; html: string } | null>(null);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const historyRef = useRef<HistoryTurn[]>([]);

  async function ask(question: string) {
    if (thinking || !question.trim()) return;
    const q = question.trim();
    setInput("");
    setThinking(true);
    setAnswer({ q, html: "" }); // show thinking state

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          history: historyRef.current.slice(-8),
        }),
      });
      const data = await res.json();
      const reply =
        data.answer ||
        "No answer returned. Email sharique.khatri@gmail.com instead.";

      setAnswer({ q, html: renderMarkdown(reply) });
      historyRef.current = [
        ...historyRef.current,
        { role: "user", text: q },
        { role: "assistant", text: reply },
      ];
    } catch {
      setAnswer({
        q,
        html: "<p>Something went wrong. Reach out at sharique.khatri@gmail.com.</p>",
      });
    } finally {
      setThinking(false);
    }
  }

  return (
    <section className="section ask-section" id="ask" aria-label="Ask about the work">
      <p className="section-label">Ask</p>
      <p className="ask-sub">
        Anything about the work, the stack, the numbers. Answers from verified facts only.
      </p>

      <form
        className="ask-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) ask(input);
        }}
      >
        <label className="visually-hidden" htmlFor="ask-q">Your question</label>
        <div className="ask-bar glass">
          <input
            id="ask-q"
            name="q"
            type="text"
            maxLength={500}
            autoComplete="off"
            placeholder="e.g. how does the RAG pipeline work?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="ask-send"
            aria-label="Ask"
            aria-busy={thinking}
          >
            {thinking ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity=".25"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur=".8s" repeatCount="indefinite"/>
                </path>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            )}
          </button>
        </div>
      </form>

      {answer && (
        <div className={`ask-answer fx rv in${thinking ? " ask-thinking" : ""}`} aria-live="polite">
          <p className="ask-q">{answer.q}</p>
          {thinking ? (
            <p className="ask-loading">Thinking…</p>
          ) : (
            <div
              className="ask-body"
              dangerouslySetInnerHTML={{ __html: answer.html }}
            />
          )}
        </div>
      )}
    </section>
  );
}
