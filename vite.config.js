import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
  },
  // Serve the pre-built assets as-is
  publicDir: "public",
});
