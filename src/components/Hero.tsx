import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import Media from "./Media";
import { prefersReducedMotion } from "../lib/useSmoothScroll";

const ROTATING = ["komşularınla", "esnafla", "etkinliklerle", "pazarıyla"];

/**
 * Where the white screen sits inside /mockups/hand-phone.png, as a
 * percentage of the image box. Tweak these if you swap the photo.
 *
 * The phone is shot at a slight angle, so the screen isn't a perfect
 * rectangle — its left edge is vertical but the right edge leans out
 * further at the bottom than the top. Box below is the tight bounding
 * rect around the screen; clipPath trims it down to the actual
 * trapezoid so the overlay doesn't spill onto the bezel or look
 * crooked against it.
 */
const SCREEN = {
  top: "2.62%",
  left: "32.50%",
  width: "34.86%",
  height: "64.21%",
  clipPath: "polygon(0% 0%, 96% 0%, 100% 100%, 0% 100%)",
};

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked handoff: as the hero scrolls out, the hand+phone drifts
  // downward and fades, so it appears to slide away instead of cutting off.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 240]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setI((p) => (p + 1) % ROTATING.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center overflow-hidden bg-accent pt-32 text-white"
    >
      {/* Soft decorative glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 text-center"
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
      >
        <h1 className="display-chunky text-[clamp(2rem,6vw,5rem)] text-black">
          <motion.span variants={rise} className="block">
            Kapını çal.
          </motion.span>
          <motion.span variants={rise} className="block">
            Mahalleni yaşa.
          </motion.span>
        </h1>

        <motion.p
          variants={rise}
          className="mt-8 max-w-xl text-lg text-white/90 sm:text-xl"
        >
          Mahallendeki{" "}
          <span className="relative inline-grid">
            {ROTATING.map((word, idx) => (
              <span
                key={word}
                aria-hidden={idx !== i}
                className={`col-start-1 row-start-1 whitespace-nowrap font-semibold text-white underline decoration-white/50 decoration-2 underline-offset-4 transition-all duration-500 ${idx === i
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
                  }`}
              >
                {word}
              </span>
            ))}
          </span>{" "}
          tek uygulamada buluş.
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#footer"
            className="rounded-full bg-white px-7 py-3.5 text-base font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95"
          >
            Hemen Katıl
          </a>
          <a
            href="#nasil-calisir"
            className="rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Nasıl Çalışır?
          </a>
        </motion.div>
      </motion.div>

      {/* Hand holding the phone; the video plays inside the screen area.
          Outer = scroll-linked downward drift only (transform y), giving the
          smooth handoff into the next section (clipped by overflow-hidden).
          Inner = one-shot entrance. Separate elements/properties → no clash. */}
      <motion.div
        className="relative z-10 mt-16 aspect-[1569/1872] w-[min(100vw,680px)]"
        style={reduce ? undefined : { y: phoneY }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduce ? false : { opacity: 0, y: 80, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          {/* Hand + phone photo underneath */}
          <Media
            src="/mockups/hand-phone.png"
            alt="Komşum uygulamasını tutan el"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-contain"
            label="hand-phone.png"
          />
          {/* App screenshot laid over the white screen area of the photo.
              UI near the real screen edge (scrollable tab chips, icons) gets
              cropped exactly at the phone's screen boundary — realistic, but
              looks like a rendering glitch in a still image. A soft edge
              mask feathers it out instead of hard-cutting mid-element. */}
          <Media
            src="/mockups/hero-screen.png"
            alt="Komşum uygulaması ekran görüntüsü"
            className="absolute z-10 overflow-hidden rounded-[24px] object-cover"
            style={{
              ...SCREEN,
              WebkitMaskImage:
                "linear-gradient(to right, black 90%, transparent 100%), linear-gradient(to bottom, black 96%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskImage:
                "linear-gradient(to right, black 90%, transparent 100%), linear-gradient(to bottom, black 96%, transparent 100%)",
              maskComposite: "intersect",
            }}
            label="hero-screen.png"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
