import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer";

type LegalPageLayoutProps = {
  title: string;
  /** Başlığın üstündeki daktilo etiketi, örn. "Yasal Metin". */
  kicker?: string;
  /** ISO date string, e.g. "2026-08-05" — "Yürürlük" olarak gösterilir. */
  updatedAt?: string;
  /** Metnin sürümü (uygulamada onaylatılan sürümle aynı). */
  version?: number;
  /**
   * "Kısacası": metnin ne dediğini sade dille anlatan birkaç cümle.
   * Bağlayıcı değildir; bağlayıcı olan tam metindir (sayfada da yazar).
   */
  summary?: string[];
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

const pad = (n: number) => String(n).padStart(2, "0");

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
};

/**
 * Shared shell for static legal/info pages (KVKK, Kullanım Şartları, Hesap
 * Silme, Destek). Basılı bir belge gibi: markanın turuncusuyla bir başlık
 * şeridi, sade dille "Kısacası" özeti, en üstte düz bir içindekiler listesi ve
 * kenar boşluğunda daktilo yazısıyla bölüm numaraları (.legal-prose, index.css).
 */
export default function LegalPageLayout({
  title,
  kicker = "Yasal Metin",
  updatedAt,
  version,
  summary,
  children,
}: LegalPageLayoutProps) {
  const articleRef = useRef<HTMLElement>(null);
  const [toc, setToc] = useState<TocItem[]>([]);

  // İçindekiler makalenin kendi <h2>'lerinden üretilir.
  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;
    const items = Array.from(article.querySelectorAll("h2")).map((h, i) => {
      const label = h.textContent ?? "";
      if (!h.id) h.id = slugify(label) || `bolum-${i + 1}`;
      return { id: h.id, label };
    });
    setToc(items);
  }, [children]);

  const meta = [
    updatedAt && `Yürürlük ${formatDate(updatedAt)}`,
    version && `Sürüm ${version}`,
  ].filter(Boolean);

  return (
    <div className="flex min-h-screen flex-col bg-bg-light">
      {/* ── Başlık şeridi ── */}
      <header className="bg-accent px-6 pb-14 pt-8 text-text-dark sm:pb-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <Link to="/" aria-label="Ana sayfa">
              <Logo markColor="#141414" />
            </Link>
            <Link to="/" className="legal-mono underline-offset-4 hover:underline">
              ← Ana sayfa
            </Link>
          </div>

          <p className="legal-mono mt-16 sm:mt-24">{kicker}</p>
          <h1 className="display-chunky mt-4 max-w-4xl text-[clamp(2.6rem,7.5vw,5.75rem)]">
            {title}
          </h1>
          {meta.length > 0 && (
            <p className="legal-mono mt-8 border-t border-text-dark pt-4">{meta.join("  ·  ")}</p>
          )}
        </div>
      </header>

      <main className="flex-1 px-6 pb-28">
        <div className="mx-auto max-w-5xl lg:pl-28">
          {/* ── Kısacası ── */}
          {summary && summary.length > 0 && (
            <section className="pt-14 sm:pt-20" aria-labelledby="kisacasi">
              <h2 id="kisacasi" className="legal-mono text-accent">
                Kısacası
              </h2>
              <ol className="mt-6 divide-y divide-text-dark/15 border-y border-text-dark">
                {summary.map((item, i) => (
                  <li key={i} className="flex gap-5 py-4 sm:gap-8">
                    <span className="legal-mono pt-1.5 text-text-dark/50">{pad(i + 1)}</span>
                    <span className="text-[1.15rem] font-medium leading-snug text-text-dark sm:text-[1.3rem]">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-sm text-text-dark/55">
                Bu özet okumayı kolaylaştırmak içindir; bağlayıcı olan aşağıdaki tam metindir.
              </p>
            </section>
          )}

          {/* ── İçindekiler ── */}
          {toc.length > 1 && (
            <nav className="pt-14" aria-label="İçindekiler">
              <p className="legal-mono text-text-dark/50">İçindekiler</p>
              <ol className="mt-4 grid gap-x-10 gap-y-2 sm:grid-cols-2">
                {toc.map((item, i) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="group flex gap-4 text-[0.95rem] text-text-dark"
                    >
                      <span className="legal-mono pt-1 text-accent">{pad(i + 1)}</span>
                      <span className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* ── Tam metin ── */}
          <article ref={articleRef} className="legal-prose pt-16">
            {children}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
