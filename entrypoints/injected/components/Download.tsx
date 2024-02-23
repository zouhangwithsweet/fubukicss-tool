import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

import { arrayBufferToBase64, arrayBufferToImageFile } from '@/entrypoints/utils/file'

import { currentSelection } from '../store'

export const Download = (props: { minimized?: boolean }) => {
  const node = useAtomValue(currentSelection)
  const [imageBase64, setImageBase64] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (node) {
        const data = await node.exportAsync()
        setImageBase64('data:image/png;base64,' + arrayBufferToBase64(data))
      }
    })()
  }, [node])

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
                const data = await node?.exportAsync()
                if (data) {
                  arrayBufferToImageFile(data, node?.name || 'fubukitool.png')
                }
              }}
            ></span>
          </>
        )}
      </div>
      {imageBase64 && show && (
        <div className="mt-4 p-4 flex-col-center bg-#f5f5f5 rounded-sm">
          <img src={imageBase64} alt="" className="w-full max-w-60 max-h-210px h-auto object-contain" />
        </div>
      )}
    </div>
  )
}
