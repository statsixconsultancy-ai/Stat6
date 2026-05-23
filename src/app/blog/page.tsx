import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import BlogCard from "@/components/ui/BlogCard";
import { SAMPLE_POSTS, BLOG_CATEGORIES } from "@/lib/blog";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Research Blog — Tips, Tutorials & Academic Guidance for Life Science Scholars",
  description:
    "Expert articles on research methodology, SPSS tutorials, bioinformatics guides, publication tips, and PhD research strategies. Free resources for life science researchers.",
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: {
    title: "Research Blog | Stat6",
    description: "Expert articles on SPSS, bioinformatics, publication support, and research methodology",
    url: absoluteUrl("/blog"),
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Stat6 Research Blog",
  description: "Expert articles for life science researchers, PhD scholars, and academic writers",
  url: "
statsix.com/blog",
  publisher: { "@type": "Organization", name: "Stat6", url: "
statsix.com" },
};

export default function BlogPage() {
  const posts = SAMPLE_POSTS;
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding-sm" style={{ background: "linear-gradient(160deg, #f0ffe6, #ddfdca)" }}>
          <div className="container-stat6">
            <nav className="flex items-center gap-2 text-xs text-[#8ab080] mb-6">
              <Link href="/" className="hover:text-[#0d2f04] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#0d2f04]">Blog</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center mb-4">
                  <span className="section-label">Research Knowledge Hub</span>
                </div>
                <h1
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    color: "#0d2f04",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Research Insights &amp; Guidance
                </h1>
                <p className="text-[#5a8a50] mt-3 text-base max-w-xl">
                  Expert articles on SPSS, bioinformatics, publication strategies, and academic research best practices.
                </p>
              </div>

              {/* Search */}
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8ab080]" />
                <input
                  type="search"
                  placeholder="Search articles..."
                  className="input-base pl-10 pr-4"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button className="tag-dark text-xs py-1.5 px-3.5">All</button>
              {BLOG_CATEGORIES.map((cat) => (
                <button key={cat} className="tag text-xs py-1.5 px-3.5 hover:bg-[#bcfb9b] transition-colors cursor-pointer">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="pt-10 pb-6" style={{ background: "#f0ffe6" }}>
          <div className="container-stat6">
            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-7 rounded-2xl border border-[rgba(13,47,4,0.08)] bg-white/70 backdrop-blur-sm hover:shadow-[0_8px_32px_rgba(13,47,4,0.1)] transition-all duration-300">
                {/* Placeholder Visual */}
                <div className="h-56 lg:h-72 rounded-xl bg-gradient-to-br from-[#ddfdca] to-[#bcfb9b] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: "radial-gradient(#0d2f04 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }} />
                  <span className="tag-dark text-sm px-4 py-2">Featured Article</span>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="tag">{featuredPost.category}</span>
                    <span className="text-xs text-[#8ab080]">{featuredPost.readingTime} min read</span>
                  </div>
                  <h2
                    className="text-2xl lg:text-3xl font-bold text-[#0d2f04] mb-3 group-hover:text-black transition-colors"
                    style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
                  >
                    {featuredPost.title}
                  </h2>
                  <p className="text-[#5a8a50] text-sm leading-relaxed mb-5">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#ddfdca] flex items-center justify-center text-xs font-bold text-[#0d2f04]">
                      {featuredPost.author.split(" ").map(n => n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0d2f04]">{featuredPost.author}</p>
                      <p className="text-xs text-[#8ab080]">{featuredPost.authorRole}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#0d2f04] mt-5 group-hover:gap-2.5 transition-all">
                    <span>Read article</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Article Grid */}
        <section className="pb-20" style={{ background: "#f0ffe6" }}>
          <div className="container-stat6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {remainingPosts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  slug={post.slug}
                  category={post.category}
                  date={post.date}
                  readingTime={post.readingTime}
                  author={post.author}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-padding-sm" style={{ background: "#ddfdca" }}>
          <div className="container-stat6 max-w-2xl mx-auto text-center">
            <h2
              className="mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "#0d2f04",
                letterSpacing: "-0.02em",
              }}
            >
              Stay Updated with Research Insights
            </h2>
            <p className="text-[#5a8a50] mb-6 text-sm">
              Get weekly articles on research methodology, publication tips, SPSS tutorials, and bioinformatics guides.
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="input-base flex-1"
              />
              <button type="submit" className="btn-primary px-5 py-3 flex-shrink-0 flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
