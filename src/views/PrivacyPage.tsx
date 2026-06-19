import { useEffect } from 'react'
import { Container } from '@/components/ui/Container'
import { TopMarquee } from '@/components/sections/TopMarquee'
import { Footer } from '@/components/sections/Footer'
import { PolicyHeader } from '@/components/sections/PolicyHeader'

export default function PrivacyPage() {
  useEffect(() => {
    document.title = 'Privacy Policy · Suvidhi'
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col">
      <TopMarquee />

      <main className="relative flex-1 pb-16 sm:pb-20">
        <PolicyHeader
          eyebrow="Legal · Privacy Policy"
          title="Privacy Policy"
          subtitle="Your trust is the most important part of this work. This policy explains what data we collect, how we use it, and the choices you have."
          lastUpdated="February 2026"
        />

        <Container size="narrow">
          <article className="prose-policy bg-white border border-ink-100 shadow-soft rounded-3xl p-6 sm:p-9 lg:p-11">
            <h2>1. Information We Collect</h2>
            <p>
              When you visit our website, book a Clarity Call, or fill our pre-call
              form, we may collect the following:
            </p>
            <ul>
              <li>
                <strong>Identification details</strong> — your name and age.
              </li>
              <li>
                <strong>Contact details</strong> — email address, phone or WhatsApp
                number, and (where shared) postal address.
              </li>
              <li>
                <strong>Health context</strong> — your responses to the pre-call form,
                such as fasting sugar, HbA1c, current medications, food patterns and
                lifestyle context.
              </li>
              <li>
                <strong>Payment metadata</strong> — order ID, transaction status and
                last four digits of your payment instrument as returned by our payment
                processor. We do <strong>not</strong> store full card details on our
                servers.
              </li>
              <li>
                <strong>Usage data</strong> — device, browser, IP address, referring
                page and anonymised analytics events.
              </li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>The information you share is used to:</p>
            <ul>
              <li>Confirm and deliver your Clarity Call and any subsequent services.</li>
              <li>
                Personalise the clinical insight you receive — your reports, history
                and lifestyle context directly shape the call.
              </li>
              <li>Send order confirmations, booking links, and call reminders.</li>
              <li>
                Respond to your questions and provide post-call support where
                applicable.
              </li>
              <li>
                Improve our website, content and service quality based on aggregated,
                anonymised usage patterns.
              </li>
            </ul>

            <h2>3. Data Security</h2>
            <p>
              We use industry-standard administrative, technical and physical
              safeguards to protect your information from unauthorised access,
              alteration, disclosure or destruction. Payments are processed through{' '}
              <strong>PCI-DSS compliant payment gateways</strong> over encrypted
              connections. While no method of transmission over the internet can be
              guaranteed 100% secure, we take this responsibility seriously.
            </p>

            <h2>4. Cookies & Analytics</h2>
            <p>
              Our website uses cookies and similar technologies to remember your
              preferences, measure traffic, and improve your experience. You can
              disable cookies in your browser settings; doing so may limit some
              functionality of the site. We do not use cookies to sell your data to
              third parties.
            </p>

            <h2>5. Sharing with Third Parties</h2>
            <p>
              We do not sell, rent, or trade your personal information. We share data
              only with carefully selected service providers who help us operate the
              business — for example, payment gateways, email and SMS delivery
              partners, scheduling platforms and analytics providers. These partners
              are bound by confidentiality and data-protection obligations.
            </p>
            <p>
              Anonymised, aggregated insights (for example: "75% of clients are aged
              45-60") may be shared with partners or used in marketing — never in a
              form that could identify you.
            </p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request a copy of the personal data we hold about you.</li>
              <li>Ask us to correct any inaccurate information.</li>
              <li>
                Request that we delete your data — subject to any legal obligation we
                may have to retain it (such as tax or accounting records).
              </li>
              <li>
                Withdraw consent for marketing communications at any time by replying
                to any marketing email with "Unsubscribe".
              </li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:innohealthbysush@gmail.com">
                innohealthbysush@gmail.com
              </a>
              .
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our services are designed for adults. We do not knowingly collect
              personal information from children under 18. If you believe a minor has
              shared data with us, please contact us so we can delete it.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The most current
              version will be posted on this page with a refreshed "Last updated" date.
              For material changes, we'll make a reasonable effort to notify you over
              email.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              For any privacy-related question or request, email us at{' '}
              <a href="mailto:innohealthbysush@gmail.com">
                innohealthbysush@gmail.com
              </a>{' '}
              or call <a href="tel:+919810880970">+91 98108 80970</a>.
            </p>
          </article>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
