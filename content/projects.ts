export type Project = {
  slug: string;
  name: string;
  location: string;
  role: string;
  scopeLabel: string;
  scope: string[];
  responsibilities: string[];
  performance: string;
  siteSize?: string;
};

export const projects: Project[] = [
  {
    slug: "hinesville-renovation",
    name: "Hinesville Renovation",
    location: "Hinesville, Georgia",
    role: "Project Management / Construction Coordination",
    scopeLabel: "Comprehensive Multi-Trade Renovation",
    scope: [
      "Roofing",
      "Drywall",
      "Flooring",
      "Kitchen renovation",
      "Bathroom renovation",
      "HVAC replacement",
      "Painting",
      "Landscaping",
    ],
    responsibilities: [
      "Coordinated six subcontractors",
      "Negotiated trade pricing",
      "Managed scheduling",
      "Sequenced construction activities",
      "Purchased materials",
      "Reviewed and approved invoices",
      "Managed expenditures",
      "Oversaw project completion",
    ],
    performance:
      "Completed approximately one month ahead of schedule and within the established construction budget. No reported safety incidents, construction callbacks, or warranty issues occurred prior to property disposition.",
  },
  {
    slug: "midway-renovation",
    name: "Midway Renovation",
    location: "Midway, Georgia",
    role: "Project Management / Construction Coordination",
    scopeLabel: "Comprehensive Multi-Trade Renovation",
    scope: [
      "Roofing",
      "Drywall",
      "Flooring",
      "Kitchen renovation",
      "Bathroom renovation",
      "HVAC replacement",
      "Painting",
      "Landscaping",
    ],
    responsibilities: [
      "Coordinated six subcontractors",
      "Negotiated trade pricing",
      "Managed schedule",
      "Sequenced activities",
      "Procured materials",
      "Reviewed invoices",
      "Monitored cost",
      "Oversaw completion",
    ],
    performance:
      "Completed on schedule and within the established construction budget. No reported safety incidents, construction callbacks, or warranty issues occurred prior to property disposition.",
  },
  {
    slug: "greenville-site-preparation",
    name: "Greenville Site Preparation",
    location: "Greenville, South Carolina",
    role: "Project Management / Contractor Coordination",
    scopeLabel: "Multi-Acre Site Preparation",
    siteSize: "Approximately four acres",
    scope: [
      "Underbrush clearing",
      "Tree removal",
      "Grading",
      "Debris removal",
      "Site preparation",
      "Contractor coordination",
    ],
    responsibilities: [
      "Coordinated site preparation contractors",
      "Managed execution sequencing",
      "Oversaw site conditions against plan",
    ],
    performance:
      "Completed within the planned execution period and established the required site conditions for future development.",
  },
];
