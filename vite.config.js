import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: "gzip", ext: ".gz", threshold: 1024 }),
  ],
  // Listen on all interfaces, not just localhost, so the site can be opened
  // from a phone or another laptop on the same network.
  server: { host: true },
  preview: { host: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("three") || id.includes("globe")) return "globe";
          if (id.includes("framer-motion") || id.includes("motion")) return "motion";
          if (id.includes("react")) return "vendor";
        },
      },
    },
  },
});
