import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "...";
}

export function absoluteUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "
statsix.com";
  return `${baseUrl}${path}`;
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export const SERVICE_CATEGORIES = [
  {
    id: "research-planning",
    title: "Research Planning",
    slug: "research-planning",
    description: "Strategic research design and methodology support",
    icon: "FlaskConical",
    color: "#bcfb9b",
    services: [
      { title: "Topic Selection", slug: "topic-selection" },
      { title: "Proposal Writing", slug: "proposal-writing" },
      { title: "Literature Review", slug: "literature-review" },
      { title: "Study Design", slug: "study-design" },
      { title: "Research Methodology", slug: "research-methodology" },
    ],
  },
  {
    id: "research-writing",
    title: "Research Writing",
    slug: "research-writing",
    description: "Professional academic manuscript development",
    icon: "FileText",
    color: "#ddfdca",
    services: [
      { title: "Manuscript Development", slug: "manuscript-development" },
      { title: "Review Articles", slug: "review-articles" },
      { title: "Case Reports", slug: "case-reports" },
      { title: "Thesis Assistance", slug: "thesis-assistance" },
      { title: "Editing & Proofreading", slug: "editing-proofreading" },
    ],
  },
  {
    id: "statistical-analysis",
    title: "Statistical Analysis",
    slug: "statistical-analysis",
    description: "Advanced biostatistics and data analytics",
    icon: "BarChart3",
    color: "#f0ffe6",
    services: [
      { title: "SPSS Analysis", slug: "spss-analysis" },
      { title: "R Programming", slug: "r-programming" },
      { title: "GraphPad Prism", slug: "graphpad-prism" },
      { title: "Survival Analysis", slug: "survival-analysis" },
      { title: "Biostatistics", slug: "biostatistics" },
    ],
  },
  {
    id: "bioinformatics",
    title: "Bioinformatics",
    slug: "bioinformatics",
    description: "Computational biology and genomic data analysis",
    icon: "Dna",
    color: "#bcfb9b",
    services: [
      { title: "RNA-Seq Analysis", slug: "rna-seq-analysis" },
      { title: "Molecular Docking", slug: "molecular-docking" },
      { title: "Pathway Analysis", slug: "pathway-analysis" },
      { title: "Gene Expression Analysis", slug: "gene-expression-analysis" },
    ],
  },
  {
    id: "publication-support",
    title: "Publication Support",
    slug: "publication-support",
    description: "End-to-end journal submission and acceptance guidance",
    icon: "BookOpen",
    color: "#ddfdca",
    services: [
      { title: "Journal Selection", slug: "journal-selection" },
      { title: "SCI/Scopus Guidance", slug: "sci-scopus-guidance" },
      { title: "Reviewer Response", slug: "reviewer-response" },
      { title: "Submission Support", slug: "submission-support" },
      { title: "Manuscript Formatting", slug: "manuscript-formatting" },
    ],
  },
  {
    id: "ethics-compliance",
    title: "Ethics & Compliance",
    slug: "ethics-compliance",
    description: "Regulatory documentation and institutional compliance",
    icon: "Shield",
    color: "#f0ffe6",
    services: [
      { title: "IRB/IEC Documentation", slug: "irb-iec-documentation" },
      { title: "Consent Forms", slug: "consent-forms" },
      { title: "Clinical Trial Registration", slug: "clinical-trial-registration" },
      { title: "Grant Proposal Support", slug: "grant-proposal-support" },
    ],
  },
  {
    id: "academic-visibility",
    title: "Academic Visibility",
    slug: "academic-visibility",
    description: "Research profile optimization and citation strategy",
    icon: "TrendingUp",
    color: "#bcfb9b",
    services: [
      { title: "Poster Design", slug: "poster-design" },
      { title: "ORCID Setup", slug: "orcid-setup" },
      { title: "Google Scholar Optimization", slug: "google-scholar-optimization" },
      { title: "Citation Optimization", slug: "citation-optimization" },
    ],
  },
] as const;

export const BLOG_CATEGORIES = [
  "Research Tips",
  "Publication Support",
  "SPSS Tutorials",
  "Bioinformatics",
  "Academic Writing",
  "Journal Guidance",
  "PhD Research",
] as const;

export const STATS = [
  { value: "2,400+", label: "Research Projects Completed" },
  { value: "98%", label: "Client Satisfaction Rate" },
  { value: "340+", label: "Publications Supported" },
  { value: "12+", label: "Years of Domain Expertise" },
] as const;

export const TESTIMONIALS = [
  {
    name: "Dr. Priya Sharma",
    role: "PhD Scholar, AIIMS New Delhi",
    field: "Clinical Research",
    content:
      "Stat6 transformed my research journey. Their statistical analysis support helped me navigate complex biostatistics for my clinical trial data. My paper was accepted in a Q1 Scopus journal within 3 months.",
    rating: 5,
  },
  {
    name: "Rahul Menon",
    role: "Postgraduate Researcher, IIT Bombay",
    field: "Bioinformatics",
    content:
      "The RNA-Seq analysis support I received was exceptional. The team understood my dataset deeply and provided publication-quality figures. Highly recommend for any computational biology work.",
    rating: 5,
  },
  {
    name: "Dr. Ananya Krishnamurthy",
    role: "Faculty Researcher, Manipal University",
    field: "Pharmaceutical Sciences",
    content:
      "From manuscript writing to journal submission, Stat6 guided me every step of the way. Their reviewer response support was particularly valuable — my revision was accepted on the first resubmission.",
    rating: 5,
  },
  {
    name: "Vikram Patel",
    role: "PhD Candidate, University of Hyderabad",
    field: "Biotechnology",
    content:
      "I was struggling with my thesis methodology chapter. Stat6's research planning team helped me restructure my entire study design. The quality of support is at par with international standards.",
    rating: 5,
  },
] as const;
