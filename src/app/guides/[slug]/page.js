import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const revalidate = 0

async function getGuide(slug) {
  const { data, error } = await supabase
    .from('caravan_guides')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error || !data) {
    return null
  }
  
  return data
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const guide = await getGuide(slug)
  
  if (!guide) {
    return {
      title: 'Guide Not Found',
    }
  }
  
  return {
    title: `${guide.title} | Compare Caravan Insurance`,
    description: guide.meta_description || guide.excerpt,
  }
}

export default async function GuidePage({ params }) {
  const { slug } = await params
  const guide = await getGuide(slug)
  
  if (!guide) {
    notFound()
  }

  return (
    <>
      <Header />
      
      <article style={{
        padding: '60px 5% 100px',
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        <div style={{
          marginBottom: '2rem',
        }}>
          <a 
            href="/guides"
            style={{
              color: 'var(--primary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            ← Back to Guides
          </a>
        </div>

        <div style={{
          display: 'inline-block',
          background: 'var(--primary)',
          color: 'white',
          fontSize: '0.8rem',
          fontWeight: 700,
          padding: '6px 16px',
          borderRadius: '20px',
          marginBottom: '1.5rem',
        }}>
          {guide.category || 'Guide'}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-heading), sans-serif',
          fontSize: 'clamp(2rem, 5vw, 2.8rem)',
          fontWeight: 800,
          color: 'var(--text)',
          marginBottom: '1rem',
          lineHeight: 1.2,
        }}>
          {guide.title}
        </h1>

        <div style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          marginBottom: '3rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid var(--border)',
        }}>
          Last updated: {new Date(guide.updated_at).toLocaleDateString('en-AU', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>

        <div 
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: 'var(--text)',
          }}
          className="guide-content"
          dangerouslySetInnerHTML={{ __html: guide.content }}
        />

        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: 'var(--surface)',
          borderRadius: '12px',
          border: '1px solid var(--border)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-heading), sans-serif',
            fontSize: '1.3rem',
            fontWeight: 700,
            marginBottom: '1rem',
          }}>Ready to Compare?</h3>
          <p style={{
            marginBottom: '1.5rem',
            color: 'var(--text-muted)',
          }}>
            Find the right caravan insurance for your needs in minutes.
          </p>
          <a 
            href="/#compare"
            style={{
              display: 'inline-block',
              background: 'var(--primary)',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            Compare Insurers Now
          </a>
        </div>
      </article>

      <Footer />
    </>
  )
}