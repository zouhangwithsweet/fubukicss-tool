import { useEffect, useRef, useState } from 'react'

import Header from './components/Header'

import './app.css'

export default () => {
  const header = useRef<HTMLElement | null>(null)

  const [minimized, setMinimized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [shiftPosition, setShiftPosition] = useState([0, 0])
  const [position, setPosition] = useState([window.innerWidth - 505, 72])

  function handleDragStart(e: React.MouseEvent<Element, MouseEvent>) {
    const metaPosition = header.current?.getBoundingClientRect()
    let shiftX = e.clientX - (metaPosition?.left ?? 0)
    let shiftY = e.clientY - (metaPosition?.top ?? 0)
    setShiftPosition([shiftX, shiftY])
    setIsDragging(true)
  }

  function handleDragEnd() {
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

  return (
    <div
      className={`fixed overflow-hidden text-xs text-#000 bg-#fff rounded-lg shadow-sm shadow-coolGray z-1000 ${minimized ? 'w-16' : 'w-60'} ${minimized ? 'h-9' : 'h-auto'}`}
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
    </div>
  )
}
