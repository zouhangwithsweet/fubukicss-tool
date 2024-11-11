import { definePlugin } from '@tempad-dev/plugins'

import { transformToAtomic } from '../core/index'

export default definePlugin({
  name: '@fubukicss/unocss',
  code: {
    css: {
      title: 'UnoCSS',
      lang: 'text' as 'css',
      transform({ style, options: { useRem } }) {
        return transformToAtomic(style, { engine: 'unocss', isRem: useRem, prefix: '' }).uno
      },
    },
    js: false,
  },
})
