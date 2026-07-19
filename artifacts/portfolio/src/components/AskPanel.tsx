import { useState, useRef } from "react";

interface HistoryTurn {
  role: "user" | "assistant";
  text: string;
}

const SUGGESTED_QUESTIONS = [
  "What did you ship at WellX?",
  "Which project are you proudest of?",
  "What are you looking for next?",
];

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
    if (list) { blocks.push("<ul>" + list.join("") + "</ul>"); list = null; }
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
    setAnswer({ q, html: "" });

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, history: historyRef.current.slice(-8) }),
      });
      const data = await res.json();
      const reply = data.answer || "No answer returned. Email sharique.khatri@gmail.com instead.";
      setAnswer({ q, html: renderMarkdown(reply) });
      historyRef.current = [
        ...historyRef.current,
        { role: "user", text: q },
        { role: "assistant", text: reply },
      ];
    } catch {
      setAnswer({ q, html: "<p>Something went wrong. Try sharique.khatri@gmail.com.</p>" });
    } finally {
      setThinking(false);
    }
  }

  return (
    <section className="section" id="ask" aria-label="Ask about the work">
      <div className="qa-glass glass">

        {/* input row */}
        <form
          className="qa-form"
          onSubmit={(e) => { e.preventDefault(); if (input.trim()) ask(input); }}
        >
          <label className="visually-hidden" htmlFor="qa-input">Ask about the work</label>
          <input
            id="qa-input"
            className="qa-input"
            type="text"
            maxLength={500}
            autoComplete="off"
            spellCheck={false}
            placeholder="Ask me anything about my work…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className={`qa-send${thinking ? " qa-busy" : ""}`}
            aria-label="Send"
            aria-busy={thinking}
            disabled={thinking || !input.trim()}
          >
            {thinking ? (
              <svg className="qa-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity=".2"/>
                <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 3 9.7 14.3" />
                <path d="m21 3-7 18-4.3-6.7L3 10Z" />
              </svg>
            )}
          </button>
        </form>

        {!answer && (
          <div className="qa-suggestions" aria-label="Suggested questions">
            <span className="qa-suggestions-label">Not sure where to start? Try one:</span>
            <div className="qa-prompts">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="qa-suggestion"
                  onClick={() => ask(question)}
                  disabled={thinking}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* answer */}
        {answer && (
          <>
            <div className="qa-rule" aria-hidden="true" />
            <div className={`qa-answer${thinking ? " qa-answer-thinking" : ""}`} aria-live="polite">
              <span className="qa-q">{answer.q}</span>
              {thinking ? (
                <span className="qa-dots" aria-label="Thinking">
                  <span /><span /><span />
                </span>
              ) : (
                <div className="qa-body" dangerouslySetInnerHTML={{ __html: answer.html }} />
              )}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
