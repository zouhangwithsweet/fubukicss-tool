import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import '@unocss/reset/tailwind.css'
import 'uno.css'

function poll(next: () => void) {
  let timerId = setTimeout(function () {
    const { figma } = window as any
    if (!figma) {
      poll(next)
    } else {
      next()
      clearTimeout(timerId)
    }
  }, 300)
}

export default defineUnlistedScript(() => {
  window.onload = function () {
    const app = document.createElement('div')
    const root = ReactDOM.createRoot(app)
    poll(() => {
      root.render(<App />)
    })
    document.querySelector('.fubuki-css')!.append(app)
  }
})
