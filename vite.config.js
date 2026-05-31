import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Support client-side routing in development
    middlewareMode: false,
  },
  preview: {
    // Support client-side routing in preview mode
    middlewareMode: false,
  },
})
