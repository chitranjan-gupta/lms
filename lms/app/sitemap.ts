import { MetadataRoute } from "next";
import { APP_URL } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${APP_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${APP_URL}/sign-in`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${APP_URL}/sign-up`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${APP_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
