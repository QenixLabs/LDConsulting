import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useViewport } from '@/hooks/useViewport'

gsap.registerPlugin(ScrollTrigger)

export default function StrategyDelivered() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const { isMobile } = useViewport()

  useEffect(() => {
    const section = sectionRef.current
    const photo = photoRef.current
    const label = labelRef.current
    const headline = headlineRef.current
    if (!section || !photo || !label || !headline) return

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: isMobile ? '+=120%' : '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      scrollTl.fromTo(photo, { x: '-50vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0)
      scrollTl.fromTo(label, { x: '20vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0.08)
      scrollTl.fromTo(headline, { x: '50vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0.1)
      scrollTl.fromTo(photo, { y: 0 }, { y: '-2vh', ease: 'none' }, 0.3)

      scrollTl.fromTo(photo, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
      scrollTl.fromTo([label, headline], { y: 0, opacity: 1 }, { y: '-18vh', opacity: 0, ease: 'power2.in' }, 0.72)
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      className="section-pinned"
      style={{ backgroundColor: '#DCD7CD' }}
    >
      {/* Photo */}
      <div
        ref={photoRef}
        style={{
          position: 'absolute',
          left: isMobile ? '24px' : '6vw',
          top: isMobile ? '80px' : '18vh',
          width: isMobile ? 'calc(100% - 48px)' : '28vw',
          height: isMobile ? '35vh' : '64vh',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 10px 28px rgba(0,0,0,0.10)',
        }}
      >
        <img src="/images/approach-portrait.jpg" alt="Strategy workshop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Label */}
      <span
        ref={labelRef}
        style={{
          position: 'absolute',
          left: isMobile ? '24px' : '42vw',
          top: isMobile ? 'auto' : '22vh',
          bottom: isMobile ? '30vh' : 'auto',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.24em',
          color: '#6E6A62',
          textTransform: 'uppercase',
        }}
      >
        APPROACH
      </span>

      {/* Headline */}
      <h2
        ref={headlineRef}
        style={{
          position: 'absolute',
          left: isMobile ? '24px' : '42vw',
          top: isMobile ? 'auto' : '34vh',
          bottom: isMobile ? '60px' : 'auto',
          maxWidth: isMobile ? 'calc(100% - 48px)' : '52vw',
          fontSize: isMobile ? 'clamp(26px, 7vw, 36px)' : 'clamp(32px, 4.5vw, 72px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: '#111111',
          fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
          textShadow: '0 2px 18px rgba(220,215,205,0.55)',
        }}
      >
        Strategy that lands—without the bloat.
      </h2>
    </section>
  )
}
