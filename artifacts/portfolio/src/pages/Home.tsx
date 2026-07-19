import { useEffect } from "react";
import { useGlassEffects } from "../hooks/useGlassEffects";
import { Nav } from "../components/Nav";
import { AskPanel } from "../components/AskPanel";
import { IconSprite, Pills } from "../components/IconSprite";
import {
  IDENTITY,
  LINKS,
  FEATURED,
  CASES,
  EXPERIENCE,
  PUBLICATION,
  ARCHIVE,
} from "../data/portfolio";

export default function Home() {
  useGlassEffects();

  useEffect(() => {
    document.title = "Sharique Khatri · Applied AI Engineer";
  }, []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      {/* Inline SVG sprite for brand icons */}
      <IconSprite />

      <div className="aurora" aria-hidden="true">
        <b /><b /><b /><b /><i />
      </div>

      <Nav />

      <main id="main" className="wrap">
        {/* ============ HERO ============ */}
        <header className="hero">
          <div>
            <div className="status">
              <span className="dot" aria-hidden="true" />
              Applied AI Engineer · Penn State CS, May 2026
            </div>
            <h1>
              I build software that real people{" "}
              <span className="a">depend on</span>, not demos.
            </h1>
            <p className="lede">
              Built production RAG serving <b>10,000+ users</b> at WellX AI.
              Co authored a benchmark paper{" "}
              <b>accepted at ECCV 2026</b>. Two local first products live on
              this domain. I look for the unglamorous fix first.
            </p>
            <div className="cta">
              <a className="btn primary" href={`mailto:${LINKS.email}`}>
                <span className="sweep" aria-hidden="true" />
                {LINKS.email}
              </a>
              <a className="btn ghost" href={LINKS.github} target="_blank" rel="noopener">
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                GitHub
              </a>
              <a className="btn ghost" href={LINKS.linkedin} target="_blank" rel="noopener">LinkedIn</a>
              <a className="btn ghost" href="/resume" target="_blank" rel="noopener">Resume</a>
            </div>
            <p className="meta">
              San Francisco, CA · open to{" "}
              <b>New York, Seattle, Dubai, and the Bay Area</b>
            </p>
          </div>

          <figure className="photo glass">
            <img
              src="/headshot.jpg"
              alt="Sharique Khatri"
              width={640}
              height={800}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                const fb = e.currentTarget.parentElement?.querySelector(
                  ".photo-fallback"
                ) as HTMLElement | null;
                if (fb) fb.style.display = "flex";
              }}
            />
            <div
              className="photo-fallback"
              role="img"
              aria-label="Initials of Sharique Khatri"
              style={{ display: "none" }}
            >
              SK
            </div>
            <figcaption>San Francisco, CA</figcaption>
          </figure>
        </header>

        {/* ============ ASK ============ */}
        <AskPanel />

        {/* ============ PRODUCTS ============ */}
        <section className="section" id="work">
          <h2 className="sec">Built, shipped, and documented.</h2>
          <p className="sec-intro">
            Everything below is clickable and verifiable. Live links, real
            repos, honest scope.
          </p>

          <div className="grid2">
            {FEATURED.map((f, idx) => (
              <article
                key={f.slug}
                className="card fx rv"
                style={{ "--i": idx } as React.CSSProperties}
              >
                <span className="sweep" aria-hidden="true" />
                <div className="k">{f.kicker}</div>
                <h3>
                  <a
                    href={f.page}
                    {...(f.external ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {f.name}
                  </a>
                </h3>
                <div className="stack">
                  <Pills stack={f.stack} />
                </div>
                <div className="lk">
                  <a
                    className="lk-demo"
                    href={f.page}
                    {...(f.external ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    Live demo <span aria-hidden="true">↗</span>
                  </a>
                  {f.repo && (
                    <a className="lk-src" href={f.repo} target="_blank" rel="noopener">
                      Source
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="cases">
            {CASES.map((c, idx) => (
              <article
                key={c.name}
                className="case fx lit rv"
                style={{ "--i": idx } as React.CSSProperties}
              >
                <div className="case-id">
                  <h3>{c.name}</h3>
                  <span className="k">{c.kicker}</span>
                </div>
                <div className="stack">
                  <Pills stack={c.stack} />
                </div>
                <span className="lk">
                  {c.links.map(([label, url]) => (
                    <a key={label} href={url} target="_blank" rel="noopener">
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </a>
                  ))}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section className="section" id="experience">
          <h2 className="sec">Where the numbers come from.</h2>

          <div className="timeline">
            {EXPERIENCE.map((e, idx) => (
              <article
                key={e.company + e.dates}
                className={`t-entry rv${e.is_current ? " is-current" : ""}`}
                style={{ "--i": idx } as React.CSSProperties}
              >
                <h3 className="t-role">
                  {e.role}{" "}
                  <span className="t-co">· {e.company}</span>
                </h3>
                <p className="t-meta">
                  {e.where} · {e.dates}
                </p>
                {e.highlight && (
                  <span className="t-chip">{e.highlight}</span>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ============ ARCHIVE ============ */}
        <section className="section" id="archive">
          <h2 className="sec">Smaller builds, same standard.</h2>
          <details className="others fx">
            <summary>
              <span className="others-label">Other projects</span>
              <span className="others-count">{ARCHIVE.length}</span>
              <svg
                className="chev"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="others-body">
              {ARCHIVE.map(([name, desc, url]) =>
                url ? (
                  <a key={name} className="arc" href={url} target="_blank" rel="noopener">
                    <span className="nm">{name}</span>
                    <span className="ds">{desc}</span>
                    <span className="go" aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <div key={name} className="arc">
                    <span className="nm">{name}</span>
                    <span className="ds">{desc}</span>
                    <span className="go" />
                  </div>
                )
              )}
            </div>
          </details>
        </section>
      </main>

      <footer>
        <div className="foot fx">
          <div className="col who">
            <span className="nm">Sharique Khatri</span>
            <p>{IDENTITY.line}</p>
          </div>
          <div className="col">
            <span className="lbl2">Work</span>
            <a href="/bibi">Bibi</a>
            <br />
            <a href="/scribe">MeetingScribe</a>
            <br />
            <a href={PUBLICATION.url} target="_blank" rel="noopener">
              OmniSch, ECCV 2026
            </a>
          </div>
          <div className="col">
            <span className="lbl2">Contact</span>
            <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
            <br />
            <a href={LINKS.github} target="_blank" rel="noopener">
              github.com/sharique2004
            </a>
            <br />
            <a href={LINKS.linkedin} target="_blank" rel="noopener">
              linkedin.com/in/sharique-khatri
            </a>
            <br />
            <a href="/resume" target="_blank" rel="noopener">
              resume (pdf)
            </a>
          </div>
        </div>
        <div className="foot-line">
          Built with React. Self hosted fonts, no trackers, no analytics, no
          cookies. Verified numbers only; every claim links to its source.
        </div>
      </footer>
    </>
  );
}
