import { useState, useEffect } from 'react'

export function useViewport() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      setWidth(w)
      setIsMobile(w < 768)
      setIsTablet(w >= 768 && w < 1024)
      setIsDesktop(w >= 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { width, isMobile, isTablet, isDesktop }
}
