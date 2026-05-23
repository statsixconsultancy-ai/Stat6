import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, MessageSquare, Calendar } from "lucide-react";
import EnquiryForm from "@/components/ui/EnquiryForm";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Stat6 — Book a Free Research Consultation",
  description:
    "Get in touch with Stat6's research support team. Book a free 30-minute consultation, submit your enquiry, or reach us directly. We respond within 24 hours.",
  alternates: { canonical: absoluteUrl("/contact") },
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "research@stat6.com",
    sub: "Respond within 24 hours",
    href: "mailto:research@stat6.com",
  },
  {
    icon: Phone,
    label: "WhatsApp / Call",
    value: "+91 99999 99999",
    sub: "Mon–Sat, 9 AM – 7 PM IST",
    href: "tel:+919999999999",
  },
  {
    icon: Clock,
    label: "Consultation Hours",
    value: "Mon–Sat: 9 AM – 7 PM",
    sub: "Sunday: Enquiries accepted",
    href: null,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    sub: "Serving researchers globally",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section
        className="section-padding-sm"
        style={{ background: "linear-gradient(160deg, #f0ffe6, #ddfdca)" }}
      >
        <div className="container-stat6 text-center max-w-3xl mx-auto">
          <nav className="flex items-center justify-center gap-2 text-xs text-[#8ab080] mb-6">
            <Link href="/" className="hover:text-[#0d2f04] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0d2f04]">Contact</span>
          </nav>

          <div className="flex items-center justify-center mb-4">
            <span className="section-label">Get in Touch</span>
          </div>

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
            Book a Free Research Consultation
          </h1>

          <p className="text-[#5a8a50] text-lg max-w-xl mx-auto leading-relaxed">
            Tell us about your research project. Our domain experts will review your requirements and suggest the best support pathway — completely free.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding" style={{ background: "#f0ffe6" }}>
        <div className="container-stat6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left — Info */}
            <div className="lg:col-span-4">
              <h2
                className="text-xl font-bold text-[#0d2f04] mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Contact Information
              </h2>

              <div className="flex flex-col gap-4 mb-8">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#ddfdca] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#0d2f04]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#8ab080] uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-semibold text-[#0d2f04] hover:text-black transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-[#0d2f04]">{item.value}</p>
                      )}
                      <p className="text-xs text-[#8ab080] mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* What to Expect */}
              <div className="p-5 rounded-2xl bg-[#ddfdca] border border-[rgba(13,47,4,0.08)]">
                <h3
                  className="text-sm font-bold text-[#0d2f04] mb-4 flex items-center gap-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  <Calendar className="w-4 h-4" />
                  What Happens After You Submit
                </h3>
                <div className="flex flex-col gap-3">
                  {[
                    { step: "1", text: "We review your enquiry within a few hours" },
                    { step: "2", text: "A domain expert contacts you within 24 hours" },
                    { step: "3", text: "Free 30-min consultation call scheduled" },
                    { step: "4", text: "Custom proposal delivered within 48 hours" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#0d2f04] text-[#f0ffe6] text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {item.step}
                      </div>
                      <p className="text-xs text-[#3a6e30]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Links */}
              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href="mailto:research@stat6.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[rgba(13,47,4,0.08)] text-sm font-medium text-[#0d2f04] hover:bg-white hover:shadow-[0_2px_8px_rgba(13,47,4,0.06)] transition-all"
                >
                  <Mail className="w-4 h-4 text-[#5CE81B]" />
                  Email us directly
                </a>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-[rgba(13,47,4,0.08)] text-sm font-medium text-[#0d2f04] hover:bg-white hover:shadow-[0_2px_8px_rgba(13,47,4,0.06)] transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#5CE81B]" />
                  WhatsApp us
                </a>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl border border-[rgba(13,47,4,0.08)] p-7 lg:p-9 shadow-[0_4px_24px_rgba(13,47,4,0.06)]">
                <h2
                  className="text-xl font-bold text-[#0d2f04] mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Submit Your Research Enquiry
                </h2>
                <p className="text-sm text-[#6a9e60] mb-7">
                  Fill in the details below. All submissions are reviewed by our research support team.
                </p>
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
