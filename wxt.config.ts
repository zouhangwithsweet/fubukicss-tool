import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react(), UnoCSS()],
  }),
  manifest: {
    description: 'one step to get css from figma',
    web_accessible_resources: [
      {
        resources: ['/injected.js', '/assets/injected.css'],
        matches: ['https://figma.com/*', 'https://www.figma.com/*'],
      },
    ],
  },
})
