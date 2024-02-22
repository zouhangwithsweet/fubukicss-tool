import { useEffect, useRef, useState } from 'react'
import { Clipboard } from 'react-feather'
import { toUnocssClass } from 'transform-to-unocss-core'
import { useCopyToClipboard } from 'usehooks-ts'

import Header from './components/Header'

export default () => {
  const header = useRef<HTMLElement | null>(null)
  const initialPosition = JSON.parse(localStorage.getItem(`fubukicss_position`) || 'null')

  const [minimized, setMinimized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [shiftPosition, setShiftPosition] = useState([0, 0])
  const [position, setPosition] = useState(initialPosition || [window.innerWidth - 505, 72])

  function handleDragStart(e: React.MouseEvent<Element, MouseEvent>) {
    const metaPosition = header.current?.getBoundingClientRect()
    let shiftX = e.clientX - (metaPosition?.left ?? 0)
    let shiftY = e.clientY - (metaPosition?.top ?? 0)
    setShiftPosition([shiftX, shiftY])
    setIsDragging(true)
  }

  function handleDragEnd() {
    localStorage.setItem(`fubukicss_position`, JSON.stringify(position))
    setIsDragging(false)
  }

  function handleToggleSize() {
    setMinimized(!minimized)
  }

  useEffect(() => {
    function moving(e: MouseEvent) {
      if (isDragging) {
        setPosition([e.pageX - shiftPosition[0], e.pageY - shiftPosition[1]])
      }
    }
    window.addEventListener('mousemove', moving)
    return () => {
      window.removeEventListener('mousemove', moving)
    }
  }, [isDragging, shiftPosition])

  const [name, setName] = useState('')
  const [unoResult, setUnoResult] = useState<{ title: string; code: string }[]>()

  async function handleSelectionChange() {
    const node = figma.currentPage.selection[0]
    setName(node.name)
    const cssObj = await node.getCSSAsync()
    const raw = Object.entries(cssObj)

    const cssCode = raw.map(([key, value]) => `${key}: ${value.replace(/\/\*.*\*\//g, '').trim()};`).join('<br/>')

    const uno = raw
      .map(
        ([key, value]) =>
          `${key}: ${value
            .replace(/\/\*.*\*\//g, '')
            .replace(/var\(--[\w-]*,\s*(.*)\)/g, (_, $1) => $1)
            .trim()}`,
      )
      .map((i) => toUnocssClass(i, true)[0])
      .join(' ')
      .replace(/border-(\d+\.\d+|\d+)/g, (_, $1) => `border-${Number($1) * 4}`)
      .replace(/(border-[xylrtb]-)(\d+\.\d+|\d+)/g, (_, $1, $2) => `${$1}${Number($2) * 4}`)
      .replace(/(p[xylrtb])-(\d+\.\d+|\d+)px/g, (_, $1, $2) => `${$1}-${$2 / 4}`)

    const unoMini = raw
      .filter(([key]) =>
        ['font-feature-settings', 'font-family', 'text-transform'].every((item) => !key.startsWith(item)),
      )
      .map(
        ([key, value]) =>
          `${key}: ${value
            .replace(/\/\*.*\*\//g, '')
            .replace(/var\(--[\w-]*,\s*(.*)\)/g, (_, $1) => $1)
            .trim()}`,
      )
      .map((i) => toUnocssClass(i, true)[0])
      .filter((i) => !i.startsWith('font-not-italic') && !i.startsWith('lh-normal'))
      .join(' ')
      .replace(/border-(\d+\.\d+|\d+)/g, (_, $1) => `border-${Number($1) * 4}`)
      .replace(/(border-[xylrtb]-)(\d+\.\d+|\d+)/g, (_, $1, $2) => `${$1}${Number($2) * 4}`)
      .replace(/(p[xylrtb])-(\d+\.\d+|\d+)px/g, (_, $1, $2) => `${$1}-${$2 / 4}`)

    setUnoResult([
      {
        title: 'unocss',
        code: uno,
      },
      {
        title: 'unocss-mini',
        code: unoMini,
      },
      {
        title: 'css',
        code: cssCode,
      },
    ])
  }

  useEffect(() => {
    const canvas = document.querySelector('#fullscreen-root canvas')
    canvas?.addEventListener('click', handleSelectionChange)
    return () => {
      canvas?.removeEventListener('click', handleSelectionChange)
    }
  }, [])

  const [copiedText, copy] = useCopyToClipboard()

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

  return (
    <div
      className={`fixed overflow-hidden text-xs text-#000 bg-#fff rounded shadow-md z-1000 antialiased w-80 h-auto`}
      style={{
        left: position[0],
        top: position[1],
      }}
    >
      <Header
        ref={header}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        minimized={minimized}
        onToggleSize={handleToggleSize}
      />
      <div className="p-4 flex items-center border-b border-#e5e5e5 border-solid font-600 text-13px">
        <span className="p-1 hover:bg-#e5e5e5/50 rounded-sm cursor-pointer" onClick={handleCopy(name)}>
          {name}
        </span>
      </div>
      <div
        className="p-4 bg-white space-y-4"
        onMouseMove={(e) => {
          e.stopPropagation()
        }}
        onWheel={(e) => {
          e.stopPropagation()
        }}
      >
        {unoResult?.map((u) => (
          <div className="bg-#f5f5f5 rounded-sm">
            <div className="px-4 h-8 flex-center justify-between border-b border-#e5e5e5 border-solid">
              <span className="text-#000/50 text-xs">{u.title}</span>
              <Clipboard
                size={16}
                stroke="rgba(0,0,0,0.5)"
                className="cursor-pointer"
                onClick={handleCopy(u.code.replaceAll('<br/>', ''))}
              />
            </div>
            <div
              className={`px-4 flex items-center overflow-auto whitespace-nowrap font-['Roboto_Mono'] ${u.title === 'css' ? 'h-auto py-4 lh-4.5' : 'h-10'}`}
              dangerouslySetInnerHTML={{ __html: u.code }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}
