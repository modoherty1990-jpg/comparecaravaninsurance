import Header from '../components/Header'
import Footer from '../components/Footer'
import GuidesContent from './GuidesContent'

export const metadata = {
  title: 'Insurance Guides for Builders & Tradies | comparecaravaninsurance.com.au',
  description: 'Plain English guides to construction and trades insurance in Australia. Public liability, contract works, professional indemnity, tools insurance and more.',
}

export default function GuidesPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '64px', background: '#0f1923', minHeight: '100vh' }}>
        <GuidesContent />
      </main>
      <Footer />
    </>
  )
}