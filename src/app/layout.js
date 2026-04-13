import './globals.css'
import { Outfit, DM_Sans } from 'next/font/google'

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata = {
    icons: { icon: '/favicon.svg' },
  title: 'Compare Caravan Insurance Australia | Find Specialist Cover in 3 Minutes',
  description: 'An informational guide to caravan, motorhome, and camper insurance in Australia. Understand your options for off-road, modifications, and full-time living.',
  keywords: 'caravan insurance, motorhome insurance, camper insurance, off-road caravan insurance, caravan insurance Australia',
  metadataBase: new URL('https://www.comparecaravaninsurance.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.comparecaravaninsurance.com.au',
    title: 'Compare Caravan Insurance Australia',
    description: 'A free informational guide to caravan insurance in Australia. Find specialist insurers suited to your journey.',
    siteName: 'comparecaravaninsurance.com.au',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-S6XWR4NXM3"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-S6XWR4NXM3');
            `,
          }}
        />
      </head>
      <body className={`${outfit.variable} ${dmSans.variable}`}>{children}</body>
    </html>
  )
}