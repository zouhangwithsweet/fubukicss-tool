import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentSelection = atom<SceneNode | null>(null)

export const cssEngine = atomWithStorage<'unocss' | 'tailwind'>('fubuki_css_engine', 'unocss')

export const cssUnit = atomWithStorage<'px' | 'rem' | 'rpx'>('fubuki_css_unit', 'rem')

export const exportExt = atomWithStorage<'png' | 'jpg' | 'svg'>('fubuki_export_ext', 'png')

export const exportScale = atomWithStorage<1 | 1.5 | 2 | 3 | 4>('fubuki_export_scale', 3)
