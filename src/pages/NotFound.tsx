import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-bg-cream">
      <header className="px-6 pt-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link to="/" aria-label="Komşum ana sayfa">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="font-display text-[clamp(3rem,10vw,6rem)] leading-none text-accent">
          404
        </p>
        <h1 className="display-chunky mt-4 text-[clamp(1.5rem,4vw,2.25rem)] text-text-dark">
          Bu sokak burada bitiyor.
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-muted">
          Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-full bg-black px-6 py-3 text-center text-base font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
        >
          Ana sayfaya dön
        </Link>
      </main>

      <Footer />
    </div>
  );
}
