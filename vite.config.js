import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/flashnews24-cms/",

  plugins: [react()],

  server: {
    host: true,
    port: 5173,
  },

  build: {
    outDir: "dist",
  },
});
