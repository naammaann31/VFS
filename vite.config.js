import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: "gzip", ext: ".gz", threshold: 1024 }),
  ],
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
