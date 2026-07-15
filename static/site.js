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
      if (m) m.setAttribute("content", next === "dark" ? "#131316" : "#fafaf8");
    });
  }

  var form = document.getElementById("chat-form");
  var input = document.getElementById("chat-q");
  var log = document.getElementById("chat-log");
  var chips = document.getElementById("chat-chips");
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
    // Dismiss the mobile keyboard once so the answer is visible. A single
    // blur is smooth; the disable/refocus churn we removed was what jumped.
    input.blur();
    ask(q);
    return false;
  });

  if (chips) {
    chips.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (btn) ask(btn.textContent.trim());
    });
  }
})();
