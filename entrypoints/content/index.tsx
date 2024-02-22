import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style.css'

export default defineContentScript({
  matches: ['https://figma.com/file/*', 'https://www.figma.com/file/*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'fubukicss-tool-ui',
      position: 'inline',
      anchor: 'body',
      append: 'first',
      onMount: (container) => {
        const root = ReactDOM.createRoot(container)
        root.render(<App />)
        return root
      },
      onRemove: (root) => {
        root?.unmount()
      },
    })

    ui.mount()
  },
})
