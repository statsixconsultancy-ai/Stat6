"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/utils";

const domains = [
  "Biotechnology",
  "Medicine",
  "Pharmaceutical Sciences",
  "Clinical Research",
  "Life Sciences",
  "Genomics",
  "Oncology",
  "Neuroscience",
  "Immunology",
  "Molecular Biology",
];

export default function StatsSection() {
  return (
    <section
      className="py-16 lg:py-20 relative overflow-hidden"
      style={{ background: "#0d2f04" }}
    >
      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(240,255,230,0.4) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-stat6 relative z-10">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl lg:text-5xl font-extrabold text-white mb-2"
                style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.04em" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[rgba(240,255,230,0.6)]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(240,255,230,0.08)] mb-10" />

        {/* Domain Expertise */}
        <div className="text-center mb-6">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[rgba(240,255,230,0.4)]"
          >
            Research Domains We Support
          </p>
        </div>

        {/* Scrolling Domain Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {domains.map((domain, index) => (
            <motion.span
              key={domain}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(240,255,230,0.08)",
                color: "rgba(240,255,230,0.7)",
                border: "1px solid rgba(240,255,230,0.1)",
              }}
            >
              <span className="w-1 h-1 rounded-full bg-[#5CE81B]" />
              {domain}
            </motion.span>
          ))}
        </div>

        {/* Accreditation Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { label: "SPSS Certified", sub: "IBM Analytics Partner" },
            { label: "SCI / Scopus", sub: "Journal Guidance" },
            { label: "IRB Compliant", sub: "Ethics & Compliance" },
            { label: "100% Confidential", sub: "NDA Protected" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 text-center">
              <span
                className="text-sm font-semibold"
                style={{ color: "#5CE81B", fontFamily: "var(--font-heading)" }}
              >
                {item.label}
              </span>
              <span className="text-xs text-[rgba(240,255,230,0.45)]">{item.sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
