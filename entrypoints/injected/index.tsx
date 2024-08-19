import waitFor from 'p-wait-for'
import ReactDOM from 'react-dom/client'

import { getCanvas, getLeftPanel, mockFigma } from '../utils/figma.ts'
import App from './App.tsx'

// import '@unocss/reset/tailwind.css'
import 'uno.css'

const sleep = (ms: number) => new Promise<true>((resolve) => setTimeout(() => resolve(true), ms))

export default defineUnlistedScript(() => {
  window.onload = async function () {
    await waitFor(() => !!(window as any).figma && getCanvas() !== null && getLeftPanel() !== null)
    await waitFor(() => sleep(50))

    const app = document.createElement('div')
    const root = ReactDOM.createRoot(app)
    root.render(<App />)
    document.querySelector('fubukicss')!.append(app)
  }
})
