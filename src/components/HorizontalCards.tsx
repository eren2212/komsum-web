import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useScrollProgress } from "../lib/ScrollProgressContext";
import { prefersReducedMotion } from "../lib/useSmoothScroll";
import Media from "./Media";

type Card = {
  icon: JSX.Element;
  title: string;
  body: string;
  tint: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CARDS: Card[] = [
  {
    title: "Canlı Mahalle Akışı",
    body: "Duyurular, yardımlaşma çağrıları, kayıp ilanları ve günlük gelişmeler — mahallenin nabzı anlık önünde.",
    tint: "#FEF3C7",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M4 5h16M4 12h16M4 19h10" />
        <circle cx="19" cy="19" r="2" />
      </svg>
    ),
  },
  {
    title: "Ver-Al Pazar Yeri",
    body: "Kullanmadığını paylaş, ihtiyacını al. Sat, takas et, hediye et; mahallede sürdürülebilir bir yerel döngü kur.",
    tint: "#DCFCE7",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M3 9h18l-1.5 10.5A2 2 0 0 1 17.5 21h-11a2 2 0 0 1-2-1.5L3 9Z" />
        <path d="M8 9V6a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
  {
    title: "Güvenilir Esnaf & Usta",
    body: "Tesisatçı, boyacı, nöbetçi eczane... Komşularınca oylanmış, referanslı yerel işletmelere saniyeler içinde ulaş.",
    tint: "#DBEAFE",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="m12 3 2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9 6.7 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z" />
      </svg>
    ),
  },
  {
    title: "Sosyal Etkinlikler",
    body: "Halı saha, sabah yürüyüşü, mahalle kermesi... Ortak ilgi alanlarında buluş, etkinlik kur, katılımcı topla.",
    tint: "#FCE7F3",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M17 20a5 5 0 0 0-10 0" />
        <circle cx="12" cy="9" r="3.2" />
        <path d="M4 20a4 4 0 0 1 5-3.8M20 20a4 4 0 0 0-5-3.8" />
      </svg>
    ),
  },
  {
    title: "Güvenli Mesajlaşma",
    body: "İlan pazarlığı, usta fiyatı, etkinlik grupları — uçtan uca güvenli, gerçek zamanlı mesajlaşmayla hepsi tek yerde.",
    tint: "#EDE9FE",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
        <path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12Z" />
        <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
      </svg>
    ),
  },
];

const LAST = CARDS.length - 1;

export default function HorizontalCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLElement>(null);
  const lastTextRef = useRef<HTMLDivElement>(null);
  const lastMsgRef = useRef<HTMLDivElement>(null);
  const lastHouseRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const { setCardsProgress } = useScrollProgress();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const lastCard = lastCardRef.current;
    if (!section || !track || !lastCard) return;

    setCardsProgress({ count: CARDS.length });

    // Mobile / reduced motion: native swipe carousel, no pinning, no dive.
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Travel needed to bring the LAST card to the centre of the viewport
      // (transform-independent, so it stays correct across ScrollTrigger
      // refreshes once fonts/images settle).
      const getHoriz = () =>
        lastCard.offsetLeft + lastCard.offsetWidth / 2 - window.innerWidth / 2;
      // Scroll length devoted to the "dive into the card" phase.
      const getZoom = () => window.innerHeight * 1.6;

      // Build-time measurements drive the timeline pacing; the centring itself
      // uses a function value so it lands precisely regardless of these.
      const horiz = getHoriz();
      const zoom = getZoom();
      const split = horiz / (horiz + zoom); // scroll fraction spent scrolling

      gsap.set(lastCard, { transformOrigin: "50% 32%" });
      gsap.set(lastHouseRef.current, { autoAlpha: 0 });
      gsap.set(darkRef.current, { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + (getHoriz() + getZoom()),
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onToggle: (self) => setCardsProgress({ active: self.isActive }),
          onUpdate: (self) => {
            const p = Math.min(1, self.progress / split);
            setCardsProgress({ index: Math.round(p * LAST) });
          },
        },
      });

      // Phase 1 — slide the track until the last card is centred.
      tl.to(track, { x: () => -getHoriz(), ease: "none", duration: horiz }, 0);

      // Phase 2 — dive into the last card. It grows from its icon, its text
      // clears, the message icon morphs into the Komşum house mark, and a dark
      // layer rises to land seamlessly on the bg-dark ClientStories section.
      tl.to(headingRef.current, { autoAlpha: 0, duration: zoom * 0.15 }, horiz)
        .to(
          lastTextRef.current,
          { autoAlpha: 0, y: -20, duration: zoom * 0.18 },
          horiz
        )
        .to(
          lastMsgRef.current,
          { autoAlpha: 0, scale: 0.8, duration: zoom * 0.22 },
          horiz + zoom * 0.05
        )
        .to(
          lastHouseRef.current,
          { autoAlpha: 1, scale: 1, duration: zoom * 0.22 },
          horiz + zoom * 0.05
        )
        .to(
          lastCard,
          { scale: 9, ease: "power2.in", duration: zoom },
          horiz
        )
        .to(
          darkRef.current,
          { autoAlpha: 1, ease: "none", duration: zoom * 0.5 },
          horiz + zoom * 0.5
        );
    }, section);

    return () => {
      ctx.revert();
      setCardsProgress({ active: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="mahalleler"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-cream py-20 md:py-0"
    >
      <div className="flex min-h-screen flex-col justify-center md:justify-center">
        <div
          ref={headingRef}
          className="px-6 pb-10 md:absolute md:left-1/2 md:top-16 md:z-20 md:-translate-x-1/2 md:px-0 md:text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Komşum ile neler yapabilirsin?
          </span>
          <h2 className="display-chunky mt-2 text-[clamp(2rem,5vw,3.25rem)] text-text-dark">
            Mahallenin her şeyi, tek akışta.
          </h2>
        </div>

        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mt-28 md:gap-8 md:overflow-visible md:px-[12vw]"
        >
          {CARDS.map((card, i) => {
            const isLast = i === LAST;
            return (
              <article
                key={card.title}
                ref={isLast ? lastCardRef : undefined}
                className={`relative flex w-[80vw] shrink-0 snap-center flex-col rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] sm:w-[70vw] md:w-[clamp(320px,30vw,420px)] ${
                  isLast ? "md:z-30" : ""
                }`}
              >
                {/* Visual / illustration area */}
                <div
                  className="relative mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl"
                  style={{ backgroundColor: card.tint }}
                >
                  <Media
                    src={`/cards/card-${i + 1}.jpg`}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    label={`card-${i + 1}.jpg`}
                  />
                  <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
                  <DotGrid />
                  {isLast ? (
                    <div className="relative h-16 w-16 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                      <div ref={lastMsgRef} className="absolute inset-0">
                        {card.icon}
                      </div>
                      <div
                        ref={lastHouseRef}
                        className="absolute inset-0 opacity-0"
                      >
                        <HouseMark />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div
                  ref={isLast ? lastTextRef : undefined}
                  className="flex flex-col"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <span className="h-5 w-5">{card.icon}</span>
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-text-dark">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
                    {card.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Dark reveal layer — rises over the dive to land on ClientStories. */}
        <div
          ref={darkRef}
          className="pointer-events-none absolute inset-0 z-40 bg-bg-dark opacity-0"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

/** Komşum house mark — the icon you dive into (matches Logo). */
function HouseMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="h-full w-full">
      <path
        d="M16 3 4 12.5V28a1 1 0 0 0 1 1h7v-8a4 4 0 0 1 8 0v8h7a1 1 0 0 0 1-1V12.5L16 3Z"
        fill="var(--color-accent)"
      />
      <circle cx="16" cy="11.5" r="2.4" fill="#fff" />
    </svg>
  );
}

/** Subtle animated dot grid behind each card icon. */
function DotGrid() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-40"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="dots"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.5" fill="rgba(0,0,0,0.12)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}
