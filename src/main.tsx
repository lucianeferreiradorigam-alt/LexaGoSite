import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "@fontsource-variable/inter";
import "./index.css";
import { installContactClickTracking } from "@/lib/tracking";

// Mede cliques em WhatsApp e e-mail em todas as páginas (conversão do Google Ads).
installContactClickTracking();

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Páginas pré-renderizadas são hidratadas; no modo de desenvolvimento, renderiza do zero.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
