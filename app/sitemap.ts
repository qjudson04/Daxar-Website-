import type { MetadataRoute } from "next";
import { company } from "@/content/company";

const routes = [
  "",
  "/capabilities",
  "/federal-construction",
  "/projects",
  "/about",
  "/industry-partners",
  "/contracting-information",
  "/contact",
  "/advisory-services",
  "/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${company.siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
