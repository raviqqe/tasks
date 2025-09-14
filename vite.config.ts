import { reactRouter } from "@react-router/dev/vite";
import defaultWyw from "@wyw-in-js/vite";
import { defaultImport } from "default-import";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const wyw = defaultImport(defaultWyw);

const name = "BeDone";
const color = "indianred";

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
        background_color: color,
        display: "standalone",
        icons: [
          {
            purpose: "maskable",
            sizes: "any",
            src: "icon.svg",
          },
        ],
        name,
        short_name: name,
        start_url: ".",
        theme_color: color,
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
