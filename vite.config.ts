import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { articlesPlugin } from "./scripts/content.mjs";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react(), articlesPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
