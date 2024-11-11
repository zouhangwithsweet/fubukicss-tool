import { definePlugin } from '@tempad-dev/plugins'

import { transformToAtomic } from '../core/index'

export default definePlugin({
  name: 'core',
  code: {
    css: {
      title: 'unocss',
      lang: 'rust' as 'css',
      transform({ style }) {
        return transformToAtomic(style, { engine: 'unocss', isRem: true, prefix: '' }).uno
      },
    },
    js: false,
  },
})
