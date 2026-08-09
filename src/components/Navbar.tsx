import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import { useScrollProgress } from "../lib/ScrollProgressContext";

const LINKS = [
  { label: "Nasıl Çalışır", href: "#nasil-calisir" },
  { label: "Mahalleler", href: "#mahalleler" },
];

export default function Navbar() {
  const { active, index, count } = useScrollProgress();
  const [open, setOpen] = useState(false);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav
        className="flex h-20 w-full items-center justify-between gap-4 rounded-full border border-white/40 bg-white/70 py-2 pl-5 pr-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl"
        aria-label="Ana menü"
        initial={false}
        animate={{ maxWidth: active ? 460 : 768 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <a href="#hero" className="shrink-0" aria-label="Komşum ana sayfa">
          <Logo />
        </a>

        {/* Center: links OR dot progress while the cards section is pinned */}
        <div className="relative hidden min-w-0 flex-1 items-center justify-center overflow-hidden md:flex">
          <div
            className={`flex items-center gap-7 text-lg font-medium text-text-dark transition-all duration-300 ${active ? "pointer-events-none -translate-y-1 opacity-0" : "opacity-100"
              }`}
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Dot progress indicator */}
          <div
            aria-hidden={!active}
            className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${active ? "opacity-100" : "pointer-events-none translate-y-1 opacity-0"
              }`}
          >
            {Array.from({ length: count }).map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${i === index
                  ? "w-7 bg-accent"
                  : "w-2 bg-neutral-300"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Right: CTA */}
        <a
          href="#footer"
          className="ml-2 hidden shrink-0 rounded-full bg-black px-5 py-2.5 text-md font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95 md:inline-block"
        >
          Hemen Katıl
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white md:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <div className="relative h-4 w-5">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-white transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-white transition-all duration-200 ${open ? "opacity-0" : "opacity-100"
                }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-white transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
            />
          </div>
        </button>
      </motion.nav>

      {/* Mobile menu sheet */}
      <div
        className={`fixed inset-x-4 top-20 z-40 origin-top rounded-3xl border border-white/40 bg-white/95 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 md:hidden ${open
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0"
          }`}
      >
        <div className="flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium text-text-dark"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#footer"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-black px-5 py-3 text-center text-base font-semibold text-white"
          >
            Hemen Katıl
          </a>
        </div>
      </div>
    </header>
  );
}
