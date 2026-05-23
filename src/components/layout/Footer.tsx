import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/utils";

const footerLinks = {
  platform: [
    { label: "Home", href: "/" },
    { label: "About Stat6", href: "/about" },
    { label: "All Services", href: "/services" },
    { label: "Research Domains", href: "/research-domains" },
    { label: "Publication Support", href: "/services/publication-support" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  services: SERVICE_CATEGORIES.slice(0, 5).map((cat) => ({
    label: cat.title,
    href: `/services/${cat.slug}`,
  })),
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/stat6",
    icon: Linkedin,
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/stat6research",
    icon: Twitter,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/stat6research",
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/stat6research",
    icon: Instagram,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t"
      style={{
        background: "#0d2f04",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {/* Main Footer */}
      <div className="container-stat6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-20 h-20 overflow-hidden flex-shrink-0">
                <Image
                  src="/logo1.png"
                  alt="Stat6 logo"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-[rgba(240,255,230,0.6)] max-w-xs">
              Premium research support and scientific publication assistance for life science scholars, clinicians, and academic researchers across biotechnology, medicine, and pharmaceutical sciences.
            </p>

            {/* Contact Info */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="mailto:research@statsix.com"
                className="flex items-center gap-2.5 text-sm text-[rgba(240,255,230,0.7)] hover:text-[#5CE81B] transition-colors"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                research@statsix.com
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-2.5 text-sm text-[rgba(240,255,230,0.7)] hover:text-[#5CE81B] transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +91 99999 99999
              </a>
              <div className="flex items-start gap-2.5 text-sm text-[rgba(240,255,230,0.7)]">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>India · Serving researchers globally</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-[#5CE81B] hover:text-[#0d2f04] group"
                  style={{ background: "rgba(240,255,230,0.08)", color: "rgba(240,255,230,0.6)" }}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">

            {/* Platform Links */}
            <div>
              <h3
                className="text-sm font-semibold text-white mb-4 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", letterSpacing: "0.1em" }}
              >
                Platform
              </h3>
              <ul className="flex flex-col gap-2.5">
                {footerLinks.platform.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[rgba(240,255,230,0.6)] hover:text-[#5CE81B] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3
                className="text-sm font-semibold text-white mb-4 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", letterSpacing: "0.1em" }}
              >
                Services
              </h3>
              <ul className="flex flex-col gap-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[rgba(240,255,230,0.6)] hover:text-[#5CE81B] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    className="text-sm text-[#5CE81B] hover:text-[#7ef545] transition-colors"
                  >
                    View all →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3
                className="text-sm font-semibold text-white mb-4 uppercase tracking-widest"
                style={{ fontFamily: "var(--font-heading)", fontSize: "0.7rem", letterSpacing: "0.1em" }}
              >
                Research Updates
              </h3>
              <p className="text-sm text-[rgba(240,255,230,0.6)] mb-4 leading-relaxed">
                Get weekly research tips, publication strategies, and academic insights.
              </p>
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="px-4 py-2.5 rounded-xl text-sm outline-none text-[#0d2f04] placeholder-[#8ab080]"
                  style={{ background: "rgba(240,255,230,0.12)", border: "1.5px solid rgba(240,255,230,0.12)", color: "rgba(240,255,230,0.9)" }}
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "#5CE81B",
                    color: "#0d2f04",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  Subscribe
                </button>
              </form>

              {/* Legal Links */}
              <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                <ul className="flex flex-col gap-2">
                  {footerLinks.legal.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs text-[rgba(240,255,230,0.45)] hover:text-[rgba(240,255,230,0.8)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="container-stat6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[rgba(240,255,230,0.4)]">
              © {currentYear} Stat6 Research Platform. All rights reserved.
            </p>
            <p className="text-xs text-[rgba(240,255,230,0.4)]">
              Empowering life science research globally
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
