import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SERVICE_CATEGORIES, absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Research Support Services — Statistical Analysis, Publication & Bioinformatics",
  description:
    "Comprehensive academic research support services: statistical analysis (SPSS, R), bioinformatics (RNA-Seq, docking), manuscript development, and SCI journal publication support for life science researchers.",
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: {
    title: "Research Support Services | Stat6",
    description: "Expert research support across 7 service categories for life science scholars",
    url: absoluteUrl("/services"),
  },
};

const processSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    description:
      "Free 30-minute discovery call to understand your research project, timeline, and specific needs.",
  },
  {
    step: "02",
    title: "Custom Proposal",
    description:
      "Receive a detailed scope, timeline, and pricing proposal tailored to your research requirements.",
  },
  {
    step: "03",
    title: "Expert Assignment",
    description:
      "A domain-matched expert with relevant publication experience is assigned to your project.",
  },
  {
    step: "04",
    title: "Iterative Work",
    description:
      "Collaborative execution with regular updates, revisions, and quality checkpoints.",
  },
  {
    step: "05",
    title: "Review & Delivery",
    description:
      "Multi-stage quality review before final delivery, with plagiarism and technical accuracy checks.",
  },
  {
    step: "06",
    title: "Ongoing Support",
    description:
      "Post-delivery support for reviewer responses, revisions, and resubmissions.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Stat6 Research Support Services",
  description: "Academic research support services for life science scholars",
  url: "
statsix.com/services",
  numberOfItems: SERVICE_CATEGORIES.length,
  itemListElement: SERVICE_CATEGORIES.map((cat, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: cat.title,
    url: `
statsix.com/services/${cat.slug}`,
    description: cat.description,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding" style={{ background: "linear-gradient(160deg, #f0ffe6, #ddfdca)" }}>
          <div className="container-stat6 text-center max-w-4xl mx-auto">
            <nav className="flex items-center justify-center gap-2 text-xs text-[#8ab080] mb-6">
              <Link href="/" className="hover:text-[#0d2f04] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#0d2f04]">Services</span>
            </nav>

            <div className="flex items-center justify-center mb-4">
              <span className="section-label">All Research Services</span>
            </div>

            <h1
              className="mb-5"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                color: "#0d2f04",
                letterSpacing: "-0.02em",
              }}
            >
              End-to-End Research Support for
              <br />
              Life Science Scholars
            </h1>

            <p className="text-[#5a8a50] text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              From study design to publication in high-impact journals — our expert team supports every phase of your academic research journey with precision and scientific rigor.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn-primary flex items-center gap-2">
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#services" className="btn-secondary">
                Browse Services
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="section-padding" style={{ background: "#f0ffe6" }}>
          <div className="container-stat6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  href={`/services/${category.slug}`}
                  className="group block p-6 rounded-2xl border border-[rgba(13,47,4,0.08)] bg-white/70 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_8px_24px_rgba(13,47,4,0.1)] hover:-translate-y-1 hover:border-[rgba(13,47,4,0.16)]"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{ background: category.color }}
                  >
                    <span className="text-lg font-extrabold text-[#0d2f04]" style={{ fontFamily: "var(--font-heading)" }}>
                      {category.title.slice(0, 2)}
                    </span>
                  </div>

                  <h2
                    className="text-lg font-bold text-[#0d2f04] mb-2 group-hover:text-black transition-colors"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {category.title}
                  </h2>

                  <p className="text-sm text-[#5a8a50] mb-5 leading-relaxed">{category.description}</p>

                  <ul className="flex flex-col gap-1.5 mb-5">
                    {category.services.map((service) => (
                      <li key={service.slug} className="flex items-center gap-2 text-sm text-[#3a6e30]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#5CE81B] flex-shrink-0" />
                        {service.title}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0d2f04] group-hover:gap-3 transition-all">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding" style={{ background: "#ddfdca" }}>
          <div className="container-stat6">
            <div className="text-center mb-12">
              <span className="section-label mb-4 flex items-center justify-center">How It Works</span>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  color: "#0d2f04",
                  letterSpacing: "-0.02em",
                }}
              >
                Our Research Support Process
              </h2>
              <p className="text-[#5a8a50] mt-3 text-base max-w-xl mx-auto">
                A structured, transparent workflow designed for research quality and publication success.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {processSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="p-6 rounded-2xl bg-white/60 border border-[rgba(13,47,4,0.08)]"
                >
                  <div
                    className="text-4xl font-extrabold text-[rgba(13,47,4,0.08)] mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.step}
                  </div>
                  <h3
                    className="text-base font-bold text-[#0d2f04] mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#5a8a50] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding-sm" style={{ background: "#f0ffe6" }}>
          <div className="container-stat6 text-center">
            <h2
              className="mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                color: "#0d2f04",
                letterSpacing: "-0.02em",
              }}
            >
              Not sure which service you need?
            </h2>
            <p className="text-[#5a8a50] mb-7 max-w-md mx-auto">
              Book a free consultation. Our experts will review your research and recommend the best support pathway.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
