import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('leaflet') || id.includes('react-leaflet')) {
            return 'leaflet'
          }
          if (id.includes('@mui') || id.includes('@emotion')) {
            return 'mui'
          }
          if (id.includes('mobx')) {
            return 'mobx'
          }
          if (id.includes('axios')) {
            return 'axios'
          }
          if (
            id.includes('react-dom') ||
            id.includes('/node_modules/react/') ||
            id.includes('\\node_modules\\react\\')
          ) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
