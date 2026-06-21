import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useViewport } from '@/hooks/useViewport'

gsap.registerPlugin(ScrollTrigger)

const services: { label: string; detail: string }[] = [
  { label: 'Course & Curriculum Development', detail: 'End-to-end curriculum design aligned to competency frameworks and industry standards' },
  { label: 'Faculty & Teacher Enrichment', detail: 'Coaching programs, observation protocols, and continuous professional development systems' },
  { label: 'Research & Evaluation', detail: 'Rigorous mixed-methods evaluation of skilling programs with actionable insights' },
  { label: 'Strategic Advisory', detail: 'Large-scale skilling program design, implementation roadmaps, and stakeholder alignment' },
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const linesRef = useRef<SVGSVGElement>(null)
  const { isMobile } = useViewport()

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const list = listRef.current
    const lines = linesRef.current
    if (!section || !heading || !list || !lines) return

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

      scrollTl.fromTo(heading, { x: '-12vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0)
      scrollTl.fromTo(list.children, { x: '10vw', opacity: 0 }, { x: 0, opacity: 1, stagger: 0.04, ease: 'power2.out' }, 0.1)

      const linePaths = lines.querySelectorAll('line')
      linePaths.forEach((line) => {
        const length = 300
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
      })
      scrollTl.fromTo(linePaths, { strokeDashoffset: 300 }, { strokeDashoffset: 0, stagger: 0.03, ease: 'power2.out' }, 0)

      scrollTl.fromTo(heading, { x: 0, opacity: 1 }, { x: '-10vw', opacity: 0, ease: 'power2.in' }, 0.7)
      scrollTl.fromTo(list, { y: 0, opacity: 1 }, { y: '-22vh', opacity: 0, ease: 'power2.in' }, 0.72)
      scrollTl.fromTo(lines, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75)
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-pinned"
      style={{ backgroundColor: '#3F4A42' }}
    >
      {/* Decorative lines - hidden on mobile */}
      {!isMobile && (
        <svg
          ref={linesRef}
          style={{ position: 'absolute', left: '62vw', top: '10vh', width: '26vw', height: '12vh' }}
          viewBox="0 0 300 100"
          fill="none"
        >
          <line x1="0" y1="80" x2="300" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1="0" y1="60" x2="280" y2="10" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="0" y1="100" x2="260" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        </svg>
      )}

      {/* Heading - top on mobile, left on desktop */}
      <h2
        ref={headingRef}
        style={{
          position: 'absolute',
          left: isMobile ? '24px' : '6vw',
          top: isMobile ? '80px' : '14vh',
          maxWidth: isMobile ? 'calc(100% - 48px)' : '34vw',
          fontSize: isMobile ? 'clamp(30px, 8vw, 42px)' : 'clamp(36px, 5vw, 72px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: '#ffffff',
          fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
        }}
      >
        What we build
      </h2>

      {/* Services list */}
      <ul
        ref={listRef}
        style={{
          position: 'absolute',
          left: isMobile ? '24px' : '58vw',
          top: isMobile ? 'auto' : '18vh',
          bottom: isMobile ? '40px' : 'auto',
          width: isMobile ? 'calc(100% - 48px)' : '36vw',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {services.map((service, i) => (
          <li
            key={service.label}
            style={{
              padding: isMobile ? '16px 0' : '28px 0',
              borderBottom: '1px solid rgba(255,255,255,0.18)',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.14em',
                color: 'rgba(255,255,255,0.45)',
                fontVariantNumeric: 'tabular-nums',
                paddingTop: '6px',
                flexShrink: 0,
                width: '28px',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3
                style={{
                  fontSize: isMobile ? '16px' : 'clamp(18px, 1.6vw, 26px)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.25,
                  color: '#ffffff',
                  marginBottom: isMobile ? '4px' : '8px',
                  fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                }}
              >
                {service.label}
              </h3>
              <p
                style={{
                  fontSize: isMobile ? '13px' : '14px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.65)',
                  margin: 0,
                  maxWidth: '400px',
                }}
              >
                {service.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Geometric mark - bottom on mobile, hidden area on desktop */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: isMobile ? 'auto' : '84vh',
          bottom: isMobile ? '16px' : 'auto',
          transform: 'translateX(-50%)',
          width: '40px',
          height: '40px',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '50%',
        }}
      />
    </section>
  )
}
