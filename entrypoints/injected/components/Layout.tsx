import { useAtomValue } from 'jotai'
import { memo } from 'react'

import { currentSelection } from '../store'

export const Layout = memo((props: { minimized?: boolean }) => {
  const node = useAtomValue(currentSelection)

  return (
    <div
      className={`${props.minimized ? 'hidden' : 'block'} p-4 border-t border-#e5e5e5 border-solid font-600 text-13px`}
    >
      <div className="flex items-center gap-2">
        <span className="flex-1">Layout</span>
      </div>
      <div className=" bg-#f5f5f5 rounded-sm"></div>
    </div>
  )
})
