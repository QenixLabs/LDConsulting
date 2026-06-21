import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { trpc } from '@/providers/trpc'
import { useViewport } from '@/hooks/useViewport'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const communityRef = useRef<HTMLDivElement>(null)
  const wedgeRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useViewport()

  const [submitHovered, setSubmitHovered] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' })

  const createContact = trpc.contact.create.useMutation({
    onSuccess: () => { setSubmitted(true); setSubmitError(null) },
    onError: (err) => { setSubmitError(err.message || 'Something went wrong. Please try again.') },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError('Please fill in all required fields.')
      return
    }
    createContact.mutate({
      fullName: formData.name,
      email: formData.email,
      organization: formData.organization || undefined,
      message: formData.message || undefined,
    })
  }

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const form = formRef.current
    const community = communityRef.current
    const wedge = wedgeRef.current
    if (!section || !heading || !form || !community || !wedge) return

    const ctx = gsap.context(() => {
      gsap.fromTo(wedge, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 80%', once: true } })
      gsap.fromTo(heading, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } })
      gsap.fromTo(form, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 70%', once: true } })
      gsap.fromTo(community, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 65%', once: true } })
    }, section)

    return () => ctx.revert()
  }, [])

  const fieldBase: React.CSSProperties = {
    width: '100%', padding: '12px 0', fontSize: '15px', backgroundColor: 'transparent',
    color: '#ffffff', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.35)',
    outline: 'none', fontFamily: 'inherit', letterSpacing: '0.01em',
  }
  const labelBase: React.CSSProperties = {
    fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase', marginBottom: '4px', display: 'block',
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#3F4A42',
        padding: isMobile ? '80px 20px' : '120px clamp(20px, 4vw, 60px)',
        overflow: 'hidden',
        minHeight: '700px',
      }}
    >
      {/* Top-left stone wedge */}
      <div
        ref={wedgeRef}
        style={{
          position: 'absolute', left: 0, top: 0, width: isMobile ? '70vw' : '46vw',
          height: isMobile ? '20vh' : '34vh', backgroundColor: '#DCD7CD',
          clipPath: 'polygon(0 0, 100% 0, 0 100%)', transformOrigin: 'left top', zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: isMobile ? '48px' : '60px',
          alignItems: 'start',
        }}
      >
        {/* Left: heading + community */}
        <div>
          <div ref={headingRef}>
            <h2
              style={{
                fontSize: isMobile ? 'clamp(30px, 8vw, 42px)' : 'clamp(36px, 5vw, 64px)',
                fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1,
                color: '#ffffff', fontFamily: '"Cormorant Garamond", serif', marginBottom: '16px',
              }}
            >
              Let's build what's next.
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', marginBottom: '48px', maxWidth: '400px' }}>
              Tell us what you're launching. We'll respond within two business days.
            </p>
          </div>

          {/* Community card */}
          <div
            id="community"
            ref={communityRef}
            style={{
              padding: isMobile ? '24px' : '32px',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: '12px', maxWidth: '420px',
            }}
          >
            <h3 style={{ fontSize: '22px', fontWeight: 500, letterSpacing: '-0.01em', color: '#ffffff', marginBottom: '12px', fontFamily: '"Cormorant Garamond", serif' }}>
              LDCommunity
            </h3>
            <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>
              A community for curriculum leaders, educators, and L&D professionals. Join our newsletter, roundtables, and resource sharing network.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Newsletter', 'Roundtables', 'Resources', 'Events'].map((item) => (
                <span key={item} style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', color: '#C4551A', padding: '8px 14px', border: '1px solid #C4551A', borderRadius: '6px', textTransform: 'uppercase' }}>
                  {item}
                </span>
              ))}
            </div>
            <div style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {['Blog', 'Events', 'YouTube'].map((item) => (
                <a key={item} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C4551A' }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)' }}
                >
                  {item} →
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: contact form */}
        <div>
          {submitted ? (
            <div style={{ border: '1px solid rgba(255,255,255,0.4)', padding: '32px 28px', fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', borderRadius: '8px' }}>
              Thank you — our team will be in touch within two business days. A confirmation has been sent to your email.
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {submitError && (
                <div style={{ border: '1px solid rgba(255,100,100,0.5)', padding: '14px 18px', fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,150,150,0.9)', marginBottom: '4px', borderRadius: '6px' }}>
                  {submitError}
                </div>
              )}
              <label style={{ display: 'block' }}>
                <span style={labelBase}>Full name *</span>
                <input type="text" name="name" placeholder="Jane Doe" value={formData.name} onChange={handleChange} required style={fieldBase}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#ffffff')}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
                />
              </label>
              <label style={{ display: 'block' }}>
                <span style={labelBase}>Email *</span>
                <input type="email" name="email" placeholder="you@organization.com" value={formData.email} onChange={handleChange} required style={fieldBase}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#ffffff')}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
                />
              </label>
              <label style={{ display: 'block' }}>
                <span style={labelBase}>Organization</span>
                <input type="text" name="organization" placeholder="Your organization" value={formData.organization} onChange={handleChange} style={fieldBase}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#ffffff')}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
                />
              </label>
              <label style={{ display: 'block' }}>
                <span style={labelBase}>Message *</span>
                <textarea name="message" placeholder="Tell us about your project, timeline, and goals..." rows={4} value={formData.message} onChange={handleChange} required
                  style={{ ...fieldBase, resize: 'vertical', paddingTop: '12px' }}
                  onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#ffffff')}
                  onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.35)')}
                />
              </label>
              <button
                type="submit"
                disabled={createContact.isPending}
                onMouseEnter={() => setSubmitHovered(true)}
                onMouseLeave={() => setSubmitHovered(false)}
                style={{
                  marginTop: '12px', padding: '18px 24px', fontSize: '13px', fontWeight: 500,
                  letterSpacing: '0.16em', color: submitHovered ? '#3F4A42' : '#ffffff',
                  backgroundColor: submitHovered ? '#ffffff' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.8)',
                  cursor: createContact.isPending ? 'wait' : 'pointer',
                  textTransform: 'uppercase', transition: 'all 0.25s ease',
                  fontFamily: '"Inter", sans-serif', opacity: createContact.isPending ? 0.6 : 1,
                  borderRadius: '6px', width: isMobile ? '100%' : 'auto',
                }}
              >
                {createContact.isPending ? 'Submitting...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
