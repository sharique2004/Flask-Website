import { useState, useRef, useEffect } from "react";

interface HistoryTurn {
  role: "user" | "assistant";
  text: string;
}

interface Message {
  who: string;
  text: string;
  isMe: boolean;
  thinking?: boolean;
  html?: string;
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
  const [messages, setMessages] = useState<Message[]>([
    {
      who: "Mini Sharique",
      text: "Ask me about the work — I only answer from verified facts.",
      isMe: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const historyRef = useRef<HistoryTurn[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  async function ask(question: string) {
    if (busy || !question.trim()) return;
    setBusy(true);
    const q = question.trim();
    setInput("");

    const userMsg: Message = { who: "You", text: q, isMe: false };
    const pendingMsg: Message = {
      who: "Mini Sharique",
      text: "Thinking…",
      isMe: true,
      thinking: true,
    };
    setMessages((prev) => [...prev, userMsg, pendingMsg]);

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

      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1
            ? {
                who: "Mini Sharique",
                text: reply,
                isMe: true,
                html: renderMarkdown(reply),
              }
            : m
        )
      );
      historyRef.current = [
        ...historyRef.current,
        { role: "user", text: q },
        { role: "assistant", text: reply },
      ];
    } catch {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1
            ? {
                who: "Mini Sharique",
                text: "Something went wrong. Reach out at sharique.khatri@gmail.com.",
                isMe: true,
              }
            : m
        )
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section" id="ask" aria-label="Ask Mini Sharique">
      <div className="chat glass">
        {/* header */}
        <div className="chat-header">
          <div className="chat-avatar" aria-hidden="true">SK</div>
          <div>
            <div className="chat-title">Mini Sharique</div>
            <span className="chat-online">online</span>
          </div>
        </div>

        {/* message log */}
        <div
          className="chat-log"
          id="chat-log"
          role="log"
          aria-live="polite"
          ref={logRef}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`msg${msg.isMe ? " me" : ""}${msg.thinking ? " thinking" : ""}`}
            >
              <span className="who">{msg.who}</span>
              {msg.html ? (
                <div className="txt" dangerouslySetInnerHTML={{ __html: msg.html }} />
              ) : (
                <div className="txt">{msg.text}</div>
              )}
            </div>
          ))}
        </div>

        <hr className="chat-divider" />

        {/* input */}
        <form
          className="chat-bar-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) ask(input);
          }}
        >
          <label className="visually-hidden" htmlFor="chat-q">Your question</label>
          <div className="chat-bar">
            <input
              id="chat-q"
              name="q"
              type="text"
              maxLength={500}
              autoComplete="off"
              placeholder="Ask about the work…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="chat-send"
              aria-label="Send"
              aria-busy={busy}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
