"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

// Research Dashboard Visual Component
function ResearchDashboard() {
  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[560px]">
      {/* Main Dashboard Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-0 right-0 w-[90%] rounded-2xl border border-[rgba(13,47,4,0.1)] overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 32px rgba(13,47,4,0.1)",
        }}
      >
        {/* Dashboard Header */}
        <div className="px-5 py-3.5 border-b border-[rgba(13,47,4,0.06)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-400" />
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-[#f0ffe6] rounded-full text-xs font-semibold text-[#0d2f04]">
              Research Analytics
            </div>
          </div>
          <div className="w-16 h-4 bg-[#f0ffe6] rounded" />
        </div>

        <div className="p-5">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Manuscripts", value: "24", delta: "+3 this week", color: "#ddfdca" },
              { label: "Citations", value: "1,847", delta: "+12%", color: "#bcfb9b" },
              { label: "Impact Score", value: "8.4", delta: "▲ Q1", color: "#f0ffe6" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-3" style={{ background: stat.color }}>
                <p className="text-xs text-[#5a8a50] mb-1">{stat.label}</p>
                <p className="text-xl font-extrabold text-[#0d2f04]" style={{ fontFamily: "var(--font-heading)" }}>
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-[#5CE81B] mt-0.5">{stat.delta}</p>
              </div>
            ))}
          </div>

          {/* Publication Pipeline */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-[#0d2f04]">Publication Pipeline</span>
              <span className="text-xs text-[#8ab080]">3 active</span>
            </div>
            {[
              { title: "RNA-Seq Analysis of HER2+ Breast Cancer", stage: "Peer Review", progress: 75, journal: "Nature Oncology" },
              { title: "SPSS Biostatistics: Clinical Trial Phase III", stage: "Revision", progress: 55, journal: "BMJ Open" },
              { title: "Molecular Docking: COVID-19 Inhibitors", stage: "Submission", progress: 90, journal: "Sci Reports" },
            ].map((item, i) => (
              <div key={i} className="mb-3 last:mb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-[#0d2f04] truncate max-w-[60%]">{item.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "#ddfdca", color: "#2a6e1a" }}>
                    {item.stage}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-[#f0ffe6] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: item.progress > 80 ? "#5CE81B" : "#0d2f04" }}
                    />
                  </div>
                  <span className="text-xs text-[#8ab080] w-6">{item.progress}%</span>
                </div>
                <p className="text-xs text-[#8ab080] mt-0.5">{item.journal}</p>
              </div>
            ))}
          </div>

          {/* Mini Graph */}
          <div className="rounded-xl p-3 bg-[#f0ffe6]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#0d2f04]">Citation Trend</span>
              <span className="text-xs font-medium text-[#5CE81B]">↑ 23% MoM</span>
            </div>
            <div className="flex items-end gap-1 h-10">
              {[3, 5, 4, 7, 6, 9, 8, 11, 10, 14, 12, 16].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / 16) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.05 }}
                  className="flex-1 rounded-sm"
                  style={{ background: i > 9 ? "#5CE81B" : "#bcfb9b" }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-[#8ab080]">Jan</span>
              <span className="text-xs text-[#8ab080]">Jun</span>
              <span className="text-xs text-[#8ab080]">Dec</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Card 1 — SPSS Result */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="animate-float absolute bottom-24 -left-4 w-56 rounded-xl p-4 border border-[rgba(13,47,4,0.1)]"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(13,47,4,0.08)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-[#bcfb9b] flex items-center justify-center">
            <span className="text-xs font-bold text-[#0d2f04]">σ</span>
          </div>
          <span className="text-xs font-semibold text-[#0d2f04]">SPSS Output</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { label: "p-value", value: "0.024", sig: true },
            { label: "R²", value: "0.847" },
            { label: "F-statistic", value: "12.4" },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-xs text-[#6a9e60]">{row.label}</span>
              <span className={`text-xs font-bold ${row.sig ? "text-[#5CE81B]" : "text-[#0d2f04]"}`}>
                {row.value}
                {row.sig && " *"}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Card 2 — Journal Match */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0 }}
        className="animate-float-delay absolute top-12 -left-2 w-52 rounded-xl p-3.5 border border-[rgba(13,47,4,0.1)]"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(13,47,4,0.08)",
        }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <CheckCircle className="w-4 h-4 text-[#5CE81B]" />
          <span className="text-xs font-semibold text-[#0d2f04]">Journal Matched</span>
        </div>
        <div className="px-3 py-2 bg-[#f0ffe6] rounded-lg mb-2">
          <p className="text-xs font-bold text-[#0d2f04]">Nature Medicine</p>
          <p className="text-xs text-[#8ab080]">IF: 87.2 · SCI Q1</p>
        </div>
        <p className="text-xs text-[#6a9e60]">95% scope match · Open Access</p>
      </motion.div>

      {/* Floating Card 3 — Workflow */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="animate-float-delay-2 absolute bottom-4 right-4 w-48 rounded-xl p-3.5 border border-[rgba(13,47,4,0.1)]"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 20px rgba(13,47,4,0.08)",
        }}
      >
        <p className="text-xs font-semibold text-[#0d2f04] mb-2.5">Research Workflow</p>
        <div className="flex flex-col gap-1.5">
          {[
            { step: "Design", done: true },
            { step: "Data Collection", done: true },
            { step: "Analysis", done: true },
            { step: "Manuscript", active: true },
            { step: "Submission", pending: true },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.done
                    ? "bg-[#0d2f04]"
                    : item.active
                    ? "bg-[#5CE81B]"
                    : "bg-[#ddfdca]"
                }`}
              >
                {item.done && <span className="text-white text-xs">✓</span>}
                {item.active && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-2 h-2 rounded-full bg-[#0d2f04]"
                  />
                )}
              </div>
              <span
                className={`text-xs ${
                  item.active ? "font-semibold text-[#0d2f04]" : item.done ? "text-[#6a9e60]" : "text-[#a0c090]"
                }`}
              >
                {item.step}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "linear-gradient(160deg, #f0ffe6 0%, #e8ffd8 40%, #f0ffe6 100%)" }}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,47,4,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(13,47,4,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background Glow */}
      <div
        className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(92,232,27,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container-stat6 relative z-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* Left — Messaging */}
          <div>
            {/* Top Label */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="section-label">
                Premium Research Support Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-balance mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                lineHeight: "1.1",
                letterSpacing: "-0.03em",
                color: "#0d2f04",
              }}
            >
              Research & Publication Support for{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0d2f04 0%, #2d7a1a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Life Science
              </span>{" "}
              Scholars
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#3a6e30] leading-relaxed mb-8 max-w-lg"
            >
              From research design to SCI-indexed publication — Stat6 provides expert statistical analysis, bioinformatics support, manuscript development, and journal submission assistance for biotechnology, medicine, and pharmaceutical researchers.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {[
                "Statistical Analysis",
                "Manuscript Support",
                "Journal Publication",
                "Bioinformatics",
                "PhD Guidance",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: "rgba(13,47,4,0.07)", color: "#2a6e1a" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5CE81B]" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link href="/services" className="btn-primary text-base px-7 py-3.5 flex items-center gap-2">
                Explore Services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="btn-secondary text-base px-7 py-3.5">
                Book Free Consultation
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-[rgba(13,47,4,0.08)]"
            >
              {[
                { value: "2,400+", label: "Researchers Supported" },
                { value: "340+", label: "Publications" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-xl font-extrabold text-[#0d2f04]"
                    style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#6a9e60] mt-0.5">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <ResearchDashboard />
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #f0ffe6)" }}
      />
    </section>
  );
}
