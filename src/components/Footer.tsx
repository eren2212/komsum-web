import { Link } from "react-router-dom";
import Logo from "./Logo";
import Media from "./Media";

const LINK_COLS = [
  {
    title: "Bağlantılar",
    links: [
      { label: "Nasıl Çalışır", href: "#nasil-calisir" },
      { label: "Mahalle Hikayeleri", href: "#mahalleler" },
      { label: "SSS", href: "#footer" },
    ],
  },
  {
    title: "Kurumsal",
    links: [
      { label: "İletişim", href: "mailto:merhaba@komsum.app" },
      { label: "KVKK Aydınlatma Metni", href: "/gizlilik-politikasi" },
      { label: "KVKK Sözleşmesi", href: "/kvkk-sozlesmesi" },
      { label: "Kullanım Şartları", href: "/kullanim-sartlari" },
    ],
  },
];

/** App Store / Google Play listing URLs — fill in once the app is published. */
const STORE_LINKS = {
  appStore: "",
  googlePlay: "",
};

/** Only same-page routes ("/...") go through <Link>; everything else (#hash, mailto:) is a plain <a>. */
const isInternalRoute = (href: string) => href.startsWith("/");

const badgeClass = "h-12 w-40 rounded-xl border-2 border-black";

/**
 * Store badge — a real link once `href` is set (opens the listing in a new
 * tab). Until then it renders as a "yakında" (coming soon) state: same
 * visual, no dead click, not focusable.
 */
function StoreBadge({
  href,
  src,
  alt,
  label,
}: {
  href: string;
  src: string;
  alt: string;
  label: string;
}) {
  const badge = <Media src={src} alt={alt} className={badgeClass} label={label} />;

  if (!href) {
    return (
      <span
        role="img"
        aria-label={`${alt} (yakında)`}
        className="relative inline-block opacity-60"
      >
        {badge}
        <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 text-xs font-semibold text-white">
          Yakında
        </span>
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
      {badge}
    </a>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-bg-light px-6 pb-10 pt-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Accent brand card */}
          <div className="flex flex-col justify-between rounded-3xl bg-accent p-8 text-white sm:p-10">
            <Logo className="[&_span]:text-white" markColor="#fff" />
            <div className="mt-16">
              <p className="display-chunky text-[clamp(2rem,5vw,3.25rem)]">
                Mahalle ruhu,
                <br />
                cebinde.
              </p>
              {/* Store badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                <StoreBadge
                  href={STORE_LINKS.appStore}
                  src="/badges/app-store.svg"
                  alt="App Store'dan indir"
                  label="App Store rozeti"
                />
                <StoreBadge
                  href={STORE_LINKS.googlePlay}
                  src="/badges/google-play.svg"
                  alt="Google Play'den indir"
                  label="Google Play rozeti"
                />
              </div>
            </div>
          </div>

          {/* White links card */}
          <div className="flex flex-col justify-between rounded-3xl bg-white p-8 sm:p-10">
            <div className="grid grid-cols-2 gap-8">
              {LINK_COLS.map((col) => (
                <div key={col.title}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
                    {col.title}
                  </h3>
                  <ul className="space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        {isInternalRoute(l.href) ? (
                          <Link
                            to={l.href}
                            className="text-text-dark transition-colors hover:text-accent"
                          >
                            {l.label}
                          </Link>
                        ) : (
                          <a
                            href={l.href}
                            className="text-text-dark transition-colors hover:text-accent"
                          >
                            {l.label}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <a
              href="#hero"
              className="mt-10 inline-block rounded-full bg-black px-6 py-3 text-center text-base font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
            >
              Hemen Katıl
            </a>
          </div>
        </div>

        {/* Giant decorative email */}
        <a
          href="mailto:merhaba@komsum.app"
          className="mt-16 block select-none text-center font-display text-[clamp(2rem,11vw,9rem)] leading-none text-text-dark/10 transition-colors hover:text-accent/30"
        >
          merhaba@komsum.app
        </a>

        <p className="mt-10 text-center text-sm text-text-muted">
          © 2026 Komşum. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
