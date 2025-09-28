import { Metadata } from 'next'
import { getSiteConfig } from '@/config/site-i18n'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const siteConfig = getSiteConfig(params.locale)
  return {
    title: `Terms and Privacy - ${siteConfig.name}`,
    description: 'Terms of Use and Privacy Policy',
  }
}

export default function TermsPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <article className="prose prose-invert">
        <h1>Terms of Use</h1>
        <p className="text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
        <p>
          Welcome to https://barcodediy.com (the &ldquo;Website&rdquo;). By
          accessing or using this Website, you agree to comply with and be bound
          by the following Terms of Use. If you do not agree to these terms,
          please do not use the Website.
        </p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By using the Website, you confirm that you are at least 18 years old
            or have the consent of a legal guardian. You agree to use the
            Website in accordance with these Terms of Use and all applicable
            laws and regulations.
          </p>
        </section>

        <section>
          <h2>2. Use of the Website</h2>
          <p>
            The Website provides a barcode generation service for personal,
            educational, or commercial use. You agree not to:
          </p>
          <ul>
            <li>Use the Website for any illegal or unauthorized purpose.</li>
            <li>
              Attempt to disrupt or interfere with the Website&apos;s
              functionality.
            </li>
            <li>
              Reverse engineer, decompile, or otherwise exploit the
              Website&apos;s code or content.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Intellectual Property</h2>
          <p>
            All content, including but not limited to text, graphics, logos, and
            software, is the property of barcodediy.com or its licensors and
            is protected by intellectual property laws. You may not reproduce,
            distribute, or create derivative works without prior written
            consent.
          </p>
        </section>

        <section>
          <h2>4. User-Generated Content</h2>
          <p>
            If you upload or submit any content to the Website, you grant
            barcodediy.com a non-exclusive, royalty-free, worldwide license
            to use, modify, and display such content for the purpose of
            providing the service.
          </p>
        </section>

        <section>
          <h2>5. Disclaimer of Warranties</h2>
          <p>
            The Website is provided &quot;as is&quot; without any warranties,
            express or implied. barcodediy.com does not guarantee the
            accuracy, reliability, or completeness of the barcodes generated or
            the Website&apos;s functionality.
          </p>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>
            barcodediy.com shall not be liable for any direct, indirect,
            incidental, or consequential damages arising from the use or
            inability to use the Website, including but not limited to errors in
            barcode generation.
          </p>
        </section>

        <section>
          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time.
            Continued use of the Website after changes constitutes your
            acceptance of the revised terms.
          </p>
        </section>

        <h1 className="mt-16">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
        <p>
          At barcodediy.com, we are committed to protecting your privacy.
          This Privacy Policy explains how we collect, use, and safeguard your
          information when you use our Website.
        </p>

        <section>
          <h2>1. Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul>
            <li>
              Personal Information: Name, email address, and other contact
              details if you voluntarily provide them.
            </li>
            <li>
              Usage Data: IP address, browser type, device information, and
              pages visited on the Website.
            </li>
            <li>
              Barcode Data: Information inputted to generate barcodes, which is
              not stored unless explicitly saved by you.
            </li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and improve the barcode generation service.</li>
            <li>Respond to your inquiries or requests.</li>
            <li>Analyze Website usage and trends.</li>
            <li>Send promotional emails (if you opt-in).</li>
          </ul>
        </section>

        <section>
          <h2>3. Sharing of Information</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share information with:
          </p>
          <ul>
            <li>Service providers who assist in operating the Website.</li>
            <li>Law enforcement or government agencies if required by law.</li>
          </ul>
        </section>

        <section>
          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience
            on the Website. You can disable cookies in your browser settings,
            but this may affect Website functionality.
          </p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your
            information. However, no method of transmission over the internet is
            100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2>6. Third-Party Links</h2>
          <p>
            The Website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these sites.
          </p>
        </section>
        <section>
          <h2>7. Children&apos;s Privacy</h2>
          <p>
            The Website is not intended for children under 13. We do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2>8. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access, update, or delete your personal information.</li>
            <li>Opt-out of receiving promotional emails.</li>
            <li>Object to the processing of your data.</li>
          </ul>
          <p>
            To exercise these rights, contact us at support@barcodediy.com.
          </p>
        </section>

        <section>
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            at:
          </p>
          <p>support@barcodediy.com</p>
        </section>
      </article>
    </main>
  )
}
