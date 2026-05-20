/* ============================================================
   sk/os — app renderers
============================================================ */
(function () {
  const D = window.SKDATA;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

  /* ------- Window chrome wrapper ------- */
  function chrome({ app, title, statusLeft = "", statusRight = "", body, actions = "—" }) {
    return `
      <div class="win-titlebar">
        <div class="win-ctrls">
          <span class="win-ctrl close" data-close></span>
          <span class="win-ctrl min"></span>
          <span class="win-ctrl max"></span>
        </div>
        <div class="win-title"><span class="wt-app">${esc(app)}</span> <span style="color:var(--ink-faint)">— ${esc(title)}</span></div>
        <div class="win-actions">${actions}</div>
      </div>
      <div class="win-body">${body}</div>
      <div class="win-statusbar">
        <div class="wsb-left">${statusLeft}</div>
        <div class="wsb-right">${statusRight}</div>
      </div>
    `;
  }

  /* ============================================================
     ask.sh
  ============================================================ */
  function renderAsk() {
    const body = `
      <div class="ask-shell">
        <div class="ask-header">
          <div class="ascii">${esc("> ask.sh — sk's bio, but queryable")}</div>
          <div class="meta">
            <span>model: <b>cohere · command-a</b></span>
            <span>ctx: <b>MongoDB Atlas RAG</b></span>
            <span>mode: <b>vector retrieval</b></span>
          </div>
        </div>
        <div class="ask-suggest" id="ask-suggest">
          <button class="ask-chip" data-q="What's Sharique's strongest technical area?">strongest skill</button>
          <button class="ask-chip" data-q="Tell me about the WellX AI internship.">wellx ai</button>
          <button class="ask-chip" data-q="What did he build at Fourth Square?">fourth square</button>
          <button class="ask-chip" data-q="What is Bibi?">what is bibi</button>
          <button class="ask-chip" data-q="Why should I hire him?">why hire him</button>
        </div>
        <div class="ask-feed" id="ask-feed">
          <div class="ask-msg-bot">
            <span class="prompt">sk@bibi:~$</span>
            <div class="text">
              Ask anything about Sharique's background, projects, or skills.
              Answers are grounded in a MongoDB Atlas vector index over his bio.
              Use the chips above or type a question below.
            </div>
          </div>
        </div>
        <form class="ask-input-row" id="ask-form">
          <span class="prompt">$</span>
          <input id="ask-input" class="ask-input" type="text" autocomplete="off" placeholder="ask anything…" autofocus />
        </form>
      </div>
    `;
    return chrome({
      app: "ask.sh",
      title: "RAG console",
      statusLeft: `<span>portfolio bio</span><span>· UTF-8</span>`,
      statusRight: `<span>cohere · flask</span>`,
      body,
      actions: "",
    });
  }

  function wireAsk(root) {
    const feed = root.querySelector("#ask-feed");
    const form = root.querySelector("#ask-form");
    const input = root.querySelector("#ask-input");

    async function ask(q) {
      if (!q) return;
      input.value = "";
      feed.insertAdjacentHTML("beforeend", `
        <div class="ask-msg-user"><span class="prompt">you@sk:~$</span><div class="text">${esc(q)}</div></div>
        <div class="ask-msg-bot" id="ask-pending">
          <span class="prompt">sk@bibi:~$</span>
          <div class="text"><span class="ask-thinking"><span></span><span></span><span></span></span></div>
        </div>
      `);
      feed.scrollTop = feed.scrollHeight;

      try {
        const res = await fetch("/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        });
        const data = await res.json();
        const answer = (data && data.answer) ? data.answer : "(no response)";
        const pending = root.querySelector("#ask-pending");
        if (pending) {
          pending.querySelector(".text").innerHTML =
            esc(answer.trim()) +
            '<div class="src">retrieved · MongoDB Atlas · bio_index</div>';
          pending.id = "";
        }
      } catch (e) {
        const pending = root.querySelector("#ask-pending");
        if (pending) {
          pending.querySelector(".text").innerHTML =
            `Couldn't reach the model. Try again, or email <a style="color:var(--indigo)" href="mailto:sharique@psu.edu">sharique@psu.edu</a> directly.`;
          pending.id = "";
        }
      }
      feed.scrollTop = feed.scrollHeight;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      ask(input.value.trim());
    });
    root.querySelectorAll(".ask-chip").forEach((c) => {
      c.addEventListener("click", () => ask(c.dataset.q));
    });
    setTimeout(() => input.focus(), 100);
  }

  /* ============================================================
     work — timeline
  ============================================================ */
  function renderWork() {
    const rows = D.EXPERIENCE.map((x, i) => `
      <article class="xp-row">
        <div class="xp-date">
          [${String(i + 1).padStart(2, "0")}]<br>
          ${esc(x.date.from)}<br>
          <span style="color:var(--ink-disabled)">→</span><br>
          ${x.current ? `<span class="now">${esc(x.date.to)}</span>` : esc(x.date.to)}
        </div>
        <div class="xp-body">
          <h3 class="role">${esc(x.role)}</h3>
          <div class="org">
            <span>${esc(x.org)}</span>
            <span class="sep">·</span>
            <span class="loc">${esc(x.loc)}</span>
          </div>
          <ul>${x.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
          <div class="xp-tags">${x.tags.map((t) => `<span class="xp-tag">${esc(t)}</span>`).join("")}</div>
        </div>
      </article>
    `).join("");

    const body = `
      <div class="win-content">
        <header class="work-head">
          <h1>where i've spent <em>hours</em>.</h1>
          <div class="work-meta">
            <span>${D.EXPERIENCE.length} roles</span><br>
            <span><b>~4y</b> total</span><br>
            <span>4 countries</span>
          </div>
        </header>
        ${rows}
      </div>
    `;
    return chrome({
      app: "work",
      title: "~/career/timeline.md",
      statusLeft: `<span>file: timeline.md</span>`,
      statusRight: `<span>${D.EXPERIENCE.length} entries</span><span>· readonly</span>`,
      body,
    });
  }

  /* ============================================================
     projects — file-manager grid
  ============================================================ */
  let projFilter = "All";

  function renderProjects() {
    const body = `
      <div class="win-content" id="pj-root">
        <div class="pj-toolbar">
          <div class="pj-tabs">
            ${D.PROJECT_CATS.map((c) => `<button class="pj-tab ${c === projFilter ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("")}
          </div>
          <div class="pj-count" id="pj-count">— projects</div>
        </div>
        <div class="pj-grid" id="pj-grid"></div>
      </div>
    `;
    return chrome({
      app: "projects",
      title: "~/build/shipped",
      statusLeft: `<span>${D.PROJECTS.length} files</span><span>· sorted by date</span>`,
      statusRight: `<span>list view</span>`,
      body,
    });
  }

  function paintProjects(root) {
    const grid = root.querySelector("#pj-grid");
    const count = root.querySelector("#pj-count");
    const filtered = D.PROJECTS.filter((p) => projFilter === "All" || p.cat === projFilter);
    count.textContent = `${filtered.length} ${filtered.length === 1 ? "project" : "projects"}`;
    grid.innerHTML = filtered.map((p, i) => `
      <a class="pj-card" href="${esc(p.url)}" target="_blank" rel="noopener">
        <div class="pj-card-head">
          <span>p / ${String(i + 1).padStart(2, "0")}</span>
          <span class="pj-card-cat">${esc(p.cat)}</span>
        </div>
        <h3 class="pj-name">${esc(p.name)}</h3>
        <p class="pj-summary">${esc(p.summary)}</p>
        <div class="pj-tech">${p.tech.map((t) => `<span class="pj-tech-tag">${esc(t)}</span>`).join("")}</div>
        <div class="pj-foot">
          <span>updated ${esc(p.updated)}</span>
          <span class="arrow">open ↗</span>
        </div>
      </a>
    `).join("");
  }

  function wireProjects(root) {
    paintProjects(root);
    root.querySelectorAll(".pj-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        projFilter = tab.dataset.cat;
        root.querySelectorAll(".pj-tab").forEach((t) => t.classList.toggle("active", t.dataset.cat === projFilter));
        paintProjects(root);
      });
    });
  }

  /* ============================================================
     research — academic list
  ============================================================ */
  function renderResearch() {
    const items = D.RESEARCH.map((r, i) => `
      <article class="rs-item">
        <div class="rs-idx">[${String(i + 1).padStart(2, "0")}]</div>
        <div class="rs-body">
          <div class="rs-cat">${esc(r.cat)}</div>
          <h3 class="rs-title">${esc(r.title)}</h3>
          <p class="rs-desc">${esc(r.desc)}</p>
          <div class="rs-tags">${r.tags.map((t) => `<span class="pj-tech-tag">${esc(t)}</span>`).join("")}</div>
        </div>
        ${r.url
          ? `<a class="rs-link" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.cite)}</a>`
          : `<span class="rs-link" style="color:var(--ink-faint)">${esc(r.cite)}</span>`
        }
      </article>
    `).join("");

    const body = `
      <div class="win-content">
        <h1 class="rs-intro">Academic &amp; research <em>artifacts</em>.</h1>
        <p class="rs-sub">Coursework, an arXiv co-author credit, and the capstone with Automated Logic. Sorted by recency.</p>
        ${items}
      </div>
    `;
    return chrome({
      app: "research",
      title: "~/academic/papers/",
      statusLeft: `<span>${D.RESEARCH.length} entries</span><span>· bibtex available</span>`,
      statusRight: `<span>readonly</span>`,
      body,
    });
  }

  /* ============================================================
     profile — dotfiles + skills
  ============================================================ */
  function renderProfile() {
    const p = D.PROFILE;
    const initials = "SK";
    const edu = D.EDUCATION.map((e) => `
      <div class="pf-edu-card">
        <div class="pf-edu-school">${esc(e.school)}</div>
        <div class="pf-edu-deg">${esc(e.deg)}</div>
        <div class="pf-edu-rows">
          ${e.rows.map((r) => `<div class="pf-edu-row"><span class="k">${esc(r.k)}</span><span class="v">${esc(r.v)}</span></div>`).join("")}
        </div>
        <div class="pf-edu-badges">${e.badges.map((b) => `<span class="pf-edu-badge">${esc(b)}</span>`).join("")}</div>
      </div>
    `).join("");

    const skills = Object.entries(D.SKILLS).map(([cat, list]) => `
      <div class="sk-cluster">
        <div class="sk-label">${esc(cat)} <span style="color:var(--ink-disabled)">· ${list.length}</span></div>
        <div class="sk-pills">
          ${list.map((s) => `<span class="sk-pill ${s.lvl === "daily" ? "daily" : ""}" title="${esc(s.lvl)}">${esc(s.name)}</span>`).join("")}
        </div>
      </div>
    `).join("");

    const body = `
      <div class="win-content">
        <div class="pf-grid">
          <aside class="pf-card">
            <div class="pf-avatar">${esc(initials)}</div>
            <div class="pf-name">${esc(p.name)}</div>
            <div class="pf-handle">${esc(p.handle)}</div>
            <p class="pf-bio">${esc(p.bio)}</p>
            <div class="pf-stats">
              ${p.stats.map((s) => `
                <div class="pf-stat-row">
                  <span class="k">${esc(s.k)}</span>
                  <span class="dots"></span>
                  <span class="v">${esc(s.v)}</span>
                </div>
              `).join("")}
            </div>
          </aside>
          <main>
            <section class="pf-section">
              <h3>education <span class="count">${D.EDUCATION.length} schools</span></h3>
              <div class="pf-edu">${edu}</div>
            </section>
            <section class="pf-section">
              <h3>technical stack <span class="count">tools i reach for</span></h3>
              ${skills}
            </section>
            <section class="pf-section">
              <h3>contact <span class="count">say hi</span></h3>
              <div class="pf-stats" style="border-top:0; padding-top:0;">
                <div class="pf-stat-row"><span class="k">email</span><span class="dots"></span><span class="v"><a style="color:var(--indigo)" href="mailto:sharique@psu.edu">sharique@psu.edu</a></span></div>
                <div class="pf-stat-row"><span class="k">github</span><span class="dots"></span><span class="v"><a style="color:var(--indigo)" href="https://github.com/sharique2004" target="_blank">@sharique2004</a></span></div>
                <div class="pf-stat-row"><span class="k">linkedin</span><span class="dots"></span><span class="v"><a style="color:var(--indigo)" href="https://www.linkedin.com/in/sharique-khatri/" target="_blank">/in/sharique-khatri</a></span></div>
                <div class="pf-stat-row"><span class="k">resume</span><span class="dots"></span><span class="v"><a style="color:var(--indigo)" href="#">resume.pdf ↓</a></span></div>
              </div>
            </section>
          </main>
        </div>
      </div>
    `;
    return chrome({
      app: "profile",
      title: "~/.config/sk/profile.toml",
      statusLeft: `<span>profile.toml</span><span>· last sync ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>`,
      statusRight: `<span>readonly</span>`,
      body,
    });
  }

  /* ============================================================
     Registry
  ============================================================ */
  window.SKAPPS = {
    ask:      { render: renderAsk,      wire: wireAsk,      title: "ask.sh" },
    work:     { render: renderWork,     wire: null,         title: "work" },
    projects: { render: renderProjects, wire: wireProjects, title: "projects" },
    research: { render: renderResearch, wire: null,         title: "research" },
    profile:  { render: renderProfile,  wire: null,         title: "profile" },
  };
})();
