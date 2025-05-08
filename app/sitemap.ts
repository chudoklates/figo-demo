import { MetadataRoute } from "next";
import { getAllBlogArticleSlugs } from "./actions/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllBlogArticleSlugs();

  const blogPages = slugs.map(({ slug, publishedDate }) => ({
    url: `https://figosocial.de/blog/post/${slug}`,
    lastModified: new Date(publishedDate || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: "https://figosocial.de",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://figosocial.de/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://figosocial.de/datenschutz",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://figosocial.de/faq",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://figosocial.de/impressum",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://figosocial.de/kontakt",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogPages,
  ];
}
