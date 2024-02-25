import { useEffect, useState } from 'react'
import { getHighlighterCore } from 'shiki/core'
import getWasm from 'shiki/wasm'

export const HighLighter = (props: { cssCode: string }) => {
  const [highlighCode, setHighlightCode] = useState(' ')

  useEffect(() => {
    ;(async () => {
      const highlighter = await getHighlighterCore({
        themes: [
          // or a dynamic import if you want to do chunk splitting
          import('shiki/themes/vitesse-light.mjs'),
        ],
        langs: [import('shiki/langs/css.mjs')],
        loadWasm: getWasm,
      })

      // optionally, load themes and languages after creation
      await highlighter.loadTheme(import('shiki/themes/vitesse-light.mjs'))

      const code = highlighter.codeToHtml(`html{${props.cssCode}}`, {
        lang: 'css',
        theme: 'vitesse-light',
      })

      setHighlightCode(code)
    })()
  })

  return (
    <div
      className="px-4 h-auto py-4 lh-4.5 bg-#f5f5f5 cursor-text font-['Roboto_Mono'] scrollbar-hide [&_pre]:bg-transparent! [&_pre]:overflow-auto"
      dangerouslySetInnerHTML={{
        __html: highlighCode.replace('html', '').replace('{', '').replace('}', ''),
      }}
    ></div>
  )
}
