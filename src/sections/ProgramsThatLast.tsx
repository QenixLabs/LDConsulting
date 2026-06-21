import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useViewport } from '@/hooks/useViewport'

gsap.registerPlugin(ScrollTrigger)

export default function ProgramsThatLast() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const { isMobile } = useViewport()

  useEffect(() => {
    const section = sectionRef.current
    const panel = panelRef.current
    const photo = photoRef.current
    const headline = headlineRef.current
    const sub = subRef.current
    if (!section || !panel || !photo || !headline || !sub) return

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

      scrollTl.fromTo(panel, { x: '-60vw' }, { x: 0, ease: 'power2.out' }, 0)
      scrollTl.fromTo(photo, { x: '60vw', scale: 1.06 }, { x: 0, scale: 1, ease: 'power2.out' }, 0)
      scrollTl.fromTo(headline, { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.1)
      scrollTl.fromTo(sub, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.15)
      scrollTl.fromTo(photo, { y: '1vh' }, { y: '-1vh', ease: 'none' }, 0.3)

      scrollTl.fromTo(panel, { x: 0 }, { x: '-40vw', ease: 'power2.in' }, 0.7)
      scrollTl.fromTo(photo, { x: 0, opacity: 1 }, { x: '22vw', opacity: 0, ease: 'power2.in' }, 0.7)
      scrollTl.fromTo([headline, sub], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75)
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      className="section-pinned"
      style={{ backgroundColor: '#3F4A42' }}
    >
      {/* Left forest panel */}
      <div
        ref={panelRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: isMobile ? '100vw' : '52vw',
          height: '100%',
          backgroundColor: '#3F4A42',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isMobile ? '80px 24px 40px' : '0 6vw',
        }}
      >
        <h2
          ref={headlineRef}
          style={{
            fontSize: isMobile ? 'clamp(26px, 7vw, 36px)' : 'clamp(32px, 4.5vw, 72px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: '20px',
            fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
            maxWidth: isMobile ? '100%' : '40vw',
          }}
        >
          Programs that outlast the pilot.
        </h2>
        <p
          ref={subRef}
          style={{
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: isMobile ? '100%' : '36vw',
          }}
        >
          We build for adoption, not applause.
        </p>
      </div>

      {/* Right photo - smaller on mobile */}
      <div
        ref={photoRef}
        style={{
          position: 'absolute',
          left: isMobile ? '0' : '52vw',
          top: isMobile ? '50vh' : '0',
          width: isMobile ? '100vw' : '48vw',
          height: isMobile ? '50vh' : '100vh',
          zIndex: 1,
        }}
      >
        <img src="/images/outcomes-classroom.jpg" alt="Programs in action" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </section>
  )
}
