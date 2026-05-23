"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_CATEGORIES } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Research Domains", href: "/research-domains" },
  { label: "Publication Support", href: "/services/publication-support" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-[rgba(13,47,4,0.08)] shadow-soft"
            : "bg-transparent"
        )}
      >
        <div className="container-stat6">
          <nav className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-20 h-20 overflow-hidden transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Stat6 logo"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.href} className="relative">
                    <button
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname.startsWith("/services")
                          ? "text-[#0d2f04] bg-[#ddfdca]"
                          : "text-[#3a6e30] hover:text-[#0d2f04] hover:bg-[#f0ffe6]"
                      )}
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          servicesOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          onMouseEnter={() => setServicesOpen(true)}
                          onMouseLeave={() => setServicesOpen(false)}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[680px]"
                        >
                          <div className="bg-white rounded-2xl border border-[rgba(13,47,4,0.08)] shadow-[0_8px_32px_rgba(13,47,4,0.1)] p-5 grid grid-cols-2 gap-3">
                            <div className="col-span-2 pb-3 border-b border-[rgba(13,47,4,0.06)] mb-1">
                              <p className="text-xs font-semibold text-[#8ab080] uppercase tracking-widest">
                                All Services
                              </p>
                            </div>
                            {SERVICE_CATEGORIES.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/services/${cat.slug}`}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f0ffe6] transition-colors group"
                              >
                                <div
                                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                  style={{ background: cat.color }}
                                >
                                  <span className="text-xs font-bold text-[#0d2f04]">
                                    {cat.title.slice(0, 2)}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-[#0d2f04] group-hover:text-black transition-colors">
                                    {cat.title}
                                  </p>
                                  <p className="text-xs text-[#6a9e60] mt-0.5 line-clamp-1">
                                    {cat.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                            <div className="col-span-2 pt-3 border-t border-[rgba(13,47,4,0.06)] mt-1">
                              <Link
                                href="/services"
                                className="flex items-center gap-2 text-sm font-semibold text-[#0d2f04] hover:text-black transition-colors"
                              >
                                View all services →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-[#0d2f04] bg-[#ddfdca]"
                        : "text-[#3a6e30] hover:text-[#0d2f04] hover:bg-[#f0ffe6]"
                    )}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="btn-primary hidden lg:inline-flex text-sm px-5 py-2.5"
              >
                Book Consultation
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#ddfdca] transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5 text-[#0d2f04]" />
                ) : (
                  <Menu className="w-5 h-5 text-[#0d2f04]" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto"
            >
              <div className="p-6 pt-20">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        pathname === link.href || (link.hasDropdown && pathname.startsWith("/services"))
                          ? "text-[#0d2f04] bg-[#f0ffe6] font-semibold"
                          : "text-[#3a6e30] hover:bg-[#f0ffe6] hover:text-[#0d2f04]"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-[rgba(13,47,4,0.08)]">
                  <Link href="/contact" className="btn-primary w-full justify-center">
                    Book Consultation
                  </Link>
                </div>

                {/* Service Categories in Mobile */}
                <div className="mt-6 pt-6 border-t border-[rgba(13,47,4,0.08)]">
                  <p className="text-xs font-semibold text-[#8ab080] uppercase tracking-widest mb-3">
                    Our Services
                  </p>
                  <div className="flex flex-col gap-1">
                    {SERVICE_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/services/${cat.slug}`}
                        className="px-3 py-2.5 rounded-lg text-sm text-[#3a6e30] hover:bg-[#f0ffe6] hover:text-[#0d2f04] transition-colors"
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
