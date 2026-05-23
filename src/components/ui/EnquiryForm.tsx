"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, ChevronRight, ChevronLeft } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/utils";

const enquirySchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").optional().or(z.literal("")),
  institution: z.string().min(2, "Institution name is required"),
  role: z.enum(["undergraduate", "postgraduate", "phd", "faculty", "researcher", "clinician", "other"], {
    message: "Please select your role",
  }),
  serviceCategory: z.string().min(1, "Please select a service category"),
  specificService: z.string().optional(),
  researchArea: z.string().optional(),
  message: z.string().min(20, "Please provide at least 20 characters of detail"),
  timeline: z.enum(["urgent", "1-2weeks", "1month", "flexible"], {
    message: "Please select a timeline",
  }),
  hearAboutUs: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

const steps = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Service Needs" },
  { id: 3, label: "Details" },
];

const roleOptions = [
  { value: "undergraduate", label: "Undergraduate Student" },
  { value: "postgraduate", label: "Postgraduate / Master's Student" },
  { value: "phd", label: "PhD Scholar / Candidate" },
  { value: "faculty", label: "Faculty / Professor" },
  { value: "researcher", label: "Independent Researcher" },
  { value: "clinician", label: "Clinician / Medical Professional" },
  { value: "other", label: "Other" },
];

const timelineOptions = [
  { value: "urgent", label: "Urgent (< 1 week)" },
  { value: "1-2weeks", label: "1–2 Weeks" },
  { value: "1month", label: "Within a Month" },
  { value: "flexible", label: "Flexible / No Rush" },
];

interface EnquiryFormProps {
  preSelectedService?: string;
  compact?: boolean;
}

export default function EnquiryForm({ preSelectedService, compact = false }: EnquiryFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      serviceCategory: preSelectedService || "",
    },
  });

  const selectedCategory = watch("serviceCategory");
  const selectedCategoryData = SERVICE_CATEGORIES.find((c) => c.slug === selectedCategory);

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate: (keyof EnquiryFormData)[][] = [
      ["firstName", "lastName", "email", "institution", "role"],
      ["serviceCategory", "timeline"],
      ["message"],
    ];
    const valid = await trigger(fieldsToValidate[currentStep - 1]);
    if (valid) setCurrentStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-5 py-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[#ddfdca] flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-[#0d2f04]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#0d2f04] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Enquiry Received!
          </h3>
          <p className="text-sm text-[#5a8a50] max-w-sm">
            Thank you for reaching out. Our research support team will review your enquiry and respond within 24 hours.
          </p>
        </div>
        <div className="px-4 py-3 bg-[#f0ffe6] rounded-xl border border-[rgba(13,47,4,0.08)]">
          <p className="text-xs text-[#4a7c3f]">
            Check your email for a confirmation message from our team.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Step Indicator */}
      {!compact && (
        <div className="flex items-center gap-0">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep > step.id
                      ? "bg-[#0d2f04] text-[#5CE81B]"
                      : currentStep === step.id
                      ? "bg-[#0d2f04] text-white"
                      : "bg-[#ddfdca] text-[#8ab080]"
                  }`}
                >
                  {currentStep > step.id ? "✓" : step.id}
                </div>
                <span className="text-xs text-[#8ab080] whitespace-nowrap">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="flex-1 h-px mx-2 mb-5 transition-all"
                  style={{ background: currentStep > step.id ? "#0d2f04" : "rgba(13,47,4,0.12)" }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">First Name *</label>
                <input {...register("firstName")} placeholder="Priya" className="input-base" />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">Last Name *</label>
                <input {...register("lastName")} placeholder="Sharma" className="input-base" />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">Email Address *</label>
              <input {...register("email")} type="email" placeholder="priya@university.edu" className="input-base" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">Phone Number</label>
              <input {...register("phone")} type="tel" placeholder="+91 98765 43210" className="input-base" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">Institution / University *</label>
              <input {...register("institution")} placeholder="AIIMS, IIT Bombay, etc." className="input-base" />
              {errors.institution && <p className="text-xs text-red-500 mt-1">{errors.institution.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">Your Role *</label>
              <select {...register("role")} className="input-base">
                <option value="">Select your role</option>
                {roleOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>}
            </div>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">Service Category *</label>
              <select {...register("serviceCategory")} className="input-base">
                <option value="">Select a service category</option>
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>{cat.title}</option>
                ))}
              </select>
              {errors.serviceCategory && <p className="text-xs text-red-500 mt-1">{errors.serviceCategory.message}</p>}
            </div>

            {selectedCategoryData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">Specific Service</label>
                <select {...register("specificService")} className="input-base">
                  <option value="">Select specific service (optional)</option>
                  {selectedCategoryData.services.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.title}</option>
                  ))}
                </select>
              </motion.div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">Research Area / Domain</label>
              <input
                {...register("researchArea")}
                placeholder="e.g., Oncology, Bioinformatics, Clinical Trials"
                className="input-base"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">Required Timeline *</label>
              <div className="grid grid-cols-2 gap-2">
                {timelineOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all hover:border-[rgba(13,47,4,0.3)]"
                    style={{ borderColor: "rgba(13,47,4,0.1)" }}
                  >
                    <input
                      type="radio"
                      value={opt.value}
                      {...register("timeline")}
                      className="accent-[#0d2f04]"
                    />
                    <span className="text-xs font-medium text-[#3a6e30]">{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors.timeline && <p className="text-xs text-red-500 mt-1">{errors.timeline.message}</p>}
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">
                Describe Your Research Needs *
              </label>
              <textarea
                {...register("message")}
                placeholder="Please describe your research project, specific requirements, current stage of work, and any challenges you are facing..."
                rows={5}
                className="input-base resize-none"
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#0d2f04] mb-1.5">How did you hear about us?</label>
              <select {...register("hearAboutUs")} className="input-base">
                <option value="">Select an option</option>
                <option value="google">Google Search</option>
                <option value="social">Social Media</option>
                <option value="referral">Colleague / Friend Referral</option>
                <option value="blog">Blog / Article</option>
                <option value="university">University / Institution</option>
                <option value="other">Other</option>
              </select>
            </div>

            {submitStatus === "error" && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <p className="text-xs text-red-600">Something went wrong. Please try again or email us directly.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 pt-2">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="btn-secondary flex items-center gap-2 text-sm px-5 py-2.5"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5"
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center gap-2 text-sm px-6 py-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Send Enquiry
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
