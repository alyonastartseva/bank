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
      "^/(account|transaction|user-settings)-service": {
        target: "http://185.238.171.179",
        changeOrigin: true,
        headers: {
          Origin: "http://185.238.171.179",
        },
      },
    },
  },
});
