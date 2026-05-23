import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Stat6 — Research & Publication Support for Life Science Scholars",
  description:
    "Premium academic research support platform for biotechnology, medicine, and pharmaceutical researchers. Expert statistical analysis, bioinformatics, manuscript development, and SCI journal publication support.",
  keywords: [
    "research support",
    "statistical analysis",
    "bioinformatics",
    "publication support",
    "manuscript writing",
    "SPSS analysis",
    "PhD guidance",
    "scientific research",
    "journal publication",
    "life sciences",
    "clinical research",
    "biotechnology research",
  ],
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title: "Stat6 — Research & Publication Support for Life Science Scholars",
    description:
      "From research design to SCI-indexed publication — expert statistical analysis, bioinformatics, and manuscript support for life science researchers.",
    images: [{ url: absoluteUrl("/og-image.png"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stat6 — Research & Publication Support",
    description: "Expert research support for life science scholars",
    images: [absoluteUrl("/og-image.png")],
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

// JSON-LD Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "
statsix.com/#organization",
      name: "Stat6",
      url: "
statsix.com",
      logo: {
        "@type": "ImageObject",
        url: "
statsix.com/logo.png",
      },
      description:
        "Premium research support and scientific publication assistance for life science scholars",
      contactPoint: {
        "@type": "ContactPoint",
        email: "research@stat6.com",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://linkedin.com/company/stat6",
        "https://twitter.com/stat6research",
        "https://facebook.com/stat6research",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "
statsix.com/#website",
      url: "
statsix.com",
      name: "Stat6",
      description: "Research & Publication Support Platform for Life Science Scholars",
      publisher: { "@id": "
statsix.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: "
statsix.com/search?q={search_term_string}" },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "
statsix.com/#service",
      name: "Stat6 Research Support",
      image: "
statsix.com/og-image.png",
      priceRange: "$$",
      telephone: "+91-99999-99999",
      email: "research@stat6.com",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      description:
        "Academic research support, statistical analysis, bioinformatics, and scientific publication assistance",
      serviceType: [
        "Statistical Analysis",
        "Bioinformatics",
        "Manuscript Development",
        "Publication Support",
        "Research Planning",
      ],
      areaServed: "Worldwide",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </>
  );
}
