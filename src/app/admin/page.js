'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'cci2026'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [brokers, setBrokers] = useState([])
  const [guides, setGuides] = useState([])
  const [tab, setTab] = useState('brokers')
  const [saving, setSaving] = useState(null)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (authed) {
      fetchBrokers()
      fetchGuides()
    }
  }, [authed])

  async function fetchBrokers() {
    const { data } = await supabase
      .from('brokers')
      .select('*')
      .order('priority', { ascending: false })
    if (data) setBrokers(data)
  }

  async function fetchGuides() {
    const { data } = await supabase
      .from('guides')
      .select('id, slug, title, published, updated_at')
      .order('created_at', { ascending: false })
    if (data) setGuides(data)
  }

  async function updateBroker(id, field, value) {
    setSaving(id)
    const { error } = await supabase
      .from('brokers')
      .update({ [field]: value })
      .eq('id', id)
    if (!error) {
      setBrokers(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b))
      setMsg('Saved')
      setTimeout(() => setMsg(''), 2000)
    }
    setSaving(null)
  }

  async function updateGuide(id, field, value) {
    setSaving(id)
    const { error } = await supabase
      .from('guides')
      .update({ [field]: value, updated_at: new Date().toISOString() })
      .eq('id', id)
    if (!error) {
      setGuides(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g))
      setMsg('Saved')
      setTimeout(() => setMsg(''), 2000)
    }
    setSaving(null)
  }

  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0f1923',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          background: '#1a2733', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '380px',
        }}>
          <div style={{
            fontFamily: 'sans-serif', fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#f59e0b', marginBottom: '0.5rem',
          }}>comparecaravaninsurance.com.au</div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>
            Admin panel
          </h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && password === ADMIN_PASSWORD && setAuthed(true)}
            style={{
              width: '100%', padding: '12px 16px',
              background: '#0f1923', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px', color: '#fff', fontSize: '0.95rem',
              marginBottom: '1rem', boxSizing: 'border-box',
            }}
          />
          <button
            onClick={() => password === ADMIN_PASSWORD && setAuthed(true)}
            style={{
              width: '100%', background: '#f59e0b', color: '#0f1923',
              border: 'none', padding: '12px', borderRadius: '8px',
              fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
            }}
          >
            Log in
          </button>
          {password && password !== ADMIN_PASSWORD && (
            <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.75rem' }}>
              Incorrect password
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f1923', padding: '2rem 3%', fontFamily: 'sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: '0.25rem' }}>
            comparecaravaninsurance.com.au
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>Admin panel</h1>
        </div>
        {msg && (
          <div style={{ background: '#10b981', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
            ✓ {msg}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        {['brokers', 'guides'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? '#f59e0b' : '#1a2733',
            color: tab === t ? '#0f1923' : '#94a3b8',
            border: '1px solid',
            borderColor: tab === t ? '#f59e0b' : 'rgba(255,255,255,0.08)',
            padding: '8px 20px', borderRadius: '8px',
            fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
            textTransform: 'capitalize',
          }}>{t}</button>
        ))}
      </div>

      {/* Brokers tab */}
      {tab === 'brokers' && (
        <div>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            {brokers.filter(b => !b.hidden).length} active · {brokers.filter(b => b.hidden).length} hidden · {brokers.length} total
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {brokers.map(broker => (
              <div key={broker.id} style={{
                background: broker.hidden ? 'rgba(26,39,51,0.5)' : '#1a2733',
                border: '1px solid',
                borderColor: broker.hidden ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '1.25rem 1.5rem',
                opacity: broker.hidden ? 0.6 : 1,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>

                  {/* Broker info */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                      {broker.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#f59e0b', marginBottom: '0.25rem' }}>
                      {broker.specialty}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Priority: {broker.priority || 0}
                    </div>
                  </div>

                  {/* Toggles */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>

                    {/* Active toggle */}
                    <button
                      onClick={() => updateBroker(broker.id, 'hidden', !broker.hidden)}
                      disabled={saving === broker.id}
                      style={{
                        background: broker.hidden ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
                        color: broker.hidden ? '#ef4444' : '#10b981',
                        border: '1px solid',
                        borderColor: broker.hidden ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)',
                        padding: '6px 14px', borderRadius: '6px',
                        fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer',
                        minWidth: 80,
                      }}
                    >
                      {broker.hidden ? 'Hidden' : 'Visible'}
                    </button>

                    {/* Phone toggle */}
                    <button
                      onClick={() => updateBroker(broker.id, 'show_phone', !broker.show_phone)}
                      disabled={saving === broker.id}
                      style={{
                        background: broker.show_phone === false ? 'rgba(239,68,68,0.15)' : 'rgba(100,116,139,0.15)',
                        color: broker.show_phone === false ? '#ef4444' : '#94a3b8',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '6px 14px', borderRadius: '6px',
                        fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer',
                        minWidth: 100,
                      }}
                    >
                      📞 {broker.show_phone === false ? 'Hidden' : 'Showing'}
                    </button>

                    {/* Website toggle */}
                    <button
                      onClick={() => updateBroker(broker.id, 'show_website', !broker.show_website)}
                      disabled={saving === broker.id}
                      style={{
                        background: broker.show_website === false ? 'rgba(239,68,68,0.15)' : 'rgba(100,116,139,0.15)',
                        color: broker.show_website === false ? '#ef4444' : '#94a3b8',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '6px 14px', borderRadius: '6px',
                        fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer',
                        minWidth: 100,
                      }}
                    >
                      🌐 {broker.show_website === false ? 'Hidden' : 'Showing'}
                    </button>

                  </div>
                </div>

                {/* Contact details */}
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {broker.phone && (
                    <div style={{ fontSize: '0.8rem', color: broker.show_phone === false ? '#ef4444' : '#64748b' }}>
                      📞 {broker.phone} {broker.show_phone === false && '(hidden on site)'}
                    </div>
                  )}
                  {broker.website && (
                    <div style={{ fontSize: '0.8rem', color: broker.show_website === false ? '#ef4444' : '#64748b' }}>
                      🌐 {broker.website.replace('https://', '')} {broker.show_website === false && '(hidden on site)'}
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guides tab */}
      {tab === 'guides' && (
        <div>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            {guides.filter(g => g.published).length} published · {guides.filter(g => !g.published).length} drafts · {guides.length} total
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {guides.map(guide => (
              <div key={guide.id} style={{
                background: guide.published ? '#1a2733' : 'rgba(26,39,51,0.5)',
                border: '1px solid',
                borderColor: guide.published ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                borderRadius: '12px', padding: '1.25rem 1.5rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexWrap: 'wrap', gap: '1rem',
                opacity: guide.published ? 1 : 0.6,
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                    {guide.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    /guides/{guide.slug}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
       {guide.published && (
  <a
    href={`/guides/${guide.slug}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontSize: '0.75rem', color: '#94a3b8',
      textDecoration: 'none',
    }}
  >
    View ↗
  </a>
)}
                  <button
                    onClick={() => updateGuide(guide.id, 'published', !guide.published)}
                    disabled={saving === guide.id}
                    style={{
                      background: guide.published ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
                      color: guide.published ? '#10b981' : '#f59e0b',
                      border: '1px solid',
                      borderColor: guide.published ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)',
                      padding: '6px 14px', borderRadius: '6px',
                      fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer',
                      minWidth: 90,
                    }}
                  >
                    {guide.published ? 'Published' : 'Draft'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}