export type Capability = {
  title: string;
  description: string;
  naics?: string[];
  note?: string;
};

export const homeCapabilities: Capability[] = [
  {
    title: "General Construction",
    description:
      "Multi-trade building construction supporting new work, renovation, and facility modification requirements.",
  },
  {
    title: "Renovation & Modernization",
    description:
      "Interior and exterior construction that improves functionality, condition, and continued use of existing facilities.",
  },
  {
    title: "Repair & Alteration",
    description:
      "Targeted repair, replacement, and modification of existing building systems and structures.",
  },
  {
    title: "Facility Improvements",
    description:
      "Upgrades to facility spaces, systems, and finishes on occupied and unoccupied sites.",
  },
  {
    title: "Site Preparation",
    description:
      "Clearing, grading, excavation, and earthwork that establishes site readiness for construction.",
  },
  {
    title: "Construction Management",
    description:
      "Scope, schedule, cost, quality, and subcontractor coordination managed as a single accountable effort.",
  },
  {
    title: "Specialty Trades",
    description:
      "Multi-trade execution across specialty scopes, delivered to Daxar's quality and schedule standards.",
  },
];

export const capabilityDetails: Capability[] = [
  {
    title: "General Construction",
    description:
      "Multi-trade building construction, renovation, repair, facility improvement, and construction modification requirements.",
    naics: ["236220"],
  },
  {
    title: "Renovation & Modernization",
    description:
      "Interior and exterior construction supporting facility improvement, modernization, functionality, and continued use.",
    naics: ["236220"],
  },
  {
    title: "Repair & Alteration",
    description:
      "Targeted repair, replacement, modification, and improvement of existing facilities and building systems.",
    naics: ["236220"],
  },
  {
    title: "Site Preparation & Site Improvements",
    description:
      "Clearing, grading, excavation, debris removal, demolition, site preparation, and earthwork.",
    naics: ["238910", "238990"],
  },
  {
    title: "Interior Construction & Finishes",
    description: "Drywall, flooring, painting, and finish carpentry.",
    naics: ["238310", "238320", "238330", "238350"],
  },
  {
    title: "Roofing",
    description:
      "Roofing installation and repair delivered to project-specific requirements.",
    naics: ["238160"],
  },
  {
    title: "Mechanical & Plumbing",
    description:
      "Mechanical, HVAC, and plumbing systems delivered through qualified trade partners.",
    naics: ["238220"],
  },
  {
    title: "Concrete & Structural Support",
    description: "Poured concrete foundation and structural work.",
    naics: ["238110"],
  },
];

export const constructionManagementScope: string[] = [
  "Scope review",
  "Preconstruction planning",
  "Subcontractor sourcing",
  "Trade qualification",
  "Procurement",
  "Material planning",
  "Scheduling",
  "Project sequencing",
  "Cost tracking",
  "Subcontractor management",
  "Site logistics",
  "Quality",
  "Site safety",
  "Documentation",
  "Customer communication",
  "Inspections",
  "Punch lists",
  "Closeout",
];

export const specialtyTrades: string[] = [
  "Sitework",
  "Concrete",
  "Roofing",
  "Mechanical",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Drywall",
  "Flooring",
  "Painting",
  "Carpentry",
  "Doors and hardware",
  "Landscaping",
  "Demolition",
  "Specialty construction",
];

export type DeliveryStage = {
  title: string;
  description: string;
};

export const deliveryStages: DeliveryStage[] = [
  {
    title: "Preconstruction",
    description:
      "Scope and specification review, schedule development, and trade planning before mobilization begins.",
  },
  {
    title: "Trade Execution",
    description:
      "Subcontractor sourcing, qualification, and day-to-day management across active trades.",
  },
  {
    title: "Quality Management",
    description:
      "Inspection readiness, workmanship standards, and consistent quality control through execution.",
  },
  {
    title: "Schedule Management",
    description:
      "Sequencing, milestone tracking, and proactive schedule management to maintain project momentum.",
  },
  {
    title: "Documentation & Contract Administration",
    description:
      "Submittals, RFIs, and project records maintained for contract compliance and accountability.",
  },
  {
    title: "Project Closeout",
    description:
      "Punch-list management, final inspections, warranty documentation, and turnover requirements.",
  },
];

export type ExecutionPhase = {
  number: string;
  title: string;
  items: string[];
};

export const executionPhases: ExecutionPhase[] = [
  {
    number: "01",
    title: "Plan",
    items: [
      "Scope and specification review",
      "Schedule development",
      "Trade planning",
      "Material and procurement planning",
      "Site logistics",
      "Risk identification",
    ],
  },
  {
    number: "02",
    title: "Mobilize",
    items: [
      "Qualified trade partners",
      "Materials and equipment",
      "Project documentation",
      "Site requirements",
      "Safety planning",
      "Initial project controls",
    ],
  },
  {
    number: "03",
    title: "Execute",
    items: [
      "Subcontractor management",
      "Schedule management",
      "Quality control",
      "Safety oversight",
      "Procurement",
      "Project communication",
      "Documentation",
      "Inspection readiness",
    ],
  },
  {
    number: "04",
    title: "Close Out",
    items: [
      "Punch-list management",
      "Deficiency correction",
      "Final inspections",
      "Warranty documentation",
      "Turnover requirements",
      "Contract closeout",
    ],
  },
];

export type ProjectControl = {
  title: string;
  description: string;
};

export const projectControls: ProjectControl[] = [
  {
    title: "Quality",
    description:
      "Workmanship standards, inspection readiness, and consistent quality control applied across every trade on site.",
  },
  {
    title: "Schedule",
    description:
      "Milestone tracking and proactive sequencing that keeps interdependent trades moving without delay.",
  },
  {
    title: "Safety",
    description:
      "Jobsite safety maintained across all active trades and subcontractor personnel.",
  },
  {
    title: "Subcontractors",
    description:
      "Qualification, sourcing, and day-to-day management of the specialty trades required for each requirement.",
  },
  {
    title: "Documentation",
    description:
      "Submittals, RFIs, inspection records, and project files maintained for contract compliance.",
  },
  {
    title: "Accountability",
    description:
      "Single point of ownership for scope, schedule, and quality from mobilization through closeout.",
  },
];
