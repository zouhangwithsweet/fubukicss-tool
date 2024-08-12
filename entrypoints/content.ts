import { browser } from 'wxt/browser'

export default defineContentScript({
  matches: ['https://figma.com/file/*', 'https://www.figma.com/file/*', 'https://www.figma.com/design/*'],
  runAt: 'document_end',
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      tag: 'fubukicss',
      position: 'inline',
      onMount: (root) => {
        // Append children to the container
        const script = document.createElement('script')
        script.src = browser.runtime.getURL('/injected.js')
        script.onload = function () {
          console.log('🔍 script injected')
          script.remove()
        }
        const styleEl = document.createElement('link')
        styleEl.setAttribute('rel', 'stylesheet')
        styleEl.setAttribute('href', browser.runtime.getURL('assets/injected.css' as any))

        root.appendChild(styleEl)
        root.appendChild(script)
      },
    })

    // Call mount to add the UI to the DOM
    window.setTimeout(() => {
      ui.mount()
    }, 0)
  },
})
