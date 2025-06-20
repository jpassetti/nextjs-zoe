import React from "react";
import type { Testimonial } from "@/lib/interfaces";
import Col from "@/components/layout/Col";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import Section from "@/components/layout/Section";
import BlockQuote from "@/components/html/BlockQuote";

interface TestimonialBlockProps {
  testimonial: Testimonial;
}

const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ testimonial }) => {
  return (
    <Section paddingTop="large" paddingBottom="large">
      <Container>
        <Row justifyContent="center" alignItems="center">
          <Col xs={12} sm={10} md={8}>
              <BlockQuote
                quote={testimonial.quote || ""}
                name={testimonial.name}
                linkedinUrl={testimonial.linkedinUrl}
                jobTitle={testimonial.jobTitle}
                companyName={testimonial.companyName}
                companyUrl={testimonial.companyUrl}
                photo={testimonial.photo}
              />
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default TestimonialBlock;
