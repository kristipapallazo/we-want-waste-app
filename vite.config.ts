import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(({}) => {
  return {
    plugins: [react()],
    base: "/", // good for Vercel
    build: {
      outDir: "build", // or "dist", but be consistent with Vercel settings
    },
  };
});
