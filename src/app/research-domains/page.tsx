import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Research Domains — Biotechnology, Medicine, Pharma & Life Sciences",
  description:
    "Stat6 supports researchers across biotechnology, medicine, pharmaceutical sciences, clinical research, genomics, oncology, neuroscience, and all life science domains.",
  alternates: { canonical: absoluteUrl("/research-domains") },
};

const domains = [
  {
    title: "Biotechnology",
    description: "Genetic engineering, cell biology, microbiology, molecular biology, protein engineering, and industrial biotechnology research support.",
    services: ["RNA-Seq Analysis", "Gene Expression", "Pathway Analysis", "Statistical Analysis"],
    color: "#bcfb9b",
  },
  {
    title: "Medicine & Clinical Research",
    description: "Clinical trials (Phase I–IV), epidemiology, public health, evidence-based medicine, case reports, and systematic review support.",
    services: ["Biostatistics", "Survival Analysis", "IRB Documentation", "Manuscript Writing"],
    color: "#ddfdca",
  },
  {
    title: "Pharmaceutical Sciences",
    description: "Drug discovery, pharmacology, pharmacokinetics, clinical pharmacology, drug regulatory affairs, and pharmaceutical research support.",
    services: ["Molecular Docking", "Statistical Analysis", "Publication Support", "Proposal Writing"],
    color: "#f0ffe6",
  },
  {
    title: "Oncology",
    description: "Cancer biology, tumor immunology, clinical oncology, targeted therapy research, and cancer genomics study support.",
    services: ["Bioinformatics", "Survival Analysis", "Literature Review", "SCI Publication"],
    color: "#bcfb9b",
  },
  {
    title: "Genomics & Genetics",
    description: "Whole genome sequencing, SNP analysis, GWAS, epigenomics, and population genetics research support.",
    services: ["RNA-Seq", "Gene Expression", "Pathway Analysis", "Bioinformatics"],
    color: "#ddfdca",
  },
  {
    title: "Neuroscience",
    description: "Neurological disorders, neuroimaging, cognitive neuroscience, neuropathology, and translational neuroscience research.",
    services: ["Statistical Analysis", "Manuscript Support", "Review Articles", "Publication"],
    color: "#f0ffe6",
  },
  {
    title: "Immunology",
    description: "Innate and adaptive immunity, autoimmune diseases, vaccine development, immunotherapy, and immunological research.",
    services: ["Data Analysis", "Bioinformatics", "Study Design", "Manuscript Writing"],
    color: "#bcfb9b",
  },
  {
    title: "Public Health & Epidemiology",
    description: "Disease epidemiology, health outcomes research, health policy analysis, and population-based study design and analysis.",
    services: ["SPSS Analysis", "Study Design", "Systematic Review", "Grant Proposals"],
    color: "#ddfdca",
  },
];

export default function ResearchDomainsPage() {
  return (
    <main className="pt-16">
      <section className="section-padding-sm" style={{ background: "linear-gradient(160deg, #f0ffe6, #ddfdca)" }}>
        <div className="container-stat6 text-center max-w-3xl mx-auto">
          <nav className="flex items-center justify-center gap-2 text-xs text-[#8ab080] mb-6">
            <Link href="/" className="hover:text-[#0d2f04] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0d2f04]">Research Domains</span>
          </nav>
          <div className="flex items-center justify-center mb-4">
            <span className="section-label">Research Domains We Support</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#0d2f04", letterSpacing: "-0.02em" }}>
            Expert Support Across All Life Science Research Domains
          </h1>
          <p className="text-[#5a8a50] mt-4 text-lg max-w-xl mx-auto">
            Our domain-matched experts provide specialized research support tailored to your specific scientific field.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "#f0ffe6" }}>
        <div className="container-stat6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {domains.map((domain) => (
              <div
                key={domain.title}
                className="p-6 rounded-2xl border border-[rgba(13,47,4,0.08)] bg-white/70 backdrop-blur-sm"
              >
                <div
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                  style={{ background: domain.color, color: "#0d2f04" }}
                >
                  {domain.title}
                </div>
                <p className="text-sm text-[#3a6e30] leading-relaxed mb-4">{domain.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {domain.services.map((s) => (
                    <span key={s} className="tag text-xs">{s}</span>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#0d2f04] hover:gap-2.5 transition-all"
                >
                  Get support for {domain.title}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-sm" style={{ background: "#ddfdca" }}>
        <div className="container-stat6 text-center">
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#0d2f04", letterSpacing: "-0.02em" }} className="mb-4">
            Don&apos;t see your research domain?
          </h2>
          <p className="text-[#5a8a50] mb-6 max-w-md mx-auto text-sm">
            We support all life science and biomedical research domains. Contact us and we&apos;ll match you with the right expert.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Book Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
