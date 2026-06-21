import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useViewport } from '@/hooks/useViewport'

gsap.registerPlugin(ScrollTrigger)

const resources = [
  { title: 'Curriculum at Scale', type: 'Publication' },
  { title: 'Faculty Coaching Playbook', type: 'Publication' },
  { title: 'Evaluation Handbook', type: 'Publication' },
  { title: 'Strategy Briefs', type: 'Conference' },
  { title: 'Learning Design Toolkit', type: 'Curated Resource' },
  { title: 'Annual Impact Report', type: 'Publication' },
]

export default function Resources() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const ruleRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useViewport()

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const list = listRef.current
    const circle = circleRef.current
    const rule = ruleRef.current
    if (!section || !heading || !list || !circle || !rule) return

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

      scrollTl.fromTo(circle, { scale: 0 }, { scale: 1, ease: 'back.out(1.6)' }, 0)
      scrollTl.fromTo(heading, { x: '-10vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' }, 0.05)
      scrollTl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, ease: 'power2.out' }, 0.08)
      scrollTl.fromTo(list.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' }, 0.15)

      scrollTl.fromTo(circle, { scale: 1, opacity: 1 }, { scale: 0.6, opacity: 0, ease: 'power2.in' }, 0.7)
      scrollTl.fromTo(heading, { x: 0, opacity: 1 }, { x: '-8vw', opacity: 0, ease: 'power2.in' }, 0.72)
      scrollTl.fromTo(list, { y: 0, opacity: 1 }, { y: '-14vh', opacity: 0, ease: 'power2.in' }, 0.74)
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="section-pinned"
      style={{ backgroundColor: '#DCD7CD' }}
    >
      {/* Accent circle - smaller on mobile */}
      <div
        ref={circleRef}
        style={{
          position: 'absolute',
          left: isMobile ? 'auto' : '78vw',
          right: isMobile ? '-40px' : 'auto',
          top: isMobile ? '60px' : '16vh',
          width: isMobile ? '120px' : '18vw',
          height: isMobile ? '120px' : '18vw',
          borderRadius: '999px',
          backgroundColor: '#C4551A',
          opacity: 0.9,
          zIndex: 0,
        }}
      />

      {/* Left heading block */}
      <div
        ref={headingRef}
        style={{
          position: 'absolute',
          left: isMobile ? '24px' : '6vw',
          top: isMobile ? '80px' : '14vh',
          maxWidth: isMobile ? 'calc(100% - 48px)' : '44vw',
          zIndex: 1,
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(36px, 5vw, 72px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: '#111111',
            fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
            marginBottom: '16px',
          }}
        >
          Research & Insights
        </h2>
        <p
          style={{
            fontSize: isMobile ? '14px' : '16px',
            lineHeight: 1.7,
            color: '#6E6A62',
            maxWidth: '380px',
          }}
        >
          We publish what we learn—so the work keeps improving.
        </p>
        <div
          ref={ruleRef}
          style={{
            marginTop: '28px',
            width: isMobile ? '140px' : '200px',
            height: '3px',
            backgroundColor: '#C4551A',
            transformOrigin: 'left center',
          }}
        />
      </div>

      {/* Right reading list */}
      <ul
        ref={listRef}
        style={{
          position: 'absolute',
          left: isMobile ? '24px' : '60vw',
          top: isMobile ? 'auto' : '20vh',
          bottom: isMobile ? '40px' : 'auto',
          width: isMobile ? 'calc(100% - 48px)' : '34vw',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          zIndex: 1,
        }}
      >
        {resources.map((resource) => (
          <li
            key={resource.title}
            style={{
              padding: isMobile ? '14px 0' : '20px 0',
              borderBottom: '1px solid rgba(17,17,17,0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
              flexWrap: 'wrap',
              gap: '8px',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C4551A' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#111111' }}
          >
            <span
              style={{
                fontSize: isMobile ? '15px' : 'clamp(16px, 1.4vw, 20px)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                color: 'inherit',
                fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
              }}
            >
              {resource.title}
            </span>
            <span
              style={{
                fontSize: '10px',
                letterSpacing: '0.14em',
                color: '#6E6A62',
                textTransform: 'uppercase',
                flexShrink: 0,
                marginLeft: '16px',
              }}
            >
              {resource.type}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
