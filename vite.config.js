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
        secure: false,
        rewrite: (path) => path,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('X-User-Id', '1');
            proxyReq.setHeader('X-User-Type', 'USER');
            proxyReq.setHeader('X-Service-Name', 'account-service');
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Accept', '*/*');
            console.log('🔵 [PROXY] Headers:', {
              'X-User-Id': proxyReq.getHeader('X-User-Id'),
              'X-User-Type': proxyReq.getHeader('X-User-Type'),
              'X-Service-Name': proxyReq.getHeader('X-Service-Name'),
            });
          });
        },
      },
    },
  },
});