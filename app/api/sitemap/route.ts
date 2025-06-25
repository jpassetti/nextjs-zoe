import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity/client"; // Use the existing client configuration

const query = `*[_type == "page"] {
  "url": slug.current,
  _updatedAt
}`;

const domain = process.env.NEXT_PUBLIC_DOMAIN || "https://irini.io"; // Use environment variable for domain

const getPriority = (url: string): string => {
  if (url === "") return "1.0"; // Homepage
  if (url.startsWith("blog")) return "0.9"; // Blog pages
  return "0.5"; // Default priority
};

const getChangeFreq = (url: string): string => {
  if (url === "") return "daily"; // Homepage
  if (url.startsWith("blog")) return "weekly"; // Blog pages
  return "monthly"; // Default frequency
};

export async function GET() {
  try {
    const pages = await sanityClient.fetch(query);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page: { url: string; _updatedAt: string }) => `
  <url>
    <loc>${domain}/${page.url}</loc>
    <lastmod>${new Date(page._updatedAt).toISOString()}</lastmod>
    <changefreq>${getChangeFreq(page.url)}</changefreq>
    <priority>${getPriority(page.url)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error); // Log the error for debugging
    return new NextResponse(JSON.stringify({ error: "Failed to generate sitemap" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
