import { Fragment } from "react";
import { draftMode } from "next/headers";

import { getPage } from "@/lib/sanity/queries/getPage";
import type { PageData } from "@/lib/interfaces"; // Import PageData
import { notFound } from "next/navigation";

import ColumnsSection from "@/components/custom/ColumnsSection";
import Showcase from "@/components/custom/Showcase";
import CTA from "@/components/custom/CTA";
import SanityPage from "@/components/custom/SanityPage";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;

   // Treat undefined or empty slug as "home"
  const actualSlug = !slug ? "home" : slug;
 
 const pageData: PageData = await getPage(actualSlug);
 
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

export default async function Page({ params }: { params: { slug?: string } }) {
  const { isEnabled: preview } = await draftMode();
  const { slug } = params;

  const actualSlug = !slug ? "home" : slug;
  const pageData: PageData = await getPage(actualSlug, preview);

  if (!pageData) {
    notFound();
  }

  const { sections, callToAction } = pageData;
  const bannedSlugs = ["about-me", "contact"];

  return (
    <Fragment>
      {preview && <div style={{ background: "#ff0", padding: "10px" }}>Preview Mode</div>}

      {bannedSlugs.includes(slug || "") && pageData && <SanityPage page={pageData} />}
      {!bannedSlugs.includes(slug || "") &&
        sections &&
        sections.length > 0 &&
        sections.map((section, index) => {
          switch (section._type) {
            case "showcaseSection":
              return <Showcase key={index} data={section} />;
            case "columnsSection":
              return <ColumnsSection key={index} data={section} />;
            default:
              return null;
          }
        })}
      {callToAction && (
        <CTA
          headline={callToAction.headline}
          paragraph={callToAction.paragraph}
          buttons={callToAction.buttons}
        />
      )}
    </Fragment>
  );
}