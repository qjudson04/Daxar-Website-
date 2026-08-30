"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import FormSection from "@/components/form/FormSection";
import { TextField, TextAreaField, SelectField } from "@/components/form/fields";
import DocumentUpload from "@/components/form/DocumentUpload";
import FormSuccessState from "@/components/form/FormSuccessState";
import { inquiryTypeOptions, opportunityTypeOptions } from "@/content/form-options";

export default function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inquiryType, setInquiryType] = useState("");
  const [formRenderedAt] = useState(() => Date.now());

  const showOpportunityFields =
    inquiryType === "Federal Construction Opportunity" ||
    inquiryType === "Prime Contractor / Teaming Opportunity" ||
    inquiryType === "Subcontracting Opportunity";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inquiryType === "Industry Partner Inquiry") {
      router.push("/industry-partners#register");
      return;
    }

    setStatus("submitting");
    setErrors({});
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", { method: "POST", body: formData });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setStatus("error");
        setErrors(result.errors ?? {});
        setErrorMessage(result.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <FormSuccessState
        title="Thank You for Contacting Daxar."
        message="Your message has been received. Our team will review your inquiry and respond as soon as possible."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />
      <input type="hidden" name="formRenderedAt" value={formRenderedAt} readOnly />

      <FormSection title="Inquiry Details">
        <SelectField
          label="Inquiry Type"
          name="inquiryType"
          required
          wide
          error={errors.inquiryType}
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value)}
        >
          <option value="">Select an inquiry type</option>
          {inquiryTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectField>

        {inquiryType === "Industry Partner Inquiry" ? (
          <p className="sm:col-span-2 rounded border border-sea/40 bg-sea/5 p-4 text-sm text-graphite/80">
            For subcontractor, supplier, and teaming registrations, please use our{" "}
            <a href="/industry-partners#register" className="font-semibold text-federal underline">
              Industry Partner Registration form
            </a>
            .
          </p>
        ) : null}

        <TextField label="Name" name="name" required error={errors.name} />
        <TextField label="Organization" name="organization" error={errors.organization} />
        <TextField label="Title" name="title" error={errors.title} />
        <TextField label="Email" name="email" type="email" required error={errors.email} />
        <TextField label="Phone" name="phone" type="tel" error={errors.phone} />
      </FormSection>

      {showOpportunityFields ? (
        <FormSection
          title="Opportunity Details"
          description="Optional — complete if your inquiry relates to a specific opportunity."
        >
          <TextField label="Project / Opportunity Name" name="projectName" error={errors.projectName} />
          <TextField
            label="Solicitation Number"
            name="solicitationNumber"
            error={errors.solicitationNumber}
          />
          <TextField label="Issuing Agency" name="issuingAgency" error={errors.issuingAgency} />
          <TextField label="Project Location" name="projectLocation" error={errors.projectLocation} />
          <TextField
            label="Response Deadline"
            name="responseDeadline"
            type="date"
            error={errors.responseDeadline}
          />
          <SelectField label="Opportunity Type" name="opportunityType" error={errors.opportunityType}>
            <option value="">Select opportunity type</option>
            {opportunityTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectField>
        </FormSection>
      ) : null}

      <FormSection title="Message">
        <TextAreaField label="Message" name="message" required wide error={errors.message} />
        <DocumentUpload name="supportingDocuments" label="Supporting Documents" wide />
      </FormSection>

      {errorMessage ? (
        <p role="alert" className="text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded bg-ocean px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-federal disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
