import { Fragment } from "react";
import { getPage } from "@/lib/sanity/queries/getPage";
import type { PageData } from "@/lib/interfaces"; // Import PageData
import { notFound } from "next/navigation";

import ColumnsSection from "@/components/custom/ColumnsSection";
import Showcase from "@/components/custom/Showcase";
import CTA from "@/components/custom/CTA";


export async function generateMetadata({ params }: { params: { slug: string } }) {
  const pageData: PageData = await getPage(params.slug);

  if (!pageData) return {};

  const seo = pageData.seo || {};

  return {
    title: seo.seoTitle || pageData.title,
    description: seo.seoDescription,
    openGraph: {
      title: seo.ogTitle || seo.seoTitle || pageData.title,
      description: seo.ogDescription || seo.seoDescription,
      images: seo.ogImage?.asset?.url ? [{ url: seo.ogImage.asset.url }] : [],
    },
    robots: seo.noIndex ? "noindex" : "index,follow",
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await params before destructuring

  const pageData: PageData = await getPage(slug); // Use the awaited slug

  if (!pageData) {
    notFound();
  }

  const { sections, callToAction } = pageData;
  
  return (
    <Fragment>

      {sections && sections.length > 0 &&
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
        {callToAction && <CTA headline={callToAction.headline} paragraph={callToAction.paragraph} buttons={callToAction.buttons} />}

    </Fragment>
  );
}
