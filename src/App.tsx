import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import ConsentBanner from "@/layout/ConsentBanner";
import { ROUTES, NOT_FOUND, findRoute, type AppRoute } from "./routes";
import { applyHeadClient } from "@/lib/seo";
import { captureAttribution, trackPageView } from "@/lib/tracking";

const RouteEffects = () => {
  const location = useLocation();
  const first = useRef(true);

  useEffect(() => {
    captureAttribution();
    if (first.current) {
      first.current = false;
      return;
    }
    const route = findRoute(location.pathname);
    applyHeadClient(route.path === "/404" ? location.pathname : route.path, route.seo);
    if (!location.hash) window.scrollTo(0, 0);
    trackPageView(location.pathname);
  }, [location.pathname, location.hash]);

  return null;
};

const Shell = ({ route }: { route: AppRoute }) =>
  route.bare ? (
    route.element
  ) : (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="conteudo" className="flex-1">
        {route.element}
      </main>
      <Footer />
    </div>
  );

const App = () => (
  <>
    <RouteEffects />
    <Routes>
      {ROUTES.map((r) => (
        <Route key={r.path} path={r.path} element={<Shell route={r} />} />
      ))}
      <Route path="*" element={<Shell route={NOT_FOUND} />} />
    </Routes>
    <ConsentBanner />
  </>
);

export default App;
