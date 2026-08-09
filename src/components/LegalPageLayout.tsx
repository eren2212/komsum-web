import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer";

type LegalPageLayoutProps = {
  title: string;
  /** ISO date string, e.g. "2026-08-05" — shown as "Son güncelleme". */
  updatedAt?: string;
  children: ReactNode;
};

/**
 * Shared shell for static legal/info pages (Gizlilik Politikası, Kullanım
 * Şartları, İletişim...). Deliberately lighter than the landing page's
 * Navbar — no scroll-jacked sections to link to here, just a way back home.
 */
export default function LegalPageLayout({
  title,
  updatedAt,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-cream">
      <header className="px-6 pt-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/" aria-label="Komşum ana sayfa">
            <Logo />
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-text-muted transition-colors hover:text-accent"
          >
            ← Ana sayfaya dön
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="display-chunky text-[clamp(1.75rem,4vw,2.75rem)] text-text-dark">
            {title}
          </h1>
          {updatedAt && (
            <p className="mt-2 text-sm text-text-muted">
              Son güncelleme:{" "}
              {new Date(updatedAt).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          <div
            className="mt-10 space-y-5 text-[15px] leading-relaxed text-text-muted
              [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-text-dark
              [&_strong]:text-text-dark [&_a]:text-accent [&_a]:underline
              [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5"
          >
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
