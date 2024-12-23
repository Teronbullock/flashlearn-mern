import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  server: {

    proxy: {
      '/api': {
        target: 'https://localhost:5001',
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
})
