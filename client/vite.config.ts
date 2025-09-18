import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '../'), '');
  const isDev = mode === 'development';

  return {
    define: {
      'process.env': process.env,
    },
    envDir: '../',
    plugins: [react(), tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    server: {
      historyApiFallback: true,
      host: env.HOST,
      port: 5173,
      proxy: {
        '/api': {
          target: `${isDev ? 'http' : 'https'}://${env.VITE_DEV_API_URL}`,
          secure: false,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@features': path.resolve(__dirname, 'src/features'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@sass': path.resolve(__dirname, 'src/assets/scss'),
        '@app-types': path.resolve(__dirname, 'src/types'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
      },
    },
  };
});
