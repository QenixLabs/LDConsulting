import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useViewport } from '@/hooks/useViewport'

gsap.registerPlugin(ScrollTrigger)

export default function Spatial() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hovered, setHovered] = useState(false)
  const shuttersRef = useRef<(HTMLDivElement | null)[]>([])
  const contentRef = useRef<HTMLDivElement>(null)
  const { isMobile, isTablet } = useViewport()

  const isSmall = isMobile || isTablet

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const shutters = shuttersRef.current.filter(Boolean) as HTMLDivElement[]

    const tl = gsap.timeline()

    shutters.forEach((shutter, i) => {
      const fromY = i % 2 === 0 ? '100vh' : '-100vh'
      tl.fromTo(
        shutter,
        { y: fromY },
        { y: 0, duration: 1.1, ease: 'power2.out' },
        i * 0.08
      )
    })

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        0.6
      )
    }

    return () => { tl.kill() }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const shutters = shuttersRef.current.filter(Boolean) as HTMLDivElement[]
    if (!section || shutters.length === 0) return

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: isMobile ? '+=120%' : '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onLeaveBack: () => {
            shutters.forEach((shutter) => {
              gsap.set(shutter, { y: 0, opacity: 1 })
            })
            if (contentRef.current) {
              gsap.set(contentRef.current.children, { opacity: 1, y: 0 })
            }
          },
        },
      })

      shutters.forEach((shutter, i) => {
        const exitY = i % 2 === 0 ? '-55vh' : '55vh'
        scrollTl.fromTo(
          shutter,
          { y: 0 },
          { y: exitY, ease: 'power2.in' },
          0.7
        )
      })

      if (contentRef.current) {
        scrollTl.fromTo(
          contentRef.current.children,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        )
      }
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  const setShutterRef = (el: HTMLDivElement | null, index: number) => {
    shuttersRef.current[index] = el
  }

  // Mobile: stack all shutters vertically
  if (isMobile) {
    return (
      <section
        id="spatial"
        ref={sectionRef}
        className="section-pinned"
        style={{ backgroundColor: '#DCD7CD' }}
      >
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', zIndex: 1 }}>
          {/* Mobile Hero: Forest panel with headline */}
          <div
            ref={(el) => setShutterRef(el, 0)}
            style={{
              backgroundColor: '#3F4A42',
              flex: '1.2',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '80px 24px 32px',
              position: 'relative',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: '20px' }}>
              LEARNING PARTNERS
            </span>
            <div ref={contentRef}>
              <h1 style={{ fontSize: 'clamp(36px, 10vw, 52px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05, color: '#ffffff', marginBottom: '16px', fontFamily: '"Cormorant Garamond", "Playfair Display", serif' }}>
                Building Learning Futures
              </h1>
              <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)', maxWidth: '320px' }}>
                Strategy, curriculum, and faculty systems that scale.
              </p>
            </div>
          </div>

          {/* Mobile: Photo strip */}
          <div
            ref={(el) => setShutterRef(el, 1)}
            style={{ height: '30vh', position: 'relative', overflow: 'hidden' }}
          >
            <img src="/images/hero-portrait.jpg" alt="LDConsulting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Mobile: Accent CTA bar */}
          <div
            ref={(el) => setShutterRef(el, 2)}
            style={{
              backgroundColor: '#C4551A',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{
                fontSize: '12px', fontWeight: 500, letterSpacing: '0.16em',
                color: hovered ? '#C4551A' : '#ffffff',
                backgroundColor: hovered ? '#ffffff' : 'transparent',
                border: '1px solid rgba(255,255,255,0.8)', padding: '14px 28px',
                cursor: 'pointer', transition: 'all 0.3s ease',
                textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
                width: '100%',
              }}
            >
              Explore the Work
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Tablet: 3 columns - merge some shutters
  if (isTablet) {
    return (
      <section
        id="spatial"
        ref={sectionRef}
        className="section-pinned"
        style={{ backgroundColor: '#DCD7CD' }}
      >
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', zIndex: 1 }}>
          {/* Column 1: Logo + Headline */}
          <div
            ref={(el) => setShutterRef(el, 0)}
            style={{ backgroundColor: '#3F4A42', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 28px 28px', position: 'relative', borderRight: '1px solid rgba(17,17,17,0.12)' }}
          >
            <span style={{ position: 'absolute', top: '24px', left: '24px', fontSize: '13px', fontWeight: 500, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.7)', fontFamily: '"Cormorant Garamond", serif', textTransform: 'uppercase' }}>
              LDConsulting
            </span>
            <div ref={contentRef}>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05, color: '#ffffff', marginBottom: '20px', fontFamily: '"Cormorant Garamond", serif' }}>
                Building<br />Learning<br />Futures
              </h1>
              <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)' }}>
                Strategy, curriculum, and faculty systems that scale.
              </p>
            </div>
          </div>

          {/* Column 2: Photo */}
          <div
            ref={(el) => setShutterRef(el, 1)}
            style={{ backgroundColor: '#DCD7CD', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 16px 24px', borderRight: '1px solid rgba(17,17,17,0.12)' }}
          >
            <div style={{ width: '90%', height: '50vh', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 28px rgba(0,0,0,0.10)' }}>
              <img src="/images/hero-portrait.jpg" alt="LDConsulting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Column 3: Accent + CTA */}
          <div
            ref={(el) => setShutterRef(el, 2)}
            style={{ backgroundColor: '#C4551A', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', padding: '24px 20px clamp(32px, 6vh, 60px)', position: 'relative' }}
          >
            <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              LEARNING PARTNERS
            </span>
            <button
              onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.16em', color: hovered ? '#C4551A' : '#ffffff', backgroundColor: hovered ? '#ffffff' : 'transparent', border: '1px solid rgba(255,255,255,0.8)', padding: '16px 24px', cursor: 'pointer', transition: 'all 0.3s ease', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', width: '100%' }}
            >
              Explore the Work
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Desktop: 5-column shutters
  return (
    <section
      id="spatial"
      ref={sectionRef}
      className="section-pinned"
      style={{ backgroundColor: '#DCD7CD' }}
    >
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', zIndex: 1 }}>
        {/* Shutter 1: Stone + Logo */}
        <div ref={(el) => setShutterRef(el, 0)} style={{ backgroundColor: '#DCD7CD', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 'clamp(80px, 12vh, 140px) 24px 24px', position: 'relative', borderRight: '1px solid rgba(17,17,17,0.12)' }}>
          <span style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.16em', color: '#111111', fontFamily: '"Cormorant Garamond", serif', textTransform: 'uppercase' }}>LDConsulting</span>
        </div>

        {/* Shutter 2: Accent + Label */}
        <div ref={(el) => setShutterRef(el, 1)} style={{ backgroundColor: '#C4551A', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: '24px', position: 'relative', borderRight: '1px solid rgba(17,17,17,0.12)' }}>
          <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>LEARNING PARTNERS</span>
        </div>

        {/* Shutter 3: Forest + Headline */}
        <div ref={(el) => setShutterRef(el, 2)} style={{ backgroundColor: '#3F4A42', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(80px, 12vh, 140px) clamp(16px, 2vw, 28px)', position: 'relative', borderRight: '1px solid rgba(17,17,17,0.12)' }}>
          <div ref={contentRef} style={{ maxWidth: '280px' }}>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.05, color: '#ffffff', marginBottom: '20px', fontFamily: '"Cormorant Garamond", serif' }}>Building<br />Learning<br />Futures</h1>
            <p style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', fontWeight: 300, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)' }}>Strategy, curriculum, and faculty systems that scale.</p>
          </div>
        </div>

        {/* Shutter 4: Stone + Photo */}
        <div ref={(el) => setShutterRef(el, 3)} style={{ backgroundColor: '#DCD7CD', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(80px, 12vh, 140px) 16px 24px', position: 'relative', borderRight: '1px solid rgba(17,17,17,0.12)' }}>
          <div style={{ width: '90%', height: '55vh', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 28px rgba(0,0,0,0.10)' }}>
            <img src="/images/hero-portrait.jpg" alt="LDConsulting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Shutter 5: Accent + CTA */}
        <div ref={(el) => setShutterRef(el, 4)} style={{ backgroundColor: '#C4551A', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '24px 16px clamp(40px, 8vh, 80px)', position: 'relative' }}>
          <button onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.16em', color: hovered ? '#C4551A' : '#ffffff', backgroundColor: hovered ? '#ffffff' : 'transparent', border: '1px solid rgba(255,255,255,0.8)', padding: '16px 28px', cursor: 'pointer', transition: 'all 0.3s ease', textTransform: 'uppercase', fontFamily: '"Inter", sans-serif', whiteSpace: 'nowrap' }}>
            Explore the Work
          </button>
        </div>
      </div>
    </section>
  )
}
