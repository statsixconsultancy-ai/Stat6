import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#f0ffe6" }}
    >
      <div className="text-center px-6 max-w-lg">
        <div className="w-16 h-16 rounded-2xl bg-[#ddfdca] flex items-center justify-center mx-auto mb-6">
          <FlaskConical className="w-8 h-8 text-[#0d2f04]" />
        </div>

        <div
          className="text-7xl font-extrabold text-[rgba(13,47,4,0.08)] mb-4"
          style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.04em" }}
        >
          404
        </div>

        <h1
          className="text-2xl font-bold text-[#0d2f04] mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Page Not Found
        </h1>

        <p className="text-[#5a8a50] text-sm mb-7 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to your research.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/services" className="btn-secondary">
            Browse Services
          </Link>
        </div>
      </div>
    </main>
  );
}
