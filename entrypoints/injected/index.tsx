import waitFor from 'p-wait-for'
import ReactDOM from 'react-dom/client'

import { getCanvas, getObjectsPanel, mockFigma } from '../utils/figma.ts'
import App from './App.tsx'

// import '@unocss/reset/tailwind.css'
import 'uno.css'

export default defineUnlistedScript(() => {
  window.onload = async function () {
    const figmaReady = !!(window as any).figma && getCanvas() != null && getObjectsPanel() != null
    const tempadReady = document.querySelector('tempad') != null
    await waitFor(() => figmaReady || tempadReady)

    window.fubukicss_figma = (window as any).figma || (mockFigma as any)

    const app = document.createElement('div')
    const root = ReactDOM.createRoot(app)
    root.render(<App />)
    document.querySelector('.fubuki-css')!.append(app)
  }
})
