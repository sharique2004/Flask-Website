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
    if (trimmed.indexOf("- ") === 0) {
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
  // @ts-ignore – list narrowed to never by TS across forEach closure; safe at runtime
  if (list) blocks.push("<ul>" + (list as string[]).join("") + "</ul>");
  return blocks.join("");
}

const CHIPS = [
  "Tell me about Sharique",
  "What did you build at WellX?",
  "Do you need visa sponsorship?",
  "What is Bibi?",
];

export function AskPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      who: "Mini Sharique",
      text: "Ask me about the work. I only answer from verified facts, so I'd rather say less than make something up.",
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
    setInput("");

    const userMsg: Message = { who: "You", text: question, isMe: false };
    const pendingMsg: Message = {
      who: "Mini Sharique",
      text: "thinking",
      isMe: true,
      thinking: true,
    };

    setMessages((prev) => [...prev, userMsg, pendingMsg]);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: question,
          history: historyRef.current.slice(-8),
        }),
      });
      const data = await res.json();
      const reply =
        data.answer ||
        "No answer came back. Email sharique.khatri@gmail.com instead.";

      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1
            ? { who: "Mini Sharique", text: reply, isMe: true, html: renderMarkdown(reply) }
            : m
        )
      );

      historyRef.current = [
        ...historyRef.current,
        { role: "user", text: question },
        { role: "assistant", text: reply },
      ];
    } catch {
      setMessages((prev) =>
        prev.map((m, i) =>
          i === prev.length - 1
            ? {
                who: "Mini Sharique",
                text: "Something went wrong on the wire. The reliable channel is sharique.khatri@gmail.com.",
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
    <section className="section" id="ask">
      <h2 className="sec">Questions? Ask the small version of me.</h2>

      <div className="ask-card glass refract">
        <div
          className="ask-log"
          id="chat-log"
          role="log"
          aria-live="polite"
          aria-label="Assistant conversation"
          ref={logRef}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`msg${msg.isMe ? " me" : ""}${msg.thinking ? " thinking" : ""}`}>
              <span className="who">{msg.who}</span>
              {msg.html ? (
                <div
                  className="txt"
                  dangerouslySetInnerHTML={{ __html: msg.html }}
                />
              ) : (
                <div className="txt">{msg.text}</div>
              )}
            </div>
          ))}
        </div>

        <form
          className="ask-input"
          id="chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) ask(input.trim());
          }}
        >
          <label className="visually-hidden" htmlFor="chat-q">
            Your question
          </label>
          <input
            id="chat-q"
            name="q"
            type="text"
            maxLength={500}
            autoComplete="off"
            placeholder="What did you build at WellX?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={busy}
          />
          <button type="submit" className="btn" aria-busy={busy}>
            Ask
          </button>
        </form>

        <div className="chips" id="chat-chips">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              className="chip"
              type="button"
              onClick={() => ask(chip)}
              disabled={busy}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <p className="ask-note">
        Gemini · portfolio context · same pattern as my WellX AI work. No chat
        history is stored.
      </p>
    </section>
  );
}
