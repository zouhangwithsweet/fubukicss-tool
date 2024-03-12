const isMac = /mac/i.test(navigator.platform)
const metaKey = isMac ? 'metaKey' : 'ctrlKey'
const originalMetaKeyGetter = Object.getOwnPropertyDescriptor(MouseEvent.prototype, metaKey)!
const originalAltKeyGetter = Object.getOwnPropertyDescriptor(MouseEvent.prototype, 'altKey')!

export function toggleAltPress(press: boolean) {
  if (press) {
    Object.defineProperty(MouseEvent.prototype, 'altKey', {
      get() {
        return true
      },
    })
  } else {
    Object.defineProperty(MouseEvent.prototype, 'altKey', originalAltKeyGetter)
  }
}

export function toggleMetaPress(press: boolean) {
  if (press) {
    Object.defineProperty(MouseEvent.prototype, metaKey, {
      get() {
        return true
      },
    })
  } else {
    Object.defineProperty(MouseEvent.prototype, metaKey, originalMetaKeyGetter)
  }
}
