import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Terms & Conditions — Stat6 Research Platform",
  description: "Stat6's Terms and Conditions governing the use of our research support services, platform, and website.",
  alternates: { canonical: absoluteUrl("/terms-conditions") },
};

export default function TermsPage() {
  const lastUpdated = "January 1, 2025";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using Stat6's website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.",
    },
    {
      title: "2. Services Description",
      content: "Stat6 provides academic research support services including statistical analysis guidance, bioinformatics support, manuscript development assistance, and publication support. Our services are designed to support researchers in the ethical pursuit of their own academic work. All intellectual contribution must originate from the client researcher.",
    },
    {
      title: "3. Acceptable Use",
      content: `You agree to use Stat6 services only for:
- Legitimate academic research and educational purposes
- Improving your understanding of research methodology
- Receiving guidance on data analysis, writing, and publication

You may not use our services to:
- Submit work as your own that violates your institution's academic integrity policies
- Misrepresent the nature of research support received
- Reproduce or redistribute Stat6 proprietary materials`,
    },
    {
      title: "4. Intellectual Property",
      content: "All content, deliverables, and outputs created by Stat6 for a client project become the property of the client upon full payment. Stat6 retains no rights to use client research materials. The Stat6 platform, brand, website, and methodology frameworks remain the intellectual property of Stat6.",
    },
    {
      title: "5. Confidentiality",
      content: "Stat6 maintains strict confidentiality over all client research data, project details, and communications. We do not share client information with third parties without explicit written consent. Clients may request a formal NDA for additional protection.",
    },
    {
      title: "6. Payment Terms",
      content: "Payment terms are specified in individual service proposals. General terms: (a) Deposits are non-refundable after work commences; (b) Milestone payments are due before each project phase begins; (c) Full payment is required before final deliverable release; (d) Late payments may incur delays in service delivery.",
    },
    {
      title: "7. Revisions and Satisfaction",
      content: "Each service package includes a defined number of revision rounds. Additional revisions may be available at additional cost. We are committed to delivering quality work and will work with clients to resolve genuine quality issues within the scope of the original project brief.",
    },
    {
      title: "8. Limitation of Liability",
      content: "Stat6 does not guarantee publication outcomes, as these are determined by independent journal editors and peer reviewers. Our liability is limited to the value of the specific service rendered. We are not liable for indirect, consequential, or incidental damages.",
    },
    {
      title: "9. Governing Law",
      content: "These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in India.",
    },
    {
      title: "10. Changes to Terms",
      content: "Stat6 reserves the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the revised terms.",
    },
  ];

  return (
    <main className="pt-16">
      <section className="section-padding-sm" style={{ background: "linear-gradient(160deg, #f0ffe6, #ddfdca)" }}>
        <div className="container-stat6 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[#8ab080] mb-6">
            <Link href="/" className="hover:text-[#0d2f04] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0d2f04]">Terms & Conditions</span>
          </nav>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#0d2f04", letterSpacing: "-0.02em" }}>
            Terms & Conditions
          </h1>
          <p className="text-[#8ab080] text-sm mt-2">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#f0ffe6" }}>
        <div className="container-stat6 max-w-3xl mx-auto flex flex-col gap-7">
          {sections.map((section) => (
            <div key={section.title} className="p-6 rounded-xl border border-[rgba(13,47,4,0.08)] bg-white/60">
              <h2 className="text-base font-bold text-[#0d2f04] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                {section.title}
              </h2>
              <p className="text-sm text-[#5a8a50] leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
