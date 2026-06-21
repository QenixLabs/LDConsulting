import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useViewport } from '@/hooks/useViewport'

gsap.registerPlugin(ScrollTrigger)

export default function InTheField() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const { isMobile } = useViewport()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const panel = panelRef.current
    const title = titleRef.current
    const body = bodyRef.current
    const video = videoRef.current
    if (!section || !panel || !title || !body || !video) return

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

      scrollTl.fromTo(video, { scale: 1.08, opacity: 0.85 }, { scale: 1, opacity: 1, ease: 'power2.out' }, 0)
      scrollTl.fromTo(panel, { x: '-50vw' }, { x: 0, ease: 'power2.out' }, 0)
      scrollTl.fromTo(title, { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.1)
      scrollTl.fromTo(body, { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.15)

      scrollTl.fromTo(video, { scale: 1, opacity: 1 }, { scale: 1.06, opacity: 0.6, ease: 'power2.in' }, 0.7)
      scrollTl.fromTo(panel, { x: 0 }, { x: '-30vw', ease: 'power2.in' }, 0.7)
      scrollTl.fromTo([title, body], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75)
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  const panelWidth = isMobile ? '100vw' : '44vw'

  return (
    <section
      ref={sectionRef}
      className="section-pinned"
      style={{ backgroundColor: '#0b0b0b' }}
    >
      <video
        ref={videoRef}
        src="/videos/in-the-field.mp4"
        muted
        loop
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', zIndex: 1 }} />

      <div
        ref={panelRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: panelWidth,
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
          ref={titleRef}
          style={{
            fontSize: isMobile ? 'clamp(26px, 7vw, 36px)' : 'clamp(28px, 3.8vw, 56px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: '#ffffff',
            marginBottom: '24px',
            fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
            maxWidth: isMobile ? '100%' : '34vw',
          }}
        >
          Learning happens where the work is.
        </h2>
        <p
          ref={bodyRef}
          style={{
            fontSize: isMobile ? '14px' : 'clamp(14px, 1.2vw, 16px)',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.78)',
            maxWidth: isMobile ? '100%' : '30vw',
            marginBottom: '32px',
          }}
        >
          We embed into teams, classrooms, and operations—then design what actually fits.
        </p>
        <a
          href="#work"
          onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}
          style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.16em', color: '#C4551A', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          See how we work <span style={{ fontSize: '14px' }}>→</span>
        </a>
      </div>
    </section>
  )
}
