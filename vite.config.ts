import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    reactRouter(),
    VitePWA({
      manifest: {
        // biome-ignore-start lint/style/useNamingConvention: PWA manifest
        background_color: "indianred",
        display: "standalone",
        icons: [
          {
            purpose: "maskable",
            sizes: "any",
            src: "icon.svg",
          },
        ],
        name: "BeDone",
        short_name: "BeDone",
        start_url: ".",
        theme_color: "indianred",
        // biome-ignore-end lint/style/useNamingConvention: PWA manifest
      },
      workbox: {
        navigateFallbackDenylist: [/^\/__/],
      },
    }),
  ],
  ssr: {
    noExternal: ["react-spinners"],
  },
});
