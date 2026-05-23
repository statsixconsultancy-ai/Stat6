import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Users, Award, Globe } from "lucide-react";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Stat6 — Our Mission, Team & Research Support Philosophy",
  description:
    "Learn about Stat6's mission to democratize quality academic research support for life science scholars. Discover our team of expert researchers, statisticians, and publication specialists.",
  alternates: { canonical: absoluteUrl("/about") },
};

const values = [
  {
    icon: Target,
    title: "Precision",
    description:
      "Every statistical analysis, bioinformatics output, and manuscript section is delivered with scientific rigor and publication-standard quality.",
  },
  {
    icon: Heart,
    title: "Scholar-First",
    description:
      "We exist to empower researchers. Our guidance is designed to build your scientific independence, not create dependency.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "Clear communication, honest timelines, structured milestones, and full visibility into your project at every stage.",
  },
  {
    icon: Globe,
    title: "Global Standard",
    description:
      "Our support meets international publication standards — from Nature to Lancet, BMJ to Frontiers.",
  },
];

const teamMembers = [
  {
    name: "Dr. Anita Verma",
    role: "Research Director",
    specialization: "Clinical Research & Biostatistics",
    publications: "38 SCI publications",
    initials: "AV",
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Head — Statistical Analysis",
    specialization: "SPSS, R, SAS, Survival Analysis",
    publications: "22 Scopus publications",
    initials: "RK",
  },
  {
    name: "Dr. Meera Nair",
    role: "Bioinformatics Lead",
    specialization: "RNA-Seq, Genomics, Pathway Analysis",
    publications: "17 PubMed publications",
    initials: "MN",
  },
  {
    name: "Dr. Sanjay Mehta",
    role: "Publication Support Lead",
    specialization: "Journal strategy, Manuscript review",
    publications: "31 SCI publications",
    initials: "SM",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section
        className="section-padding"
        style={{ background: "linear-gradient(160deg, #f0ffe6, #ddfdca)" }}
      >
        <div className="container-stat6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <nav className="flex items-center gap-2 text-xs text-[#8ab080] mb-6">
                <Link href="/" className="hover:text-[#0d2f04] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#0d2f04]">About</span>
              </nav>

              <div className="flex items-center mb-4">
                <span className="section-label">Our Mission</span>
              </div>

              <h1
                className="mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#0d2f04",
                  letterSpacing: "-0.02em",
                }}
              >
                Empowering Life Science Researchers to Publish with Confidence
              </h1>

              <p className="text-[#3a6e30] text-lg leading-relaxed mb-5">
                Stat6 was founded with a single mission: to bridge the gap between brilliant research ideas and published scientific knowledge. Too many researchers struggle not because their science is weak, but because they lack access to expert statistical, bioinformatics, and publication support.
              </p>

              <p className="text-[#5a8a50] leading-relaxed mb-7">
                We are a team of PhD researchers, biostatisticians, bioinformaticians, and publication specialists who have collectively published in Nature, Lancet, BMJ, and hundreds of SCI-indexed journals. We bring that expertise directly to scholars who need it most.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/services" className="btn-primary flex items-center gap-2">
                  Our Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Work With Us
                </Link>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, value: "2,400+", label: "Researchers Supported" },
                { icon: Award, value: "340+", label: "Publications Guided" },
                { icon: Globe, value: "60+", label: "Countries Served" },
                { icon: Target, value: "12+", label: "Years of Expertise" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-white/70 border border-[rgba(13,47,4,0.08)] text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#ddfdca] flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-5 h-5 text-[#0d2f04]" />
                  </div>
                  <div
                    className="text-2xl font-extrabold text-[#0d2f04] mb-1"
                    style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#6a9e60]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: "#f0ffe6" }}>
        <div className="container-stat6">
          <div className="text-center mb-12">
            <span className="section-label flex items-center justify-center mb-4">Our Values</span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                color: "#0d2f04",
                letterSpacing: "-0.02em",
              }}
            >
              What Drives Our Research Support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-white/70 border border-[rgba(13,47,4,0.08)] text-center"
              >
                <div className="w-11 h-11 rounded-xl bg-[#ddfdca] flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-5 h-5 text-[#0d2f04]" />
                </div>
                <h3
                  className="text-base font-bold text-[#0d2f04] mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {value.title}
                </h3>
                <p className="text-sm text-[#5a8a50] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding" style={{ background: "#ddfdca" }}>
        <div className="container-stat6">
          <div className="text-center mb-12">
            <span className="section-label flex items-center justify-center mb-4">Meet the Team</span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                color: "#0d2f04",
                letterSpacing: "-0.02em",
              }}
            >
              Research Experts Behind Stat6
            </h2>
            <p className="text-[#5a8a50] mt-3 max-w-xl mx-auto">
              Our team comprises domain-expert researchers with active publication track records in top-tier life science journals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="p-6 rounded-2xl bg-white/70 border border-[rgba(13,47,4,0.08)] text-center"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold text-white mx-auto mb-4"
                  style={{
                    background: "linear-gradient(135deg, #0d2f04, #2d7a1a)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {member.initials}
                </div>
                <h3
                  className="text-base font-bold text-[#0d2f04] mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-[#5CE81B] mb-1">{member.role}</p>
                <p className="text-xs text-[#5a8a50] mb-2">{member.specialization}</p>
                <span className="tag text-xs">{member.publications}</span>
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
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "#0d2f04",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to work with our research team?
          </h2>
          <p className="text-[#5a8a50] mb-7 max-w-md mx-auto">
            Book a free consultation and let&apos;s discuss your research project.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Book Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
