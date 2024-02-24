import { defineConfig, presetIcons, presetUno } from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAnimations(),
    presetShadcn({
      color: 'zinc',
    }),
  ],
  rules: [
    [
      /^scrollbar-hide$/,
      ([_]) => {
        return `.scrollbar-hide{scrollbar-width:none}
.scrollbar-hide::-webkit-scrollbar{display:none}`
      },
    ],
    [
      /^scrollbar-default$/,
      ([_]) => {
        return `.scrollbar-default{scrollbar-width:auto}
.scrollbar-default::-webkit-scrollbar{display:block}`
      },
    ],
  ],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex flex-col justify-center items-center',
    },
  ],
})
