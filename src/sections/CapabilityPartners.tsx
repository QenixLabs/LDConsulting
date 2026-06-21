import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useViewport } from '@/hooks/useViewport'

gsap.registerPlugin(ScrollTrigger)

export default function CapabilityPartners() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const collageRef = useRef<HTMLDivElement>(null)
  const tileARef = useRef<HTMLAnchorElement>(null)
  const tileBRef = useRef<HTMLAnchorElement>(null)
  const { isMobile } = useViewport()

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const collage = collageRef.current
    const tileA = tileARef.current
    const tileB = tileBRef.current
    if (!section || !heading || !collage || !tileA || !tileB) return

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

      scrollTl.fromTo(heading, { y: -20, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.05)
      scrollTl.fromTo(collage, { y: '45vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.08)
      scrollTl.fromTo([tileA, tileB], { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.03, ease: 'back.out(1.2)' }, 0.1)

      scrollTl.fromTo(collage, { y: 0, opacity: 1 }, { y: '25vh', opacity: 0, ease: 'power2.in' }, 0.7)
      scrollTl.fromTo(heading, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.72)
      scrollTl.fromTo([tileA, tileB], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75)
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      className="section-pinned"
      style={{ backgroundColor: '#DCD7CD' }}
    >
      {/* Top-left heading */}
      <div
        ref={headingRef}
        style={{
          position: 'absolute',
          left: isMobile ? '24px' : '6vw',
          top: isMobile ? '80px' : '10vh',
          maxWidth: isMobile ? 'calc(100% - 48px)' : '36vw',
          zIndex: 2,
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? 'clamp(26px, 7vw, 36px)' : 'clamp(32px, 4.5vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#111111',
            fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
            marginBottom: '16px',
          }}
        >
          Capability partners
        </h2>
        <p
          style={{
            fontSize: isMobile ? '14px' : '15px',
            lineHeight: 1.7,
            color: '#6E6A62',
            maxWidth: '320px',
          }}
        >
          We collaborate with universities, districts, enterprises, and governments.
        </p>
      </div>

      {/* Geometric mark - hidden on mobile */}
      {!isMobile && (
        <svg
          style={{ position: 'absolute', left: '46vw', top: '12vh', width: '18vw', height: '8vh', opacity: 0.2 }}
          viewBox="0 0 200 60"
          fill="none"
        >
          <circle cx="30" cy="30" r="20" stroke="#111111" strokeWidth="1.5" />
          <rect x="70" y="15" width="30" height="30" stroke="#111111" strokeWidth="1.5" />
          <line x1="120" y1="20" x2="180" y2="40" stroke="#111111" strokeWidth="1.5" />
        </svg>
      )}

      {/* Bottom collage strip */}
      <div
        ref={collageRef}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100vw',
          height: isMobile ? '35vh' : '46vh',
          zIndex: 1,
        }}
      >
        <img src="/images/capability-collage.jpg" alt="Collaborative workshops" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(180deg, #DCD7CD 0%, transparent 100%)' }} />
      </div>

      {/* Floating tiles - repositioned on mobile */}
      <a
        ref={tileARef}
        href="#community"
        onClick={(e) => { e.preventDefault(); document.querySelector('#community')?.scrollIntoView({ behavior: 'smooth' }) }}
        className="float-tile"
        style={{
          position: 'absolute',
          left: isMobile ? '24px' : '44vw',
          top: isMobile ? 'auto' : '56vh',
          bottom: isMobile ? '40vh' : 'auto',
          width: isMobile ? 'calc(50% - 32px)' : '26vw',
          height: isMobile ? '60px' : '16vh',
          backgroundColor: '#C4551A',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: isMobile ? '11px' : '14px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          zIndex: 3,
          cursor: 'pointer',
          boxShadow: '0 10px 28px rgba(0,0,0,0.15)',
          transition: 'transform 0.3s ease',
          textAlign: 'center',
          padding: '0 12px',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
      >
        Join the network
      </a>

      <a
        ref={tileBRef}
        href="#work"
        onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}
        className="float-tile"
        style={{
          position: 'absolute',
          left: isMobile ? 'auto' : '74vw',
          right: isMobile ? '24px' : 'auto',
          top: isMobile ? 'auto' : '44vh',
          bottom: isMobile ? '40vh' : 'auto',
          width: isMobile ? 'calc(50% - 32px)' : '22vw',
          height: isMobile ? '60px' : '16vh',
          backgroundColor: '#C4551A',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: isMobile ? '11px' : '14px',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          zIndex: 3,
          cursor: 'pointer',
          boxShadow: '0 10px 28px rgba(0,0,0,0.15)',
          transition: 'transform 0.3s ease',
          textAlign: 'center',
          padding: '0 12px',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
      >
        See the directory
      </a>
    </section>
  )
}
