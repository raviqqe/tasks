import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  esbuild: {
    legalComments: "external",
  },
  plugins: [
    reactRouter(),
    VitePWA({
      manifest: false,
      workbox: {
        navigateFallbackDenylist: [/^\/__/],
      },
    }),
  ],
  ssr: {
    noExternal: ["react-spinners"],
  },
});
