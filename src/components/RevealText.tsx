import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { prefersReducedMotion } from "../lib/useSmoothScroll";

const PARAGRAPH =
  "Güvenilir bir komşu bulmak zaman alır. Komşum ile saniyeler sürer. Doğrulanmış üyeler. Kapalı mahalle ağı. Gerçek dayanışma. Tek uygulamada.";

const LOGOS = ["Mahalle Postası", "Yerel Haber", "Şehir Gündem", "Komşu Times", "Pazar FM"];

export default function RevealText() {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = PARAGRAPH.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const spans = el.querySelectorAll<HTMLSpanElement>("span[data-word]");

    if (prefersReducedMotion()) {
      gsap.set(spans, { color: "var(--color-text-dark)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { color: "#cfcfca" },
        {
          color: "var(--color-text-dark)",
          stagger: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 55%",
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-bg-light px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-4xl">
        {/* Trust / press logo strip */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            Basında biz
          </span>
          {LOGOS.map((name) => (
            <span
              key={name}
              className="font-display text-lg text-neutral-400"
            >
              {name}
            </span>
          ))}
        </div>

        <p
          ref={ref}
          className="font-display text-[clamp(1.6rem,4.2vw,3rem)] leading-[1.2]"
        >
          {words.map((w, i) => (
            <span key={i} data-word style={{ color: "#cfcfca" }}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
