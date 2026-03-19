'use client'

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Answer 6 Questions",
      description: "Tell us about your rig, where you travel, and how you use it. Takes 3 minutes."
    },
    {
      number: 2,
      title: "Get Matched",
      description: "Our algorithm matches you with specialist insurers who cover your specific needs."
    },
    {
      number: 3,
      title: "Compare Quotes",
      description: "Review your top matches and request quotes directly from insurers. No obligation."
    }
  ]

  return (
    <section id="how-it-works" style={{
      padding: '80px 5%',
      background: 'linear-gradient(rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), url(/images/caravan_2.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
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
            How It Works
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Get matched with specialist caravan insurers in three simple steps
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '2.5rem',
        }}>
          {steps.map(step => (
            <div key={step.number} style={{
              textAlign: 'center',
              padding: '2rem 1rem',
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'var(--secondary)',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 800,
                margin: '0 auto 1.5rem',
              }}>
                {step.number}
              </div>
              <h3 style={{
                fontSize: '1.4rem',
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