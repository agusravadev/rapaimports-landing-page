'use client'

import { useRef, useEffect } from 'react'

export function useMagneticButton<T extends HTMLElement = HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null)
  const isNear = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseMove = (e: MouseEvent) => {
      if (!isNear.current) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 80

      if (dist < maxDist) {
        const factor = (1 - dist / maxDist) * strength
        el.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`
      }
    }

    const onMouseLeave = () => {
      isNear.current = false
      el.style.transition = 'transform 0.4s ease'
      el.style.transform = 'translate(0, 0)'
    }

    const onMouseEnter = () => {
      isNear.current = true
      el.style.transition = 'transform 0.1s ease'
    }

    document.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseenter', onMouseEnter)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [strength])

  return ref
}
