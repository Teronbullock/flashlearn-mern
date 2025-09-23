import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, "../"), "");
  const isDev = mode === "development";

  return {
    define: {
      "process.env": process.env,
    },
    envDir: "../",
    plugins: [react(), tailwindcss(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        } as any,
      },
    },
    server: {
      historyApiFallback: true,
      host: env.HOST,
      port: 5173,
      proxy: {
        "/api": {
          target: `${isDev ? "http" : "https"}://${env.VITE_DEV_API_URL}`,
          secure: false,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@sass": path.resolve(__dirname, "src/assets/scss"),
      },
    },
  };
});
