import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/navneet-portfolio/", // Project repo: NavneetSharmaProgrammer.github.io/navneet-portfolio/
});
