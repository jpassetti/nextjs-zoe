import { Fragment } from "react";
import { getPage } from "@/lib/sanity/queries/getPage";
import type { PageData } from "@/lib/interfaces"; // Import PageData
import { notFound } from "next/navigation";

import ColumnsSection from "@/components/custom/ColumnsSection";
import SanityPage from "@/components/custom/SanityPage";
import Showcase from "@/components/custom/Showcase";
import CTA from "@/components/custom/CTA";


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Await params before destructuring

  const pageData: PageData = await getPage(slug); // Use the awaited slug

  if (!pageData) {
    notFound();
  }

  const { sections, callToAction } = pageData;
  const bannedSlugs = ["home", "services", "consultation"];
  
  return (
    <Fragment>
      {!bannedSlugs.includes(slug) && <SanityPage page={pageData} />}
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
