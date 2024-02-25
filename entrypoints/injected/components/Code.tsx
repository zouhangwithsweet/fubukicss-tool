import { useAtom, useAtomValue } from 'jotai'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Clipboard } from 'react-feather'
import { toTailwindcss } from 'transform-to-tailwindcss-core'
import { toUnocssClass } from 'transform-to-unocss-core'
import { useCopyToClipboard } from 'usehooks-ts'

import { cssEngine, cssUnit, currentSelection } from '@/entrypoints/injected/store'

export const CodeArea = memo((props: { minimized?: boolean }) => {
  const engine = useAtomValue(cssEngine)
  const unit = useAtomValue(cssUnit)
  const isRem = useMemo(() => unit === 'rem', [unit])

  const [name, setName] = useState('')
  const [, setCurrentSelection] = useAtom(currentSelection)
  const [unoResult, setUnoResult] = useState<{ title: string; code: string }[]>()

  const handleSelectionChange = useCallback(async () => {
    const node = figma.currentPage?.selection?.[0]
    setCurrentSelection(node ?? null)
    setName(node?.name ?? '')

    const cssObj = await node?.getCSSAsync?.()
    if (cssObj === undefined) return

    const raw = Object.entries(cssObj)

    const cssCode = raw.map(([key, value]) => `${key}: ${value.replace(/\/\*.*\*\//g, '').trim()};`).join('\n')

    const uno = raw
      .map(
        ([key, value]) =>
          `${key}: ${value
            .replace(/\/\*.*\*\//g, '')
            .replace(/var\(--[\w-]*,\s*(.*)\)/g, (_, $1) => $1)
            .trim()}`,
      )
      .map((i) => (engine === 'unocss' ? toUnocssClass(i, isRem)[0] : toTailwindcss(i, isRem)))
      .join(' ')
      .replace(/border-(\d+\.\d+|\d+)/g, (_, $1) => `border-${Number($1) * 4}`)
      .replace(/(border-[xylrtb]-)(\d+\.\d+|\d+)/g, (_, $1, $2) => `${$1}${Number($2) * 4}`)
      .replace(/(p[xylrtb])-(\d+\.\d+|\d+)px/g, (_, $1, $2) => `${$1}-${$2 / 4}`)

    const unoMini = raw
      .filter(([key]) =>
        ['font-feature-settings', 'font-family', 'text-transform'].every((item) => !key?.startsWith(item)),
      )
      .map(
        ([key, value]) =>
          `${key}: ${value
            .replace(/\/\*.*\*\//g, '')
            .replace(/var\(--[\w-]*,\s*(.*)\)/g, (_, $1) => $1)
            .trim()}`,
      )
      .map((i) => (engine === 'unocss' ? toUnocssClass(i, isRem)[0] : toTailwindcss(i, isRem)))
      .filter((i) => ['lh-normal', 'font-not-italic', 'bg-[url(]'].every((item) => !i?.startsWith(item)))
      .join(' ')
      .replace(/border-(\d+\.\d+|\d+)/g, (_, $1) => `border-${Number($1) * 4}`)
      .replace(/(border-[xylrtb]-)(\d+\.\d+|\d+)/g, (_, $1, $2) => `${$1}${Number($2) * 4}`)
      .replace(/(p[xylrtb])-(\d+\.\d+|\d+)px/g, (_, $1, $2) => `${$1}-${$2 / 4}`)

    setUnoResult([
      {
        title: engine,
        code: uno,
      },
      {
        title: `${engine}-mini`,
        code: unoMini,
      },
      {
        title: 'css',
        code: cssCode,
      },
    ])
  }, [engine, isRem, setCurrentSelection])

  useEffect(() => {
    handleSelectionChange()
  }, [engine, handleSelectionChange])

  useEffect(() => {
    const canvas = document.querySelector('#fullscreen-root canvas')
    canvas?.addEventListener('click', handleSelectionChange)
    return () => {
      canvas?.removeEventListener('click', handleSelectionChange)
    }
  }, [handleSelectionChange])

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

  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  useEffect(() => {
    console.log(name)
    setTimeout(() => {
      inputRef.current!.style.height = 'auto'
      inputRef.current!.style.height = inputRef.current!.scrollHeight - 32 + 'px'
    }, 0)
  }, [name])

  return (
    <>
      {!name && !props.minimized && <div className="p-4 font-600 text-13px">Select Layer </div>}
      <div className={`${props.minimized || !name ? 'hidden' : ''}`}>
        <div className={`flex p-4 items-center border-b border-#e5e5e5 border-solid font-600 text-13px`}>
          <span className="p-1 hover:bg-#e5e5e5/50 rounded-sm cursor-pointer truncate" onClick={handleCopy(name)}>
            {name}
          </span>
        </div>
        <div
          className={`p-4 bg-white space-y-4`}
          onMouseMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {unoResult?.map((u) => (
            <div className="flex flex-col items-stretch bg-#f5f5f5 rounded-sm">
              <div className="px-4 h-8 flex-center justify-between border-b border-#e5e5e5 border-solid">
                <span className="text-#000/50 text-xs">{u.title}</span>
                <Clipboard
                  size={16}
                  stroke="rgba(0,0,0,0.5)"
                  className="cursor-pointer"
                  onClick={handleCopy(u.code.replaceAll('<br/>', ''))}
                />
              </div>
              {u.title !== 'css' ? (
                <input
                  contentEditable
                  onCut={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                  onSelect={(e) => {
                    const target = e.target as HTMLInputElement
                    const selection = target.value.substring(target.selectionStart || 0, target.selectionEnd || 0)
                    if (!selection.trim()) return
                    handleCopy(selection)()
                  }}
                  className="px-4 h-10 flex items-center overflow-auto whitespace-nowrap font-['Roboto_Mono'] bg-#f5f5f5 cursor-text text-popover-foreground"
                  value={u.code}
                  readOnly
                ></input>
              ) : (
                <>
                  <textarea
                    ref={inputRef}
                    rows={1}
                    autoComplete="off"
                    className="px-4 h-auto py-4 lh-4.5 bg-#f5f5f5 cursor-text font-['Roboto_Mono'] text-popover-foreground resize-none scrollbar-hide"
                    value={u.code}
                    readOnly
                    onSelect={(e) => {
                      const target = e.target as HTMLInputElement
                      const selection = target.value.substring(target.selectionStart || 0, target.selectionEnd || 0)
                      if (!selection.trim()) return
                      handleCopy(selection)()
                    }}
                  ></textarea>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
})
