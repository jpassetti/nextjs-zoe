import { Fragment } from "react";
import { getPage } from "@/lib/sanity";
import type { Section, SanityImage } from "@/lib/sanity";
import { notFound } from "next/navigation";
import { PortableTextBlock } from "@portabletext/types";

import ColumnsSection from "@/components/custom/ColumnsSection";
import SanityPage from "@/components/custom/SanityPage";
import Showcase from "@/components/custom/Showcase";

interface PageData {
  title: string;
  slug?: { current: string };
  content?: PortableTextBlock[]; // Updated to match the expected type
  sections?: Section[];
  featuredImage?: SanityImage & {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
}

export default async function Page({ params }: { params?: { slug: string } }) {
  const slug = params?.slug ?? ""; // Provide a default value for slug

  const pageData: PageData = await getPage(slug); // Use the defaulted slug

  if (!pageData) {
    notFound();
  }

  const sections = Array.isArray(pageData?.sections) ? pageData.sections : [];

  const bannedSlugs = ["home", "services"];

  return (
    <Fragment>
      {!bannedSlugs.includes(slug) && <SanityPage page={pageData} />}
      {sections.length > 0 && (
        sections.map((section, index) => {
          switch (section._type) {
            case "showcaseSection":
              return <Showcase key={index} data={section} />;
            case "columnsSection":
              return <ColumnsSection key={index} data={section} />;
            default:
              return null;
          }
        })
      )}
      

    </Fragment>
  );
}
