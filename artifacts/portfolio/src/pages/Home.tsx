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
      <IconSprite />

      <div className="aurora" aria-hidden="true">
        <b /><b /><b /><b /><i />
      </div>

      <Nav />

      <main id="main" className="wrap">

        {/* ============ HERO ============ */}
        <header className="hero">
          <div>
            <h1>
              Software that real<br />
              people{" "}
              <span className="a">depend on</span>.
            </h1>

            <div className="cta">
              <a className="btn primary" href={`mailto:${LINKS.email}`}>
                <span className="sweep" aria-hidden="true" />
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Email me
              </a>
              <a
                className="btn icon-only"
                href={LINKS.github}
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
              <a
                className="btn icon-only"
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.047c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.119 20.452H3.555V9H7.12v11.452z" />
                </svg>
              </a>
              <a
                className="btn icon-only"
                href={LINKS.x}
                target="_blank"
                rel="noopener"
                aria-label="X"
                title="X"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </a>
              <a className="btn" href="/resume" target="_blank" rel="noopener">Résumé</a>
            </div>

            {/* key stat chips */}
            <div className="hero-stats">
              <div className="hstat">
                <span className="hstat-val">10K+</span>
                <span className="hstat-lbl">prod users<br />at WellX AI</span>
              </div>
              <div className="hstat">
                <span className="hstat-val">ECCV</span>
                <span className="hstat-lbl">2026 paper<br />accepted</span>
              </div>
              <div className="hstat">
                <span className="hstat-val">1st</span>
                <span className="hstat-lbl">hackathon<br />2026</span>
              </div>
            </div>

            <p className="meta">
              San Francisco · open to{" "}
              <b>NYC, Seattle, Dubai, Bay Area</b>
            </p>
          </div>

          <div className="photo-wrap">
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
          </div>
        </header>

        {/* ============ ASK ============ */}
        <AskPanel />

        {/* ============ PRODUCTS ============ */}
        <section className="section" id="work">
          <p className="section-label">Selected work</p>
          <h2 className="sec">Built, shipped, verified.</h2>

          <div className="grid2">
            {FEATURED.map((f, idx) => (
              <article
                key={f.slug}
                className="card fx rv"
                data-n={String(idx + 1).padStart(2, "0")}
                style={{ "--i": idx } as React.CSSProperties}
              >
                <span className="sweep" aria-hidden="true" />
                <div className="card-head">
                  <div className="k">{f.kicker}</div>
                  {f.award && (
                    <span className="award-chip">
                      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      1st Place
                    </span>
                  )}
                </div>
                <h3>
                  <a href={f.page} target="_blank" rel="noopener">
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
                    target="_blank"
                    rel="noopener"
                  >
                    View ↗
                  </a>
                  {f.repo && (
                    <a className="lk-src" href={f.repo} target="_blank" rel="noopener">
                      Source
                    </a>
                  )}
                  {f.download && (
                    <a
                      className="lk-src"
                      href={f.download}
                      target="_blank"
                      rel="noopener"
                    >
                      Download for Mac
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
                      {label.charAt(0).toUpperCase() + label.slice(1)} ↗
                    </a>
                  ))}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section className="section" id="experience">
          <p className="section-label">Experience</p>
          <h2 className="sec">Where the numbers come from.</h2>

          <div className="timeline">
            {EXPERIENCE.map((e, idx) => (
              <div
                key={e.company + e.dates}
                className={`t-entry rv${e.is_current ? " is-current" : ""}`}
                style={{ "--i": idx } as React.CSSProperties}
              >
                <div className="t-card fx">
                  <div className="t-header">
                    <h3 className="t-role">
                      {e.role}
                      <span className="t-co"> · {e.company}</span>
                    </h3>
                    <span className="t-date">{e.dates}</span>
                  </div>
                  <p className="t-where">{e.where}</p>
                  {e.highlight && (
                    <span className="t-chip">{e.highlight}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============ ARCHIVE ============ */}
        <section className="section" id="archive">
          <p className="section-label">Archive</p>
          <h2 className="sec">More builds, same bar.</h2>
          <details className="others fx" style={{ marginTop: "24px" }}>
            <summary>
              <span className="others-label">All projects</span>
              <span className="others-count">{ARCHIVE.length}</span>
              <svg
                className="chev"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
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

      <footer className="foot">
        <div className="foot-top">
          <div className="col who">
            <span className="nm">Sharique Khatri</span>
            <p>{IDENTITY.line}</p>
          </div>
          <div className="foot-links">
            <div className="col">
              <span className="lbl2">Work</span>
              <a href="/bibi" target="_blank" rel="noopener">Bibi</a>
              <a href="https://meetingscribe.shariquekhatri.com/" target="_blank" rel="noopener">MeetingScribe</a>
              <a href={PUBLICATION.url} target="_blank" rel="noopener">OmniSch · ECCV 2026</a>
            </div>
            <div className="col">
              <span className="lbl2">Contact</span>
              <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
              <a href={LINKS.github} target="_blank" rel="noopener">github/sharique2004</a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener">linkedin/sharique-khatri</a>
              <a href={LINKS.x} target="_blank" rel="noopener">x/ShariqueKhatri</a>
              <a href="/resume" target="_blank" rel="noopener">résumé (pdf)</a>
            </div>
          </div>
        </div>
        <div className="foot-line">
          Built with React · No trackers · No cookies · Every claim verified
        </div>
      </footer>
    </>
  );
}
