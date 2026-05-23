import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { SAMPLE_POSTS, getRelatedPosts } from "@/lib/blog";
import { formatDate, absoluteUrl } from "@/lib/utils";
import BlogCard from "@/components/ui/BlogCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SAMPLE_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = SAMPLE_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: { canonical: absoluteUrl(`/blog/${slug}`) },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${slug}`),
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = SAMPLE_POSTS.find((p) => p.slug === slug);

  if (!post) return notFound();

  const relatedPosts = SAMPLE_POSTS.filter(
    (p) => p.slug !== slug && p.category === post.category
  ).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Stat6",
      logo: { "@type": "ImageObject", url: "/logo.png" },
    },
    datePublished: post.date,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${slug}`) },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
        itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(`/`) },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl(`/blog`) },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${slug}`) },
        ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding-sm" style={{ background: "linear-gradient(160deg, #f0ffe6, #ddfdca)" }}>
          <div className="container-stat6 max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-[#8ab080] mb-6">
              <Link href="/" className="hover:text-[#0d2f04] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#0d2f04] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[#0d2f04] line-clamp-1">{post.title}</span>
            </nav>

            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="tag">{post.category}</span>
              <div className="flex items-center gap-1 text-xs text-[#8ab080]">
                <Calendar className="w-3 h-3" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center gap-1 text-xs text-[#8ab080]">
                <Clock className="w-3 h-3" />
                {post.readingTime} min read
              </div>
            </div>

            {/* Title */}
            <h1
              className="mb-5 text-balance"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                color: "#0d2f04",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {post.title}
            </h1>

            <p className="text-[#3a6e30] text-lg leading-relaxed mb-6">{post.excerpt}</p>

            {/* Author */}
            <div className="flex items-center gap-3 pb-6 border-b border-[rgba(13,47,4,0.08)]">
              <div className="w-10 h-10 rounded-full bg-[#ddfdca] flex items-center justify-center text-sm font-bold text-[#0d2f04]"
                style={{ fontFamily: "var(--font-heading)" }}>
                {post.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0d2f04]">{post.author}</p>
                <p className="text-xs text-[#8ab080]">{post.authorRole}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="section-padding" style={{ background: "#f0ffe6" }}>
          <div className="container-stat6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

              {/* Main Content */}
              <article className="lg:col-span-8">
                {/* Cover Placeholder */}
                <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-[#ddfdca] to-[#bcfb9b] mb-8 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: "linear-gradient(rgba(13,47,4,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(13,47,4,0.3) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }} />
                  <p className="text-sm text-[#5a8a50] font-medium z-10">Article Cover Image</p>
                </div>

                {/* Rendered Content Placeholder */}
                <div className="prose-stat6">
                  <div className="p-6 bg-[#ddfdca] rounded-xl border border-[rgba(13,47,4,0.08)] mb-6">
                    <p className="text-sm text-[#3a6e30] font-medium">
                      📖 This is a preview of "{post.title}". The full article content will be available once MDX blog files are added to <code className="text-xs bg-[#bcfb9b] px-1.5 py-0.5 rounded">src/content/blog/{post.slug}.mdx</code>
                    </p>
                  </div>

                  {/* Placeholder article content */}
                  {[
                    "Introduction",
                    "Key Concepts",
                    "Step-by-Step Guide",
                    "Common Mistakes to Avoid",
                    "Best Practices",
                    "Conclusion",
                  ].map((section) => (
                    <div key={section} className="mb-6">
                      <h2
                        className="text-xl font-bold text-[#0d2f04] mb-3"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {section}
                      </h2>
                      <div className="h-4 bg-[#ddfdca] rounded w-full mb-2" />
                      <div className="h-4 bg-[#ddfdca] rounded w-5/6 mb-2" />
                      <div className="h-4 bg-[#ddfdca] rounded w-4/5" />
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[rgba(13,47,4,0.08)]">
                  <Tag className="w-4 h-4 text-[#8ab080]" />
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag text-xs">{tag}</span>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-[rgba(13,47,4,0.08)]">
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 text-sm font-medium text-[#3a6e30] hover:text-[#0d2f04] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5"
                  >
                    Get Research Support
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24 flex flex-col gap-5">

                  {/* CTA Card */}
                  <div className="p-5 rounded-2xl bg-[#0d2f04] text-white">
                    <h3
                      className="text-base font-bold mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Need Research Support?
                    </h3>
                    <p className="text-xs text-[rgba(240,255,230,0.7)] mb-4 leading-relaxed">
                      Get expert guidance on {post.category.toLowerCase()} from our team of domain specialists.
                    </p>
                    <Link
                      href="/contact"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                      style={{ background: "#5CE81B", color: "#0d2f04", fontFamily: "var(--font-heading)" }}
                    >
                      Book Free Consultation
                    </Link>
                  </div>

                  {/* Related Articles */}
                  {relatedPosts.length > 0 && (
                    <div className="p-5 rounded-2xl bg-white/70 border border-[rgba(13,47,4,0.08)]">
                      <h3
                        className="text-sm font-bold text-[#0d2f04] mb-4"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        Related Articles
                      </h3>
                      <div className="flex flex-col gap-4">
                        {relatedPosts.map((related) => (
                          <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-[#8ab080]">{related.readingTime} min · {related.category}</span>
                              <p className="text-sm font-medium text-[#0d2f04] group-hover:text-black transition-colors line-clamp-2 leading-snug">
                                {related.title}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Services */}
                  <div className="p-5 rounded-2xl bg-white/70 border border-[rgba(13,47,4,0.08)]">
                    <h3
                      className="text-sm font-bold text-[#0d2f04] mb-3"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Our Services
                    </h3>
                    <div className="flex flex-col gap-2">
                      {[
                        { label: "Statistical Analysis", href: "/services/statistical-analysis" },
                        { label: "Manuscript Writing", href: "/services/research-writing" },
                        { label: "Publication Support", href: "/services/publication-support" },
                        { label: "Bioinformatics", href: "/services/bioinformatics" },
                      ].map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="flex items-center gap-2 text-xs text-[#3a6e30] hover:text-[#0d2f04] transition-colors group"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5CE81B] flex-shrink-0" />
                          {s.label}
                          <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
