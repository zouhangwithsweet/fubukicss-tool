import { CheckIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { ForwardedRef, forwardRef, memo, useCallback, useEffect } from 'react'
import { Maximize2, Minimize2, Settings } from 'react-feather'

import Logo from '@/entrypoints/assets/fubukicss.svg'
import { cn } from '@/entrypoints/utils/cn'
import { toggleAltPress, toggleMetaPress } from '@/entrypoints/utils/key'

import { cssEngine, cssUnit, exportExt, exportScale, keepAltKeyPressing, keepMetaKeyPressing } from '../store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Switch } from '../ui/switch'

interface Props {
  minimized: boolean
  onToggleSize: () => void
  startDrag: (e: React.PointerEvent<Element> | PointerEvent) => void
}

const Header = forwardRef(function ({ minimized, onToggleSize, startDrag }: Props, ref: ForwardedRef<HTMLElement>) {
  const [engine, setEngine] = useAtom(cssEngine)
  const [unit, setUnit] = useAtom(cssUnit)
  const [ext, setExt] = useAtom(exportExt)
  const [scale, setScale] = useAtom(exportScale)
  const [altPressing, setAltPressing] = useAtom(keepAltKeyPressing)
  const [metaPressing, setMetaPressing] = useAtom(keepMetaKeyPressing)

  useEffect(() => {
    toggleAltPress(altPressing)
    toggleMetaPress(metaPressing)

    const canvas = document.querySelector('#fullscreen-root canvas')
    let isScrolling: number
    let isPressSpace: boolean = false
    const wheelHandler = function () {
      clearTimeout(isScrolling)
      toggleMetaPress(false)
      isScrolling = setTimeout(function () {
        // Ensure that pressing the space does not trigger metaPressing
        !isPressSpace && toggleMetaPress(metaPressing)
      }, 300)
    }
    const spaceHandler = function (e: KeyboardEvent) {
      const { type, code } = e
      if (code === 'Space') {
        if (type === 'keyup') {
          isPressSpace = false
          toggleAltPress(altPressing)
          toggleMetaPress(metaPressing)
          return
        }
        if (type === 'keydown' && !isPressSpace) {
          isPressSpace = true
          toggleAltPress(false)
          toggleMetaPress(false)
        }
      }
    }
    canvas?.addEventListener('wheel', wheelHandler, false)
    document.addEventListener('keydown', spaceHandler, false)
    document.addEventListener('keyup', spaceHandler, false)
    return () => {
      canvas?.removeEventListener('wheel', wheelHandler, false)
      document.removeEventListener('keydown', spaceHandler, false)
      document.removeEventListener('keyup', spaceHandler, false)
    }
  }, [altPressing, metaPressing])
  // The DropdownMenuTrigger has been disabled from opening the menu when holding down the Ctrl key
  // https://github.com/radix-ui/primitives/blob/main/packages/react/dropdown-menu/src/DropdownMenu.tsx#L119
  const onMouseEnter = useCallback(() => {
    toggleMetaPress(false)
  }, [])
  const onMouseLeave = useCallback(() => {
    toggleMetaPress(metaPressing)
  }, [metaPressing])

  return (
    <motion.header
      onPointerDown={startDrag}
      ref={ref}
      className={`flex items-center gap-2 border-b border-$color-border border-solid cursor-grab active:cursor-grabbing transition-padding ${minimized ? 'py-2.5 px-3' : 'py-3 px-4'} sticky top-0 bg-$color-bg z-2`}
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
      <div
        className="p-.5 flex-center rounded bg-#eee"
        onMouseDown={(e) => {
          e.stopPropagation()
        }}
      >
        {!minimized && (
          <>
            {altPressing && <span className="i-mdi:alpha-a-box w-4 h-4 text-$color-bg-brand"></span>}
            {metaPressing && <span className="i-mdi:alpha-m-box w-4 h-4 text-$color-bg-brand"></span>}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Settings
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  size={16}
                  className="mr-1.5 text-$color-text-secondary hover:text-$color-text cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-1001 border-1 border-solid border-border">
                <DropdownMenuLabel className="cursor-default">Settings</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>{engine}</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="z-1002 border-1 border-solid border-border">
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
                      <DropdownMenuSubContent className="z-1002 border-1 border-solid border-border">
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
                      <DropdownMenuSubContent className="z-1002 border-1 border-solid border-border">
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
                      <DropdownMenuSubContent className="z-1002 border-1 border-solid border-border">
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

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    Measure to selection
                    <Switch
                      className="ml-auto scale-86"
                      checked={altPressing}
                      onCheckedChange={(e) => {
                        setAltPressing(e)

                        toggleAltPress(e)
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Deep select
                    <Switch
                      className="ml-auto scale-86"
                      checked={metaPressing}
                      onCheckedChange={(e) => {
                        setMetaPressing(e)

                        toggleMetaPress(e)
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
        <span
          className="flex-center text-$color-text-secondary cursor-pointer hover:text-$color-text"
          onClick={onToggleSize}
        >
          {minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
        </span>
      </div>
    </motion.header>
  )
})

export default memo(Header)
