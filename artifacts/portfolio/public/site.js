/* shariquekhatri.com — Aurora Glass 2.0 motion.
   One rAF loop with exponential smoothing drives the aurora glow; per-surface
   pointer vars feed the cursor shine (real glass) and the border spotlight
   (faux-glass case rows). Cards never move on hover — motion lives in the
   light. The loop sleeps whenever nothing is converging. Desktop only. */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia && window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  // scroll reveal: observe-once, opacity+translate only (CSS gates on motion pref)
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.35, rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });
  }

  if (reduce || !fine) return;

  var glow = document.querySelector(".aurora i");
  var px = window.innerWidth / 2, py = window.innerHeight * 0.4;  // pointer
  var gx = px, gy = py;                                           // glow (lerped)

  var running = false;
  function wake() {
    if (!running) { running = true; requestAnimationFrame(tick); }
  }

  function tick() {
    // aurora glow: slow dreamy trail (~6% convergence per frame)
    gx += (px - gx) * 0.06;
    gy += (py - gy) * 0.06;
    if (glow) glow.style.transform =
      "translate3d(" + gx.toFixed(1) + "px," + gy.toFixed(1) + "px,0) translate(-50%,-50%)";
    if (Math.abs(px - gx) < 0.3 && Math.abs(py - gy) < 0.3) { running = false; return; }
    requestAnimationFrame(tick);
  }

  window.addEventListener("pointermove", function (e) {
    px = e.clientX; py = e.clientY;
    wake();
  }, { passive: true });

  // cursor position vars: shine on real glass, border spotlight on case rows
  document.querySelectorAll(".glass, .lit").forEach(function (el) {
    el.addEventListener("pointermove", function (e) {
      var b = el.getBoundingClientRect();
      el.style.setProperty("--mx", (((e.clientX - b.left) / b.width) * 100).toFixed(1) + "%");
      el.style.setProperty("--my", (((e.clientY - b.top) / b.height) * 100).toFixed(1) + "%");
      el.style.setProperty("--shine", "1");
    }, { passive: true });
    el.addEventListener("pointerleave", function () {
      el.style.setProperty("--shine", "0");
    });
  });

  // magnetic buttons: lean a few px toward the cursor, spring home on leave.
  // The pull rides CSS vars so hover-lift and press-scale stack cleanly.
  document.querySelectorAll(".btn").forEach(function (el) {
    el.addEventListener("pointermove", function (e) {
      var b = el.getBoundingClientRect();
      var dx = (e.clientX - (b.left + b.width / 2)) / (b.width / 2);
      var dy = (e.clientY - (b.top + b.height / 2)) / (b.height / 2);
      el.style.setProperty("--magx", (dx * 3).toFixed(2) + "px");
      el.style.setProperty("--magy", (dy * 2).toFixed(2) + "px");
    }, { passive: true });
    el.addEventListener("pointerleave", function () {
      el.style.setProperty("--magx", "0px");
      el.style.setProperty("--magy", "0px");
    });
  });
})();

/* shariquekhatri.com. The ask panel and the theme toggle. */
(function () {
  "use strict";

  var toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var root = document.documentElement;
      var explicit = root.getAttribute("data-theme");
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var isDark = explicit ? explicit === "dark" : systemDark;
      var next = isDark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      var m = document.querySelector('meta[name="theme-color"]');
      if (m) m.setAttribute("content", next === "dark" ? "#07070d" : "#eef0f7");
    });
  }

  var form = document.getElementById("chat-form");
  var input = document.getElementById("chat-q");
  var log = document.getElementById("chat-log");
  if (!form || !input || !log) return;
  var submitBtn = form.querySelector('button[type="submit"]');

  var busy = false;
  var history = [];

  function esc(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /* Minimal markdown for assistant replies: **bold**, "- " bullets,
     paragraphs. Input is HTML-escaped first, so this is injection safe. */
  function renderMarkdown(text) {
    var safe = esc(text).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    var blocks = [];
    var list = null;
    safe.split("\n").forEach(function (line) {
      var trimmed = line.trim();
      if (trimmed.indexOf("- ") === 0) {
        if (!list) { list = []; }
        list.push("<li>" + trimmed.slice(2) + "</li>");
        return;
      }
      if (list) { blocks.push("<ul>" + list.join("") + "</ul>"); list = null; }
      if (trimmed) { blocks.push("<p>" + trimmed + "</p>"); }
    });
    if (list) { blocks.push("<ul>" + list.join("") + "</ul>"); }
    return blocks.join("");
  }

  function msg(who, cls) {
    var div = document.createElement("div");
    div.className = "msg " + (cls || "");
    var whoEl = document.createElement("span");
    whoEl.className = "who";
    whoEl.textContent = who;
    var txtEl = document.createElement("div");
    txtEl.className = "txt";
    div.appendChild(whoEl);
    div.appendChild(txtEl);
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  function ask(question) {
    if (busy || !question) return;
    busy = true;
    // Guard the submit button with aria-busy instead of disabling the input.
    // Disabling a focused input on iOS dismisses the keyboard and scrolls the
    // page to the top; toggling it back scrolls again. We never touch focus.
    if (submitBtn) submitBtn.setAttribute("aria-busy", "true");
    var mine = msg("You", "");
    mine.querySelector(".txt").textContent = question;
    var pending = msg("Mini Sharique", "me thinking");
    pending.querySelector(".txt").textContent = "thinking";
    input.value = "";

    fetch("/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: question, history: history.slice(-8) }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var reply = data.answer || "No answer came back. Email sharique.khatri@gmail.com instead.";
        pending.className = "msg me";
        pending.querySelector(".txt").innerHTML = renderMarkdown(reply);
        history.push({ role: "user", text: question });
        history.push({ role: "assistant", text: reply });
      })
      .catch(function () {
        pending.className = "msg me";
        pending.querySelector(".txt").textContent =
          "Something went wrong on the wire. The reliable channel is sharique.khatri@gmail.com.";
      })
      .finally(function () {
        busy = false;
        if (submitBtn) submitBtn.removeAttribute("aria-busy");
        log.scrollTop = log.scrollHeight;
      });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var q = input.value.trim();
    // Dismiss the mobile keyboard once so the answer is visible.
    input.blur();
    ask(q);
    return false;
  });
})();
