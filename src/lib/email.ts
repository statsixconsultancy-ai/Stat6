import nodemailer from "nodemailer";

interface EnquiryData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  institution: string;
  role: string;
  serviceCategory: string;
  specificService?: string;
  researchArea?: string;
  message: string;
  timeline: string;
  hearAboutUs?: string;
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

const brandColor = "#0d2f04";
const accentColor = "#5CE81B";
const bgColor = "#f0ffe6";

function baseEmailTemplate(content: string, subject: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #f5f5f5; }
    .wrapper { max-width: 600px; margin: 0 auto; padding: 24px 16px; }
    .card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
    .header { background: ${brandColor}; padding: 28px 32px; }
    .logo { display: flex; align-items: center; gap: 10px; }
    .logo-icon { width: 36px; height: 36px; background: ${accentColor}; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
    .logo-text { color: white; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
    .body { padding: 32px; }
    .title { font-size: 22px; font-weight: 700; color: ${brandColor}; margin-bottom: 8px; }
    .subtitle { font-size: 14px; color: #5a8a50; margin-bottom: 24px; line-height: 1.6; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
    .info-item { background: ${bgColor}; border-radius: 10px; padding: 14px; }
    .info-label { font-size: 11px; font-weight: 600; color: #8ab080; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
    .info-value { font-size: 13px; font-weight: 600; color: ${brandColor}; }
    .message-box { background: #f8fff4; border-left: 3px solid ${accentColor}; border-radius: 0 10px 10px 0; padding: 16px; margin-bottom: 24px; }
    .message-label { font-size: 11px; font-weight: 600; color: #8ab080; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
    .message-text { font-size: 13px; color: #3a6e30; line-height: 1.7; }
    .cta-button { display: inline-block; background: ${brandColor}; color: white; text-decoration: none; padding: 12px 24px; border-radius: 50px; font-size: 13px; font-weight: 600; margin-bottom: 24px; }
    .divider { height: 1px; background: #e8f5e0; margin: 24px 0; }
    .footer { padding: 20px 32px; background: ${bgColor}; }
    .footer-text { font-size: 12px; color: #8ab080; line-height: 1.6; }
    .footer-link { color: ${brandColor}; text-decoration: none; }
    .badge { display: inline-block; background: ${bgColor}; border: 1px solid #c8f0b0; border-radius: 50px; padding: 4px 12px; font-size: 12px; font-weight: 500; color: #3a6e30; }
    @media (max-width: 480px) { .info-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="logo">
          <div class="logo-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${brandColor}" stroke-width="2.5"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
          </div>
          <span class="logo-text">Stat6</span>
        </div>
      </div>
      ${content}
      <div class="footer">
        <p class="footer-text">
          Stat6 Research Platform · <a href="
statsix.com" class="footer-link">stat6.com</a><br>
          Premium research support for life science scholars · <a href="mailto:research@stat6.com" class="footer-link">research@stat6.com</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function sendEnquiryEmails(data: EnquiryData): Promise<void> {
  const transporter = createTransporter();
  const fullName = `${data.firstName} ${data.lastName}`;

  // ──────────────────────────────────────────────
  // 1. Admin Notification Email
  // ──────────────────────────────────────────────
  const adminContent = `
    <div class="body">
      <div class="badge">New Enquiry Received</div>
      <br><br>
      <h1 class="title">New Research Enquiry</h1>
      <p class="subtitle">A new enquiry has been submitted. Review the details below and respond within 24 hours.</p>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Name</div>
          <div class="info-value">${fullName}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Email</div>
          <div class="info-value">${data.email}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Phone</div>
          <div class="info-value">${data.phone || "Not provided"}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Institution</div>
          <div class="info-value">${data.institution}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Role</div>
          <div class="info-value">${data.role}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Service Category</div>
          <div class="info-value">${data.serviceCategory}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Specific Service</div>
          <div class="info-value">${data.specificService || "Not specified"}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Timeline</div>
          <div class="info-value">${data.timeline}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Research Area</div>
          <div class="info-value">${data.researchArea || "Not specified"}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Source</div>
          <div class="info-value">${data.hearAboutUs || "Not specified"}</div>
        </div>
      </div>

      <div class="message-box">
        <div class="message-label">Project Description</div>
        <div class="message-text">${data.message.replace(/\n/g, "<br>")}</div>
      </div>

      <a href="mailto:${data.email}" class="cta-button">Reply to ${data.firstName}</a>

      <div class="divider"></div>
      <p style="font-size: 12px; color: #8ab080;">Submitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
    </div>`;

  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || "Stat6 Research"}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    subject: `[Stat6] New Enquiry: ${data.serviceCategory} — ${fullName}`,
    html: baseEmailTemplate(adminContent, "New Enquiry"),
    replyTo: data.email,
  });

  // ──────────────────────────────────────────────
  // 2. User Confirmation Email
  // ──────────────────────────────────────────────
  const userContent = `
    <div class="body">
      <h1 class="title">Thank you, ${data.firstName}!</h1>
      <p class="subtitle">We've received your research enquiry and our team is reviewing it. You can expect to hear from us within 24 hours with a detailed response and next steps.</p>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Service Requested</div>
          <div class="info-value">${data.serviceCategory}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Timeline</div>
          <div class="info-value">${data.timeline}</div>
        </div>
      </div>

      <div class="message-box">
        <div class="message-label">Your Project Summary</div>
        <div class="message-text">${data.message.replace(/\n/g, "<br>")}</div>
      </div>

      <div style="margin-bottom: 24px;">
        <p style="font-size: 14px; font-weight: 600; color: ${brandColor}; margin-bottom: 12px;">What happens next?</p>
        ${[
          "Our research experts review your enquiry",
          "A domain specialist contacts you within 24 hours",
          "Free 30-minute consultation call scheduled",
          "Custom proposal delivered within 48 hours",
        ].map((step, i) => `
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
            <div style="width: 24px; height: 24px; background: ${brandColor}; color: ${accentColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0;">${i + 1}</div>
            <p style="font-size: 13px; color: #3a6e30;">${step}</p>
          </div>`).join("")}
      </div>

      <a href="
statsix.com/services" class="cta-button">Explore Our Services</a>

      <div class="divider"></div>
      <p style="font-size: 13px; color: #5a8a50; line-height: 1.6;">
        For urgent enquiries, you can also reach us at
        <a href="mailto:research@stat6.com" style="color: ${brandColor}; font-weight: 600;">research@stat6.com</a>
        or WhatsApp <a href="https://wa.me/919999999999" style="color: ${brandColor}; font-weight: 600;">+91 99999 99999</a>
      </p>
    </div>`;

  await transporter.sendMail({
    from: `"${process.env.SMTP_FROM_NAME || "Stat6 Research"}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Your research enquiry has been received — Stat6`,
    html: baseEmailTemplate(userContent, "Enquiry Confirmation"),
  });
}
