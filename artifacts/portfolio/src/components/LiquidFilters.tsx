/**
 * Hidden SVG filter bank for liquid glass effects.
 * - #lg-caustic: animated feTurbulence + feDisplacementMap — morphing refractive caustic
 *   applied to the specular highlight layer inside every .glass surface.
 * - #lg-fringe: slower displacement for the chromatic border fringe.
 */
export function LiquidFilters() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "fixed", width: 0, height: 0, overflow: "hidden", pointerEvents: "none" }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* ── Caustic refractive shimmer ───────────────────────────────────────
            Displaces the specular highlight gradient inside glass surfaces so the
            bright spot looks like bending light through real glass. The seed
            animation makes the pattern slowly morph — the "liquid" quality.       */}
        <filter
          id="lg-caustic"
          x="-35%" y="-35%"
          width="170%" height="170%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.022 0.014"
            numOctaves="3"
            seed="5"
            result="warp"
          >
            <animate
              attributeName="seed"
              values="5;18;9;31;14;5"
              dur="18s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="28"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* ── Chromatic edge fringe ────────────────────────────────────────────
            Slower, lower-scale displacement applied to the border highlight ring.
            Creates the subtle rainbow prism separation seen at glass edges.        */}
        <filter
          id="lg-fringe"
          x="-8%" y="-8%"
          width="116%" height="116%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.006"
            numOctaves="2"
            seed="3"
            result="warp"
          >
            <animate
              attributeName="seed"
              values="3;11;7;20;3"
              dur="26s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="9"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>
  );
}
