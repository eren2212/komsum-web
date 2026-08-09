import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Media from "./Media";
import { prefersReducedMotion } from "../lib/useSmoothScroll";

const SCREENS = [
  { src: "/mockups/screen-1.png", title: "Canlı Akış", caption: "Mahallenin nabzı anlık önünde." },
  { src: "/mockups/screen-2.png", title: "Post Paylaş", caption: "Paylaş, beğen, yorum, paylaş." },
  { src: "/mockups/screen-3.png", title: "Profilim", caption: "Esnafını, ustanı, ilanlarını tek profilden yönet." },
  { src: "/mockups/screen-4.png", title: "Mesajlaşma", caption: "Uçtan uca güvenli sohbet." },
];

export default function StickyPhone() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial state: only first screen visible.
      screenRefs.current.forEach((el, idx) => {
        if (el) gsap.set(el, { autoAlpha: idx === 0 ? 1 : 0, scale: idx === 0 ? 1 : 1.04 });
      });
      captionRefs.current.forEach((el, idx) => {
        if (el) gsap.set(el, { autoAlpha: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 14 });
      });

      if (prefersReducedMotion()) return;

      // Smooth lead-in: the phone glides up from below + scales in as the
      // section approaches the top, settling exactly when the pin engages.
      // This complements the hero phone drifting down — a continuous handoff.
      if (phoneRef.current) {
        gsap.fromTo(
          phoneRef.current,
          { yPercent: 22, scale: 0.9, autoAlpha: 0.4 },
          {
            yPercent: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      }

      const steps = SCREENS.length - 1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=" + steps * 80 + "%",
          scrub: true,
          pin: ".sticky-phone-stage",
          anticipatePin: 1,
        },
      });

      for (let i = 1; i < SCREENS.length; i++) {
        const at = (i - 1) / steps;
        tl.to(screenRefs.current[i - 1], { autoAlpha: 0, scale: 0.97, duration: 0.5 }, at)
          .to(captionRefs.current[i - 1], { autoAlpha: 0, y: -14, duration: 0.4 }, at)
          .fromTo(
            screenRefs.current[i],
            { autoAlpha: 0, scale: 1.04 },
            { autoAlpha: 1, scale: 1, duration: 0.5 },
            at + 0.05
          )
          .fromTo(
            captionRefs.current[i],
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            at + 0.1
          );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nasil-calisir"
      ref={sectionRef}
      className="relative bg-gradient-to-b from-accent to-bg-light"
    >
      <div className="sticky-phone-stage flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-6 py-24">
        <div className="max-w-md text-center">
          <h2 className="display-chunky text-[clamp(2rem,5vw,3.25rem)] text-text-dark">
            Tek uygulama,
            <br />
            bütün mahalle.
          </h2>
        </div>

        {/* Phone frame with stacked screens */}
        <div className="relative w-[min(80vw,260px)]">
          <div className="relative aspect-[9/19] overf01240idden rounded-[2.5rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl">
            {SCREENS.map((s, idx) => (
              <div
                key={s.title}
                ref={(el) => {
                  screenRefs.current[idx] = el;
                }}
                className="absolute inset-0"
              >
                <Media

                  src={s.src}
                  alt={`${s.title} ekranı`}
                  className="h-full w-full object-cover rounded-2xl"
                  label={s.src.split("/").pop()}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Captions, cross-faded in sync with the screens */}
        <div className="relative h-14 w-full max-w-sm">
          {SCREENS.map((s, idx) => (
            <div
              key={s.title}
              ref={(el) => {
                captionRefs.current[idx] = el;
              }}
              className="absolute inset-x-0 text-center"
            >
              <p className="font-display text-xl text-text-dark">{s.title}</p>
              <p className="text-sm text-text-muted">{s.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
