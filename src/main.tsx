import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/source-sans-3";
import "./index.css";

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
