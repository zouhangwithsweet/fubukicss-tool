import waitFor from 'p-wait-for'
import ReactDOM from 'react-dom/client'

import { getCanvas, getObjectsPanel, mockFigma } from '../utils/figma.ts'
import App from './App.tsx'

// import '@unocss/reset/tailwind.css'
import 'uno.css'

const sleep = (ms: number) => new Promise<true>((resolve) => setTimeout(() => resolve(true), ms))

export default defineUnlistedScript(() => {
  window.onload = async function () {
    await waitFor(
      () =>
        (!!(window as any).figma && getCanvas() != null && getObjectsPanel() != null) ||
        document.querySelector('tempad')?.querySelector('header') != null,
    )
    await waitFor(() => sleep(50))

    window.fubukicss_figma = (window as any).figma || (mockFigma as any)

    const app = document.createElement('div')
    const root = ReactDOM.createRoot(app)
    root.render(<App />)
    document.querySelector('fubukicss')!.append(app)
  }
})
