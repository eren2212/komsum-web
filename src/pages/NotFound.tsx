import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

const SUGGESTIONS = [
  { label: "Ana sayfa", to: "/" },
  { label: "Yardım ve Destek", to: "/destek" },
  { label: "KVKK Aydınlatma Metni", to: "/gizlilik-politikasi" },
  { label: "Kullanım Şartları", to: "/kullanim-sartlari" },
];

const PLATE_BLUE = "#1d4f9e";

/** Tabela köşesindeki vida */
function Screw({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-2 w-2 rounded-full bg-white/80 shadow-[inset_0_-1px_0_rgba(0,0,0,0.25)] ${className}`}
    />
  );
}

/**
 * 404 — Türkiye'deki mavi sokak ve kapı numarası tabelalarından yola çıkar:
 * "Bulunamayan Sokak, No 404". Vercel tüm yolları index.html'e yönlendirdiği
 * için olmayan her adres bu sayfaya düşer.
 */
export default function NotFound() {
  const { pathname } = useLocation();

  useEffect(() => {
    const previous = document.title;
    document.title = "Adres bulunamadı · SelamKomşu";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-bg-cream">
      <header className="px-6 pt-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link to="/" aria-label="Ana sayfa">
            <Logo />
          </Link>
          <Link to="/" className="legal-mono underline-offset-4 hover:underline">
            ← Ana sayfa
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center px-6 py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* ── Tabelalar ── */}
          <div className="flex flex-col items-center gap-7" aria-hidden="true">
            {/* Sokak tabelası */}
            <div
              className="relative rounded-lg p-1.5 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.45)]"
              style={{ background: PLATE_BLUE }}
            >
              <div className="rounded-[5px] border-[3px] border-white px-7 py-2.5 text-center text-white">
                <span className="font-display text-[clamp(1.1rem,2.6vw,1.5rem)] uppercase tracking-wide">
                  Bulunamayan Sk.
                </span>
              </div>
            </div>

            {/* Kapı numarası: hafifçe eğik asılı, üzerine gelince sallanır */}
            <div className="origin-top -rotate-[4deg] transition-transform duration-500 ease-out hover:rotate-[3deg]">
              <div
                className="relative rounded-2xl p-2 shadow-[0_24px_40px_-14px_rgba(0,0,0,0.5)]"
                style={{ background: PLATE_BLUE }}
              >
                <Screw className="left-3.5 top-3.5" />
                <Screw className="right-3.5 top-3.5" />
                <Screw className="bottom-3.5 left-3.5" />
                <Screw className="bottom-3.5 right-3.5" />
                <div className="flex items-baseline gap-3 rounded-xl border-4 border-white px-10 py-6 text-white sm:px-14 sm:py-8">
                  <span className="font-display text-[clamp(1.5rem,3.5vw,2.25rem)]">No</span>
                  <span className="display-chunky text-[clamp(5rem,14vw,8.5rem)]">404</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Metin ── */}
          <div>
            <p className="legal-mono text-accent">Adres bulunamadı</p>
            <h1 className="display-chunky mt-4 text-[clamp(2.4rem,6vw,4.25rem)] text-text-dark">
              Bu adreste kimse oturmuyor.
            </h1>
            <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-text-dark/70">
              Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Kapıyı yanlış çalmış olabilirsin.
            </p>
            <p className="legal-mono mt-6 break-all border-t border-text-dark pt-3 text-text-dark/60">
              Adres: <span className="normal-case">{pathname}</span>
            </p>

            <nav className="mt-10" aria-label="Önerilen sayfalar">
              <p className="legal-mono text-text-dark/50">Belki şunlardan birini arıyordun</p>
              <ol className="mt-4 divide-y divide-text-dark/15 border-y border-text-dark/15">
                {SUGGESTIONS.map((s, i) => (
                  <li key={s.to}>
                    <Link to={s.to} className="group flex items-center gap-5 py-3 text-text-dark">
                      <span className="legal-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-medium underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
                        {s.label}
                      </span>
                      <span className="ml-auto text-text-dark/40 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
