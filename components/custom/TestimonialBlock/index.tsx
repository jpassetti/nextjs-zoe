import React from "react";
import Image from "next/image";
import type { Testimonial } from "@/lib/interfaces";
import Col from "@/components/layout/Col";
import Container from "@/components/layout/Container";
import Row from "@/components/layout/Row";
import Section from "@/components/layout/Section";
import Paragraph from "@/components/html/Paragraph";

import styles from "./testimonialblock.module.scss"; // Assuming you have a CSS module for styling


interface TestimonialBlockProps {
  testimonial: Testimonial;
}

const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ testimonial }) => {
  return (
    <Section paddingTop="large" paddingBottom="large">
        <Container>
            <Row justifyContent="center" alignItems="center">
                <Col xs={12} sm={10} md={8}>
      <div className={styles.testimonial__content}>
        <blockquote className="quote">
          <Paragraph textAlign="center"  marginBottom={2} fontStyle="italic">&quot;{testimonial.quote}&quot;</Paragraph>
          <footer>
            <cite>{testimonial.name}</cite>
            {testimonial.jobTitle && <span>, {testimonial.jobTitle}</span>}
            {testimonial.companyName && (
              <span>
                , <a href={testimonial.companyURL || "#"} target="_blank" rel="noopener noreferrer">
                  {testimonial.companyName}
                </a>
              </span>
            )}
          </footer>
        </blockquote>
        {testimonial.linkedinURL && (
          <a
            href={testimonial.linkedinURL}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            LinkedIn
          </a>
        )}
      </div>
      {testimonial.photo?.asset?.url && (
        <div className="testimonial-photo">
          <Image
            src={testimonial.photo.asset.url}
            alt={testimonial.name}
            width={100}
            height={100}
            className="photo"
          />
        </div>
      )}
      </Col>
      </Row>
      </Container>
    </Section>
  );
};

export default TestimonialBlock;
