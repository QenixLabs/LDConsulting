import { useEffect, useState } from 'react'

export default function Preloader() {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 600)
    const t2 = setTimeout(() => setPhase('done'), 1600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#3F4A42',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'reveal' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'reveal' ? 'none' : 'auto',
      }}
    >
      <span
        style={{
          fontSize: 'clamp(24px, 7vw, 80px)',
          fontWeight: 500,
          letterSpacing: '0.12em',
          color: '#ffffff',
          transform: phase === 'loading' ? 'translateY(40px)' : 'translateY(0)',
          opacity: phase === 'loading' ? 0 : 1,
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
          fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
        }}
      >
        LDConsulting
      </span>
    </div>
  )
}
