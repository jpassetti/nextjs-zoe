"use client";

import { Fragment } from "react";

import Col from "../../components/layout/Col";
import Container from "../../components/layout/Container";
import CTA from "../../components/custom/CTA";
import Heading from "../../components/html/Heading";
import Row from "../../components/layout/Row";
import Section from "../../components/layout/Section";

export default function About() {
 return (
  <Fragment>
   <Section backgroundColor="secondary">
    <Container>
     <Row>
      <Col sm={12} textAlign="center">
       <Heading level={1} color="primary" marginTop={4} marginBottom={2}>
        Contact
       </Heading>
      </Col>
     </Row>
     <Row>
      <Col sm={1}></Col>
      <Col sm={10}></Col>
     </Row>
    </Container>
   </Section>

   <CTA />
  </Fragment>
 );
}
