import { CSSOptions, defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
// import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, "../"), "");
  console.log("VITE_API_URL:", env.VITE_API_URL);
  return {
    envDir: "../",
    plugins: [
      react({
        babel: {
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
      tailwindcss(),
      tsconfigPaths(),
      // visualizer({
      //   open: true,
      //   filename: "bundle-stats.html",
      //   exclude: { file: "**/node_modules/**" },
      // }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    } as CSSOptions,
    server: {
      historyApiFallback: true,
      host: env.HOST,
      port: 5173,
      strictPort: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          secure: false,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@sass": path.resolve(__dirname, "src/assets/scss"),
        "@components": path.resolve(__dirname, "src/components"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@": path.resolve(__dirname, "src"),
        "@content": path.resolve(__dirname, "src/content"),
        "@lib": path.resolve(__dirname, "src/lib"),
        "@feats": path.resolve(__dirname, "src/features"),
        "@context": path.resolve(__dirname, "src/context"),
        "@routes": path.resolve(__dirname, "src/routes"),
      },
    },
  };
});
