"use client";

import { Fragment } from "react";

import Button from "../../components/html/Button";
import Col from "../../components/layout/Col";
import Container from "../../components/layout/Container";
import CTA from "../../components/custom/CTA";
import Heading from "../../components/html/Heading";
import Paragraph from "../../components/html/Paragraph";
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
        My Story
       </Heading>
      </Col>
     </Row>
     <Row>
      <Col sm={1}></Col>
      <Col sm={10}>
       <Paragraph marginBottom={2}>
        I started my career as an entrepreneur immersed in the technical and
        creative aspects of startup culture and scaling challenges. Today, I
        leverage my track record of hands-on and strategic experience to provide
        organizations with mentorship and consulting, empowering sustainable and
        long-term success for companies navigating growth.
       </Paragraph>

       <Heading level={2} marginTop={4} marginBottom={2}>
        From Marketer and Tech Entrepreneur to Software and Community Builder: 
       </Heading>
       <Heading level={3} marginTop={2} marginBottom={2}>
        Discovering the Intersection between Creative Vision and Technical
        Execution
       </Heading>
       <Paragraph marginBottom={2}>
        As a marketer working in startup environments, I witnessed misalignment
        in strategic direction across teams. The disconnect between creative
        vision and technical execution hindered the success of new product
        launches. Driven by curiosity about this intersection, I immersed myself
        in the engineering community through software boot camps, developing
        empathy for engineers building complex software and empowering other
        women to learn, build, connect, and thrive in a male-dominated field.
       </Paragraph>

       <Heading level={2} marginTop={4} marginBottom={2}>
        Co-founding, Leading, and Selling a Women-Owned Software Agency: 
       </Heading>
       <Heading level={3} marginTop={2} marginBottom={2}>
        Navigating Growth, Culture, and Hard Decisions
       </Heading>
       <Paragraph marginBottom={2}>
        Later, with a my combined understanding of marketing, tech teams, and
        community, I co-founded and scaled a software agency, Upstate
        Interactive. Amid managing the complexities of bootstrapping, business
        partnerships, and building an inclusive culture, Upstate Interactive
        went from four partners to more than 25 team members in 6 years. This
        steady growth caught the eye of a VC-backed cryptocurrency startup,
        Foundry.
       </Paragraph>
       <Paragraph marginBottom={2}>
        The decision to be acquired was no easy feat, but it marked a milestone
        of strategic pivots and resilient leadership through uncertainty. All
        team members had the opportunity and guidance to join Foundry, a company
        seeing a 43% increase in headcount — and more than 90% of the team chose
        to transition to the fast-paced, rapidly growing organization.
       </Paragraph>
       <Paragraph marginBottom={2}>
        Simultaneously helping the Upstate Interactive team get settled while
        leading a new product development department was a lot to juggle, but
        showed me the importance of having courage and taking responsibility.
       </Paragraph>

       <Heading level={2} marginTop={4} marginBottom={2}>
        Strengthening Leadership and Supporting the Next Generation of
        Innovators: 
       </Heading>
       <Heading level={3} marginTop={2} marginBottom={2}>
        Sharing Lessons and Inspiring Harmonious Connections within Human
        Systems
       </Heading>
       <Paragraph marginBottom={2}>
        Fast forward to today. After experiencing a few years of team
        restructuring and rapid scaling in a volatile market, I developed a deep
        interest in guiding teams through stable growth, leadership development,
        and organizational change. I’ve learned that investing in leadership and
        optimizing human systems enhances performance and mitigates risk amid
        transitions like growth, acquisitions, team restructuring, and changes
        in strategic direction.{" "}
       </Paragraph>
       <Paragraph marginBottom={2}>
        This inspired me to start my own independent consulting company,
        Transform with Irini, where I uphold the values of decentralization,
        trust, and data privacy shaped by my career in tech and crypto. I also
        work alongside Grinnell Leadership, a behavioral sciences company that
        specializes in organizational development. We help leaders of
        growth-oriented companies ease and speed positive change.
       </Paragraph>
       <Button.Group>
        <Button label="Book a Consultation" type="primary" />
       </Button.Group>
      </Col>
     </Row>
    </Container>
   </Section>

   <CTA />
  </Fragment>
 );
}
