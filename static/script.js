/* ============================================================
   sk/os — runtime
   - Builds keyboard
   - Mirrors mouse onto mousepad
   - Mirrors typed keys
   - Window manager (open / close apps)
   - Live clock
============================================================ */
(function () {

  /* ─────────── CLOCK ─────────── */
  const clock = document.getElementById("mb-clock");
  function tickClock() {
    const d = new Date();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    if (clock) clock.textContent = `${hh}:${mm}:${ss}`;
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ─────────── SCENE AUTO-SCALE ─────────── */
  const scene = document.getElementById("scene");
  // Feature-detect CSS zoom (re-renders text crisply; falls back to transform)
  const supportsZoom = (() => {
    const t = document.createElement("div");
    t.style.zoom = "0.5";
    return t.style.zoom !== "";
  })();

  function fitScene() {
    if (!scene) return;
    if (document.body.classList.contains("fs-on")) {
      scene.style.zoom = "";
      scene.style.transform = "";
      return;
    }
    // Use the INTRINSIC layout size (not affected by current zoom/transform)
    const w = 1380; // mirrors the calc(...) in CSS — needs updating if values change
    const h = 1068;
    const sx = (window.innerWidth * 0.92) / w;
    const sy = (window.innerHeight * 0.92) / h;
    const s = Math.min(sx, sy, 1.05);

    if (supportsZoom) {
      scene.style.zoom = s.toFixed(3);
      scene.style.transform = "translate(-50%, -50%)";
    } else {
      scene.style.transform = `translate(-50%, -50%) scale(${s.toFixed(3)})`;
    }
  }
  fitScene();
  window.addEventListener("resize", fitScene);

  /* ─────────── FULLSCREEN TOGGLE ─────────── */
  const fsBtn = document.getElementById("fs-toggle");
  if (fsBtn) {
    fsBtn.addEventListener("click", () => {
      document.body.classList.toggle("fs-on");
      // Reset zoom/transform on enter; re-fit on exit
      if (document.body.classList.contains("fs-on")) {
        scene.style.zoom = "";
        scene.style.transform = "";
      } else {
        setTimeout(fitScene, 30);
      }
    });
  }

  /* ─────────── KEYBOARD BUILD ─────────── */
  // Approximate 60% layout. Each entry: [label, code/codes, sizeClass]
  const KB = [
    [
      ["esc","Escape","w15"],
      ["1","Digit1"], ["2","Digit2"], ["3","Digit3"], ["4","Digit4"], ["5","Digit5"],
      ["6","Digit6"], ["7","Digit7"], ["8","Digit8"], ["9","Digit9"], ["0","Digit0"],
      ["−","Minus"], ["=","Equal"], ["⌫","Backspace","w18"],
    ],
    [
      ["⇥","Tab","w15"],
      ["Q","KeyQ"], ["W","KeyW"], ["E","KeyE"], ["R","KeyR"], ["T","KeyT"],
      ["Y","KeyY"], ["U","KeyU"], ["I","KeyI"], ["O","KeyO"], ["P","KeyP"],
      ["[","BracketLeft"], ["]","BracketRight"], ["\\","Backslash","w15"],
    ],
    [
      ["⇪","CapsLock","w18"],
      ["A","KeyA"], ["S","KeyS"], ["D","KeyD"], ["F","KeyF"], ["G","KeyG"],
      ["H","KeyH"], ["J","KeyJ"], ["K","KeyK"], ["L","KeyL"],
      [";","Semicolon"], ["'","Quote"], ["⏎","Enter","w22"],
    ],
    [
      ["⇧","ShiftLeft","w22"],
      ["Z","KeyZ"], ["X","KeyX"], ["C","KeyC"], ["V","KeyV"], ["B","KeyB"],
      ["N","KeyN"], ["M","KeyM"],
      [",","Comma"], [".","Period"], ["/","Slash"],
      ["⇧","ShiftRight","w26"],
    ],
    [
      ["fn","Fn","w15"],
      ["⌃","ControlLeft","w15"],
      ["⌥","AltLeft","w15"],
      ["⌘","MetaLeft","w18"],
      [" ","Space","w-space"],
      ["⌘","MetaRight","w18"],
      ["⌥","AltRight","w15"],
      ["⌃","ControlRight","w15"],
    ],
  ];

  const kb = document.getElementById("keyboard");
  const codeMap = new Map(); // code -> element
  if (kb) {
    KB.forEach((row) => {
      const r = document.createElement("div");
      r.className = "kb-row";
      row.forEach(([label, code, cls]) => {
        const k = document.createElement("div");
        k.className = "key" + (cls ? " " + cls : "");
        k.dataset.code = code;
        k.textContent = label;
        r.appendChild(k);
        codeMap.set(code, k);
      });
      kb.appendChild(r);
    });
  }

  function pressKey(code) {
    let el = codeMap.get(code);
    if (!el) {
      // try generic fallback for L/R variants
      const variants = code.replace(/Left$/, "Right");
      el = codeMap.get(variants);
    }
    if (el) {
      el.classList.add("pressed");
      clearTimeout(el._pt);
      el._pt = setTimeout(() => el.classList.remove("pressed"), 140);
    }
  }

  window.addEventListener("keydown", (e) => {
    pressKey(e.code);
    // Number shortcuts to open apps
    const num = { Digit1: "ask", Digit2: "work", Digit3: "projects", Digit4: "research", Digit5: "profile" };
    if (num[e.code] && !document.querySelector(".window") && !e.metaKey && !e.ctrlKey) {
      openApp(num[e.code]);
      e.preventDefault();
    }
    if (e.code === "Escape") {
      closeApp();
    }
  });

  /* ─────────── MOUSE MIRRORING ─────────── */
  const mousepad = document.getElementById("mousepad");
  const vmouse = document.getElementById("vmouse");

  if (mousepad && vmouse) {
    const padW = 280, padH = 220;
    const mouseW = 36, mouseH = 54;
    let targetX = padW / 2 - mouseW / 2;
    let targetY = padH / 2 - mouseH / 2;
    let curX = targetX, curY = targetY;

    window.addEventListener("mousemove", (e) => {
      // map full viewport to mousepad
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const fx = Math.max(0, Math.min(1, e.clientX / vw));
      const fy = Math.max(0, Math.min(1, e.clientY / vh));
      targetX = fx * (padW - mouseW - 16) + 8;
      targetY = fy * (padH - mouseH - 16) + 8;
    });

    function animate() {
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;
      vmouse.style.transform = `translate(${curX.toFixed(1)}px, ${curY.toFixed(1)}px)`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ─────────── WINDOW MANAGER ─────────── */
  const windowsLayer = document.getElementById("windows");
  let currentApp = null;

  function openApp(name) {
    const reg = window.SKAPPS && window.SKAPPS[name];
    if (!reg) return;
    if (currentApp) closeApp(true); // instant close

    const win = document.createElement("div");
    win.className = "window";
    win.dataset.app = name;
    win.innerHTML = reg.render();
    windowsLayer.appendChild(win);
    currentApp = name;

    // Wire close button
    win.querySelector("[data-close]").addEventListener("click", () => closeApp());

    // App-specific wiring
    if (reg.wire) reg.wire(win);
  }

  function closeApp(instant = false) {
    const win = windowsLayer.querySelector(".window");
    if (!win) return;
    if (instant) {
      win.remove();
    } else {
      win.classList.add("win-closing");
      setTimeout(() => win.remove(), 200);
    }
    currentApp = null;
  }

  // Wire app tiles
  document.querySelectorAll(".app-tile").forEach((tile) => {
    tile.addEventListener("click", () => openApp(tile.dataset.app));
  });

  // Expose for keyboard shortcuts
  window.openApp = openApp;
  window.closeApp = closeApp;

})();
