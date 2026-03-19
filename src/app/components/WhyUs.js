'use client'

export default function WhyUs() {
  const benefits = [
    {
      title: 'Specialist Matching',
      description: 'We connect you with insurers who actually cover off-road, modifications, and full-time living—not generic policies.',
    },
    {
      title: 'Real Protection',
      description: 'Compare coverage from CMCA-endorsed insurers and specialists who understand the caravan lifestyle.',
    },
    {
      title: 'Completely Free',
      description: 'No fees, no obligations. We\'re paid by insurers when you get a quote, so our service costs you nothing.',
    },
    {
      title: 'Australia-Wide',
      description: 'Coverage options for every state and territory, including remote travel insurance for the real adventurers.',
    },
    {
      title: 'All Rig Types',
      description: 'Touring vans, off-roaders, motorhomes, fifth wheelers, pop-tops, and camper trailers—we cover them all.',
    },
    {
      title: '3-Minute Match',
      description: 'Quick quiz, instant results. No long forms or sales calls. Just the information you need to choose.',
    },
  ]

  return (
    <section style={{
      padding: '80px 5%',
      background: 'var(--surface)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            color: 'var(--text)',
          }}>
            Why Compare With Us
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Find specialist caravan insurance that actually covers your travel style
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '2rem',
        }}>
          {benefits.map((benefit, idx) => (
            <div key={idx} style={{
              background: 'var(--background)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                color: 'var(--text)',
              }}>
                {benefit.title}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}