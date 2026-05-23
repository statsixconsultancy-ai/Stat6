"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FlaskConical, FileText, BarChart3, Dna, BookOpen, Shield, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  FlaskConical,
  FileText,
  BarChart3,
  Dna,
  BookOpen,
  Shield,
  TrendingUp,
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  slug: string;
  color: string;
  services: readonly { title: string; slug: string }[];
  index?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  slug,
  color,
  services,
  index = 0,
}: ServiceCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] || FlaskConical;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/services/${slug}`} className="block group">
        <div
          className={cn(
            "relative p-6 rounded-2xl border transition-all duration-300 h-full",
            "bg-white/60 backdrop-blur-sm",
            "border-[rgba(13,47,4,0.08)] hover:border-[rgba(13,47,4,0.16)]",
            "shadow-[0_1px_4px_rgba(13,47,4,0.06)] hover:shadow-[0_8px_24px_rgba(13,47,4,0.1)]",
            "hover:-translate-y-1"
          )}
        >
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
            style={{ background: color }}
          >
            <Icon className="w-5 h-5 text-[#0d2f04]" />
          </div>

          {/* Title */}
          <h3
            className="text-base font-bold text-[#0d2f04] mb-2 group-hover:text-black transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#5a8a50] leading-relaxed mb-4">
            {description}
          </p>

          {/* Sub-services */}
          <ul className="flex flex-col gap-1.5 mb-5">
            {services.slice(0, 4).map((service) => (
              <li key={service.slug} className="flex items-center gap-2 text-xs text-[#4a7c3f]">
                <span className="w-1 h-1 rounded-full bg-[#5CE81B] flex-shrink-0" />
                {service.title}
              </li>
            ))}
            {services.length > 4 && (
              <li className="text-xs text-[#8ab080]">
                +{services.length - 4} more services
              </li>
            )}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0d2f04] group-hover:gap-2.5 transition-all">
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
