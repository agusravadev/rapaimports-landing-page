'use client'

import { useEffect, useState } from 'react'

export function useIsScrolled(threshold = 60): boolean {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > threshold
      setIsScrolled((prev) => (prev === past ? prev : past))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return isScrolled
}
