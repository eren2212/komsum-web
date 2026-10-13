import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer";

type LegalPageLayoutProps = {
  title: string;
  /** Başlığın üstündeki küçük etiket. */
  eyebrow?: string;
  /** Başlığın altındaki kısa açıklama. */
  description?: string;
  /** ISO date string, e.g. "2026-08-05" — shown as "Son güncelleme". */
  updatedAt?: string;
  children: ReactNode;
};

type TocItem = { id: string; label: string };

const slugify = (text: string) =>
  text
    .toLocaleLowerCase("tr-TR")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Shared shell for static legal/info pages (KVKK, Kullanım Şartları, Hesap
 * Silme, Destek). Deliberately lighter than the landing page's Navbar — no
 * scroll-jacked sections, just a readable article with a sticky table of
 * contents built from the article's own <h2>s.
 */
export default function LegalPageLayout({
  title,
  eyebrow = "Yasal",
  description,
  updatedAt,
  children,
}: LegalPageLayoutProps) {
  const articleRef = useRef<HTMLElement>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [readingMinutes, setReadingMinutes] = useState<number | null>(null);

  // İçindekiler + okuma süresi: makalenin kendi başlıklarından üretilir.
  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const headings = Array.from(article.querySelectorAll("h2"));
    const items = headings.map((h, i) => {
      const label = h.dataset.toc ?? h.textContent ?? "";
      if (!h.id) h.id = slugify(label) || `bolum-${i + 1}`;
      return { id: h.id, label };
    });
    setToc(items);

    const words = (article.textContent ?? "").trim().split(/\s+/).length;
    setReadingMinutes(Math.max(1, Math.round(words / 200)));

    // Okunan bölümü vurgula
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [children]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-cream">
      <header className="px-6 pt-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link to="/" aria-label="Ana sayfa">
            <Logo />
          </Link>
          <Link
            to="/"
            className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-text-dark transition-colors hover:bg-white hover:text-accent"
          >
            ← Ana sayfa
          </Link>
        </div>
      </header>

      {/* ── Başlık ── */}
      <section className="px-6 pb-10 pt-16 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            {eyebrow}
          </span>
          <h1 className="display-chunky mt-5 max-w-4xl text-[clamp(2.25rem,6vw,4.25rem)] text-text-dark">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-text-dark/70">{description}</p>
          )}
          {(updatedAt || readingMinutes) && (
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-dark/60">
              {updatedAt && (
                <span>
                  Son güncelleme:{" "}
                  <span className="font-medium text-text-dark/80">
                    {new Date(updatedAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </span>
              )}
              {updatedAt && readingMinutes && <span aria-hidden="true">·</span>}
              {readingMinutes && <span>{readingMinutes} dk okuma</span>}
            </div>
          )}
        </div>
      </section>

      {/* ── İçerik ── */}
      <main className="flex-1 px-4 pb-24 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            {toc.length > 1 && (
              <nav className="sticky top-8" aria-label="Bu sayfada">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-text-dark/50">
                  Bu sayfada
                </p>
                <ul className="space-y-1 border-l border-black/10">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(item.id)}
                        className={`-ml-px block w-full border-l-2 py-1.5 pl-4 text-left text-sm leading-snug transition-colors ${
                          activeId === item.id
                            ? "border-accent font-medium text-text-dark"
                            : "border-transparent text-text-dark/55 hover:text-text-dark"
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>

          <article
            ref={articleRef}
            className="legal-prose rounded-[2rem] bg-white px-6 py-10 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:px-12 sm:py-14"
          >
            {children}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
