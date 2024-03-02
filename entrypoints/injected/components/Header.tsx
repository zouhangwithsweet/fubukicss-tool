import { CheckIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import { ForwardedRef, forwardRef, memo, MouseEvent } from 'react'
import { Maximize2, Minimize2, Settings } from 'react-feather'

import Logo from '@/entrypoints/assets/fubukicss.svg'
import { cn } from '@/entrypoints/utils/cn'

import { cssEngine, cssUnit, exportExt, exportScale } from '../store'
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
  const [ext, setExt] = useAtom(exportExt)
  const [scale, setScale] = useAtom(exportScale)

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
      <div className="p-.5 flex-center rounded bg-#eee">
        {!minimized && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Settings size={16} className="mr-1.5 text-#000/50 hover:text-#000 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-1001 border-1 border-solid border-muted">
              <DropdownMenuLabel className="cursor-default">Settings</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>{engine}</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="z-1002 border-1 border-solid border-muted">
                      {(['unocss', 'tailwind'] as const).map((item) => (
                        <DropdownMenuItem
                          key={item}
                          onClick={() => setEngine(item)}
                          className="flex-center justify-between"
                        >
                          {item} <CheckIcon className={cn('h-4 w-4', item === engine ? '' : 'hidden')} />
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>{unit}</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="z-1002 border-1 border-solid border-muted">
                      {(['rem', 'px'] as const).map((item) => (
                        <DropdownMenuItem
                          key={item}
                          onClick={() => setUnit(item)}
                          className="flex-center justify-between"
                        >
                          {item} <CheckIcon className={cn('h-4 w-4', item === unit ? '' : 'hidden')} />
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                {/* <DropdownMenuItem disabled>export</DropdownMenuItem> */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>{scale}x</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="z-1002 border-1 border-solid border-muted">
                      {([1, 1.5, 2, 3, 4] as const).map((item) => (
                        <DropdownMenuItem
                          key={item}
                          className="flex-center justify-between"
                          onClick={() => setScale(item)}
                        >
                          {item}x <CheckIcon className={cn('h-4 w-4', scale === item ? '' : 'hidden')} />
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="uppercase">{ext}</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="z-1002 border-1 border-solid border-muted">
                      {(['png', 'jpg', 'svg'] as const).map((item) => (
                        <DropdownMenuItem
                          key={item}
                          className="flex-center justify-between uppercase"
                          onClick={() => setExt(item)}
                        >
                          {item} <CheckIcon className={cn('h-4 w-4', ext === item ? '' : 'hidden')} />
                        </DropdownMenuItem>
                      ))}
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

export default memo(Header)
