import { useEffect } from "react";
import { useGlassEffects } from "../hooks/useGlassEffects";

export default function Bibi() {
  useGlassEffects();

  useEffect(() => {
    document.title = "Bibi — a voice co-pilot that flies your PC";
  }, []);

  return (
    <>
      <style>{`
        :root{
          --bg:#09090d;
          --bg-2:#0c0c12;
          --panel:#0f0f16;
          --panel-2:#12121b;
          --line:rgba(255,255,255,0.09);
          --line-soft:rgba(255,255,255,0.055);
          --ink:#e9e9ee;
          --ink-2:#a4a4b0;
          --ink-3:#6c6c79;
          --ink-4:#4a4a56;
          --orange:#ff6a1a;
          --orange-soft:rgba(255,106,26,0.14);
          --orange-line:rgba(255,106,26,0.34);
          --indigo:#7b78f0;
          --indigo-dim:#5552b8;
          --serif:"Instrument Serif",Georgia,"Times New Roman",serif;
          --sans:"Inter",system-ui,-apple-system,sans-serif;
          --mono:"JetBrains Mono",ui-monospace,"SF Mono",Menlo,monospace;
          --maxw:1120px;
        }
        *{box-sizing:border-box}
        html{-webkit-text-size-adjust:100%}
        body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);-webkit-font-smoothing:antialiased;overflow-x:hidden}
      `}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "60px 24px" }}>
        <a
          href="/"
          style={{
            color: "var(--ink-2)",
            textDecoration: "none",
            fontSize: "14px",
            display: "inline-block",
            marginBottom: "48px",
          }}
        >
          ← shariquekhatri.com
        </a>

        <header style={{ marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--orange)",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            local first voice agent · windows · MIT
          </p>
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              lineHeight: 1.08,
              fontWeight: 400,
              margin: "0 0 24px",
              color: "var(--ink)",
            }}
          >
            A voice agent that flies a real PC.
          </h1>
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--ink-2)",
              lineHeight: 1.65,
              maxWidth: "640px",
              margin: "0 0 32px",
            }}
          >
            Say its name and it opens apps, moves the real mouse, reads the
            screen, and answers out loud. A custom agent loop routes each
            request across local models and Claude by task signal, cost, and
            latency.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="https://github.com/sharique2004/pc-assistant"
              target="_blank"
              rel="noopener"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--orange)",
                color: "#fff",
                padding: "12px 22px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              View on GitHub
            </a>
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--panel)",
                color: "var(--ink-2)",
                padding: "12px 22px",
                borderRadius: "8px",
                fontWeight: 500,
                fontSize: "15px",
                textDecoration: "none",
                border: "1px solid var(--line)",
              }}
            >
              Back to portfolio
            </a>
          </div>
        </header>

        <div
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "64px",
          }}
        >
          <video
            controls
            poster="/bibi-poster.jpg"
            style={{ width: "100%", display: "block" }}
          >
            <source src="/bibi-demo.mp4" type="video/mp4" />
            Your browser does not support video.
          </video>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "64px",
          }}
        >
          {[
            {
              title: "Voice-first",
              body: "Say 'Bibi' and describe what you need. It parses intent, routes to the right tool, and executes — no GUI, no clicks.",
            },
            {
              title: "Real mouse control",
              body: "Uses computer vision to find UI elements and moves the actual system mouse. It doesn't simulate — it acts.",
            },
            {
              title: "Local-first",
              body: "Runs faster-whisper for transcription locally. Routes heavy reasoning to Claude only when needed. Your data stays on device.",
            },
            {
              title: "Custom agent loop",
              body: "A signal-based router decides which model handles each request based on task type, cost, and latency constraints.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "12px",
                padding: "28px",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  margin: "0 0 12px",
                  color: "var(--ink)",
                }}
              >
                {item.title}
              </h3>
              <p style={{ margin: 0, color: "var(--ink-2)", lineHeight: 1.6, fontSize: "15px" }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: "12px",
            padding: "32px",
            marginBottom: "64px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              fontWeight: 600,
              marginBottom: "12px",
            }}
          >
            Stack
          </p>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "14px",
              color: "var(--indigo)",
              margin: 0,
              lineHeight: 1.8,
            }}
          >
            Python · Flask · Electron · faster-whisper · Ollama · Claude
          </p>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <a href="/" style={{ color: "var(--ink-2)", textDecoration: "none", fontSize: "14px" }}>
            ← Back to portfolio
          </a>
          <a
            href="https://github.com/sharique2004/pc-assistant"
            target="_blank"
            rel="noopener"
            style={{ color: "var(--orange)", textDecoration: "none", fontSize: "14px" }}
          >
            github.com/sharique2004/pc-assistant ↗
          </a>
        </div>
      </div>
    </>
  );
}
