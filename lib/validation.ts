import { z } from "zod";

const requiredString = (max = 200) => z.string().trim().min(1, "Required").max(max);
const optionalString = (max = 500) => z.string().trim().max(max).optional().or(z.literal(""));

export const contactFormSchema = z.object({
  inquiryType: requiredString(120),
  name: requiredString(150),
  organization: optionalString(150),
  title: optionalString(150),
  email: z.string().trim().min(1, "Required").max(200).email("Enter a valid email address"),
  phone: optionalString(40),
  projectName: optionalString(200),
  solicitationNumber: optionalString(100),
  issuingAgency: optionalString(150),
  projectLocation: optionalString(150),
  responseDeadline: optionalString(60),
  opportunityType: optionalString(80),
  message: requiredString(4000),
  // honeypot + timing anti-spam fields
  company_website: z.string().max(0).optional().or(z.literal("")),
  formRenderedAt: z.coerce.number(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const partnerRegistrationSchema = z.object({
  // Company Information
  companyName: requiredString(200),
  website: optionalString(200),
  primaryContact: requiredString(150),
  title: optionalString(150),
  email: z.string().trim().min(1, "Required").max(200).email("Enter a valid email address"),
  phone: requiredString(40),
  addressCity: requiredString(100),
  addressState: requiredString(60),
  addressZip: requiredString(20),
  yearsInBusiness: optionalString(20),

  // Capabilities
  primaryTrade: requiredString(120),
  additionalTrades: optionalString(500),
  companyDescription: optionalString(3000),
  servicesSelfPerformed: optionalString(1000),
  typicalProjectSize: optionalString(200),
  largestCompletedProject: optionalString(500),

  // Geographic Coverage
  headquartersState: requiredString(60),
  statesServed: optionalString(1000),
  nationwide: optionalString(10),
  willingToTravel: optionalString(10),
  federalMarketsServed: optionalString(1000),

  // Federal Contracting
  uei: optionalString(20),
  cage: optionalString(20),
  samRegistration: optionalString(60),
  primaryNaics: optionalString(20),
  additionalNaics: optionalString(300),
  federalExperience: requiredString(60),

  // Construction Qualifications
  contractorLicense: optionalString(10),
  licenseNumber: optionalString(80),
  licenseType: optionalString(150),
  licenseState: optionalString(60),
  bondable: optionalString(10),
  singleProjectBondingCapacity: optionalString(100),
  aggregateBondingCapacity: optionalString(100),
  insuranceCoverage: optionalString(300),
  emr: optionalString(20),
  safetyCertifications: optionalString(500),

  // Experience
  primaryProjectTypes: optionalString(500),
  federalAgenciesSupported: optionalString(500),

  // Representative Projects (up to three, optional)
  project1Name: optionalString(200),
  project1Customer: optionalString(200),
  project1Location: optionalString(200),
  project1Role: optionalString(200),
  project1Value: optionalString(100),
  project1Scope: optionalString(1000),
  project2Name: optionalString(200),
  project2Customer: optionalString(200),
  project2Location: optionalString(200),
  project2Role: optionalString(200),
  project2Value: optionalString(100),
  project2Scope: optionalString(1000),
  project3Name: optionalString(200),
  project3Customer: optionalString(200),
  project3Location: optionalString(200),
  project3Role: optionalString(200),
  project3Value: optionalString(100),
  project3Scope: optionalString(1000),

  // Additional Information
  referralSource: optionalString(120),
  comments: optionalString(3000),

  // Required acknowledgment
  certify: z.literal("true", { message: "You must certify the information is accurate." }),

  // honeypot + timing anti-spam fields
  company_website_hp: z.string().max(0).optional().or(z.literal("")),
  formRenderedAt: z.coerce.number(),
});

export type PartnerRegistrationValues = z.infer<typeof partnerRegistrationSchema>;

/** Multi-value fields (checkboxes) collected separately from FormData.getAll(). */
export const partnerMultiValueFields = [
  "businessClassifications",
  "partnershipInterest",
] as const;
