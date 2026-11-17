import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { ROUTES, NOT_FOUND, findRoute } from "./routes";
import { renderHead } from "@/lib/seo";

export { ROUTES, NOT_FOUND };

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  const route = findRoute(url);
  return { html, head: renderHead(url === "/404" ? "/404" : route.path, route.seo) };
}
