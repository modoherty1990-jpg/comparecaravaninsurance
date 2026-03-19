'use client'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--background)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(10px)',
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 5%',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <a href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none',
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            background: 'var(--secondary)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-heading), sans-serif',
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'white',
          }}>C</div>
          <div style={{
            fontFamily: 'var(--font-heading), sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            fontWeight: 700,
            color: 'var(--text)',
          }}>
            Compare <span style={{ fontWeight: 400 }}>Caravan Insurance</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
        }}
        className="desktop-menu">
          <a href="#how-it-works" style={{
            color: 'var(--text)',
            fontSize: '0.95rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}>How It Works</a>
          <a href="/guides" style={{
            color: 'var(--text)',
            fontSize: '0.95rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}>Guides</a>
          <a href="#compare" style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '10px 24px',
            borderRadius: '50px',
            fontSize: '0.95rem',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 0.2s',
          }}>Get Started</a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="mobile-menu-button"
          aria-label="Toggle menu"
        >
          <div style={{
            width: '24px',
            height: '2px',
            background: 'var(--text)',
            margin: '5px 0',
            transition: 'all 0.3s',
            transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
          }} />
          <div style={{
            width: '24px',
            height: '2px',
            background: 'var(--text)',
            margin: '5px 0',
            transition: 'all 0.3s',
            opacity: mobileMenuOpen ? 0 : 1,
          }} />
          <div style={{
            width: '24px',
            height: '2px',
            background: 'var(--text)',
            margin: '5px 0',
            transition: 'all 0.3s',
            transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
          }} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--background)',
          borderTop: '1px solid var(--border)',
          padding: '1rem 5%',
        }}
        className="mobile-menu-panel">
          <a href="#how-it-works" 
            onClick={() => setMobileMenuOpen(false)}
            style={{
            display: 'block',
            padding: '1rem 0',
            color: 'var(--text)',
            fontSize: '1rem',
            fontWeight: 500,
            textDecoration: 'none',
            borderBottom: '1px solid var(--border)',
          }}>How It Works</a>
          <a href="/guides"
            onClick={() => setMobileMenuOpen(false)}
            style={{
            display: 'block',
            padding: '1rem 0',
            color: 'var(--text)',
            fontSize: '1rem',
            fontWeight: 500,
            textDecoration: 'none',
            borderBottom: '1px solid var(--border)',
          }}>Guides</a>
          <a href="#compare"
            onClick={() => setMobileMenuOpen(false)}
            style={{
            display: 'block',
            padding: '1rem 0',
            color: 'var(--primary)',
            fontSize: '1rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}>Get Started</a>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
        }
      `}</style>
    </header>
  )
}