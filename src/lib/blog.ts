import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getReadingTime, BLOG_CATEGORIES } from "./utils";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readingTime: number;
  coverImage?: string;
  author: string;
  authorRole?: string;
  tags: string[];
  published: boolean;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }
}

export function getAllPosts(): BlogPost[] {
  ensureBlogDir();

  try {
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

    return files
      .map((file) => {
        const slug = file.replace(".mdx", "");
        const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
        const { data, content } = matter(raw);

        return {
          slug,
          title: data.title || "",
          excerpt: data.excerpt || "",
          content,
          category: data.category || "Research Tips",
          date: data.date || new Date().toISOString(),
          readingTime: getReadingTime(content),
          coverImage: data.coverImage,
          author: data.author || "Stat6 Research Team",
          authorRole: data.authorRole,
          tags: data.tags || [],
          published: data.published !== false,
        } as BlogPost;
      })
      .filter((post) => post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return SAMPLE_POSTS;
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  ensureBlogDir();
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  try {
    if (!fs.existsSync(filePath)) {
      return SAMPLE_POSTS.find((p) => p.slug === slug) || null;
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      content,
      category: data.category || "Research Tips",
      date: data.date || new Date().toISOString(),
      readingTime: getReadingTime(content),
      coverImage: data.coverImage,
      author: data.author || "Stat6 Research Team",
      authorRole: data.authorRole,
      tags: data.tags || [],
      published: data.published !== false,
    };
  } catch {
    return null;
  }
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

// Sample posts (used as fallback when no MDX files exist)
export const SAMPLE_POSTS: BlogPost[] = [
  {
    slug: "how-to-write-a-research-proposal",
    title: "How to Write a Winning Research Proposal: A Step-by-Step Guide for Life Science Scholars",
    excerpt:
      "A well-structured research proposal is the foundation of every successful academic research project. Learn the key components, common mistakes to avoid, and expert strategies to get funding approval.",
    content: "",
    category: "Research Tips",
    date: "2025-11-15",
    readingTime: 8,
    author: "Dr. Anita Verma",
    authorRole: "Senior Research Consultant, Stat6",
    tags: ["research proposal", "PhD", "academic writing"],
    published: true,
  },
  {
    slug: "spss-for-clinical-research-beginners-guide",
    title: "SPSS for Clinical Research: A Complete Beginner's Guide to Biostatistics",
    excerpt:
      "Master SPSS statistical analysis for clinical research. This comprehensive tutorial covers data entry, descriptive statistics, t-tests, ANOVA, correlation, and regression with practical examples.",
    content: "",
    category: "SPSS Tutorials",
    date: "2025-11-08",
    readingTime: 12,
    author: "Dr. Rajesh Kumar",
    authorRole: "Biostatistics Expert, Stat6",
    tags: ["SPSS", "biostatistics", "clinical research", "tutorial"],
    published: true,
  },
  {
    slug: "rna-seq-analysis-complete-workflow",
    title: "RNA-Seq Analysis: Complete Workflow from Raw Data to Publication-Ready Results",
    excerpt:
      "A comprehensive walkthrough of the RNA-Seq analysis pipeline including quality control, alignment, differential expression analysis, and visualization for transcriptomic research.",
    content: "",
    category: "Bioinformatics",
    date: "2025-10-22",
    readingTime: 15,
    author: "Dr. Meera Nair",
    authorRole: "Bioinformatics Specialist, Stat6",
    tags: ["RNA-Seq", "bioinformatics", "transcriptomics", "DESeq2"],
    published: true,
  },
  {
    slug: "how-to-choose-right-journal-for-paper",
    title: "How to Choose the Right Journal for Your Research Paper: A Strategic Guide",
    excerpt:
      "Journal selection is one of the most critical decisions in academic publishing. Learn how to match your manuscript to the right SCI/Scopus journal for maximum acceptance chances.",
    content: "",
    category: "Journal Guidance",
    date: "2025-10-10",
    readingTime: 9,
    author: "Dr. Sanjay Mehta",
    authorRole: "Publication Support Lead, Stat6",
    tags: ["journal selection", "SCI", "Scopus", "publication"],
    published: true,
  },
  {
    slug: "literature-review-systematic-approach",
    title: "How to Write a Systematic Literature Review: Methodology, Tools, and Best Practices",
    excerpt:
      "A systematic literature review requires a rigorous, reproducible methodology. Discover PRISMA guidelines, database search strategies, critical appraisal tools, and synthesis techniques.",
    content: "",
    category: "Academic Writing",
    date: "2025-09-28",
    readingTime: 11,
    author: "Dr. Priya Rao",
    authorRole: "Academic Writing Expert, Stat6",
    tags: ["literature review", "PRISMA", "systematic review", "academic writing"],
    published: true,
  },
  {
    slug: "phd-research-timeline-guide",
    title: "PhD Research Timeline: A Practical Planning Guide from Registration to Submission",
    excerpt:
      "Plan your PhD research journey effectively. This guide covers milestone planning, literature review strategies, data collection timelines, and writing schedules for a successful thesis submission.",
    content: "",
    category: "PhD Research",
    date: "2025-09-15",
    readingTime: 10,
    author: "Stat6 Research Team",
    authorRole: "Academic Research Support",
    tags: ["PhD", "research planning", "thesis", "timeline"],
    published: true,
  },
];

export { BLOG_CATEGORIES };
