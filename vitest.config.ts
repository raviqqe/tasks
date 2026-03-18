import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: "v8",
    },
    environment: "jsdom",
    include: ["src/**/*.test.ts{,x}"],
    setupFiles: "src/test.ts",
  },
});
