import { atom } from 'jotai'

export const currentSelection = atom<SceneNode | null>(null)
