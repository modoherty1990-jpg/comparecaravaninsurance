'use client'

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--text)',
      color: 'white',
      padding: '60px 5% 30px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem',
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1.5rem',
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
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'white',
            }}>
              Compare <span style={{ fontWeight: 400 }}>Caravan Insurance</span>
            </div>
          </div>
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.6,
          }}>
            Australia's specialist caravan insurance comparison platform. Find the right cover for your journey.
          </p>
        </div>

        <div>
          <h4 style={{
            fontFamily: 'var(--font-heading), sans-serif',
            fontSize: '1rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: 'white',
          }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#how-it-works" style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}>How It Works</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="#compare" style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}>Compare Now</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{
            fontFamily: 'var(--font-heading), sans-serif',
            fontSize: '1rem',
            fontWeight: 700,
            marginBottom: '1rem',
            color: 'white',
          }}>Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/privacy" style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}>Privacy Policy</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/terms" style={{
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}>Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '2rem',
        textAlign: 'center',
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.5)',
      }}>
        <p>© {new Date().getFullYear()} Compare Caravan Insurance. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>
          This is a comparison and referral service, not a financial advice service.
        </p>
      </div>
    </footer>
  )
}