import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/bfhl': {
        target: 'https://bajajapi-hshe.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
