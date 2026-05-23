"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICE_CATEGORIES } from "@/lib/utils";

export default function ServicesSection() {
  return (
    <section className="section-padding" style={{ background: "#f0ffe6" }}>
      <div className="container-stat6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="section-label">Research Support Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-balance"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              color: "#0d2f04",
              letterSpacing: "-0.02em",
            }}
          >
            End-to-End Scientific Research
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #0d2f04 0%, #2d7a1a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Support Ecosystem
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#5a8a50] text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
          >
            From early-stage research planning to SCI-indexed publication, our domain experts guide you through every phase of your academic research journey.
          </motion.p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
          {SERVICE_CATEGORIES.map((category, index) => (
            <ServiceCard
              key={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              slug={category.slug}
              color={category.color}
              services={category.services}
              index={index}
            />
          ))}
        </div>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link href="/services" className="btn-primary flex items-center gap-2 text-sm px-6 py-3">
            Browse All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/contact" className="btn-secondary text-sm px-6 py-3">
            Book Free Consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
