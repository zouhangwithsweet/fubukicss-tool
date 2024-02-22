import { defineConfig } from 'wxt'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react(), UnoCSS()],
  }),
})
