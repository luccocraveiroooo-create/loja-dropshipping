import { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products-mock";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://loja-dropshipping-seven.vercel.app";

  const productUrls: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${baseUrl}/produtos/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...productUrls,
    {
      url: `${baseUrl}/blog/review-fone-bluetooth-pro`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/massageador-cervical-pescoco-funciona`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
