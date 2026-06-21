import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useViewport } from '@/hooks/useViewport'

gsap.registerPlugin(ScrollTrigger)

interface CaseStudy {
  id: string
  title: string
  client: string
  img: string
  description: string
}

const caseStudies: CaseStudy[] = [
  { id: '01', title: 'Teacher Residency Redesign', client: 'Public School District', img: '/images/case-study-01.jpg', description: 'Competency maps + practice-based assessments for new teacher preparation.' },
  { id: '02', title: 'District Leadership Academy', client: 'State Education Dept', img: '/images/case-study-02.jpg', description: 'Cohort model + micro-credentialing for school administrators.' },
  { id: '03', title: 'Corporate Onboarding Overhaul', client: 'Fortune 500 Company', img: '/images/case-study-03.jpg', description: 'Scenario-based curriculum design at enterprise scale.' },
  { id: '04', title: 'University Career Curriculum', client: 'National University', img: '/images/case-study-04.jpg', description: 'Integrated employability framework across degree programs.' },
  { id: '05', title: 'Coaching Toolkit for Principals', client: 'Education NGO', img: '/images/case-study-05.jpg', description: 'Observation protocols + feedback cycles for school leaders.' },
  { id: '06', title: 'STEM Program Evaluation', client: 'Government Initiative', img: '/images/case-study-06.jpg', description: 'Longitudinal study + rapid iteration loops for national STEM rollout.' },
]

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const imageLoadedRef = useRef<boolean[]>(new Array(caseStudies.length).fill(false))
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(caseStudies.length).fill(null))
  const strengthRef = useRef(0)
  const prevScrollYRef = useRef(0)
  const randsRef = useRef<number[][]>(caseStudies.map(() => [Math.random(), Math.random(), Math.random(), Math.random()]))
  const { isMobile } = useViewport()

  const setCanvasRef = useCallback((el: HTMLCanvasElement | null, index: number) => {
    canvasRefs.current[index] = el
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    if (!section || !title) return

    const ctx = gsap.context(() => {
      gsap.fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%', once: true } })

      const cards = section.querySelectorAll('.work-item')
      cards.forEach((card, i) => {
        gsap.fromTo(card, { y: 60, rotate: -1.5, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, duration: 0.9, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 85%', once: true } })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    caseStudies.forEach((study, i) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        imagesRef.current[i] = img
        imageLoadedRef.current[i] = true
        const canvas = canvasRefs.current[i]
        if (canvas) {
          const rect = canvas.parentElement?.getBoundingClientRect()
          if (rect) {
            canvas.width = rect.width * Math.min(window.devicePixelRatio, 2)
            canvas.height = rect.height * Math.min(window.devicePixelRatio, 2)
          }
          drawImage(canvas, img, 0, randsRef.current[i])
        }
      }
      img.src = study.img
    })
  }, [])

  useEffect(() => {
    let rafId: number
    const animate = () => {
      const scrollY = window.scrollY
      const scrollDelta = scrollY - prevScrollYRef.current
      const dt = 1 / 60
      const targetStrength = (Math.abs(scrollDelta) * 10) / window.innerHeight
      strengthRef.current *= Math.exp(-dt * 10)
      strengthRef.current += Math.min(targetStrength, 5)
      const strength = Math.min(1, strengthRef.current)

      canvasRefs.current.forEach((canvas, i) => {
        if (!canvas || !imagesRef.current[i]) return
        if (Math.random() > Math.exp(-dt * 25 * (1 + strength))) {
          randsRef.current[i] = [Math.random(), Math.random(), Math.random(), Math.random()]
        }
        drawImage(canvas, imagesRef.current[i]!, strength, randsRef.current[i])
      })

      prevScrollYRef.current = scrollY
      rafId = requestAnimationFrame(animate)
    }
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      canvasRefs.current.forEach((canvas, i) => {
        if (!canvas || !canvas.parentElement) return
        const rect = canvas.parentElement.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio, 2)
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        if (imagesRef.current[i]) {
          drawImage(canvas, imagesRef.current[i]!, 0, randsRef.current[i])
        }
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section id="work" ref={sectionRef} style={{ backgroundColor: '#DCD7CD', padding: isMobile ? '80px 20px' : '120px clamp(20px, 4vw, 60px)' }}>
      <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
        <div
          ref={titleRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'baseline',
            marginBottom: isMobile ? '40px' : '60px',
            borderBottom: '1px solid rgba(17,17,17,0.28)',
            paddingBottom: '20px',
            flexWrap: 'wrap',
            gap: '16px',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <div>
            <h2 style={{ fontSize: isMobile ? 'clamp(30px, 8vw, 42px)' : 'clamp(36px, 5vw, 64px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1, color: '#111111', fontFamily: '"Cormorant Garamond", serif', marginBottom: '12px' }}>
              Case Studies
            </h2>
            <p style={{ fontSize: isMobile ? '14px' : '15px', lineHeight: 1.6, color: '#6E6A62', maxWidth: '520px' }}>
              A few engagements that show how we translate strategy into curriculum, coaching, and lasting systems.
            </p>
          </div>
          <span style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#6E6A62', textTransform: 'uppercase' }}>Featured Work</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: isMobile ? '16px' : '24px' }}>
          {caseStudies.map((study, i) => (
            <CaseCard key={study.id} study={study} index={i} setCanvasRef={setCanvasRef} offset={isMobile ? '0' : i % 3 === 1 ? '40px' : i % 3 === 2 ? '20px' : '0'} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CaseCard({ study, index, setCanvasRef, offset }: { study: CaseStudy; index: number; setCanvasRef: (el: HTMLCanvasElement | null, index: number) => void; offset: string }) {
  return (
    <div
      className="work-item card-lift"
      style={{ marginTop: offset, borderRadius: '12px', backgroundColor: '#ffffff', overflow: 'hidden', boxShadow: '0 10px 28px rgba(0,0,0,0.08)', cursor: 'default' }}
    >
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', overflow: 'hidden', backgroundColor: '#e5e5e5' }}>
        <canvas ref={(el) => setCanvasRef(el, index)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }} />
      </div>
      <div style={{ padding: '24px 28px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#6E6A62', textTransform: 'uppercase', marginBottom: '8px' }}>
          {study.id} · {study.client}
        </p>
        <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#111111', letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '8px', fontFamily: '"Cormorant Garamond", serif' }}>
          {study.title}
        </h3>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6E6A62' }}>{study.description}</p>
      </div>
    </div>
  )
}

function drawImage(canvas: HTMLCanvasElement, img: HTMLImageElement, strength: number, rands: number[]) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const cw = canvas.width
  const ch = canvas.height

  const imgRatio = img.width / img.height
  const canvasRatio = cw / ch
  let sw = img.width
  let sh = img.height
  let sx = 0
  let sy = 0
  if (imgRatio > canvasRatio) { sw = img.height * canvasRatio; sx = (img.width - sw) / 2 } else { sh = img.width / canvasRatio; sy = (img.height - sh) / 2 }

  ctx.clearRect(0, 0, cw, ch)

  if (strength < 0.01) { ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch); return }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)

  const numStrips = Math.floor(3 + strength * 12)
  for (let s = 0; s < numStrips; s++) {
    const stripY = Math.floor(rands[s % 4] * ch * (0.3 + s * 0.15)) % ch
    const stripH = Math.floor(2 + Math.random() * ch * 0.06 * strength)
    const offsetX = (rands[(s + 1) % 4] - 0.5) * cw * 0.15 * strength
    if (rands[(s + 2) % 4] > 0.7) { ctx.drawImage(canvas, 0, stripY, cw, stripH, offsetX, stripY, cw, stripH) }
  }

  if (strength > 0.05) {
    const shiftAmount = strength * 6
    ctx.globalCompositeOperation = 'screen'
    ctx.globalAlpha = strength * 0.3
    ctx.drawImage(canvas, shiftAmount, 0, cw, ch, 0, 0, cw, ch)
    ctx.drawImage(canvas, -shiftAmount, 0, cw, ch, 0, 0, cw, ch)
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
  }

  if (strength > 0.3) { ctx.fillStyle = `rgba(255,255,255,${(strength - 0.3) * 0.15})`; ctx.fillRect(0, 0, cw, ch) }
}
