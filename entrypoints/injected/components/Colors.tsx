import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useAtom, useAtomValue } from 'jotai'
import { memo, useEffect, useMemo, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

import { figmaRGBToHex, figmaRGBToHSL, figmaRGBToWebRGB } from '@/entrypoints/utils/convert'

import { colorMode, currentSelection } from '../store'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { CopyContent } from './CopyContent'

export const Colors = memo((props: { minimized?: boolean }) => {
  const node = useAtomValue(currentSelection)
  const [mode, setMode] = useAtom(colorMode)

  const [paints, setPaints] = useState<Paint[]>([])
  const colors = useMemo(
    () =>
      paints
        .filter((p) => p.type === 'SOLID')
        .filter((p) => 'color' in p)
        .map((p) =>
          'color' in p
            ? mode === 'rgb'
              ? figmaRGBToWebRGB(p.color)
              : mode === 'hex'
                ? figmaRGBToHex(p.color)
                : figmaRGBToHSL(p.color)
            : null,
        )
        .filter((p) => p !== null),
    [mode, paints],
  )
  const colorVars = useMemo(
    () =>
      paints
        .filter((p) => p.type === 'SOLID')
        .filter((p) => 'boundVariables' in p)
        .map((p) => {
          if ('boundVariables' in p) {
            return figma.variables.getVariableById(p.boundVariables?.color?.id!)
          }
          return null
        })
        .filter((p) => p !== null),
    [paints],
  )

  useEffect(() => {
    if (figma) {
      const res = figma?.getSelectionColors()
      setPaints(res?.paints || [])
    }
  }, [node])

  const [_, copy] = useCopyToClipboard()

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        figma?.notify('Copied to clipboard')
      })
      .catch((error: any) => {
        figma?.notify('Failed to copy!', {
          error: true,
        })
      })
  }

  const [showMore, setShowMore] = useState(false)

  const formatColor = (c: any) => {
    return Array.isArray(c)
      ? mode === 'rgb'
        ? `rgba(${c?.join(', ')})`
        : `hsla(${c[0]}, ${c[1].toFixed(2).replace(/.00$/, '')}%, ${c[2].toFixed(2).replace(/.00$/, '')}%, ${c[3]})`
      : `${c}`
  }

  return (
    <div
      className={`${props.minimized ? 'hidden' : 'block'} p-4 border-t border-$color-border border-solid font-550 text-13px`}
    >
      <div className="flex items-center gap-2">
        <span className="flex-1">Colors</span>

        <Select onValueChange={(e: 'rgb') => setMode(e)} value={mode}>
          <SelectTrigger className="w-auto h-auto p-0 uppercase [&_span]:uppercase !shadow-[none] text-xs text-$color-text">
            <SelectValue placeholder={mode} className="uppercase" />
          </SelectTrigger>
          <SelectContent className="z-1002 border-1 border-solid border-border">
            <SelectGroup>
              {(['rgb', 'hex', 'hsl'] as const).map((m) => (
                <SelectItem key={m} value={m} className="w-30 uppercase text-xs">
                  {m}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div
        className={`mt-4 flex-col max-h-60 overflow-auto scrollbar-hide space-y-.5 ${colors.length === 0 ? 'hidden' : 'flex'}`}
        onMouseMove={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {[...new Set(colors.slice(0, showMore ? colors.length : 3))].map((c, index) => (
          <div
            key={`${formatColor(c)}_${index}`}
            className="shrink-0 h-7.5 flex items-center p-1 box-border rounded-sm cursor-pointer"
            onClick={handleCopy(formatColor(c))}
          >
            <span
              className="w-4 h-4 shrink-0 rounded-sm border-1 border-$color-border border-solid box-border"
              style={{
                backgroundColor: formatColor(c),
              }}
            ></span>
            <input
              type="text"
              readOnly
              value={formatColor(c)}
              className="ml-4 w-full font-400 text-xs font-[Inter] bg-transparent text-$color-text hover:underline"
            />
            {colorVars[index]?.name && (
              <CopyContent>
                <span className="font-400 text-xs font-[Inter] bg-transparent text-$color-text">
                  {colorVars[index]?.name.split('/').join('-').toLocaleLowerCase()}
                </span>
              </CopyContent>
            )}
          </div>
        ))}
        <ChevronDownIcon
          className={`mx-auto shrink-0 text-$color-text-secondary hover:text-$color-text cursor-pointer transition-transform ${colors.length > 3 ? '' : 'hidden'} ${showMore ? 'rotate-180' : ''}`}
          onClick={() => setShowMore(!showMore)}
        ></ChevronDownIcon>
      </div>
    </div>
  )
})
