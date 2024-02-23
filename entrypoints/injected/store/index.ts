import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const currentSelection = atom<SceneNode | null>(null)

export const cssEngine = atomWithStorage<'unocss' | 'tailwind'>('fubuki_css_engine', 'unocss')

export const cssUnit = atomWithStorage<'px' | 'rem'>('fubuki_css_unit', 'rem')
