const originalMetaKeyGetter = Object.getOwnPropertyDescriptor(MouseEvent.prototype, 'metaKey')?.get
const originalAltKeyGetter = Object.getOwnPropertyDescriptor(MouseEvent.prototype, 'altKey')?.get

export function toggleCustomState(press: boolean) {
  if (press) {
    Object.defineProperty(MouseEvent.prototype, 'metaKey', {
      get() {
        return true
      },
    })

    Object.defineProperty(MouseEvent.prototype, 'altKey', {
      get() {
        return true
      },
    })
  } else {
    Object.defineProperty(MouseEvent.prototype, 'metaKey', {
      get() {
        return originalMetaKeyGetter?.call(this)
      },
    })

    Object.defineProperty(MouseEvent.prototype, 'altKey', {
      get() {
        return originalAltKeyGetter?.call(this)
      },
    })
  }
}
