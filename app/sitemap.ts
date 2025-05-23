import { MetadataRoute } from "next";
import { getAllBlogArticleSlugs } from "./actions/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllBlogArticleSlugs();

  const blogPages = slugs.map(({ slug, publishedDate }) => ({
    url: `https://figo-demo.vercel.app/blog/post/${slug}`,
    lastModified: new Date(publishedDate || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: "https://figo-demo.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://figo-demo.vercel.app/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://figo-demo.vercel.app/datenschutz",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://figo-demo.vercel.app/faq",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://figo-demo.vercel.app/impressum",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: "https://figo-demo.vercel.app/kontakt",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...blogPages,
  ];
}
