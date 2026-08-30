"use client";

import { useState, type FormEvent } from "react";
import FormSection from "@/components/form/FormSection";
import { TextField, TextAreaField, SelectField, CheckboxGroup, RadioGroup } from "@/components/form/fields";
import DocumentUpload from "@/components/form/DocumentUpload";
import FormSuccessState from "@/components/form/FormSuccessState";
import {
  usStates,
  primaryTradeOptions,
  federalExperienceOptions,
  businessClassifications,
  partnershipInterestOptions,
  referralSourceOptions,
} from "@/content/form-options";

const yesNoUnknown = ["Yes", "No", "Unknown"] as const;

export default function PartnerRegistrationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formRenderedAt] = useState(() => Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/partner-registration", { method: "POST", body: formData });
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
        title="Thank You for Connecting With Daxar."
        message="Your company information has been added to our Industry Partner Network. Our team will review your capabilities for alignment with future construction, subcontracting, supplier, and teaming opportunities."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      <input
        type="text"
        name="company_website_hp"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />
      <input type="hidden" name="formRenderedAt" value={formRenderedAt} readOnly />

      <FormSection title="Company Information">
        <TextField label="Company Name" name="companyName" required wide error={errors.companyName} />
        <TextField label="Website" name="website" type="url" placeholder="https://" error={errors.website} />
        <TextField label="Years in Business" name="yearsInBusiness" error={errors.yearsInBusiness} />
        <TextField label="Primary Contact" name="primaryContact" required error={errors.primaryContact} />
        <TextField label="Title" name="title" error={errors.title} />
        <TextField label="Email" name="email" type="email" required error={errors.email} />
        <TextField label="Phone" name="phone" type="tel" required error={errors.phone} />
        <TextField label="City" name="addressCity" required error={errors.addressCity} />
        <SelectField label="State" name="addressState" required error={errors.addressState}>
          <option value="">Select state</option>
          {usStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </SelectField>
        <TextField label="ZIP" name="addressZip" required error={errors.addressZip} />
      </FormSection>

      <FormSection
        title="Capabilities"
        description="Tell us about your primary trade or discipline and what your company self-performs."
      >
        <SelectField label="Primary Trade / Capability" name="primaryTrade" required error={errors.primaryTrade}>
          <option value="">Select primary trade</option>
          {primaryTradeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectField>
        <TextField label="Additional Trades" name="additionalTrades" error={errors.additionalTrades} />
        <TextAreaField
          label="Company Description"
          name="companyDescription"
          wide
          error={errors.companyDescription}
        />
        <TextAreaField
          label="Services Self-Performed"
          name="servicesSelfPerformed"
          wide
          rows={3}
          error={errors.servicesSelfPerformed}
        />
        <TextField label="Typical Project Size" name="typicalProjectSize" error={errors.typicalProjectSize} />
        <TextField
          label="Largest Completed Project"
          name="largestCompletedProject"
          error={errors.largestCompletedProject}
        />
      </FormSection>

      <FormSection title="Geographic Coverage">
        <SelectField
          label="Headquarters State"
          name="headquartersState"
          required
          error={errors.headquartersState}
        >
          <option value="">Select state</option>
          {usStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </SelectField>
        <TextField
          label="States Served"
          name="statesServed"
          hint="List states, or select Nationwide below."
          error={errors.statesServed}
        />
        <RadioGroup legend="Nationwide Coverage" name="nationwide" options={yesNoUnknown} />
        <RadioGroup legend="Willing to Travel" name="willingToTravel" options={yesNoUnknown} />
        <TextAreaField
          label="Federal Installations / Markets Served"
          name="federalMarketsServed"
          wide
          rows={3}
          error={errors.federalMarketsServed}
        />
      </FormSection>

      <FormSection title="Federal Contracting">
        <TextField label="UEI" name="uei" error={errors.uei} />
        <TextField label="CAGE" name="cage" error={errors.cage} />
        <SelectField label="SAM.gov Registration" name="samRegistration" error={errors.samRegistration}>
          <option value="">Select status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Not Registered">Not Registered</option>
          <option value="In Process">In Process</option>
        </SelectField>
        <TextField label="Primary NAICS" name="primaryNaics" error={errors.primaryNaics} />
        <TextField label="Additional NAICS" name="additionalNaics" wide error={errors.additionalNaics} />
        <RadioGroup
          legend="Federal Contracting Experience"
          name="federalExperience"
          options={federalExperienceOptions}
          required
          wide
        />
      </FormSection>

      <FormSection
        title="Business Classifications"
        description="Select all that apply. Not all classifications are federal certifications."
      >
        <CheckboxGroup
          legend="Business Classifications"
          name="businessClassifications"
          options={businessClassifications}
          wide
        />
      </FormSection>

      <FormSection title="Construction Qualifications">
        <RadioGroup legend="Contractor License" name="contractorLicense" options={yesNoUnknown} />
        <TextField label="License Number" name="licenseNumber" error={errors.licenseNumber} />
        <TextField label="License Type" name="licenseType" error={errors.licenseType} />
        <SelectField label="License State" name="licenseState" error={errors.licenseState}>
          <option value="">Select state</option>
          {usStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </SelectField>
        <RadioGroup legend="Bondable" name="bondable" options={yesNoUnknown} />
        <TextField
          label="Single Project Bonding Capacity"
          name="singleProjectBondingCapacity"
          error={errors.singleProjectBondingCapacity}
        />
        <TextField
          label="Aggregate Bonding Capacity"
          name="aggregateBondingCapacity"
          error={errors.aggregateBondingCapacity}
        />
        <TextField label="EMR" name="emr" error={errors.emr} />
        <TextAreaField
          label="Insurance Coverage"
          name="insuranceCoverage"
          wide
          rows={3}
          error={errors.insuranceCoverage}
        />
        <TextAreaField
          label="Safety Certifications / Programs"
          name="safetyCertifications"
          wide
          rows={3}
          error={errors.safetyCertifications}
        />
      </FormSection>

      <FormSection title="Experience">
        <TextAreaField
          label="Primary Project Types"
          name="primaryProjectTypes"
          wide
          rows={3}
          error={errors.primaryProjectTypes}
        />
        <TextAreaField
          label="Federal Agencies Supported"
          name="federalAgenciesSupported"
          wide
          rows={3}
          error={errors.federalAgenciesSupported}
        />
      </FormSection>

      <FormSection
        title="Representative Project Experience"
        description="Optional — list up to three representative projects."
      >
        {[1, 2, 3].map((n) => (
          <div key={n} className="sm:col-span-2 grid grid-cols-1 gap-5 border border-silver p-5 sm:grid-cols-2">
            <p className="sm:col-span-2 text-xs font-semibold uppercase tracking-[0.15em] text-graphite/50">
              Project {n}
            </p>
            <TextField label="Project Name" name={`project${n}Name`} />
            <TextField label="Customer" name={`project${n}Customer`} />
            <TextField label="Location" name={`project${n}Location`} />
            <TextField label="Role" name={`project${n}Role`} />
            <TextField label="Project Value" name={`project${n}Value`} />
            <TextAreaField label="Scope" name={`project${n}Scope`} rows={3} wide />
          </div>
        ))}
      </FormSection>

      <FormSection title="Partnership Interest">
        <CheckboxGroup
          legend="Partnership Interest"
          name="partnershipInterest"
          options={partnershipInterestOptions}
          wide
        />
      </FormSection>

      <FormSection
        title="Document Upload"
        description="Capability statement, line card, contractor license, certifications, bonding letter, safety documentation, or other relevant documents."
      >
        <DocumentUpload name="documents" label="Upload Documents" wide />
      </FormSection>

      <FormSection title="Additional Information">
        <SelectField label="How Did You Hear About Daxar?" name="referralSource" error={errors.referralSource}>
          <option value="">Select an option</option>
          {referralSourceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </SelectField>
        <TextAreaField label="Comments" name="comments" wide rows={4} error={errors.comments} />
      </FormSection>

      <div className="border-t border-silver pt-8">
        <label className="flex items-start gap-3 text-sm text-graphite/80">
          <input
            type="checkbox"
            name="certify"
            value="true"
            required
            className="mt-1 h-4 w-4 shrink-0 rounded border-silver text-ocean focus:ring-sea"
          />
          <span>
            I certify that the information submitted is accurate to the best of my knowledge and
            authorize Daxar Enterprises to retain this information for evaluating potential
            subcontracting, supplier, teaming, and other business opportunities.
          </span>
        </label>
        {errors.certify ? (
          <p role="alert" className="mt-2 text-xs font-medium text-red-700">
            {errors.certify}
          </p>
        ) : null}
        <p className="mt-4 text-xs leading-relaxed text-graphite/55">
          Submission does not create a contractual relationship, guarantee future opportunities, or
          constitute a commitment to solicit or award work.
        </p>
      </div>

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
        {status === "submitting" ? "Submitting..." : "Submit Company Profile"}
      </button>
    </form>
  );
}
