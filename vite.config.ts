import { reactRouter } from "@react-router/dev/vite";
import defaultWyw from "@wyw-in-js/vite";
import { defaultImport } from "default-import";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const wyw = defaultImport(defaultWyw);

export default defineConfig({
  esbuild: {
    legalComments: "external",
  },
  plugins: [
    reactRouter(),
    wyw({
      babelOptions: {
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      },
      include: ["src/**/*.{ts,tsx}"],
    }),
    VitePWA({
      manifest: {
        // biome-ignore-start lint/style/useNamingConvention: External API
        background_color: "indianred",
        display: "standalone",
        icons: [{ sizes: "any", src: "icon.svg" }],
        name: "BeDone",
        short_name: "BeDone",
        start_url: ".",
        theme_color: "indianred",
        // biome-ignore-end lint/style/useNamingConvention: External API
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
