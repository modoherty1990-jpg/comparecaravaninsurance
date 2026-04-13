'use client'

export default function HowMatchingWorks() {
  const steps = [
    {
      number: '01',
      title: 'Hard Filters First',
      description: 'We immediately exclude any insurer that cannot cover your situation—wrong vehicle type, wrong state, won\'t cover remote travel, or excludes your modifications. You\'ll only ever see insurers who can actually quote you.',
    },
    {
      number: '02',
      title: 'Scoring What Matters',
      description: 'Eligible insurers are then scored based on how well they specialise in your specific situation. An insurer who specialises in off-road caravans scores higher than a generalist for an off-road user. Specialist brokers and insurers receive additional weighting.',
    },
    {
      number: '03',
      title: 'Your Top Matches',
      description: 'We show you the best fits in order—no percentage scores, just clear rankings with the reasons why each insurer is a good match for your situation. From there, you can request a quote directly.',
    },
  ]

  return (
    <section id="how-matching-works" style={{
      padding: '80px 5%',
      background: 'var(--background)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            color: 'var(--text)',
          }}>
            How Our Matching Works
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '620px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Our algorithm uses your answers to score every insurer in our database against your specific situation, then shows you the top matches.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '2rem',
          marginBottom: '3rem',
        }}>
          {steps.map((step) => (
            <div key={step.number} style={{
              background: 'var(--surface)',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              position: 'relative',
            }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: 'var(--primary)',
                opacity: 0.3,
                lineHeight: 1,
                marginBottom: '1rem',
                fontFamily: 'var(--font-heading), sans-serif',
              }}>
                {step.number}
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                marginBottom: '0.75rem',
                color: 'var(--text)',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}