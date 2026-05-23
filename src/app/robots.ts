import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://statsix.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/static/",
        ],
      },
      // Allow AI crawlers for GEO/AEO optimization
      {
        userAgent: "GPTBot",
        allow: ["/", "/services/", "/blog/", "/about", "/faq"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/services/", "/blog/", "/about", "/faq"],
        disallow: ["/admin/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/services/", "/blog/", "/about", "/faq"],
        disallow: ["/admin/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/services/", "/blog/", "/about", "/faq"],
        disallow: ["/admin/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
