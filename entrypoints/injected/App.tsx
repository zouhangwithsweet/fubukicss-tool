import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { CodeArea } from './components/Code'
import { Colors } from './components/Colors'
import { Download } from './components/Download'
import Header from './components/Header'

export default () => {
  const header = useRef<HTMLElement | null>(null)

  const [minimized, setMinimized] = useState(false)

  function handleToggleSize() {
    setMinimized(!minimized)
  }

  const container = useRef<HTMLBodyElement | null>(null)

  useEffect(() => {
    container.current = document.querySelector('body')!
  }, [])

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={container}
      dragElastic={false}
      className={`fixed top-10 right-20 text-xs text-$color-text bg-$color-bg rounded border-1 border-$color-border border-solid shadow-md z-10 antialiased h-auto transition-width !font-['Inter'] js-fullscreen-prevent-event-capture ${minimized ? 'w-50' : 'w-80'} max-h-[calc(100vh-50px)] overflow-y-scroll scrollbar-hide`}
      tabIndex={-1}
    >
      <Header ref={header} minimized={minimized} onToggleSize={handleToggleSize} />

      <CodeArea minimized={minimized} />

      {!(window.fubukicss_figma as any)?.isFubukicss && (
        <>
          <Download minimized={minimized} />

          <Colors minimized={minimized} />
        </>
      )}
    </motion.div>
  )
}
