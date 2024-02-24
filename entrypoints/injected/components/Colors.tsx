import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useAtom, useAtomValue } from 'jotai'
import { memo, useEffect, useMemo, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

import { figmaRGBToHex, figmaRGBToWebRGB } from '@/entrypoints/utils/convert'

import { colorMode, currentSelection } from '../store'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

export const Colors = memo((props: { minimized?: boolean }) => {
  const node = useAtomValue(currentSelection)
  const [mode, setMode] = useAtom(colorMode)

  const [paints, setPaints] = useState<Paint[]>([])
  const colors = useMemo(
    () =>
      paints
        .filter((p) => p.type === 'SOLID')
        .filter((p) => 'color' in p)
        .map((p) => ('color' in p ? (mode === 'rgb' ? figmaRGBToWebRGB(p.color) : figmaRGBToHex(p.color)) : null))
        .filter((p) => p !== null),
    [mode, paints],
  )

  useEffect(() => {
    if (figma) {
      const res = figma.getSelectionColors()
      setPaints(res?.paints || [])
    }
  }, [node])

  const [_, copy] = useCopyToClipboard()

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        figma.notify('Copied to clipboard')
      })
      .catch((error: any) => {
        figma.notify('Failed to copy!', {
          error: true,
        })
      })
  }

  const [showMore, setShowMore] = useState(false)

  return (
    <div
      className={`${props.minimized ? 'hidden' : 'block'} p-4 border-t border-#e5e5e5 border-solid font-600 text-13px`}
    >
      <div className="flex items-center gap-2">
        <span className="flex-1">Colors</span>

        <Select onValueChange={(e: 'rgb') => setMode(e)} defaultValue={mode}>
          <SelectTrigger className="w-auto h-auto p-0 uppercase [&_span]:uppercase !shadow-[none] text-xs">
            <SelectValue placeholder={mode} className="uppercase" />
          </SelectTrigger>
          <SelectContent className="z-1002 border-1 border-solid border-muted">
            <SelectGroup>
              {(['rgb', 'hex'] as const).map((m) => (
                <SelectItem key={m} value={m} className="w-30 uppercase text-xs">
                  {m}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div
        className={`mt-4 flex flex-col max-h-60 overflow-auto scrollbar-hide space-y-.5 ${colors.length === 0 ? 'hidden' : ''}`}
        onMouseMove={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {colors.slice(0, showMore ? colors.length : 3).map((c, index) => (
          <div
            className="shrink-0 h-7.5 flex items-center p-1 box-border hover:bg-#e5e5e5/50 rounded-sm cursor-pointer"
            onClick={handleCopy(Array.isArray(c) ? `rgba(${c?.join(', ')})` : `${c}`)}
          >
            <span
              className="w-4 h-4 rounded-sm border-1 border-muted border-solid"
              style={{
                backgroundColor: Array.isArray(c) ? `rgba(${c?.join(', ')})` : `${c}`,
              }}
            ></span>
            <input
              type="text"
              readOnly
              value={Array.isArray(c) ? `rgba(${c?.join(', ')})` : `${c}`}
              className="ml-4 font-400 text-xs font-['Inter'] bg-transparent"
            />
          </div>
        ))}
        <ChevronDownIcon
          className={`mx-auto w-5 h-5 shrink-0 text-#000/50 hover:text-#000 cursor-pointer transition-transform ${colors.length > 3 ? '' : 'hidden'} ${showMore ? 'rotate-180' : ''}`}
          onClick={() => setShowMore(!showMore)}
        ></ChevronDownIcon>
      </div>
    </div>
  )
})
