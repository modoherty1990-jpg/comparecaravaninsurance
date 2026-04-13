import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Terms of Use | comparecaravaninsurance.com.au',
}

export default function Terms() {
  return (
    <>
      <Header />
      <main>
        <section style={{ maxWidth: '760px', margin: '0 auto', padding: '80px 5%' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '0.5rem', color: 'var(--text)' }}>
            Terms of Use
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>
            Last updated: March 2026
          </p>

          {[
            {
              title: 'About this service',
              body: 'comparecaravaninsurance.com.au is a free informational tool. We help Australian caravan, motorhome, and camper trailer owners find specialist insurance providers suited to their situation. We are not a licensed insurance broker and we do not provide financial advice.'
            },
            {
              title: 'No financial advice',
              body: 'The information on this website is general in nature and does not take into account your personal circumstances, needs or objectives. Nothing on this site constitutes financial product advice. You should always read an insurer\'s Product Disclosure Statement and Financial Services Guide, and consider whether a policy is appropriate for your situation before purchasing.'
            },
            {
              title: 'Accuracy of information',
              body: 'We take reasonable care to ensure insurer and broker information is accurate and up to date. However we cannot guarantee the accuracy, completeness or currency of all information. Insurer details including phone numbers, websites, coverage terms, and specialties may change. Always verify insurer details directly before purchasing a policy.'
            },
            {
              title: 'Limitation of liability',
              body: 'To the extent permitted by law, comparecaravaninsurance.com.au is not liable for any loss or damage arising from your use of this site or reliance on information provided. This includes any decisions made based on insurer matches or information displayed.'
            },
            {
              title: 'Third party websites',
              body: 'Our site contains links to insurer and broker websites. We are not responsible for the content or privacy practices of those websites. Links do not constitute endorsement of any insurer, broker, or their products.'
            },
            {
              title: 'Changes to these terms',
              body: 'We may update these terms at any time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.'
            },
            {
              title: 'Contact',
              body: 'For any questions about these terms, contact us at contact@comparecaravaninsurance.com.au.'
            },
          ].map(section => (
            <div key={section.title} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text)' }}>
                {section.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                {section.body}
              </p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}