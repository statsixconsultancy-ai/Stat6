"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  readingTime: number;
  coverImage?: string;
  author?: string;
  index?: number;
}

export default function BlogCard({
  title,
  excerpt,
  slug,
  category,
  date,
  readingTime,
  coverImage,
  author,
  index = 0,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/blog/${slug}`} className="block group h-full">
        <div className="h-full rounded-2xl border border-[rgba(13,47,4,0.08)] bg-white/70 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[rgba(13,47,4,0.16)] hover:shadow-[0_8px_24px_rgba(13,47,4,0.08)] hover:-translate-y-1">

          {/* Cover Image */}
          <div className="relative h-48 bg-[#ddfdca] overflow-hidden">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#ddfdca] to-[#bcfb9b]">
                <div className="grid grid-cols-6 gap-1.5 opacity-20">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-sm bg-[#0d2f04]"
                      style={{ opacity: Math.random() * 0.8 + 0.2 }}
                    />
                  ))}
                </div>
              </div>
            )}
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#0d2f04] backdrop-blur-sm">
                {category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1 text-xs text-[#8ab080]">
                <Calendar className="w-3 h-3" />
                {formatDate(date)}
              </div>
              <span className="text-[rgba(13,47,4,0.2)]">·</span>
              <div className="flex items-center gap-1 text-xs text-[#8ab080]">
                <Clock className="w-3 h-3" />
                {readingTime} min read
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-base font-bold text-[#0d2f04] mb-2 line-clamp-2 group-hover:text-black transition-colors leading-snug"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-[#5a8a50] leading-relaxed line-clamp-2 mb-4">
              {excerpt}
            </p>

            {/* Read More */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0d2f04] group-hover:gap-2.5 transition-all">
              <span>Read article</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
