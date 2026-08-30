import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company } from "@/content/company";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "Daxar Enterprises LLC | Federal Construction Contractor",
    template: "%s | Daxar Enterprises LLC",
  },
  description:
    "Daxar Enterprises provides construction and project execution solutions for federal and public-sector facilities nationwide, focused on quality, accountability, and disciplined project management.",
  keywords: [
    "federal construction contractor",
    "government construction contractor",
    "federal general contractor",
    "federal facility construction",
    "federal renovation contractor",
    "federal construction company",
    "federal subcontractor",
    "commercial and institutional construction",
  ],
  openGraph: {
    type: "website",
    siteName: "Daxar Enterprises LLC",
    title: "Daxar Enterprises LLC | Federal Construction Contractor",
    description:
      "Federal construction and project execution focused on disciplined planning, quality, accountability, and reliable delivery.",
    url: company.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Daxar Enterprises LLC | Federal Construction Contractor",
    description:
      "Federal construction and project execution focused on disciplined planning, quality, accountability, and reliable delivery.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.legalName,
    email: company.email,
    telephone: company.phonePrimary,
    url: company.siteUrl,
    areaServed: "United States",
    naics: company.naicsPrimary.code,
    identifier: [
      { "@type": "PropertyValue", name: "CAGE Code", value: company.cage },
      { "@type": "PropertyValue", name: "UEI", value: company.uei },
    ],
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-graphite">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:bg-ocean focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
