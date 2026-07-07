import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/account-service": {
        target: "http://185.238.171.179",
        changeOrigin: true,
      },
      "/api": {
        target: "http://185.238.171.179",
        changeOrigin: true,

        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
