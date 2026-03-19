'use client'
import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Is this service really free?',
      answer: 'Yes — completely free for caravan owners. We may receive a referral fee from insurers when you request a quote, but this never influences your match results. The algorithm scores insurers based purely on how well they fit your situation.'
    },
    {
      question: 'Do all insurers cover off-road and remote travel?',
      answer: 'No, and that\'s exactly why we built this tool. Many standard insurers only cover sealed roads and designated caravan parks. Our matching algorithm specifically identifies which insurers cover unsealed roads, remote travel, and serious 4WD terrain based on your answers.'
    },
    {
      question: 'What if I live in my caravan full-time?',
      answer: 'Full-time living requires specialist coverage that many standard policies don\'t provide. When you select "full-time living" in the quiz, we prioritize insurers who understand and cover permanent residence in caravans, including extended periods away from home.'
    },
    {
      question: 'Are modifications and upgrades covered?',
      answer: 'It depends on the insurer and the type of modifications. Some insurers are excellent with major mods (suspension, lithium batteries, solar systems), while others only cover factory standard rigs. Our matching shows you which insurers specifically cover your modification level.'
    },
    {
      question: 'How does the matching algorithm work?',
      answer: 'We score every insurer against your specific situation: vehicle type, terrain, usage, modifications, value, and state. Insurers must meet hard requirements (like covering your vehicle type and state) before being scored. Only your top 5 matches appear in results.'
    },
    {
      question: 'Do I need to be a CMCA member to use this?',
      answer: 'No, this service is available to all Australian caravan owners. However, some insurers like KT Insurance offer discounts to CMCA members, and we\'ll flag this in your results if relevant.'
    },
    {
      question: 'What\'s the difference between specialist and direct insurers?',
      answer: 'Specialist insurers (like CIL and KT) focus exclusively on caravans and RVs, often with better coverage for off-road, modifications, and full-time living. Direct insurers (like NRMA and AAMI) offer caravan insurance alongside other products, usually with more restrictions but sometimes lower premiums for basic coverage.'
    },
    {
      question: 'Do you provide financial advice?',
      answer: 'No. This is a filtering and referral tool, not a financial advice service. We match you with insurers who cover your specific situation, but you should compare quotes and policy details directly with insurers before making a decision. All listed insurers hold or operate under an AFSL.'
    }
  ]

  return (
    <section style={{
      padding: '80px 5%',
      background: 'var(--background)',
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            color: 'var(--text)',
          }}>
            Frequently Asked Questions
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Common questions about comparing caravan insurance
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                }}>
                  {faq.question}
                </span>
                <span style={{
                  fontSize: '1.5rem',
                  color: 'var(--primary)',
                  flexShrink: 0,
                  transition: 'transform 0.2s',
                  transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                }}>
                  +
                </span>
              </button>
              {openIndex === index && (
                <div style={{
                  padding: '0 1.5rem 1.5rem',
                  fontSize: '0.95rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}