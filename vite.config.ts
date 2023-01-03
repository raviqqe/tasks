import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "BeDone",
        name: "BeDone",
        icons: [{ src: "icon.svg", sizes: "any" }],
        start_url: ".",
        display: "standalone",
        theme_color: "black",
        background_color: "darkseagreen",
      },
      workbox: {
        navigateFallbackDenylist: [/^\/__/],
      },
    }),
  ],
  test: { environment: "jsdom" },
});
