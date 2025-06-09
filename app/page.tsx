import Page from "./[slug]/page";
import { getPage } from "@/lib/sanity/queries/getPage";
import { draftMode } from "next/headers";
import type { PageData } from "@/lib/interfaces"; // Import PageData


export async function generateMetadata({ params }: { params: Promise<{ slug?: string }> }) {
  const { isEnabled: preview } = await draftMode();
  const { slug } = await params;

  console.log(`Generate metadata for slug: ${slug}, preview: ${preview}`);


  // Treat undefined or empty slug as "home"
  const actualSlug = !slug ? "home" : slug;

  const pageData: PageData = await getPage(actualSlug, preview);

  if (!pageData) return {};

  const seo = pageData.seo || {};

  // Compose the title
  const title = seo.seoTitle || pageData.title;

  return {
    title,
    description: seo.seoDescription ? seo.seoDescription : pageData.excerpt,
    openGraph: {
      title: seo.ogTitle ? seo.ogTitle : title,
      description: seo.ogDescription || seo.seoDescription,
      images: seo.ogImage?.asset?.url ? [{ url: seo.ogImage.asset.url }] : [],
    },
    robots: seo.noIndex ? "noindex" : "index,follow",
  };
}


export default function HomePage() {
  return <Page params={Promise.resolve({ slug: "home" })} />;
}