import { useAtomValue } from 'jotai'
import { memo, useEffect, useState } from 'react'

import { arrayBufferToBase64, arrayBufferToImageFile } from '@/entrypoints/utils/file'

import { currentSelection, exportExt, exportScale } from '../store'

export const Download = memo((props: { minimized?: boolean }) => {
  const node = useAtomValue(currentSelection)
  const [imageBase64, setImageBase64] = useState('')
  const scale = useAtomValue(exportScale)
  const ext = useAtomValue(exportExt)

  const [show, setShow] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (node) {
        const data = await node.exportAsync({
          format: 'PNG',
          constraint: {
            type: 'SCALE',
            value: 1,
          },
        })
        setImageBase64('data:image/png;base64,' + arrayBufferToBase64(data))
      } else {
        setImageBase64('')
      }
    })()
  }, [ext, node, scale])

  return (
    <div
      className={`${props.minimized ? 'hidden' : 'block'} p-4 border-t border-#e5e5e5 border-solid font-600 text-13px`}
    >
      <div className="flex items-center gap-2">
        <span className="flex-1">Export</span>
        {imageBase64 && (
          <>
            <span
              className="flex items-center gap-.5 text-xs text-#000/50 cursor-pointer"
              onClick={() => setShow(!show)}
            >
              <span className={`w-3 h-3 ${show ? 'rotate-90' : ''} i-fe:play`}></span>
              preview
            </span>
            <span
              className="w-4 h-4 text-#000/50 hover:text-#000 cursor-pointer i-fe:download"
              onClick={async () => {
                const data =
                  ext === 'svg'
                    ? await node?.exportAsync({
                        format: 'SVG_STRING',
                      })
                    : await node?.exportAsync({
                        format: ext.toUpperCase() as 'PNG',
                        constraint: {
                          type: 'SCALE',
                          value: scale,
                        },
                      })
                if (data) {
                  arrayBufferToImageFile(
                    data,
                    node?.name ? `${node?.name}.${ext}` : 'fubukitool.png',
                    `image/${ext === 'svg' ? 'svg+xml' : ext}`,
                  )
                }
              }}
            ></span>
          </>
        )}
      </div>
      {imageBase64 && show && (
        <div
          className="mt-4 p-4 flex-col-center rounded-sm"
          style={{
            background:
              'conic-gradient(#fff .25turn,#f7f7f7 .25turn .5turn,#fff .5turn .75turn,#f7f7f7 .75turn) top left/20px 20px repeat',
          }}
        >
          <img src={imageBase64} alt="" className="w-full max-w-60 max-h-210px h-auto object-contain" />
        </div>
      )}
    </div>
  )
})
