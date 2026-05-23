"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/utils";

export default function TestimonialsSection() {
  return (
    <section className="section-padding" style={{ background: "#f0ffe6" }}>
      <div className="container-stat6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-4"
          >
            <span className="section-label">Researcher Testimonials</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "#0d2f04",
              letterSpacing: "-0.02em",
            }}
          >
            Trusted by Scholars Across India
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#5a8a50] mt-3 text-base max-w-xl mx-auto"
          >
            Real stories from researchers who published with our support.
          </motion.p>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 rounded-2xl border border-[rgba(13,47,4,0.08)] bg-white/70 backdrop-blur-sm"
              style={{ boxShadow: "0 1px 4px rgba(13,47,4,0.06)" }}
            >
              {/* Quote Icon */}
              <div
                className="absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "#f0ffe6" }}
              >
                <Quote className="w-4 h-4 text-[#8ab080]" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#5CE81B] text-[#5CE81B]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-[#3a6e30] leading-relaxed mb-5">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #0d2f04, #2d7a1a)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {testimonial.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p
                    className="text-sm font-bold text-[#0d2f04]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[#6a9e60]">{testimonial.role}</p>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: "#ddfdca", color: "#2a6e1a" }}
                  >
                    {testimonial.field}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { value: "4.9/5", label: "Average Rating" },
            { value: "2,400+", label: "Happy Researchers" },
            { value: "60+", label: "Countries Served" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 text-center">
              <span
                className="text-2xl font-extrabold text-[#0d2f04]"
                style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}
              >
                {item.value}
              </span>
              <span className="text-xs text-[#6a9e60]">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
