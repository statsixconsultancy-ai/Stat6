import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions About Stat6 Research Support",
  description:
    "Answers to the most common questions about Stat6's research support services, pricing, timelines, confidentiality, statistical analysis, bioinformatics, and publication support.",
  alternates: { canonical: absoluteUrl("/faq") },
};

const faqCategories = [
  {
    category: "General",
    faqs: [
      {
        q: "What is Stat6 and who is it for?",
        a: "Stat6 is a premium academic research support platform designed for life science scholars — undergraduate students, postgraduate researchers, PhD scholars, faculty members, clinicians, and independent researchers in biotechnology, medicine, pharmaceutical sciences, and related fields.",
      },
      {
        q: "Is Stat6 a writing service that does work for me?",
        a: "Stat6 provides expert research support and guidance, not ghost-writing. We help researchers understand methodology, analyze data correctly, structure manuscripts, and navigate the publication process. The intellectual contribution remains entirely yours.",
      },
      {
        q: "How is Stat6 different from other academic support services?",
        a: "Stat6 combines domain expertise with publication track records. Our team members are active researchers who have published in top-tier journals. We offer structured, transparent workflows with quality guarantees rather than one-off freelancer engagements.",
      },
    ],
  },
  {
    category: "Services & Process",
    faqs: [
      {
        q: "How do I get started?",
        a: "Submit an enquiry form on our website or book a free 30-minute consultation. Our team will review your project, discuss your needs, and send a detailed proposal within 48 hours.",
      },
      {
        q: "What services does Stat6 offer?",
        a: "We offer 7 major service categories: Research Planning, Research Writing, Statistical Analysis, Bioinformatics, Publication Support, Ethics & Compliance, and Academic Visibility. Each category includes multiple specialized services.",
      },
      {
        q: "How long does each service take?",
        a: "Timelines vary by service: Statistical analysis (2–10 days), Manuscript development (4–8 weeks), Literature review (5–10 days), Bioinformatics analysis (7–21 days), Journal submission support (1–3 weeks). Exact timelines are confirmed in your proposal.",
      },
      {
        q: "Do you offer revisions?",
        a: "Yes. All deliverables include revision rounds as specified in your proposal. We work iteratively until you are fully satisfied with the quality and accuracy of the output.",
      },
    ],
  },
  {
    category: "Quality & Confidentiality",
    faqs: [
      {
        q: "Is my research data kept confidential?",
        a: "Absolutely. All client projects are covered by strict confidentiality. We can sign NDAs upon request. We never share, publish, or reference client data, results, or manuscripts without explicit written consent.",
      },
      {
        q: "How do you ensure the quality of statistical analysis?",
        a: "All statistical work is performed by PhD-level biostatisticians and verified by a second expert before delivery. We provide full methodology documentation so you can reproduce and explain the analysis independently.",
      },
      {
        q: "Do you check for plagiarism?",
        a: "Yes. All written deliverables (manuscripts, literature reviews, thesis chapters) are screened with iThenticate before delivery. We ensure similarity index below 10% for all academic writing.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    faqs: [
      {
        q: "How much does research support cost?",
        a: "Pricing is project-specific and depends on scope, complexity, and timeline. We provide transparent, itemized proposals after understanding your requirements. Contact us for a free quote.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfers (NEFT/RTGS/IMPS), UPI, and international payments via Wise or PayPal. For larger projects, payment is split into milestones.",
      },
      {
        q: "Do you offer a free consultation?",
        a: "Yes. We offer a free 30-minute initial consultation where we discuss your research project, provide preliminary guidance, and determine whether our services are the right fit for your needs.",
      },
    ],
  },
  {
    category: "Publication Support",
    faqs: [
      {
        q: "Can you guarantee publication?",
        a: "No ethical service can guarantee publication — that decision lies with journal editors and peer reviewers. However, we significantly improve your chances through rigorous manuscript preparation, targeted journal selection, and expert reviewer response support.",
      },
      {
        q: "Which journals do you support submissions to?",
        a: "We support submissions to SCI-indexed, Scopus-indexed, PubMed-indexed, and ESCI journals, including open-access journals. We match your manuscript to appropriate journals based on scope, audience, and acceptance patterns.",
      },
      {
        q: "What if my paper gets rejected?",
        a: "We provide post-rejection support: analyzing reviewer comments, revising the manuscript accordingly, and identifying the next appropriate journal for resubmission.",
      },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((cat) =>
    cat.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    }))
  ),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="pt-16">
        {/* Hero */}
        <section
          className="section-padding-sm"
          style={{ background: "linear-gradient(160deg, #f0ffe6, #ddfdca)" }}
        >
          <div className="container-stat6 text-center max-w-2xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-xs text-[#8ab080] mb-6">
              <Link href="/" className="hover:text-[#0d2f04] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#0d2f04]">FAQ</span>
            </nav>

            <div className="flex items-center justify-center mb-4">
              <span className="section-label">Frequently Asked Questions</span>
            </div>

            <h1
              className="mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                color: "#0d2f04",
                letterSpacing: "-0.02em",
              }}
            >
              Everything You Need to Know
            </h1>

            <p className="text-[#5a8a50] text-base max-w-lg mx-auto">
              Common questions about Stat6&apos;s research support services, process, pricing, and confidentiality.
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="section-padding" style={{ background: "#f0ffe6" }}>
          <div className="container-stat6 max-w-3xl mx-auto">
            <div className="flex flex-col gap-12">
              {faqCategories.map((category) => (
                <div key={category.category}>
                  <h2
                    className="text-lg font-bold text-[#0d2f04] mb-5 flex items-center gap-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#ddfdca] flex items-center justify-center text-xs font-bold">
                      {category.category[0]}
                    </span>
                    {category.category}
                  </h2>

                  <div className="flex flex-col gap-3">
                    {category.faqs.map((faq, index) => (
                      <details
                        key={index}
                        className="group rounded-xl border border-[rgba(13,47,4,0.08)] bg-white/70 overflow-hidden"
                      >
                        <summary className="flex items-start justify-between gap-4 p-5 cursor-pointer font-semibold text-sm text-[#0d2f04] select-none list-none">
                          <span>{faq.q}</span>
                          <svg
                            className="w-4 h-4 text-[#8ab080] flex-shrink-0 mt-0.5 transition-transform group-open:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-5 pb-5">
                          <p className="text-sm text-[#5a8a50] leading-relaxed">{faq.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Still have questions */}
            <div className="mt-14 text-center p-8 rounded-2xl bg-[#ddfdca] border border-[rgba(13,47,4,0.08)]">
              <h3
                className="text-xl font-bold text-[#0d2f04] mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Still have questions?
              </h3>
              <p className="text-sm text-[#5a8a50] mb-5">
                Our research support team is happy to help. Reach out directly and we&apos;ll respond within 24 hours.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/contact" className="btn-primary flex items-center gap-2 text-sm">
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="mailto:research@stat6.com" className="btn-secondary text-sm">
                  Email Us Directly
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
