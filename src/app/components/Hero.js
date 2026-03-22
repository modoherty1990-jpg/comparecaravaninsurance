'use client'

export default function Hero() {
  return (
    <section style={{
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '120px 5% 80px',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(rgba(46, 125, 94, 0.7), rgba(74, 144, 164, 0.7)), url(/images/caravan_1.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        background: 'rgba(217, 119, 87, 0.12)',
        border: '1px solid rgba(217, 119, 87, 0.3)',
        color: '#fff',
        padding: '6px 14px', borderRadius: '100px',
        fontSize: '0.75rem', fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase',
        marginBottom: '2rem',
        animation: 'fadeUp 0.6s ease both',
      }}>
        <span style={{
          width: '6px', height: '6px',
          background: '#fff', borderRadius: '50%',
          animation: 'pulse 2s infinite',
        }} />
        Free Insurance Matching for Australian Caravanners
      </div>

      <h1 style={{
        fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
        fontWeight: 800,
        lineHeight: 1.08,
        letterSpacing: '-0.04em',
        maxWidth: '780px',
        animation: 'fadeUp 0.6s 0.1s ease both',
        color: '#ffffff',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
      }}>
        Find the Right Caravan Insurance for Your{' '}
        <em style={{ fontStyle: 'normal', color: '#fff' }}>Journey</em>
      </h1>

      <p style={{
        fontSize: '1.2rem',
        color: '#ffffff',
        fontWeight: 400,
        maxWidth: '540px',
        lineHeight: 1.7,
        marginTop: '1.5rem',
        animation: 'fadeUp 0.6s 0.2s ease both',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
      }}>
        Get matched with specialist insurers who understand off-road adventures, full-time living, and unique modifications. Compare quotes in 3 minutes.
      </p>

      <div style={{
        display: 'flex', gap: '2rem', marginTop: '2.5rem',
        flexWrap: 'wrap',
        animation: 'fadeUp 0.6s 0.3s ease both',
      }}>
        {[
          'Specialist insurers',
          '100% free',
          'No obligation',
          'All states covered',
        ].map(item => (
          <div key={item} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '0.875rem', color: '#ffffff', fontWeight: 500,
          }}>
            <span style={{
              width: '20px', height: '20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.65rem', color: '#fff',
              flexShrink: 0,
            }}>✓</span>
            {item}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '3rem',
        display: 'flex', gap: '1rem', flexWrap: 'wrap',
        animation: 'fadeUp 0.6s 0.4s ease both',
      }}>
        <a href="#compare" className="btn-primary">Find My Insurers →</a>
        <a href="#how-it-works" style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          padding: '16px 28px',
          borderRadius: '50px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          textDecoration: 'none',
          display: 'inline-block',
          fontWeight: 500,
        }}>How it works</a>
      </div>

    </section>
  )
}