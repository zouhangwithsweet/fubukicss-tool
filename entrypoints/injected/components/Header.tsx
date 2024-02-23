import { useAtom } from 'jotai'
import { ForwardedRef, forwardRef, MouseEvent } from 'react'
import { Maximize2, Minimize2, Settings } from 'react-feather'

import Logo from '@/entrypoints/assets/fubukicss.svg'

import { cssEngine, cssUnit } from '../store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

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
  const [engine, setEngine] = useAtom(cssEngine)
  const [unit, setUnit] = useAtom(cssUnit)

  return (
    <header
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      ref={ref}
      className={`flex items-center gap-2 border-b border-#e5e5e5 border-solid cursor-grab active:cursor-grabbing transition-padding ${minimized ? 'py-2.5 px-3' : 'py-3 px-4'}`}
    >
      {engine === 'unocss' ? (
        <img src={Logo} className="w-5 h-5 rounded cursor-pointer" onClick={() => setEngine('tailwind')} />
      ) : (
        <span
          className="w-5 h-5 rounded cursor-pointer i-logos:tailwindcss-icon"
          onClick={() => setEngine('unocss')}
        ></span>
      )}
      <span className="flex-1 font-700 text-sm">Fubukicss Tool</span>
      <div className="p-.5 flex-center rounded  bg-#eee">
        {!minimized && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Settings size={16} className="mr-1 text-#000/50 hover:text-#000 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-1001">
              <DropdownMenuLabel>CSS Setting</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>{engine}</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="z-1002">
                      <DropdownMenuItem onClick={() => setEngine('unocss')}>unocss</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEngine('tailwind')}>tailwind</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>{unit}</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="z-1002">
                      <DropdownMenuItem onClick={() => setUnit('rem')}>rem</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setUnit('px')}>px</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <span className="flex-center text-#000/50 cursor-pointer hover:text-#000" onClick={onToggleSize}>
          {minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
        </span>
      </div>
    </header>
  )
})

export default Header
