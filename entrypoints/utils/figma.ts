// fork from https://github.com/ecomfe/tempad-dev/blob/main/src/entrypoints/ui/utils/figma.ts

export function getCanvas() {
  // Need to ensure the whole plugin is rendered after canvas is ready
  // so that we can cast the result to HTMLElement here.
  // The `waitFor` logic is in `./index.ts`.
  return document.querySelector('#fullscreen-root .gpu-view-content canvas') as HTMLElement
}

export function getLeftPanel() {
  // Similar to `getCanvas()`.
  return document.querySelector('#left-panel-container') as HTMLElement
}

const selection = {
  getCSSAsync() {
    return Object.fromEntries(
      document
        .querySelector('tempad')
        ?.querySelector('code')
        ?.textContent?.split('\n')
        .map((i) => i.replace(/\;|\s/g, '').split(':')) || [],
    )
  },
  characters: {
    get() {
      return document.querySelector('.tp-ellipsis')?.textContent || ''
    },
  },
  name: {
    get() {
      return document.querySelector('.tp-ellipsis')?.textContent || ''
    },
  },
}

Object.defineProperty(selection, 'characters', {
  get() {
    return document.querySelector('.tp-ellipsis')?.textContent || ''
  },
})

Object.defineProperty(selection, 'name', {
  get() {
    return document.querySelector('.tp-ellipsis')?.textContent || ''
  },
})

export const mockFigma = {
  isFubukicss: true,
  notify(message: string, options?: { error?: boolean }) {
    console.log(message)
  },
  getSelectionColors() {
    return { paints: [], styles: [] }
  },
  currentPage: {
    selection: [selection],
  },
}
