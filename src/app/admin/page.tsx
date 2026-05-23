import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BarChart3, MessageSquare, FileText, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard — Stat6",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Fetch enquiry stats
  let stats = {
    total: 0,
    new: 0,
    inProgress: 0,
    completed: 0,
    todayCount: 0,
  };

  let recentEnquiries: Array<{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    service_category: string;
    status: string;
    timeline: string;
    created_at: string;
  }> = [];

  try {
    const { data: enquiries } = await supabase
      .from("enquiries")
      .select("id, first_name, last_name, email, service_category, status, timeline, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (enquiries) {
      recentEnquiries = enquiries;
      const today = new Date().toDateString();
      stats = {
        total: enquiries.length,
        new: enquiries.filter((e) => e.status === "new").length,
        inProgress: enquiries.filter((e) => e.status === "in_progress").length,
        completed: enquiries.filter((e) => e.status === "completed").length,
        todayCount: enquiries.filter(
          (e) => new Date(e.created_at).toDateString() === today
        ).length,
      };
    }
  } catch {
    // Supabase not configured yet — show empty state
  }

  const statusConfig: Record<string, { color: string; label: string; icon: typeof CheckCircle }> = {
    new: { color: "#5CE81B", label: "New", icon: AlertCircle },
    contacted: { color: "#0d2f04", label: "Contacted", icon: MessageSquare },
    in_progress: { color: "#2d7a1a", label: "In Progress", icon: Clock },
    completed: { color: "#8ab080", label: "Completed", icon: CheckCircle },
    closed: { color: "#c0c0c0", label: "Closed", icon: CheckCircle },
  };

  return (
    <main className="pt-16 min-h-screen" style={{ background: "#f0ffe6" }}>
      <div className="container-stat6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-2xl font-extrabold text-[#0d2f04]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Admin Dashboard
            </h1>
            <p className="text-sm text-[#6a9e60] mt-1">
              Welcome back, {user.email}
            </p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="btn-secondary text-sm px-4 py-2"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Enquiries", value: stats.total, icon: MessageSquare, color: "#ddfdca" },
            { label: "New", value: stats.new, icon: AlertCircle, color: "#bcfb9b" },
            { label: "In Progress", value: stats.inProgress, icon: Clock, color: "#ddfdca" },
            { label: "Completed", value: stats.completed, icon: CheckCircle, color: "#f0ffe6" },
            { label: "Today", value: stats.todayCount, icon: TrendingUp, color: "#bcfb9b" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl border border-[rgba(13,47,4,0.08)] bg-white/70"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: stat.color }}
              >
                <stat.icon className="w-4 h-4 text-[#0d2f04]" />
              </div>
              <div
                className="text-2xl font-extrabold text-[#0d2f04] mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-[#6a9e60]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[rgba(13,47,4,0.08)] pb-4">
          {[
            { label: "Enquiries", icon: MessageSquare, active: true },
            { label: "Blog Posts", icon: FileText, href: "/admin/blog" },
            { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
          ].map((tab) => (
            <Link
              key={tab.label}
              href={tab.href || "#"}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab.active
                  ? "bg-[#0d2f04] text-white"
                  : "text-[#5a8a50] hover:bg-[#ddfdca] hover:text-[#0d2f04]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-2xl border border-[rgba(13,47,4,0.08)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(13,47,4,0.06)] flex items-center justify-between">
            <h2
              className="text-base font-bold text-[#0d2f04]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Recent Enquiries
            </h2>
            <span className="text-xs text-[#8ab080]">
              Showing {recentEnquiries.length} most recent
            </span>
          </div>

          {recentEnquiries.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-[#c8f0b0] mx-auto mb-4" />
              <p className="text-sm font-medium text-[#8ab080]">No enquiries yet</p>
              <p className="text-xs text-[#a0c090] mt-1">
                Make sure your Supabase database is configured with the schema from{" "}
                <code className="bg-[#f0ffe6] px-1.5 py-0.5 rounded">supabase/schema.sql</code>
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(13,47,4,0.06)]">
                    {["Name", "Email", "Service", "Timeline", "Status", "Date"].map((col) => (
                      <th
                        key={col}
                        className="px-5 py-3 text-left text-xs font-semibold text-[#8ab080] uppercase tracking-wider"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentEnquiries.map((enquiry, i) => {
                    const status = statusConfig[enquiry.status] || statusConfig.new;
                    return (
                      <tr
                        key={enquiry.id}
                        className={`border-b border-[rgba(13,47,4,0.04)] hover:bg-[#f8fff4] transition-colors ${
                          i % 2 === 0 ? "" : "bg-[rgba(240,255,230,0.3)]"
                        }`}
                      >
                        <td className="px-5 py-3.5 font-medium text-[#0d2f04]">
                          {enquiry.first_name} {enquiry.last_name}
                        </td>
                        <td className="px-5 py-3.5 text-[#5a8a50]">{enquiry.email}</td>
                        <td className="px-5 py-3.5 text-[#3a6e30] capitalize">
                          {enquiry.service_category.replace(/-/g, " ")}
                        </td>
                        <td className="px-5 py-3.5 text-[#5a8a50] capitalize">
                          {enquiry.timeline.replace(/-/g, " ")}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                            style={{
                              background: `${status.color}20`,
                              color: status.color === "#5CE81B" ? "#2a6e1a" : status.color,
                            }}
                          >
                            {status.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-[#8ab080] text-xs">
                          {new Date(enquiry.created_at).toLocaleDateString("en-IN")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
