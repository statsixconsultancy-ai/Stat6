# Stat6 — Research & Publication Support Platform

> Premium academic research support platform for life science scholars. Built with Next.js 15, TypeScript, Tailwind CSS, Supabase, and Framer Motion.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or pnpm
- Supabase account (free tier works)

### 1. Clone & Install

```bash
# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env.local
```

Fill in all required values in `.env.local`:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key (keep secret) |
| `SMTP_HOST` | ✅ | SMTP server host (e.g., smtp.gmail.com) |
| `SMTP_PORT` | ✅ | SMTP port (587 for TLS) |
| `SMTP_USER` | ✅ | Your email address |
| `SMTP_PASSWORD` | ✅ | App password (not your main password) |
| `ADMIN_EMAIL` | ✅ | Email to receive enquiry notifications |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Your live domain (e.g., 
statsix.com) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 ID |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Meta/Facebook Pixel ID |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Optional | Microsoft Clarity ID |

### 3. Supabase Database Setup

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to **SQL Editor**
4. Copy and run the contents of `supabase/schema.sql`
5. Copy your project URL and API keys to `.env.local`

### 4. Gmail SMTP Setup (Recommended)

1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate an App Password for "Mail"
4. Use your Gmail address as `SMTP_USER` and the app password as `SMTP_PASSWORD`

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
stat6-platform/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (fonts, analytics, SEO)
│   │   ├── page.tsx                  # Homepage
│   │   ├── globals.css               # Global styles + design system
│   │   ├── sitemap.ts                # Dynamic XML sitemap
│   │   ├── robots.ts                 # robots.txt
│   │   ├── manifest.json             # PWA manifest
│   │   ├── about/                    # About page
│   │   ├── services/                 
│   │   │   ├── page.tsx              # Services index
│   │   │   └── [category]/           # Dynamic service category pages
│   │   │       └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog index with search/filter
│   │   │   └── [slug]/page.tsx       # Individual blog posts
│   │   ├── contact/page.tsx          # Contact + multi-step form
│   │   ├── faq/page.tsx              # FAQ with schema markup
│   │   ├── research-domains/         # Research domains page
│   │   ├── privacy-policy/           # Privacy policy
│   │   ├── terms-conditions/         # Terms & conditions
│   │   ├── admin/page.tsx            # Protected admin dashboard
│   │   └── api/
│   │       └── enquiry/route.ts      # Enquiry API (DB + email)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Sticky transparent navbar
│   │   │   └── Footer.tsx            # Full footer with newsletter
│   │   ├── home/
│   │   │   ├── HeroSection.tsx       # Premium SaaS hero
│   │   │   ├── ServicesSection.tsx   # Services grid
│   │   │   ├── StatsSection.tsx      # Stats + domains bar
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CTASection.tsx        # Final CTA block
│   │   └── ui/
│   │       ├── ServiceCard.tsx       # Service category card
│   │       ├── BlogCard.tsx          # Blog post card
│   │       └── EnquiryForm.tsx       # Multi-step enquiry form
│   ├── lib/
│   │   ├── utils.ts                  # Utilities + data constants
│   │   ├── blog.ts                   # Blog post helpers
│   │   ├── email.ts                  # SMTP email system
│   │   └── supabase/
│   │       ├── client.ts             # Browser Supabase client
│   │       └── server.ts             # Server Supabase client
│   └── content/
│       └── blog/                     # MDX blog files (add here)
│           └── *.mdx
├── supabase/
│   └── schema.sql                    # Complete database schema
├── public/                           # Static assets
├── tailwind.config.ts                # Tailwind + brand theme
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript config
└── .env.example                      # Environment variable template
```

---

## 🎨 Design System

### Brand Colors

| Token | Value | Usage |
|---|---|---|
| Background | `#f0ffe6` | Page background |
| Secondary | `#ddfdca` | Cards, sections |
| Tertiary | `#bcfb9b` | Highlights, tags |
| Dark | `#0d2f04` | Primary text, CTAs |
| Accent | `#5CE81B` | Sparingly — dots, indicators |
| Black | `#000000` | CTA buttons |

### Typography

- **Headings**: Urbanist (800 weight) — `var(--font-heading)`
- **Body**: Inter — `var(--font-body)`

### Component Classes

```css
.btn-primary          /* Black capsule button */
.btn-secondary        /* Outlined capsule button */
.btn-accent           /* Green accent button */
.card-base            /* Card with blur + border */
.section-label        /* Uppercase category label */
.container-stat6      /* Max-width 1440px container */
.section-padding      /* Standard section spacing */
.input-base           /* Form input styling */
.tag                  /* Green pill badge */
```

---

## 📝 Adding Blog Posts

Create MDX files in `src/content/blog/`:

```mdx
---
title: "How to Write a Winning Research Proposal"
excerpt: "A brief summary for blog cards and SEO"
category: "Research Tips"
date: "2025-12-01"
author: "Dr. Anita Verma"
authorRole: "Senior Research Consultant, Stat6"
tags: ["research proposal", "PhD", "academic writing"]
published: true
---

# Your article content here

Write in standard Markdown...
```

---

## 🌐 Deployment (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial Stat6 platform"
git remote add origin https://github.com/yourusername/stat6
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → Import Project
2. Connect your GitHub repository
3. Add all environment variables from `.env.local`
4. Deploy

### 3. Post-Deployment Checklist

- [ ] Add your domain in Vercel project settings
- [ ] Update `NEXT_PUBLIC_SITE_URL` to your live domain
- [ ] Verify Supabase database is accessible
- [ ] Test enquiry form end-to-end
- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Google Analytics is tracking
- [ ] Check Core Web Vitals in Vercel Analytics

---

## 🔧 Analytics Setup

### Google Analytics 4
1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `.env.local`: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

### Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add your property
3. Verify via HTML tag (add to `layout.tsx` metadata)
4. Submit `https://yourdomain.com/sitemap.xml`

### Microsoft Clarity
1. Create account at [clarity.microsoft.com](https://clarity.microsoft.com)
2. Get your Project ID
3. Add to `.env.local`: `NEXT_PUBLIC_CLARITY_PROJECT_ID=your-id`

### Meta Pixel
1. Go to [Meta Events Manager](https://business.facebook.com/events_manager)
2. Create a pixel
3. Add to `.env.local`: `NEXT_PUBLIC_META_PIXEL_ID=your-pixel-id`

---

## 📊 Admin Dashboard

Access the admin dashboard at `/admin`.

**Setup:**
1. Create a Supabase Auth user via your Supabase dashboard
2. Add the user's `id` to the `admin_users` table
3. Log in at `/admin/login`

**Features:**
- View all enquiries with status
- Statistics overview
- Update enquiry status
- Blog management (coming soon)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Email | Nodemailer (SMTP) |
| Forms | React Hook Form + Zod |
| Blog | MDX + gray-matter |
| Hosting | Vercel |

---

## 📧 Support

For questions about the platform setup, contact: research@statsix.com

---

*Built for Stat6 — Premium Research Support Platform for Life Science Scholars*
