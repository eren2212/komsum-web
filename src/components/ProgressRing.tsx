import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../lib/useSmoothScroll";

/**
 * Small decorative rotating progress ring, fixed to the bottom-right.
 * The arc length tracks overall page scroll progress.
 */
export default function ProgressRing() {
  const arcRef = useRef<SVGCircleElement>(null);
  const groupRef = useRef<SVGGElement>(null);

  const R = 17;
  const C = 2 * Math.PI * R;

  useEffect(() => {
    const arc = arcRef.current;
    const group = groupRef.current;
    if (!arc || !group) return;

    gsap.set(arc, { strokeDasharray: C, strokeDashoffset: C });

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(arc, { strokeDashoffset: C * (1 - self.progress) });
        if (!prefersReducedMotion()) {
          gsap.set(group, { rotate: self.progress * 360, transformOrigin: "center" });
        }
      },
    });

    return () => st.kill();
  }, [C]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden md:block">
      <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
        <circle
          cx="22"
          cy="22"
          r={R}
          fill="none"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="2.5"
        />
        <g ref={groupRef}>
          <circle
            ref={arcRef}
            cx="22"
            cy="22"
            r={R}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform="rotate(-90 22 22)"
          />
        </g>
        <circle cx="22" cy="22" r="3" fill="var(--color-accent)" />
      </svg>
    </div>
  );
}
