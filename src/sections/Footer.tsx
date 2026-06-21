import { useViewport } from '@/hooks/useViewport'

export default function Footer() {
  const { isMobile } = useViewport()

  return (
    <footer
      style={{
        backgroundColor: '#DCD7CD',
        borderTop: '1px solid rgba(17,17,17,0.15)',
        padding: isMobile ? '60px 20px 0' : '80px clamp(20px, 4vw, 60px) 0',
        minHeight: isMobile ? '400px' : '500px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Top: Info Grid */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: isMobile ? '32px 24px' : '40px',
          paddingBottom: isMobile ? '60px' : '80px',
        }}
      >
        <InfoColumn
          title="NAVIGATION"
          links={[
            { label: 'Services', href: '#services' },
            { label: 'Work', href: '#work' },
            { label: 'Insights', href: '#insights' },
            { label: 'Contact', href: '#contact' },
          ]}
        />
        <InfoColumn
          title="SERVICES"
          links={[
            { label: 'Curriculum Design', href: '#services' },
            { label: 'Faculty Enablement', href: '#services' },
            { label: 'Program Evaluation', href: '#services' },
            { label: 'Strategic Advisory', href: '#services' },
          ]}
        />
        <InfoColumn
          title="RESOURCES"
          links={[
            { label: 'Publications', href: '#insights' },
            { label: 'Conferences', href: '#insights' },
            { label: 'Curated Resources', href: '#insights' },
            { label: 'Annual Report', href: '#insights' },
          ]}
        />
        <div>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              color: '#111111',
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}
          >
            Contact
          </p>
          <p style={{ fontSize: '14px', color: '#6E6A62', lineHeight: 2 }}>
            hello@ldconsulting.org
            <br />
            +1 (555) 234-5678
            <br />
            LinkedIn: /company/ldconsulting
          </p>
        </div>
      </div>

      {/* Bottom: Giant Wordmark */}
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0.85,
          paddingBottom: '0',
        }}
      >
        <span
          style={{
            display: 'block',
            fontSize: isMobile ? 'clamp(40px, 12vw, 80px)' : 'clamp(60px, 14vw, 240px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            color: '#111111',
            whiteSpace: 'nowrap',
            transform: 'translateY(15%)',
            userSelect: 'none',
            fontFamily: '"Cormorant Garamond", "Playfair Display", serif',
            opacity: 0.15,
          }}
        >
          LDConsulting
        </span>
      </div>

      {/* Legal bar */}
      <div
        style={{
          padding: isMobile ? '20px 0' : '24px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          borderTop: '1px solid rgba(17,17,17,0.1)',
          marginTop: '20px',
        }}
      >
        <p style={{ fontSize: '12px', color: '#6E6A62' }}>
          © LDConsulting. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#" style={{ fontSize: '12px', color: '#6E6A62', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ fontSize: '12px', color: '#6E6A62', textDecoration: 'none' }}>Terms</a>
        </div>
      </div>
    </footer>
  )
}

function InfoColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          color: '#111111',
          marginBottom: '20px',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => {
              e.preventDefault()
              document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              fontSize: '14px',
              color: '#6E6A62',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C4551A' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#6E6A62' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}
