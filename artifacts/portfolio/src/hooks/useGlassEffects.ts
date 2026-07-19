import { useEffect } from "react";

export function useGlassEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine =
      window.matchMedia &&
      window.matchMedia("(hover:hover) and (pointer:fine)").matches;

    let raf = 0;
    let px = 50,
      py = 40;

    function onPointerMove(e: PointerEvent) {
      px = (e.clientX / window.innerWidth) * 100;
      py = (e.clientY / window.innerHeight) * 100;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          root.style.setProperty("--px", px + "%");
          root.style.setProperty("--py", py + "%");
          raf = 0;
        });
      }
    }

    if (!reduce) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    function attachGlass(el: Element) {
      let er = 0;
      el.addEventListener(
        "pointermove",
        (e: Event) => {
          if (er) return;
          er = requestAnimationFrame(() => {
            const pe = e as PointerEvent;
            const b = (el as HTMLElement).getBoundingClientRect();
            const mx = ((pe.clientX - b.left) / b.width) * 100;
            const my = ((pe.clientY - b.top) / b.height) * 100;
            (el as HTMLElement).style.setProperty("--mx", mx + "%");
            (el as HTMLElement).style.setProperty("--my", my + "%");
            (el as HTMLElement).style.setProperty("--shine", "1");
            if (el.classList.contains("tilt")) {
              const tx = (pe.clientX - b.left) / b.width - 0.5;
              const ty = (pe.clientY - b.top) / b.height - 0.5;
              (el as HTMLElement).style.setProperty(
                "--tx",
                (tx * 5).toFixed(2) + "deg"
              );
              (el as HTMLElement).style.setProperty(
                "--ty",
                (-ty * 5).toFixed(2) + "deg"
              );
            }
            er = 0;
          });
        },
        { passive: true }
      );
      el.addEventListener("pointerleave", () => {
        (el as HTMLElement).style.setProperty("--shine", "0");
        (el as HTMLElement).style.setProperty("--tx", "0deg");
        (el as HTMLElement).style.setProperty("--ty", "0deg");
      });
    }

    if (fine && !reduce) {
      document.querySelectorAll(".glass").forEach(attachGlass);

      // MutationObserver to catch newly added .glass elements (e.g. chat msgs)
      const observer = new MutationObserver(() => {
        document.querySelectorAll(".glass").forEach((el) => {
          if (!(el as HTMLElement).dataset.glassAttached) {
            (el as HTMLElement).dataset.glassAttached = "1";
            attachGlass(el);
          }
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });

      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        observer.disconnect();
      };
    }

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);
}

export function useThemeToggle() {
  useEffect(() => {
    // Restore theme from localStorage on mount
    try {
      const t = localStorage.getItem("theme");
      if (t) {
        document.documentElement.setAttribute("data-theme", t);
        const m = document.querySelector('meta[name="theme-color"]');
        if (m) {
          m.setAttribute("content", t === "dark" ? "#07070d" : "#eef0f7");
        }
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
    if (m)
      m.setAttribute("content", next === "dark" ? "#07070d" : "#eef0f7");
  }

  return toggle;
}
