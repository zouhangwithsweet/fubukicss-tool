import waitFor from 'p-wait-for'
import ReactDOM from 'react-dom/client'

import { getCanvas, getObjectsPanel } from '../utils/figma.ts'
import App from './App.tsx'

// import '@unocss/reset/tailwind.css'
import 'uno.css'

export default defineUnlistedScript(() => {
  window.onload = async function () {
    await waitFor(() => !!(window as any).figma && getCanvas() != null && getObjectsPanel() != null)

    const app = document.createElement('div')
    const root = ReactDOM.createRoot(app)
    root.render(<App />)
    document.querySelector('.fubuki-css')!.append(app)
  }
})
