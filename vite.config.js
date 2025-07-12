import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: {
    https: true, // ✅ Force Vite dev server to run on HTTPS
  },
  plugins: [react(), tailwindcss(), svgr(), mkcert()],
});
