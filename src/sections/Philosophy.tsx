import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useViewport } from '@/hooks/useViewport'

gsap.registerPlugin(ScrollTrigger)

const tags = ['Curriculum', 'Coaching', 'Evaluation']

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const { isMobile } = useViewport()

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const tagsEl = tagsRef.current
    const label = labelRef.current
    const para = paraRef.current
    if (!section || !text || !tagsEl || !label || !para) return

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

      scrollTl.fromTo(text, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0)
      scrollTl.fromTo(label, { y: -20, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.05)
      scrollTl.fromTo(para, { y: -20, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.08)
      scrollTl.fromTo(tagsEl.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, ease: 'power2.out' }, 0.1)

      scrollTl.fromTo(text, { y: 0, opacity: 1 }, { y: '-35vh', opacity: 0, ease: 'power2.in' }, 0.7)
      scrollTl.fromTo([label, para], { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.75)
      scrollTl.fromTo(tagsEl, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.78)
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      className="section-pinned"
      style={{ backgroundColor: '#DCD7CD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Corner decorations - hidden on mobile */}
      {!isMobile && (
        <>
          <svg style={{ position: 'absolute', left: '-6vw', top: '-10vh', width: '22vw', opacity: 0.15, transform: 'rotate(-18deg)' }} viewBox="0 0 200 200" fill="none">
            <path d="M10,100 Q100,10 190,100" stroke="#111111" strokeWidth="1.5" />
          </svg>
          <svg style={{ position: 'absolute', right: '-6vw', bottom: '-10vh', width: '22vw', opacity: 0.15, transform: 'rotate(12deg)' }} viewBox="0 0 200 200" fill="none">
            <path d="M10,100 Q100,190 190,100" stroke="#111111" strokeWidth="1.5" />
          </svg>
        </>
      )}

      {/* Left label */}
      <span
        ref={labelRef}
        style={{
          position: 'absolute',
          left: isMobile ? '24px' : '6vw',
          top: isMobile ? '80px' : '16vh',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.24em',
          color: '#6E6A62',
          textTransform: 'uppercase',
        }}
      >
        MANIFESTO
      </span>

      {/* Right paragraph - repositioned on mobile */}
      <p
        ref={paraRef}
        style={{
          position: 'absolute',
          left: isMobile ? '24px' : '72vw',
          top: isMobile ? 'auto' : '16vh',
          bottom: isMobile ? '80px' : 'auto',
          width: isMobile ? 'calc(100% - 48px)' : '22vw',
          fontSize: isMobile ? '13px' : '14px',
          lineHeight: 1.7,
          color: '#6E6A62',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        Curriculum, coaching, and evaluation—built for schools, institutions, and enterprises.
      </p>

      {/* Center headline */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '54%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? 'calc(100% - 48px)' : '80vw',
          maxWidth: isMobile ? '100%' : '56vw',
          textAlign: 'center',
        }}
      >
        <p
          ref={textRef}
          style={{
            fontSize: isMobile ? 'clamp(24px, 7vw, 36px)' : 'clamp(28px, 4vw, 72px)',
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: '#111111',
            fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
          }}
        >
          We design systems where people learn, grow, and stay.
        </p>

        <div
          ref={tagsRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '8px' : '12px',
            marginTop: isMobile ? '32px' : '48px',
            flexWrap: 'wrap',
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                color: '#111111',
                padding: isMobile ? '8px 14px' : '10px 18px',
                border: '1px solid rgba(17,17,17,0.28)',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
