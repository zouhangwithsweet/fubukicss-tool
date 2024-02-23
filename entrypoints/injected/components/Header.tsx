import { ForwardedRef, forwardRef, MouseEvent } from 'react'
import { Maximize2, Minimize2 } from 'react-feather'

import Logo from '@/entrypoints/assets/fubukicss.svg'

interface Props {
  onMouseDown: (e: MouseEvent) => void
  onMouseUp: (e: MouseEvent) => void
  minimized: boolean
  onToggleSize: () => void
}

const Header = forwardRef(function (
  { onMouseDown, onMouseUp, minimized, onToggleSize }: Props,
  ref: ForwardedRef<HTMLElement>,
) {
  return (
    <header
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      ref={ref}
      className={`flex items-center gap-2 border-b border-#e5e5e5 border-solid cursor-grab active:cursor-grabbing transition-padding ${minimized ? 'py-2.5 px-3' : 'py-3 px-4'}`}
    >
      <img src={Logo} className="w-5 h-5 rounded" />
      <span className={`flex-1 block font-700 text-sm`}>Fubukicss Tool</span>
      <div className="p-.5 rounded text-#000/50 cursor-pointer hover:text-#000 bg-#eee" onClick={onToggleSize}>
        {minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
      </div>
    </header>
  )
})

export default Header
