'use client'
import { useState } from 'react'

export default function GuideFAQ({ faqs }) {
  const [open, setOpen] = useState(null)

  if (!faqs || faqs.length === 0) return null

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{
        fontSize: '1.5rem', fontWeight: 700,
        color: '#ffffff', letterSpacing: '-0.02em',
        marginBottom: '1.5rem',
      }}>Quick answers</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {faqs.map((faq, idx) => (
          <div key={idx} style={{
            background: '#1a2733',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '1.25rem 1.5rem',
                background: 'transparent', border: 'none',
                cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span style={{
                fontSize: '0.95rem', fontWeight: 600,
                color: '#ffffff', lineHeight: 1.4,
              }}>{faq.q}</span>
              <span style={{
                color: '#f59e0b', fontSize: '1.2rem',
                flexShrink: 0, transition: 'transform 0.2s',
                transform: open === idx ? 'rotate(45deg)' : 'rotate(0deg)',
              }}>+</span>
            </button>

            {open === idx && (
              <div style={{
                padding: '0 1.5rem 1.25rem',
                fontSize: '0.9rem', color: '#8faabf',
                lineHeight: 1.7,
              }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}