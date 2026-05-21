/* ============================================================
   sk/os — mobile renderer
   Pulls from window.SKDATA (portfolio-data.js) and paints the
   mobile shell that lives in templates/index.html. Wires the
   Ask form to the same /ask Flask endpoint the desktop uses.
============================================================ */
(function () {
  const D = window.SKDATA;
  if (!D) return; // data not loaded yet — bail safely

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));

  /* ─────────── CLOCK ─────────── */
  const clock = document.getElementById("mobClock");
  function tickClock() {
    if (!clock) return;
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    clock.textContent = `${hh}:${mm}`;
  }
  tickClock();
  setInterval(tickClock, 30 * 1000);

  /* ─────────── WORK TIMELINE ─────────── */
  const workMount = document.getElementById("mobWork");
  if (workMount) {
    workMount.innerHTML = D.EXPERIENCE.map((x) => `
      <article class="mob-xp">
        <div class="mob-xp-date">
          ${esc(x.date.from)} → ${x.current ? `<span class="now">${esc(x.date.to)}</span>` : esc(x.date.to)}
        </div>
        <h3 class="mob-xp-role">${esc(x.role)}</h3>
        <div class="mob-xp-org">
          <span>${esc(x.org)}</span>
          <span class="sep">·</span>
          <span class="loc">${esc(x.loc)}</span>
        </div>
        <ul class="mob-xp-bullets">
          ${x.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}
        </ul>
        <div class="mob-tags">
          ${x.tags.map((t) => `<span class="mob-tag">${esc(t)}</span>`).join("")}
        </div>
      </article>
    `).join("");
  }

  /* ─────────── PROJECTS ─────────── */
  const projTabs = document.getElementById("mobProjTabs");
  const projMount = document.getElementById("mobProj");
  let projFilter = "All";

  function paintProjects() {
    if (!projMount) return;
    const filtered = D.PROJECTS.filter((p) => projFilter === "All" || p.cat === projFilter);
    projMount.innerHTML = filtered.map((p) => `
      <a class="mob-pj" href="${esc(p.url)}" target="_blank" rel="noopener">
        <div class="mob-pj-head">
          <span>updated ${esc(p.updated)}</span>
          <span class="mob-pj-cat">${esc(p.cat)}</span>
        </div>
        <h3 class="mob-pj-name">${esc(p.name)}</h3>
        <p class="mob-pj-summary">${esc(p.summary)}</p>
        <div class="mob-tags">
          ${p.tech.map((t) => `<span class="mob-tag">${esc(t)}</span>`).join("")}
        </div>
        <div class="mob-pj-foot">
          <span>${filtered.length === 1 ? "1 result" : ""}</span>
          <span class="arrow">open ↗</span>
        </div>
      </a>
    `).join("");
  }

  if (projTabs) {
    projTabs.innerHTML = D.PROJECT_CATS.map((c) =>
      `<button class="mob-tab ${c === projFilter ? "active" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`
    ).join("");
    projTabs.addEventListener("click", (e) => {
      const tab = e.target.closest(".mob-tab");
      if (!tab) return;
      projFilter = tab.dataset.cat;
      projTabs.querySelectorAll(".mob-tab").forEach((t) =>
        t.classList.toggle("active", t.dataset.cat === projFilter)
      );
      paintProjects();
    });
    paintProjects();
  }

  /* ─────────── RESEARCH ─────────── */
  const researchMount = document.getElementById("mobResearch");
  if (researchMount) {
    researchMount.innerHTML = D.RESEARCH.map((r, i) => `
      <article class="mob-rs">
        <div class="mob-rs-idx">[${String(i + 1).padStart(2, "0")}]</div>
        <div class="mob-rs-cat">${esc(r.cat)}</div>
        <h3 class="mob-rs-title">${esc(r.title)}</h3>
        <p class="mob-rs-desc">${esc(r.desc)}</p>
        <div class="mob-tags">
          ${r.tags.map((t) => `<span class="mob-tag">${esc(t)}</span>`).join("")}
        </div>
        ${r.url
          ? `<a class="mob-rs-link" href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.cite)}</a>`
          : `<span class="mob-rs-link" style="color:var(--ink-faint)">${esc(r.cite)}</span>`
        }
      </article>
    `).join("");
  }

  /* ─────────── PROFILE ─────────── */
  const profileMount = document.getElementById("mobProfile");
  if (profileMount) {
    const p = D.PROFILE;
    const eduHtml = D.EDUCATION.map((e) => `
      <div class="mob-edu">
        <div class="mob-edu-school">${esc(e.school)}</div>
        <div class="mob-edu-deg">${esc(e.deg)}</div>
        ${e.rows.map((r) =>
          `<div class="mob-edu-row"><span class="k">${esc(r.k)}</span><span class="v">${esc(r.v)}</span></div>`
        ).join("")}
        <div class="mob-edu-badges">
          ${e.badges.map((b) => `<span class="mob-edu-badge">${esc(b)}</span>`).join("")}
        </div>
      </div>
    `).join("");

    const skillsHtml = Object.entries(D.SKILLS).map(([cat, list]) => `
      <div class="mob-sk-cluster">
        <div class="mob-sk-label">${esc(cat)} <span style="color:var(--ink-disabled)">· ${list.length}</span></div>
        <div class="mob-sk-pills">
          ${list.map((s) =>
            `<span class="mob-sk-pill ${s.lvl === "daily" ? "daily" : ""}" title="${esc(s.lvl)}">${esc(s.name)}</span>`
          ).join("")}
        </div>
      </div>
    `).join("");

    profileMount.innerHTML = `
      <div class="mob-pf-card">
        <div class="mob-pf-avatar">SK</div>
        <div class="mob-pf-name">${esc(p.name)}</div>
        <div class="mob-pf-handle">${esc(p.handle)}</div>
        <p class="mob-pf-bio">${esc(p.bio)}</p>
        <div class="mob-pf-stats">
          ${p.stats.map((s) => `
            <div class="mob-pf-stat">
              <span class="k">${esc(s.k)}</span>
              <span class="dots"></span>
              <span class="v">${esc(s.v)}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="mob-pf-h3">education</div>
      ${eduHtml}

      <div class="mob-pf-h3">technical stack</div>
      ${skillsHtml}

      <div class="mob-pf-h3">contact</div>
      <div class="mob-pf-card">
        <div class="mob-pf-stats" style="border-top:0; padding-top:0;">
          <div class="mob-pf-stat"><span class="k">email</span><span class="dots"></span><span class="v"><a style="color:var(--indigo)" href="mailto:sharique@psu.edu">sharique@psu.edu</a></span></div>
          <div class="mob-pf-stat"><span class="k">github</span><span class="dots"></span><span class="v"><a style="color:var(--indigo)" href="https://github.com/sharique2004" target="_blank">@sharique2004</a></span></div>
          <div class="mob-pf-stat"><span class="k">linkedin</span><span class="dots"></span><span class="v"><a style="color:var(--indigo)" href="https://www.linkedin.com/in/sharique-khatri/" target="_blank">/in/sharique-khatri</a></span></div>
        </div>
      </div>
    `;
  }

  /* ─────────── ASK (chat) ─────────── */
  const askForm = document.getElementById("mobAskForm");
  const askInput = document.getElementById("mobAskInput");
  const askFeed = document.getElementById("mobAskFeed");
  const askChips = document.getElementById("mobAskChips");

  async function mobAsk(q) {
    if (!q || !askFeed) return;
    askInput.value = "";

    askFeed.insertAdjacentHTML("beforeend", `
      <div class="mob-msg-user"><span class="prompt">you@sk:~$</span><div class="text">${esc(q)}</div></div>
      <div class="mob-msg-bot" id="mobAskPending">
        <span class="prompt">sk@bibi:~$</span>
        <div class="text"><span class="mob-thinking"><span></span><span></span><span></span></span></div>
      </div>
    `);
    askFeed.scrollIntoView({ behavior: "smooth", block: "end" });

    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();
      const answer = (data && data.answer) ? data.answer : "(no response)";
      const provider = (data && data.provider) ? data.provider : "unknown";
      const color = provider === "gemini" ? "var(--indigo)"
        : provider === "cohere (fallback)" ? "var(--amber)"
        : "var(--ink-faint)";
      const pending = document.getElementById("mobAskPending");
      if (pending) {
        pending.querySelector(".text").innerHTML =
          esc(answer.trim()) +
          `<div class="src">retrieved · MongoDB Atlas · <span style="color:${color}">${esc(provider)}</span></div>`;
        pending.id = "";
      }
    } catch (e) {
      const pending = document.getElementById("mobAskPending");
      if (pending) {
        pending.querySelector(".text").innerHTML =
          `Couldn't reach the model. Try again, or email <a style="color:var(--indigo)" href="mailto:sharique@psu.edu">sharique@psu.edu</a>.`;
        pending.id = "";
      }
    }
  }

  if (askForm) {
    askForm.addEventListener("submit", (e) => {
      e.preventDefault();
      mobAsk(askInput.value.trim());
    });
  }
  if (askChips) {
    askChips.addEventListener("click", (e) => {
      const chip = e.target.closest(".mob-chip");
      if (!chip) return;
      mobAsk(chip.dataset.q);
    });
  }

})();
