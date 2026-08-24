import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [
    basicSsl(),
    react(),
    compression({ algorithm: "gzip", ext: ".gz", threshold: 1024 }),
  ],
  server: {
    host: true,
    watch: {
      ignored: ["**/*.pdf", "**/test pdf/**", "**/test_materials/**"],
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
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
