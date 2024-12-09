import react from "@vitejs/plugin-react";
import wywInJs from "@wyw-in-js/vite";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    (wywInJs as unknown as typeof import("@wyw-in-js/vite").default)({
      include: ["src/**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
    vike(),
    VitePWA({
      manifest: {
        short_name: "BeDone",
        name: "BeDone",
        icons: [{ src: "icon.svg", sizes: "any" }],
        start_url: ".",
        display: "standalone",
        theme_color: "indianred",
        background_color: "indianred",
      },
      workbox: {
        navigateFallbackDenylist: [/^\/__/],
      },
    }),
  ],
});
