import type { Metadata, Viewport } from "next";
import { Inter, Urbanist } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f0ffe6",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://statsix.com"),
  title: {
    default: "Stat6 — Research & Publication Support for Life Science Scholars",
    template: "%s | Stat6",
  },
  description:
    "Premium academic research support platform for biotechnology, medicine, and pharmaceutical researchers. Expert statistical analysis, bioinformatics, manuscript development, and SCI journal publication support.",
  keywords: [
    "research support",
    "statistical analysis",
    "bioinformatics support",
    "publication support",
    "SPSS analysis",
    "manuscript writing",
    "PhD guidance",
    "life sciences research",
    "clinical research support",
    "journal publication",
    "academic research",
    "biostatistics",
  ],
  authors: [{ name: "Stat6 Research Team", url: "https://statsix.com" }],
  creator: "Stat6",
  publisher: "Stat6",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: ["en_US", "en_GB"],
    url: absoluteUrl("/"),
    siteName: "Stat6",
    title: "Stat6 — Research & Publication Support for Life Science Scholars",
    description:
      "From research design to SCI-indexed publication — expert statistical analysis, bioinformatics, and manuscript support.",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Stat6 — Research & Publication Support Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@stat6research",
    creator: "@stat6research",
    title: "Stat6 — Research & Publication Support",
    description: "Expert research support for life science scholars",
    images: [absoluteUrl("/og-image.png")],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.json",
  category: "education",
  classification: "Research Support Services",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${urbanist.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Microsoft Clarity */}
        {CLARITY_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${CLARITY_ID}");`,
            }}
          />
        )}
      </head>

      <body className="antialiased" style={{ background: "#f0ffe6", color: "#0d2f04" }}>
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        {children}

        {/* Footer */}
        <Footer />

        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                });
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
