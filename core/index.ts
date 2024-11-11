import { toTailwindcss } from 'transform-to-tailwindcss-core'
import { toUnocssClass } from 'transform-to-unocss-core'

export const transformToAtomic = (
  style: Record<string, string>,
  options: { engine: 'unocss' | 'tailwind'; isRem: boolean; prefix: string },
) => {
  const { engine = 'unocss', isRem = false, prefix = '' } = options
  const raw = Object.entries(style)

  const cssCode = raw.map(([key, value]) => `${key}: ${value.replace(/\/\*.*\*\//g, '').trim()};`).join('\n')

  const uno = raw
    .map(
      ([key, value]) =>
        `${key}: ${value
          .replace(/\/\*.*\*\//g, '')
          .replace(/var\(--[\w-]*,\s*(.*)\)/g, (_, $1) => $1)
          .trim()}`,
    )
    .map((i) => (engine === 'unocss' ? toUnocssClass(i, isRem)[0] : toTailwindcss(i, isRem)))
    .map((i) => `${prefix}${i}`)
    .join(' ')
    .replace(/border-(\d+\.\d+|\d+)/g, (_, $1) => `border-${Number($1) * 4}`)
    .replace(/(border-[xylrtb]-)(\d+\.\d+|\d+)/g, (_, $1, $2) => `${$1}${Number($2) * 4}`)
    .replace(/(p[xylrtb])-(\d+\.\d+|\d+)px/g, (_, $1, $2) => `${$1}-${$2 / 4}`)

  const unoMini = raw
    .filter(([key]) =>
      ['font-feature-settings', 'font-family', 'text-transform'].every((item) => !key?.startsWith(item)),
    )
    .map(
      ([key, value]) =>
        `${key}: ${value
          .replace(/\/\*.*\*\//g, '')
          .replace(/var\(--[\w-]*,\s*(.*)\)/g, (_, $1) => $1)
          .trim()}`,
    )
    .map((i) => (engine === 'unocss' ? toUnocssClass(i, isRem)[0] : toTailwindcss(i, isRem)))
    .filter((i) => ['lh-normal', 'font-not-italic', 'bg-[url(]'].every((item) => !i?.startsWith(item)))
    .map((i) => `${prefix}${i}`)
    .join(' ')
    .replace(/border-(\d+\.\d+|\d+)/g, (_, $1) => `border-${Number($1) * 4}`)
    .replace(/(border-[xylrtb]-)(\d+\.\d+|\d+)/g, (_, $1, $2) => `${$1}${Number($2) * 4}`)
    .replace(/(p[xylrtb])-(\d+\.\d+|\d+)px/g, (_, $1, $2) => `${$1}-${$2 / 4}`)

  return {
    cssCode,
    uno,
    unoMini,
  }
}
