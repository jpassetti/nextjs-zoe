import { Fragment } from "react";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@sanity/types";
import Image from "next/image";
import { notFound } from "next/navigation";

import Col from "@/components/layout/Col";
import Container from "@/components/layout/Container";
import CTA from "@/components/custom/CTA";
import FeaturedImageContainer from "@/components/custom/FeaturedImageContainer";
import Heading from "@/components/html/Heading";
import Row from "@/components/layout/Row";
import SanityContent from "@/components/custom/SanityContent";
import Section from "@/components/layout/Section";

type PageProps = {
 page: {
  title: string;
  content: PortableTextBlock[]; // ✅ Corrected type
  featuredImage?: {
   asset: {
    url: string;
    metadata: { dimensions: { width: number; height: number } };
   };
   alt?: string;
  };
 };
};

export default function SanityPage({ page }: PageProps) {
 if (!page) {
  notFound();
 }

 return (
  <Fragment>
   <Section backgroundColor="secondary">
    <Container>
     <Row>
      <Col sm={12} textAlign="center">
       <Heading level={1} color="primary" marginTop={4} marginBottom={2}>
        {page.title}
       </Heading>
      </Col>
     </Row>

     {/* Featured Image */}
     {page.featuredImage && (
      <Row justifyContent="center">
       <Col sm={12}>
        <FeaturedImageContainer>
         <Image
          src={page.featuredImage.asset.url}
          alt={page.featuredImage.alt || ""}
          width={page.featuredImage.asset.metadata.dimensions.width}
          height={page.featuredImage.asset.metadata.dimensions.height}
         />
        </FeaturedImageContainer>
       </Col>
      </Row>
     )}

     {/* Content */}
     <Row justifyContent="center">
      <Col sm={9}>
       <SanityContent>
        <PortableText value={page.content} />
       </SanityContent>
      </Col>
     </Row>
    </Container>
   </Section>

   {/* Call-to-Action Section */}
   <CTA />
  </Fragment>
 );
}
