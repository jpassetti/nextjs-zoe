export const dynamic = "force-dynamic";
import { Fragment } from "react";
import { draftMode } from "next/headers";

import { getPage } from "@/lib/sanity/queries/getPage";
import type { PageData, TestimonialBlockSection } from "@/lib/interfaces"; // Import PageData, TestimonialBlockSection
import { notFound } from "next/navigation";

import ColumnsSection from "@/components/custom/ColumnsSection";
import Showcase from "@/components/custom/Showcase";
import CTA from "@/components/custom/CTA";
import SanityPage from "@/components/custom/SanityPage";
import PreviewBanner from "@/components/custom/PreviewBanner";
import TestimonialBlock from "@/components/custom/TestimonialBlock";

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

export default async function Page({ params }: { params: Promise<{ slug?: string }> }) {
  const { isEnabled: preview } = await draftMode();
  const { slug } = await params;

  console.log(`Page component called with slug: ${slug}, preview: ${preview}`);

  const actualSlug = !slug ? "home" : slug;
  const pageData: PageData = await getPage(actualSlug, preview);

  if (!pageData) {
    notFound();
  }

  const { sections, callToAction } = pageData;
  const bannedSlugs = ["about-me", "contact"];
  // Ensure sections is defined before extending
  const sectionsArray = sections ?? [];

  return (
    <Fragment>
      {preview && <PreviewBanner />}

      {bannedSlugs.includes(slug || "") && pageData && <SanityPage page={pageData} />}
      {!bannedSlugs.includes(slug || "") &&
        sectionsArray &&
        sectionsArray.length > 0 &&
        sectionsArray.map((section, index) => {
          switch (section._type) {
            case "showcaseSection":
              return <Showcase key={index} data={section} />;
            case "columnsSection":
              return <ColumnsSection key={index} data={section} />;
            case "testimonialBlock":
              return <TestimonialBlock key={index} testimonial={(section as TestimonialBlockSection).testimonial} />;
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