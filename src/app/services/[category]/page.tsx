import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, ChevronDown } from "lucide-react";
import { SERVICE_CATEGORIES, absoluteUrl } from "@/lib/utils";
import EnquiryForm from "@/components/ui/EnquiryForm";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return SERVICE_CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = SERVICE_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};

  return {
    title: `${cat.title} Services — Expert Academic Research Support`,
    description: `Professional ${cat.title.toLowerCase()} support for life science scholars. ${cat.description}. Expert guidance, SCI/Scopus publication support, and domain-matched research assistance.`,
    alternates: { canonical: absoluteUrl(`/services/${cat.slug}`) },
    openGraph: {
      title: `${cat.title} | Stat6 Research Support`,
      description: cat.description,
      url: absoluteUrl(`/services/${cat.slug}`),
    },
  };
}

// Rich FAQ data per category
const categoryFAQs: Record<string, { q: string; a: string }[]> = {
  "statistical-analysis": [
    {
      q: "Which statistical software do you use?",
      a: "We work with SPSS, R, Python (pandas/scipy), GraphPad Prism, SAS, and Stata depending on your research requirements and journal expectations.",
    },
    {
      q: "Can you analyze data from clinical trials?",
      a: "Yes. We support Phase I–IV clinical trial data analysis including survival analysis, Kaplan-Meier curves, Cox regression, and mixed-effects models.",
    },
    {
      q: "How long does statistical analysis take?",
      a: "Turnaround varies by complexity. Descriptive statistics: 2–3 days. Multivariate analysis: 5–7 days. Complex survival or longitudinal analysis: 7–14 days.",
    },
    {
      q: "Will you provide interpretation of results?",
      a: "Absolutely. We provide full written interpretation of all statistical outputs formatted for your manuscript's Results and Discussion sections.",
    },
  ],
  "bioinformatics": [
    {
      q: "What bioinformatics pipelines do you support?",
      a: "We support standard RNA-Seq pipelines (STAR, HISAT2, DESeq2, edgeR), molecular docking (AutoDock Vina, Glide), pathway enrichment (KEGG, GO, Reactome), and single-cell analysis (Seurat, Scanpy).",
    },
    {
      q: "Do you need raw sequencing data or processed data?",
      a: "We work with raw FASTQ files, BAM/SAM files, or count matrices. We can guide you on data submission to GEO/SRA if needed.",
    },
    {
      q: "Can you help with publication-quality figures?",
      a: "Yes. All bioinformatics deliverables include publication-ready figures (volcano plots, heatmaps, pathway diagrams) in high resolution (300+ DPI).",
    },
  ],
  "publication-support": [
    {
      q: "Which journals can you help target?",
      a: "We support submissions to SCI-indexed, Scopus-indexed, PubMed-indexed, and high-impact open-access journals. We match your manuscript to appropriate journals based on scope, impact factor, and acceptance rates.",
    },
    {
      q: "How do you handle reviewer comments?",
      a: "Our team prepares point-by-point responses to all reviewer comments with a formal rebuttal letter, revised manuscript, and track-changes version.",
    },
    {
      q: "What is the typical publication timeline?",
      a: "With our support, initial manuscript development takes 4–8 weeks. Review timelines depend on the journal, but we actively track and support through all revision rounds.",
    },
  ],
  "research-writing": [
    {
      q: "Do you write manuscripts from scratch?",
      a: "We provide structured manuscript development support. You provide the data, research context, and scientific insights — we help structure, write, and refine the manuscript to publication standards.",
    },
    {
      q: "Is the content plagiarism-free?",
      a: "All manuscripts are checked with premium plagiarism detection tools (iThenticate). We ensure similarity index below 10% before delivery.",
    },
    {
      q: "What citation style do you follow?",
      a: "We follow all major citation styles: Vancouver, APA, AMA, Harvard, Chicago, and specific journal-prescribed styles.",
    },
  ],
};

const defaultFAQs = [
  {
    q: "How do I get started?",
    a: "Submit the enquiry form below or book a free consultation. Our team will contact you within 24 hours to discuss your project.",
  },
  {
    q: "Is my research data kept confidential?",
    a: "Absolutely. All client data is protected by NDA. We never share, publish, or reuse any client research data.",
  },
  {
    q: "What are your payment options?",
    a: "We accept bank transfers, UPI, and international payments (Wise, PayPal). Payment is split into milestones for larger projects.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes. All service packages include revision rounds. We work with you until you are fully satisfied with the quality.",
  },
];

export default async function ServiceCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = SERVICE_CATEGORIES.find((c) => c.slug === category);

  if (!cat) return notFound();

  const faqs = categoryFAQs[category] || defaultFAQs;
  const relatedCategories = SERVICE_CATEGORIES.filter((c) => c.slug !== category).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${cat.title} — Stat6`,
        description: cat.description,
        provider: { "@type": "Organization", name: "Stat6", url: absoluteUrl('/') },
        serviceType: cat.title,
           url: absoluteUrl(`/services/${cat.slug}`),
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${cat.title} Services`,
          itemListElement: cat.services.map((s, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: { "@type": "Service", name: s.title },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
             { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
             { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl('/services') },
             { "@type": "ListItem", position: 3, name: cat.title, item: absoluteUrl(`/services/${cat.slug}`) },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="pt-16">
        {/* Hero Banner */}
        <section
          className="section-padding-sm"
          style={{ background: `linear-gradient(160deg, #f0ffe6, ${cat.color})` }}
        >
          <div className="container-stat6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-[#8ab080] mb-6">
              <Link href="/" className="hover:text-[#0d2f04] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#0d2f04] transition-colors">Services</Link>
              <span>/</span>
              <span className="text-[#0d2f04]">{cat.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="section-label mb-4 flex items-center gap-2">
                  Expert Support
                </span>

                <h1
                  className="mb-4"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#0d2f04",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {cat.title}
                  <br />
                  <span className="text-[#2d7a1a]">Support Services</span>
                </h1>

                <p className="text-[#3a6e30] text-lg mb-6 leading-relaxed">
                  {cat.description}. Expert support tailored for life science researchers, clinicians, and PhD scholars.
                </p>

                {/* Sub-services list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7">
                  {cat.services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${cat.slug}/${service.slug}`}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/60 border border-[rgba(13,47,4,0.08)] text-sm font-medium text-[#0d2f04] hover:bg-white hover:border-[rgba(13,47,4,0.2)] transition-all group"
                    >
                      <CheckCircle className="w-4 h-4 text-[#5CE81B] flex-shrink-0" />
                      {service.title}
                      <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Link href="/contact" className="btn-primary flex items-center gap-2">
                    Get Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a href="#enquiry" className="btn-secondary">
                    Quick Enquiry
                  </a>
                </div>
              </div>

              {/* Stats Panel */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-[rgba(13,47,4,0.08)] p-6">
                <h3
                  className="text-sm font-bold text-[#0d2f04] mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Why Researchers Choose Stat6
                </h3>
                <div className="flex flex-col gap-4">
                  {[
                    { label: "Domain-Expert Team", desc: "Researchers with relevant publication track records" },
                    { label: "Guaranteed Confidentiality", desc: "NDA-protected, secure file handling" },
                    { label: "Revision Support", desc: "Unlimited revisions until satisfaction" },
                    { label: "Fast Turnaround", desc: "24–72 hour initial response guaranteed" },
                    { label: "Publication Track Record", desc: "340+ successfully published papers" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#ddfdca] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-[#0d2f04]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0d2f04]">{item.label}</p>
                        <p className="text-xs text-[#6a9e60]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding" style={{ background: "#f0ffe6" }}>
          <div className="container-stat6 max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label flex items-center justify-center mb-3">Common Questions</span>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                  color: "#0d2f04",
                  letterSpacing: "-0.02em",
                }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-xl border border-[rgba(13,47,4,0.08)] bg-white/70 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-sm text-[#0d2f04] select-none list-none">
                    {faq.q}
                    <ChevronDown className="w-4 h-4 text-[#8ab080] transition-transform group-open:rotate-180 flex-shrink-0 ml-3" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-[#5a8a50] leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <section id="enquiry" className="section-padding" style={{ background: "#ddfdca" }}>
          <div className="container-stat6 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  color: "#0d2f04",
                  letterSpacing: "-0.02em",
                }}
              >
                Request {cat.title} Support
              </h2>
              <p className="text-[#5a8a50] mt-2 text-sm">
                We respond within 24 hours with a detailed proposal.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-[rgba(13,47,4,0.08)] p-7 shadow-[0_4px_24px_rgba(13,47,4,0.06)]">
              <EnquiryForm preSelectedService={cat.slug} />
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="section-padding-sm" style={{ background: "#f0ffe6" }}>
          <div className="container-stat6">
            <h2
              className="text-center mb-8"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#0d2f04",
              }}
            >
              Related Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedCategories.map((related) => (
                <Link
                  key={related.id}
                  href={`/services/${related.slug}`}
                  className="flex items-start gap-3 p-4 rounded-xl border border-[rgba(13,47,4,0.08)] bg-white/60 hover:bg-white hover:shadow-[0_4px_16px_rgba(13,47,4,0.08)] transition-all group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: related.color }}
                  >
                    <span className="text-xs font-bold text-[#0d2f04]">{related.title.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0d2f04] group-hover:text-black">{related.title}</p>
                    <p className="text-xs text-[#8ab080] mt-0.5">{related.services.length} services</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0d2f04] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
