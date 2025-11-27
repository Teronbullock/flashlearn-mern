import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

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
    ],
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
          target: env.VITE_API_URL,
          secure: false,
          changeOrigin: true,
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
