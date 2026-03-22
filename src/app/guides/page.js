import { createClient } from '@supabase/supabase-js'
import Header from '../components/Header'
import Footer from '../components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const metadata = {
  title: 'Caravan Insurance Guides | Compare Caravan Insurance',
  description: 'Expert guides on caravan insurance in Australia. Learn about coverage types, costs, specialist policies, and how to choose the right insurance for your caravan.',
}

export const revalidate = 0

async function getGuides() {
  const { data, error } = await supabase
    .from('caravan_guides')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching guides:', error)
    return []
  }
  
  return data
}

export default async function GuidesPage() {
  const guides = await getGuides()
  const featuredGuides = guides.filter(g => g.featured)
  const otherGuides = guides.filter(g => !g.featured)

  return (
    <>
      <Header />
      
      <main style={{
        padding: '80px 5% 100px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-heading), sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: '1rem',
          }}>
            Caravan Insurance Guides
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Expert advice to help you understand and choose the right caravan insurance coverage.
          </p>
        </div>

        {guides.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'var(--text-muted)',
          }}>
            <p>No guides available yet. Check back soon!</p>
          </div>
        )}

        {featuredGuides.length > 0 && (
          <section style={{ marginBottom: '60px' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading), sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '2rem',
            }}>Featured Guides</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}>
              {featuredGuides.map(guide => (
                <a
                  key={guide.id}
                  href={`/guides/${guide.slug}`}
                  style={{
                    textDecoration: 'none',
                    background: 'var(--surface)',
                    borderRadius: '12px',
                    padding: '2rem',
                    border: '2px solid var(--primary)',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{
                    display: 'inline-block',
                    background: 'var(--primary)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    marginBottom: '1rem',
                  }}>
                    {guide.category || 'Guide'}
                  </div>
                  
                  <h3 style={{
                    fontFamily: 'var(--font-heading), sans-serif',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '1rem',
                  }}>{guide.title}</h3>
                  
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                  }}>{guide.excerpt}</p>
                  
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                  }}>
                    Updated: {new Date(guide.updated_at).toLocaleDateString('en-AU', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {otherGuides.length > 0 && (
          <section>
            <h2 style={{
              fontFamily: 'var(--font-heading), sans-serif',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '2rem',
            }}>All Guides</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}>
              {otherGuides.map(guide => (
                <a
                  key={guide.id}
                  href={`/guides/${guide.slug}`}
                  style={{
                    textDecoration: 'none',
                    background: 'var(--surface)',
                    borderRadius: '12px',
                    padding: '2rem',
                    border: '1px solid var(--border)',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{
                    display: 'inline-block',
                    background: 'var(--secondary)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    marginBottom: '1rem',
                  }}>
                    {guide.category || 'Guide'}
                  </div>
                  
                  <h3 style={{
                    fontFamily: 'var(--font-heading), sans-serif',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '1rem',
                  }}>{guide.title}</h3>
                  
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '1rem',
                  }}>{guide.excerpt}</p>
                  
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                  }}>
                    Updated: {new Date(guide.updated_at).toLocaleDateString('en-AU', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}