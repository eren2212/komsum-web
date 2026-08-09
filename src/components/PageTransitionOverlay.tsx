import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "../lib/useSmoothScroll";

const HOPS = 10;
const HOP_DURATION = 0.17;
const HOP_HEIGHT = 18;

type PageTransitionOverlayProps = {
  /** Called once the bar fills, while the overlay is still fully opaque — safe to swap the page underneath. */
  onMidpoint: () => void;
  /** Called after the overlay has faded out — safe to unmount. */
  onDone: () => void;
};

/**
 * Full-screen cover shown between route changes: a bar fills 0 → 100 in
 * ten steps while a house icon hops along its leading edge, landing on
 * each 10% mark. Swaps the underlying page at the midpoint (bar full,
 * still opaque) so the new page never flashes in unstyled.
 */
export default function PageTransitionOverlay({
  onMidpoint,
  onDone,
}: PageTransitionOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const fill = fillRef.current;
    const icon = iconRef.current;
    if (!overlay || !fill || !icon) return;

    if (prefersReducedMotion()) {
      const tl = gsap.timeline();
      tl.to(overlay, { opacity: 1, duration: 0.15 })
        .set(fill, { width: "100%" })
        .call(onMidpoint)
        .to(overlay, { opacity: 0, duration: 0.15, delay: 0.1 })
        .call(onDone);
      return () => {
        tl.kill();
      };
    }

    gsap.set(overlay, { opacity: 0 });
    gsap.set(fill, { width: "0%" });
    gsap.set(icon, { left: "0%", y: 0 });

    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.18, ease: "power1.out" });

    for (let i = 0; i < HOPS; i++) {
      const to = ((i + 1) / HOPS) * 100;
      tl.to(fill, { width: `${to}%`, duration: HOP_DURATION, ease: "none" });
      tl.to(
        icon,
        { left: `${to}%`, duration: HOP_DURATION, ease: "none" },
        "<"
      );
      tl.to(
        icon,
        {
          keyframes: {
            "0%": { y: 0 },
            "50%": { y: -HOP_HEIGHT },
            "100%": { y: 0 },
          },
          duration: HOP_DURATION,
          ease: "power2.out",
        },
        "<"
      );
    }

    tl.call(onMidpoint);
    tl.to(overlay, { opacity: 0, duration: 0.3, delay: 0.12, ease: "power1.in" });
    tl.call(onDone);

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-bg-light"
      role="status"
      aria-live="polite"
      aria-label="Sayfa yükleniyor"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap font-display text-[clamp(4rem,22vw,14rem)] leading-none text-text-dark/[0.06]"
      >
        Komşum
      </span>

      <div className="relative h-1.5 w-56 overflow-visible rounded-full bg-black/10 sm:w-72">
        <div
          ref={fillRef}
          className="h-full rounded-full bg-accent"
          style={{ width: "0%" }}
        />
        <div
          ref={iconRef}
          className="absolute -top-[26px] -ml-3 h-6 w-6"
          style={{ left: "0%" }}
        >
          <HouseIcon />
        </div>
      </div>
    </div>
  );
}

function HouseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 3 4 12.5V28a1 1 0 0 0 1 1h7v-8a4 4 0 0 1 8 0v8h7a1 1 0 0 0 1-1V12.5L16 3Z"
        fill="var(--color-accent)"
      />
      <circle cx="16" cy="11.5" r="2.4" fill="#fff" />
    </svg>
  );
}
