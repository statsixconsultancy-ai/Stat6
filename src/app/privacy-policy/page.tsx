import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy — Stat6 Research Platform",
  description: "Stat6's Privacy Policy explaining how we collect, use, and protect your personal data and research information.",
  alternates: { canonical: absoluteUrl("/privacy-policy") },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 1, 2025";

  return (
    <main className="pt-16">
      <section className="section-padding-sm" style={{ background: "linear-gradient(160deg, #f0ffe6, #ddfdca)" }}>
        <div className="container-stat6 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[#8ab080] mb-6">
            <Link href="/" className="hover:text-[#0d2f04] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0d2f04]">Privacy Policy</span>
          </nav>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#0d2f04", letterSpacing: "-0.02em" }}>
            Privacy Policy
          </h1>
          <p className="text-[#8ab080] text-sm mt-2">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#f0ffe6" }}>
        <div className="container-stat6 max-w-3xl mx-auto">
          <div className="prose-stat6 flex flex-col gap-8">
            {[
              {
                title: "1. Information We Collect",
                content: `We collect information you provide directly to us, including:

- Personal identification information (name, email address, phone number)
- Professional information (institution, role, research area)
- Research project details submitted through enquiry forms
- Communication history with our support team
- Website usage data through analytics tools (Google Analytics, Microsoft Clarity)`,
              },
              {
                title: "2. How We Use Your Information",
                content: `We use the information we collect to:

- Provide, maintain, and improve our research support services
- Respond to enquiries and deliver requested services
- Send service updates and important notifications
- Analyze website usage to improve user experience
- Comply with legal obligations

We do not sell, trade, or rent your personal information to third parties.`,
              },
              {
                title: "3. Research Data Confidentiality",
                content: `All research data, manuscripts, datasets, and proprietary information shared with Stat6 are treated with the highest level of confidentiality:

- Research files are stored on secure, encrypted servers
- Team members sign confidentiality agreements
- Project data is never shared with third parties without explicit consent
- NDAs are available upon request for additional assurance
- Client research is never used in our own publications or shared as samples`,
              },
              {
                title: "4. Cookies and Analytics",
                content: `Our website uses cookies and similar tracking technologies:

- Essential cookies for website functionality
- Analytics cookies (Google Analytics) to understand usage patterns
- Behavior analytics (Microsoft Clarity) for UX improvement
- Marketing pixels (Meta Pixel) for advertising purposes

You can control cookie preferences through your browser settings.`,
              },
              {
                title: "5. Data Storage and Security",
                content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Our database infrastructure uses Supabase with enterprise-grade security standards.`,
              },
              {
                title: "6. Your Rights",
                content: `You have the right to:

- Access your personal data we hold
- Correct inaccurate or incomplete data
- Request deletion of your data
- Opt-out of marketing communications
- Data portability where applicable

To exercise these rights, contact us at privacy@statsix.com.`,
              },
              {
                title: "7. Contact",
                content: `For privacy-related queries, contact our Data Protection team at privacy@statsix.com or through our Contact page.`,
              },
            ].map((section) => (
              <div key={section.title}>
                <h2
                  className="text-lg font-bold text-[#0d2f04] mb-3"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {section.title}
                </h2>
                <div className="text-sm text-[#5a8a50] leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
