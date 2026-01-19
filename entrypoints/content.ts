import { browser } from 'wxt/browser'

export default defineContentScript({
  matches: ['https://www.figma.com/*'],
  runAt: 'document_end',
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      tag: 'fubukicss',
      position: 'inline',
      onMount: (root) => {
        const styleEl = document.createElement('link')
        styleEl.setAttribute('rel', 'stylesheet')
        styleEl.setAttribute('href', browser.runtime.getURL('assets/injected.css' as any))

        root.appendChild(styleEl)

        injectScript('/loader.js', {
          modifyScript(script) {
            const entry = browser.runtime.getURL('/injected.js')
            script.dataset.entry = entry
          },
        })
      },
    })

    ui.mount()
  },
})
