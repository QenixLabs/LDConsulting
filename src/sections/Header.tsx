import { useEffect, useRef, useState } from 'react'
import { useViewport } from '@/hooks/useViewport'

interface HeaderProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
  forceLight?: boolean
}

const navItems = ['Services', 'Work', 'Insights', 'Contact']
const sectionIds = ['#services', '#work', '#insights', '#contact']

export default function Header({ scrollRef, forceLight = false }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false)
  const [overHeroRaw, setOverHeroRaw] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const rafRef = useRef<number>(0)
  const { isMobile } = useViewport()

  useEffect(() => {
    const check = () => {
      const y = scrollRef.current.y
      setIsCompact(y > 100)
      setOverHeroRaw(y < window.innerHeight * 0.85)
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scrollRef])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const overHero = overHeroRaw && !forceLight

  const handleNavClick = (index: number) => {
    setMobileOpen(false)
    const target = document.querySelector(sectionIds[index])
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const textColor = overHero && !mobileOpen ? '#ffffff' : '#111111'
  const bgColor = overHero && !mobileOpen ? 'transparent' : '#DCD7CD'
  const borderColor = overHero && !mobileOpen ? 'rgba(255,255,255,0.18)' : 'rgba(17,17,17,0.15)'

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: isCompact ? '56px' : isMobile ? '60px' : '80px',
          backgroundColor: mobileOpen ? '#DCD7CD' : bgColor,
          borderBottom: `1px solid ${mobileOpen ? 'rgba(17,17,17,0.15)' : borderColor}`,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${isMobile ? '20px' : 'clamp(20px, 4vw, 60px)'}`,
          transition:
            'height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease',
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: isMobile ? '15px' : '17px',
            fontWeight: 500,
            letterSpacing: '0.14em',
            cursor: 'pointer',
            color: mobileOpen ? '#111111' : textColor,
            transition: 'color 0.4s ease',
            fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
            zIndex: 1001,
          }}
          onClick={() => {
            setMobileOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          LDConsulting
        </div>

        {/* Desktop Nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
            {navItems.map((item, i) => (
              <NavItem
                key={item}
                label={item}
                overHero={overHero}
                onClick={() => handleNavClick(i)}
              />
            ))}
          </nav>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={mobileOpen ? 'hamburger-open' : ''}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1001,
            }}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" style={{ width: '24px', height: '2px', backgroundColor: mobileOpen ? '#111111' : textColor, display: 'block', transition: 'all 0.3s ease' }} />
            <span className="hamburger-line" style={{ width: '24px', height: '2px', backgroundColor: mobileOpen ? '#111111' : textColor, display: 'block', transition: 'all 0.3s ease' }} />
            <span className="hamburger-line" style={{ width: '24px', height: '2px', backgroundColor: mobileOpen ? '#111111' : textColor, display: 'block', transition: 'all 0.3s ease' }} />
          </button>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '60px',
            backgroundColor: '#DCD7CD',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            padding: '40px 32px',
            gap: '4px',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => handleNavClick(i)}
              style={{
                fontSize: '28px',
                fontWeight: 400,
                fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
                color: '#111111',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                padding: '16px 0',
                borderBottom: '1px solid rgba(17,17,17,0.1)',
                cursor: 'pointer',
                letterSpacing: '-0.01em',
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

function NavItem({
  label,
  overHero,
  onClick,
}: {
  label: string
  overHero: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const baseColor = overHero ? '#ffffff' : '#111111'
  const hoverBg = overHero ? '#ffffff' : '#C4551A'
  const hoverFg = overHero ? '#111111' : '#ffffff'

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 20px',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.12em',
        backgroundColor: hovered ? hoverBg : 'transparent',
        color: hovered ? hoverFg : baseColor,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease, color 0.25s ease',
        whiteSpace: 'nowrap',
        fontFamily: '"Inter", "Helvetica Neue", sans-serif',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </button>
  )
}
