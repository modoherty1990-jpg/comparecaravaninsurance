'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const TOTAL_STEPS = 6
const MIN_SCORE = 40

const STEPS = [
  {
    id: 1,
    question: "What type of rig do you have?",
    hint: "This helps us match you with insurers who specialise in your vehicle type",
    field: 'vehicleType',
    multi: false,
    options: [
      { value: "touring-caravan", label: "Touring Caravan", help: "Standard road-going caravans" },
      { value: "off-road-caravan", label: "Off-Road Caravan", help: "Built for unsealed roads" },
      { value: "motorhome", label: "Motorhome", help: "Self-contained motor vehicle" },
      { value: "camper-trailer", label: "Camper Trailer", help: "Towable camping trailer" },
      { value: "fifth-wheeler", label: "Fifth Wheeler", help: "Large tow-behind RV" },
      { value: "pop-top", label: "Pop-Top / Hybrid", help: "Folding or hybrid camper" }
    ]
  },
  {
    id: 2,
    question: "Where do you typically travel?",
    hint: "Different insurers have different rules about off-road and remote travel",
    field: 'terrain',
    multi: false,
    options: [
      { value: "sealed-only", label: "Sealed roads only", help: "Caravan parks and highways" },
      { value: "some-unsealed", label: "Some unsealed roads", help: "Free camping and dirt roads" },
      { value: "remote-4wd", label: "Remote 4WD terrain", help: "Outback and serious off-road" }
    ]
  },
  {
    id: 3,
    question: "What's your rig worth?",
    hint: "Approximate market value helps us match you with the right coverage levels",
    field: 'value',
    multi: false,
    options: [
      { value: "under-50k", label: "Under $50,000" },
      { value: "50k-100k", label: "$50,000 - $100,000" },
      { value: "100k-150k", label: "$100,000 - $150,000" },
      { value: "over-150k", label: "Over $150,000" }
    ]
  },
  {
    id: 4,
    question: "How do you use your rig?",
    hint: "Your usage pattern affects which policies will cover you properly",
    field: 'usage',
    multi: false,
    options: [
      { value: "weekend-holidays", label: "Weekends and holidays", help: "Occasional trips" },
      { value: "extended-travel", label: "Extended trips", help: "1-3 month adventures" },
      { value: "full-time-living", label: "Full-time living", help: "Permanent residence" }
    ]
  },
  {
    id: 5,
    question: "Have you modified your rig?",
    hint: "Modifications can affect coverage—some insurers are better than others with upgrades",
    field: 'modifications',
    multi: false,
    options: [
      { value: "stock", label: "Factory standard", help: "No modifications" },
      { value: "minor-upgrades", label: "Minor upgrades", help: "Solar, awning, basic mods" },
      { value: "major-modifications", label: "Major modifications", help: "Suspension, lithium, extensive work" }
    ]
  },
  {
    id: 6,
    question: "What state are you based in?",
    hint: "Some insurers have state-specific strengths or restrictions",
    field: 'state',
    multi: false,
    options: [
      { value: "NSW", label: "New South Wales" },
      { value: "VIC", label: "Victoria" },
      { value: "QLD", label: "Queensland" },
      { value: "WA", label: "Western Australia" },
      { value: "SA", label: "South Australia" },
      { value: "TAS", label: "Tasmania" },
      { value: "ACT", label: "ACT" },
      { value: "NT", label: "Northern Territory" }
    ]
  }
]

function scoreBroker(broker, formData) {
  let score = 0
  const vehicleType = formData.vehicleType
  const terrain = formData.terrain
  const value = formData.value
  const usage = formData.usage
  const modifications = formData.modifications
  const state = formData.state

  // Base score for being eligible
  score += 40

  // Specialist bonus
  if (broker.specialist_bonus) score += 15

  // Vehicle type match
  if (vehicleType && broker.trade_tags) {
    if (Array.isArray(broker.trade_tags) && broker.trade_tags.includes(vehicleType)) {
      score += 15
    }
  }

  // Terrain match
  if (terrain && broker.cover_tags) {
    if (Array.isArray(broker.cover_tags)) {
      if (terrain === 'remote-4wd' && broker.cover_tags.includes('remote')) score += 15
      if (terrain === 'some-unsealed' && broker.cover_tags.includes('off-road')) score += 10
      if (terrain === 'sealed-only' && broker.cover_tags.includes('touring')) score += 10
    }
  }

  // Usage match
  if (usage === 'full-time-living' && broker.cover_tags?.includes('full-time')) {
    score += 12
  }

  // Modifications match
  if (modifications === 'major-modifications' && broker.cover_tags?.includes('major-mods')) {
    score += 10
  }

  // Value match
  if (value === 'over-150k' && broker.cover_tags?.includes('high-value')) {
    score += 8
  }

  // State match
  if (state && broker.states_fit) {
    if (broker.states_fit === 'national' || 
        (Array.isArray(broker.states_fit) && broker.states_fit.includes(state))) {
      score += 8
    }
  }

  // Priority bonus
  score += (broker.priority || 0) * 0.1

  return score
}

export default function CompareForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [brokers, setBrokers] = useState([])
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchBrokers() {
      const { data } = await supabase
.from('caravan_brokers')
        .select('*')
        .eq('hidden', false)
      if (data) setBrokers(data)
    }
    fetchBrokers()
  }, [])

  function selectOption(field, value, multi) {
    setFormData(prev => {
      if (multi) {
        const current = prev[field] || []
        const updated = current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
        return { ...prev, [field]: updated }
      }
      return { ...prev, [field]: value }
    })
  }

  function isSelected(field, value, multi) {
    if (multi) return (formData[field] || []).includes(value)
    return formData[field] === value
  }

  function canProceed(step) {
    const s = STEPS[step - 1]
    if (s.multi) return (formData[s.field] || []).length > 0
    return !!formData[s.field]
  }

  async function submitForm() {
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))

    const scored = brokers
      .map(b => ({ ...b, score: scoreBroker(b, formData) }))
      .sort((a, b) => b.score - a.score)
      .filter(b => b.score >= MIN_SCORE)
      .slice(0, 5)

    setResults(scored)
    setLoading(false)
  }

  function restart() {
    setFormData({})
    setCurrentStep(1)
    setResults(null)
    setLoading(false)
  }

  const pct = (currentStep / TOTAL_STEPS) * 100

  return (
    <section id="compare" style={{ background: 'var(--background)', padding: '6rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }} className="section-label">
        Find your match
      </div>
      <h2 className="section-title" style={{ textAlign: 'center', color: 'var(--text)' }}>
        Get matched to a specialist insurer
      </h2>
      <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto', color: 'var(--text-muted)' }}>
        Six questions. 3 minutes. We'll show you insurers who specialise in your rig type and cover your travel style.
      </p>

      <div style={{
        maxWidth: '720px', margin: '4rem auto 0',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px', overflow: 'hidden',
      }}>

        <div style={{
          background: 'var(--surface)', padding: '20px 32px',
          display: 'flex', alignItems: 'center', gap: '16px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            flex: 1, height: '4px',
            background: 'var(--border)',
            borderRadius: '2px', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${pct}%`,
              background: 'var(--primary)', borderRadius: '2px',
              transition: 'width 0.4s ease',
            }} />
          </div>
          <span style={{
            fontSize: '0.8rem', color: 'var(--text-muted)',
            whiteSpace: 'nowrap', fontWeight: 500,
          }}>
            Step {currentStep} of {TOTAL_STEPS}
          </span>
        </div>

        {loading && (
          <div style={{ padding: '60px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Finding your best matches…</p>
          </div>
        )}

        {!loading && results && (
          <div style={{ padding: '36px 40px 40px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text)' }}>
              {results.length === 0
                ? 'We couldn\'t find a close match'
                : results.length === 1
                ? 'We found 1 insurer for you'
                : `We found ${results.length} insurers for you`}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              {results.length === 0
                ? 'Try adjusting your answers or contact us for help finding the right cover.'
                : 'Matched to your rig type, travel style, and location'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.map((broker, idx) => (
                <div key={broker.id} style={{
                  background: 'var(--background)',
                  border: `1px solid ${idx === 0 ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: '12px', padding: '1.5rem',
                  position: 'relative',
                }}>
                  {idx === 0 && (
                    <div style={{
                      position: 'absolute', top: '-1px', left: '1.5rem',
                      background: 'var(--primary)', color: 'white',
                      fontSize: '0.7rem', fontWeight: 700,
                      padding: '3px 10px', borderRadius: '0 0 6px 6px',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>Best Match</div>
                  )}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginTop: idx === 0 ? '0.75rem' : 0,
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text)' }}>{broker.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>✓ Profile match</div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary)', marginTop: '4px', marginBottom: '0.75rem' }}>
                    {broker.specialty}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.6 }}>
                    {broker.description}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                    This insurer specialises in your type of rig and covers your travel style. Give them a call or visit their website to get a quote.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {broker.phone && broker.show_phone !== false && (
                      <a href={`tel:${broker.phone}`}
                        onClick={() => window.gtag && window.gtag('event', 'broker_click', { broker_name: broker.name, click_type: 'phone' })}
                        style={{
                          background: 'var(--primary)', color: 'white',
                          padding: '10px 20px', borderRadius: '8px',
                          fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none',
                        }}>📞 {broker.phone}</a>
                    )}
                    {broker.website && broker.show_website !== false && (
                      <a href={broker.website} target="_blank" rel="noopener noreferrer"
                        onClick={() => window.gtag && window.gtag('event', 'broker_click', { broker_name: broker.name, click_type: 'website' })}
                        style={{
                          background: 'transparent', color: 'var(--text)',
                          padding: '10px 20px', borderRadius: '8px',
                          fontWeight: 500, fontSize: '0.875rem',
                          border: '1px solid var(--border)', textDecoration: 'none',
                        }}>Visit website ↗</a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '1.5rem', padding: '1rem',
              background: 'var(--surface)', borderRadius: '8px',
            }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                This tool matches insurers to your answers — it's not financial advice. We recommend you compare quotes and verify coverage details before purchasing.{' '}
<a href="/#how-matching-works" style={{ color: 'var(--secondary)' }}>How matching works →</a>              </p>
            </div>

            <button onClick={restart} style={{
              marginTop: '1.5rem', background: 'transparent',
              color: 'var(--text-muted)', border: '1px solid var(--border)',
              padding: '10px 24px', borderRadius: '8px',
              cursor: 'pointer', fontSize: '0.875rem',
            }}>← Start again</button>
          </div>
        )}

        {!loading && !results && STEPS.map(step => (
          currentStep === step.id && (
            <div key={step.id} style={{ padding: '36px 40px 40px', animation: 'fadeUp 0.3s ease both' }}>
              <h3 style={{
                fontSize: '1.4rem', fontWeight: 700,
                marginBottom: '0.4rem', letterSpacing: '-0.02em',
                color: 'var(--text)',
              }}>
                {step.question}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                {step.hint}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '10px', marginBottom: '2rem',
              }}>
                {step.options.map(opt => {
                  const selected = isSelected(step.field, opt.value, step.multi)
                  return (
                    <div key={opt.value}
                      onClick={() => selectOption(step.field, opt.value, step.multi)}
                      style={{
                        background: selected ? 'rgba(217, 119, 87, 0.12)' : 'var(--background)',
                        border: `1.5px solid ${selected ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: '12px', padding: '14px 16px',
                        cursor: 'pointer', transition: 'all 0.18s',
                        display: 'flex', flexDirection: 'column', gap: '3px',
                      }}
                    >
                      <span style={{
                        fontSize: '0.9rem', fontWeight: 500,
                        color: selected ? 'var(--text)' : 'var(--text-muted)',
                      }}>
                        {opt.label}
                      </span>
                      {opt.help && (
                        <span style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          lineHeight: 1.4,
                        }}>
                          {opt.help}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {currentStep > 1 ? (
                  <button onClick={() => setCurrentStep(s => s - 1)} style={{
                    background: 'transparent', color: 'var(--text-muted)',
                    border: '1px solid var(--border)',
                    padding: '12px 24px', borderRadius: '10px',
                    cursor: 'pointer', fontSize: '0.9rem',
                  }}>← Back</button>
                ) : <div />}

                {currentStep < TOTAL_STEPS ? (
                  <button
                    onClick={() => canProceed(currentStep) && setCurrentStep(s => s + 1)}
                    disabled={!canProceed(currentStep)}
                    style={{
                      background: canProceed(currentStep) ? 'var(--primary)' : 'rgba(217, 119, 87, 0.3)',
                      color: canProceed(currentStep) ? 'white' : 'var(--text-muted)',
                      border: 'none', padding: '12px 32px', borderRadius: '10px',
                      cursor: canProceed(currentStep) ? 'pointer' : 'not-allowed',
                      fontWeight: 700, fontSize: '0.95rem',
                      transition: 'all 0.2s',
                    }}>Next →</button>
                ) : (
                  <button
                    onClick={() => canProceed(currentStep) && submitForm()}
                    disabled={!canProceed(currentStep)}
                    style={{
                      background: canProceed(currentStep) ? 'var(--primary)' : 'rgba(217, 119, 87, 0.3)',
                      color: canProceed(currentStep) ? 'white' : 'var(--text-muted)',
                      border: 'none', padding: '12px 32px', borderRadius: '10px',
                      cursor: canProceed(currentStep) ? 'pointer' : 'not-allowed',
                      fontWeight: 700, fontSize: '0.95rem',
                      transition: 'all 0.2s',
                    }}>Find My Insurers →</button>
                )}
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  )
}