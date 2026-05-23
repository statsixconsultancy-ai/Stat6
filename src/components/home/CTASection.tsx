"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MessageSquare } from "lucide-react";

export default function CTASection() {
  return (
    <section className="section-padding" style={{ background: "#f0ffe6" }}>
      <div className="container-stat6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "#0d2f04" }}
        >
          {/* Background dots */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(92,232,27,0.12) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(92,232,27,0.12) 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />

          <div className="relative z-10 px-8 py-16 lg:py-20 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left */}
            <div className="text-center lg:text-left max-w-xl">
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#5CE81B" }}
              >
                <span className="w-4 h-px bg-[#5CE81B]" />
                Start Your Research Journey
              </span>

              <h2
                className="text-3xl lg:text-4xl font-extrabold text-white mb-4 text-balance"
                style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
              >
                Ready to Publish in a
                <br />
                High-Impact Journal?
              </h2>

              <p className="text-[rgba(240,255,230,0.65)] text-base leading-relaxed">
                Book a free 30-minute consultation with our research experts. We&apos;ll review your project, identify the right services, and create a custom publication roadmap.
              </p>
            </div>

            {/* Right — CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="flex items-center gap-2.5 px-7 py-4 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  background: "#5CE81B",
                  color: "#0d2f04",
                  fontFamily: "var(--font-heading)",
                  boxShadow: "0 4px 20px rgba(92,232,27,0.3)",
                }}
              >
                <Calendar className="w-4 h-4" />
                Book Free Consultation
              </Link>

              <Link
                href="/services"
                className="flex items-center gap-2.5 px-7 py-4 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(240,255,230,0.1)",
                  color: "rgba(240,255,230,0.9)",
                  border: "1.5px solid rgba(240,255,230,0.2)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                <MessageSquare className="w-4 h-4" />
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
