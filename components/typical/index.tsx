import type { ElementRef } from 'react'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

export interface TypicalProps {
  texts: string[]
  className?: string
  speed?: number
}

function Typical(props: TypicalProps) {
  const { texts, className, speed = 60 } = props
  const spanRef = useRef<ElementRef<'span'>>(null)
  useEffect(() => {
    const typed = new Typed(spanRef.current, {
      strings: texts,
      typeSpeed: speed,
      // showCursor: false,
      // cursorChar: '✨',
    })

    return () => {
      typed.destroy()
    }
  })

  return (
    <span ref={spanRef} className={className} />
  )
}

export { Typical }
