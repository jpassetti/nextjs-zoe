import type { PageType } from "@/lib/types/page";
import { Fragment } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import Col from "@/components/layout/Col";
import Container from "@/components/layout/Container";
import FeaturedImageContainer from "@/components/custom/FeaturedImageContainer";
import Heading from "@/components/html/Heading";
import { PortableText }  from "@portabletext/react";
import { PortableTextComponents } from "@/components/utils/PortableTextComponents";
import Row from "@/components/layout/Row";
import SanityContent from "@/components/custom/SanityContent";
import Section from "@/components/layout/Section";

export default function SanityPage({ page }: { page: PageType | null }) {
 if (!page) {
  notFound();
 }

 return (
  <Fragment>
   <Section backgroundColor="secondary">
    <Container type="content">
     <Row>
      <Col sm={12} textAlign="center">
       <Heading level={1} color="black" marginTop={4} marginBottom={2}>
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
      <Col sm={12}>
       <SanityContent>
        <PortableText
         value={page.content || []} // Ensure value is always a valid array
         components={PortableTextComponents}
        />
       </SanityContent>
      </Col>
     </Row>
    </Container>
   </Section>


  </Fragment>
 );
}
