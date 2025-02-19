import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const repoName = "vue-url-shortener";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: `/${repoName}/`,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
