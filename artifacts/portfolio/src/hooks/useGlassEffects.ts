import { useEffect } from "react";

/** Matches the Aurora Glass 2.0 site.js behaviour:
 *  - scroll reveal via IntersectionObserver (.rv → .in)
 *  - aurora lerp loop (smoothly trails the cursor via .aurora i transform)
 *  - cursor shine vars on .glass and .lit elements
 *  - magnetic button pull via --magx/--magy CSS vars
 */
export function useGlassEffects() {
  useEffect(() => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine =
      window.matchMedia &&
      window.matchMedia("(hover:hover) and (pointer:fine)").matches;

    // Scroll reveal (works regardless of motion pref)
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io?.unobserve(en.target);
            }
          });
        },
        { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
      );
      document.querySelectorAll(".rv").forEach((el) => io?.observe(el));
    }

    if (reduce || !fine) {
      return () => {
        io?.disconnect();
      };
    }

    // Aurora lerp loop
    const glow = document.querySelector(".aurora i") as HTMLElement | null;
    let px = window.innerWidth / 2;
    let py = window.innerHeight * 0.4;
    let gx = px;
    let gy = py;
    let running = false;

    function wake() {
      if (!running) {
        running = true;
        requestAnimationFrame(tick);
      }
    }

    function tick() {
      gx += (px - gx) * 0.06;
      gy += (py - gy) * 0.06;
      if (glow) {
        glow.style.transform = `translate3d(${gx.toFixed(1)}px,${gy.toFixed(1)}px,0) translate(-50%,-50%)`;
      }
      if (Math.abs(px - gx) < 0.3 && Math.abs(py - gy) < 0.3) {
        running = false;
        return;
      }
      requestAnimationFrame(tick);
    }

    function onPointerMove(e: PointerEvent) {
      px = e.clientX;
      py = e.clientY;
      wake();
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Cursor shine on .glass and .lit elements
    function attachSurface(el: Element) {
      if ((el as HTMLElement).dataset.glassAttached) return;
      (el as HTMLElement).dataset.glassAttached = "1";
      el.addEventListener(
        "pointermove",
        (e: Event) => {
          const pe = e as PointerEvent;
          const b = (el as HTMLElement).getBoundingClientRect();
          (el as HTMLElement).style.setProperty(
            "--mx",
            (((pe.clientX - b.left) / b.width) * 100).toFixed(1) + "%"
          );
          (el as HTMLElement).style.setProperty(
            "--my",
            (((pe.clientY - b.top) / b.height) * 100).toFixed(1) + "%"
          );
          (el as HTMLElement).style.setProperty("--shine", "1");
        },
        { passive: true }
      );
      el.addEventListener("pointerleave", () => {
        (el as HTMLElement).style.setProperty("--shine", "0");
      });
    }

    document.querySelectorAll(".glass, .lit").forEach(attachSurface);

    // MutationObserver for dynamically added .glass/.lit elements (chat msgs)
    const obs = new MutationObserver(() => {
      document.querySelectorAll(".glass, .lit").forEach(attachSurface);
    });
    obs.observe(document.body, { childList: true, subtree: true });

    // Magnetic buttons
    function attachMagnet(el: Element) {
      if ((el as HTMLElement).dataset.magnetAttached) return;
      (el as HTMLElement).dataset.magnetAttached = "1";
      el.addEventListener(
        "pointermove",
        (e: Event) => {
          const pe = e as PointerEvent;
          const b = (el as HTMLElement).getBoundingClientRect();
          const dx = (pe.clientX - (b.left + b.width / 2)) / (b.width / 2);
          const dy = (pe.clientY - (b.top + b.height / 2)) / (b.height / 2);
          (el as HTMLElement).style.setProperty("--magx", (dx * 3).toFixed(2) + "px");
          (el as HTMLElement).style.setProperty("--magy", (dy * 2).toFixed(2) + "px");
        },
        { passive: true }
      );
      el.addEventListener("pointerleave", () => {
        (el as HTMLElement).style.setProperty("--magx", "0px");
        (el as HTMLElement).style.setProperty("--magy", "0px");
      });
    }

    document.querySelectorAll(".btn").forEach(attachMagnet);

    const btnObs = new MutationObserver(() => {
      document.querySelectorAll(".btn").forEach(attachMagnet);
    });
    btnObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      obs.disconnect();
      btnObs.disconnect();
      io?.disconnect();
    };
  }, []);
}

export function useThemeToggle() {
  useEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      if (t) {
        document.documentElement.setAttribute("data-theme", t);
        const m = document.querySelector('meta[name="theme-color"]');
        if (m) m.setAttribute("content", t === "dark" ? "#07070d" : "#eef0f7");
      } else {
        const systemDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (systemDark) {
          const m = document.querySelector('meta[name="theme-color"]');
          if (m) m.setAttribute("content", "#07070d");
        }
      }
    } catch (_) {}
  }, []);

  function toggle() {
    const root = document.documentElement;
    const explicit = root.getAttribute("data-theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = explicit ? explicit === "dark" : systemDark;
    const next = isDark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (_) {}
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", next === "dark" ? "#07070d" : "#eef0f7");
  }

  return toggle;
}
