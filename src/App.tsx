import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import KvkkSozlesmesi from "./pages/KvkkSozlesmesi";
import NotFound from "./pages/NotFound";
import PageTransitionOverlay from "./components/PageTransitionOverlay";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitioning(true);
    }
  }, [location, displayLocation]);

  return (
    <>
      <Routes location={displayLocation}>
        <Route path="/" element={<Landing />} />
        <Route path="/gizlilik-politikasi" element={<PrivacyPolicy />} />
        <Route path="/kullanim-sartlari" element={<TermsOfUse />} />
        <Route path="/kvkk-sozlesmesi" element={<KvkkSozlesmesi />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {transitioning && (
        <PageTransitionOverlay
          onMidpoint={() => {
            setDisplayLocation(location);
            window.scrollTo(0, 0);
          }}
          onDone={() => setTransitioning(false)}
        />
      )}
      <ChatWidget />
    </>
  );
}
