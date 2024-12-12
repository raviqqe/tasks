import wywInJs from "@wyw-in-js/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  esbuild: {
    legalComments: "external",
  },
  plugins: [
    reactRouter(),
    wywInJs.default({
      include: ["src/**/*.{ts,tsx}"],
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
    }),
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
