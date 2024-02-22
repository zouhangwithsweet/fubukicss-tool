import { browser } from 'wxt/browser'

export default defineContentScript({
  matches: ['https://figma.com/file/*', 'https://www.figma.com/file/*'],
  runAt: 'document_end',
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      onMount: (root) => {
        // Append children to the container
        const container = document.createElement('div')
        const script = document.createElement('script')
        script.src = browser.runtime.getURL('/injected.js')
        script.onload = function () {
          console.log('🔍 script injected')
          script.remove()
        }
        const styleEl = document.createElement('link')
        styleEl.setAttribute('rel', 'stylesheet')
        styleEl.setAttribute('href', browser.runtime.getURL('assets/injected.css' as any))

        container.appendChild(styleEl)
        container.appendChild(script)

        container.classList.add('fubuki-css')

        document.body.appendChild(container)
      },
    })

    // Call mount to add the UI to the DOM
    ui.mount()
  },
})
