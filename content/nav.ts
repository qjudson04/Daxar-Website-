export type NavLink = {
  label: string;
  href: string;
};

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Federal Construction", href: "/federal-construction" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Industry Partners", href: "/industry-partners" },
  { label: "Contracting Information", href: "/contracting-information" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  company: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
    { label: "Capabilities", href: "/capabilities" },
  ] as NavLink[],
  capabilities: [
    { label: "Federal Construction", href: "/federal-construction" },
    { label: "Industry Partners", href: "/industry-partners" },
  ] as NavLink[],
  federal: [
    { label: "Contracting Information", href: "/contracting-information" },
  ] as NavLink[],
  additionalServices: [
    { label: "Advisory Services", href: "/advisory-services" },
  ] as NavLink[],
  legal: [{ label: "Privacy Policy", href: "/privacy-policy" }] as NavLink[],
};
