import { ChevronDownIcon, DividerHorizontalIcon } from '@radix-ui/react-icons'
import { useAtom, useAtomValue } from 'jotai'
import { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Clipboard } from 'react-feather'
import { toTailwindcss } from 'transform-to-tailwindcss-core'
import { toUnocssClass } from 'transform-to-unocss-core'
import { useCopyToClipboard } from 'usehooks-ts'

import { cssEngine, cssUnit, currentSelection, expandAtomic, expandCode } from '@/entrypoints/injected/store'
import { cn } from '@/entrypoints/utils/cn'

export const CodeArea = memo((props: { minimized?: boolean }) => {
  const engine = useAtomValue(cssEngine)
  const unit = useAtomValue(cssUnit)
  const [expand, setExpand] = useAtom(expandCode)
  const [atomicExpand, setAtomicExpand] = useAtom(expandAtomic)
  const isRem = useMemo(() => unit === 'rem', [unit])

  const [name, setName] = useState('')
  const [, setCurrentSelection] = useAtom(currentSelection)
  const [unoResult, setUnoResult] = useState<{ title: string; code: string; type: string }[]>()

  const handleSelectionChange = useCallback(async () => {
    const node = window.fubukicss_figma?.currentPage?.selection?.[0]
    setCurrentSelection(node ?? null)
    setName((node?.type === 'TEXT' ? node?.characters : node?.name) ?? '')

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
        type: 'class',
      },
      {
        title: `${engine}-mini`,
        code: unoMini,
        type: 'class',
      },
      {
        title: 'css',
        code: cssCode,
        type: 'css',
      },
      {
        title: 'layout',
        code: `width: ${node?.width}px;\nheight: ${node?.height}px;\ntop: ${node?.y}px;\nleft: ${node?.x}px;\n`,
        type: 'css',
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

  useEffect(() => {
    const leftPanel = document.querySelector('#left-panel-container')
    leftPanel?.addEventListener('click', handleSelectionChange)
    return () => {
      leftPanel?.removeEventListener('click', handleSelectionChange)
    }
  }, [handleSelectionChange])

  const [_, copy] = useCopyToClipboard()

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        window.fubukicss_figma?.notify('Copied to clipboard')
      })
      .catch(() => {
        window.fubukicss_figma?.notify('Failed to copy!', {
          error: true,
        })
      })
  }

  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  useEffect(() => {
    setTimeout(() => {
      if (!inputRef.current) {
        return
      }
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = inputRef.current.scrollHeight - 32 + 'px'
    }, 0)
  }, [name])

  return (
    <>
      {!name && !props.minimized && <div className="p-4 font-600 text-13px">Select Layer </div>}
      <div className={`relative ${props.minimized || !name ? 'hidden' : ''}`}>
        <div className="flex px-4 py-2 items-center border-b border-$color-border border-solid font-600 text-13px sticky top-45px text-$color-text bg-$color-bg z-2">
          <span className="p-1 hover:bg-#e5e5e5/50 rounded-sm cursor-pointer truncate" onClick={handleCopy(name)}>
            {name}
          </span>
        </div>
        <div
          className="px-4 py-2 text-$color-text bg-$color-bg"
          onMouseMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          {unoResult?.map((u, index) => (
            <Fragment key={u.title}>
              {!(index % 2) ? (
                <div
                  className="flex-center cursor-pointer"
                  onClick={() => (index === 0 ? setAtomicExpand(!atomicExpand) : setExpand(!expand))}
                >
                  <span className="text-$color-text-secondary text-11px">{u.type}</span>
                  <ChevronDownIcon
                    className={cn(
                      'block ml-auto text-$color-text-secondary hover:text-$color-text cursor-pointer rotate-180',
                      index === 0 && !atomicExpand ? 'rotate-0' : '',
                      index !== 0 && !expand ? 'rotate-0' : '',
                    )}
                  />
                </div>
              ) : (
                <span
                  className={cn(
                    'block mx-auto h-3',
                    u.type === 'css' && !expand ? '!hidden' : '',
                    u.type === 'class' && !atomicExpand ? '!hidden' : '',
                  )}
                ></span>
              )}
              <div
                className={cn(
                  'flex flex-col items-stretch bg-$color-bg-secondary rounded-sm overflow-hidden',
                  u.type === 'css' && !expand ? '!hidden' : '',
                  u.type === 'class' && !atomicExpand ? '!hidden' : '',
                )}
              >
                <div className="px-4 h-8 flex-center justify-between border-b border-$color-border border-solid">
                  <span className="text-$color-text-secondary text-xs">{u.title}</span>
                  <Clipboard
                    size={16}
                    className="cursor-pointer text-$color-text-secondary hover:text-$color-text"
                    onClick={handleCopy(u.code.replaceAll('<br/>', ''))}
                  />
                </div>
                {u.type !== 'css' ? (
                  <input
                    contentEditable
                    onCut={(e) => e.preventDefault()}
                    onPaste={(e) => e.preventDefault()}
                    className="px-4 h-10 flex items-center overflow-auto whitespace-nowrap font-['Roboto_Mono'] bg-$color-bg-secondary cursor-text text-$color-text"
                    value={u.code}
                    readOnly
                  ></input>
                ) : (
                  <>
                    <textarea
                      ref={u.title === 'css' ? inputRef : null}
                      rows={4}
                      autoComplete="off"
                      className={cn(
                        "px-4 h-auto py-4 lh-4.5 bg-$color-bg-secondary cursor-text font-['Roboto_Mono'] text-$color-text resize-none scrollbar-hide",
                        u.title === 'layout' ? 'overflow-hidden' : '',
                      )}
                      value={u.code}
                      readOnly
                    ></textarea>
                  </>
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
})
