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
            fontSize: '1.3rem',
            fontWeight: 700,
            color: 'var(--text)',
          }}>
            Compare <span style={{ fontWeight: 400 }}>Caravan Insurance</span>
          </div>
        </a>

        <div style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
        }}>
          <a href="#how-it-works" style={{
            color: 'var(--text)',
            fontSize: '0.95rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}>How It Works</a>
          <a href="#compare" style={{
            color: 'var(--text)',
            fontSize: '0.95rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}>Compare Now</a>
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
      </nav>
    </header>
  )
}