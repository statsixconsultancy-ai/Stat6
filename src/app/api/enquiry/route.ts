import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/server";
import { sendEnquiryEmails } from "@/lib/email";

const enquirySchema = z.object({
  firstName: z.string().min(2).max(100),
  lastName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  institution: z.string().min(2).max(200),
  role: z.enum(["undergraduate", "postgraduate", "phd", "faculty", "researcher", "clinician", "other"]),
  serviceCategory: z.string().min(1).max(100),
  specificService: z.string().optional(),
  researchArea: z.string().optional(),
  message: z.string().min(20).max(3000),
  timeline: z.enum(["urgent", "1-2weeks", "1month", "flexible"]),
  hearAboutUs: z.string().optional(),
});

// Simple in-memory rate limiter (per IP, per hour)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 5) return false;

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Store in Supabase
    try {
      const supabase = await createAdminClient();
      const { error: dbError } = await supabase.from("enquiries").insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        institution: data.institution,
        role: data.role,
        service_category: data.serviceCategory,
        specific_service: data.specificService || null,
        research_area: data.researchArea || null,
        message: data.message,
        timeline: data.timeline,
        hear_about_us: data.hearAboutUs || null,
        status: "new",
        source_ip: ip,
        created_at: new Date().toISOString(),
      });

      if (dbError) {
        console.error("Supabase insert error:", dbError);
        // Don't fail the request — still send emails
      }
    } catch (dbError) {
      console.error("Database error (non-fatal):", dbError);
    }

    // Send emails
    try {
      await sendEnquiryEmails(data);
    } catch (emailError) {
      console.error("Email send error:", emailError);
      // Don't fail — enquiry was saved
    }

    return NextResponse.json(
      { success: true, message: "Enquiry submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
