import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// GitHub Pages 部署到子路径时需要设置 BASE_PATH=/<仓库名>/
// 其他平台（Vercel / Netlify / Cloudflare Pages）保持默认 "/" 即可。
const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    // 把体积较大的依赖拆出去，利于浏览器缓存命中
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
