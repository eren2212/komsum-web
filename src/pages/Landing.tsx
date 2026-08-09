import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "../lib/useSmoothScroll";
import { ScrollProgressProvider } from "../lib/ScrollProgressContext";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StickyPhone from "../components/StickyPhone";
import RevealText from "../components/RevealText";
import HorizontalCards from "../components/HorizontalCards";
import ClientStories from "../components/ClientStories";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import ProgressRing from "../components/ProgressRing";
import CustomCursor from "../components/CustomCursor";

export default function Landing() {
  useSmoothScroll();

  // Recalculate pinned/scrub triggers after first paint & on full load
  // (fonts and images shift layout heights).
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <ScrollProgressProvider>
      <CustomCursor />
      <Navbar />
      <ProgressRing />
      <main>
        <Hero />
        <StickyPhone />
        <RevealText />
        <HorizontalCards />
        <ClientStories />
        <FAQ />
        <Footer />
      </main>
    </ScrollProgressProvider>
  );
}
