import { Fragment } from "react";
import { sanityClient } from "@/sanity/client";
import { Section } from "@/lib/sanity";
import Showcase from "@/components/custom/Showcase";
import ColumnsSection from "../components/custom/ColumnsSection";

export default async function Home() {
  // Fetch the "home" page data from Sanity
  const homePageData = await sanityClient.fetch<{
    sections: Section[];
  }>(`
    *[_type == "page" && slug.current == "home"][0]{
      sections[] {
        _type,
        ...
      }
    }
  `);

  const { sections = [] } = homePageData || {};

  return (
    <Fragment>
      {sections.map((section, index) => {
        switch (section._type) {
          case "showcaseSection":
            return <Showcase key={index} data={section} />;
          case "columnsSection":
            return <ColumnsSection key={index} data={section} />;
          default:
            return null;
        }
      })}
    </Fragment>
  );
}
