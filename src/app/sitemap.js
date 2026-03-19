import { supabase } from './lib/supabase'

export default async function sitemap() {
  const baseUrl = 'https://www.comparecaravaninsurance.com.au'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ]

  const { data: guides } = await supabase
    .from('caravan_guides')
    .select('slug, updated_at')

  const guidePages = (guides || []).map(guide => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.updated_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...guidePages]
}