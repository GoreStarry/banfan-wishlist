import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginRequire from "vite-plugin-require";
import { resolve } from "path";
import vitePluginString from "vite-plugin-string";

export default defineConfig({
  plugins: [react(), vitePluginRequire(), vitePluginString()],
  assetsInclude: ["**/*.gltf","**/*.glb"],
  // base: "/",
  server: {
    port: 8001,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        admin: resolve(__dirname, "admin.html"),
      },
    },
  },
});
