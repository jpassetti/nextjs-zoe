"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Button from "@/components/html/Button";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Row from "@/components/layout/Row";
import Col from "@/components/layout/Col";
const OliveBranchKeyFrames = dynamic(
 () => import("@/components/lotties/OliveBranchKeyFrames"),
 { ssr: false }
);

// Define the interface for a slide
interface Slide {
 title: string;
 subheadline?: string | null;
 content?: string | null;
 cta?: {
  label: string;
  href: string;
 } | null;
}

// Define the slides array
const slides: Slide[] = [
 {
  title: "My Story",
  subheadline: null,
  content:
   "I started my career as an entrepreneur immersed in the technical and creative aspects of startup culture and scaling challenges. Today, I leverage my track record of hands-on and strategic experience to provide organizations with mentorship and consulting, empowering sustainable and long-term success for companies navigating growth.",
  cta: null,
 },
 {
  title:
   "From Marketer and Tech Entrepreneur to Software and Community Builder",
  subheadline:
   "Discovering the Intersection between Creative Vision and Technical Execution",
  content:
   "As a marketer working in startup environments, I witnessed misalignment in strategic direction across teams. The disconnect between creative vision and technical execution hindered the success of new product launches. Driven by curiosity about this intersection, I immersed myself in the engineering community through software boot camps, developing empathy for engineers building complex software and empowering other women to learn, build, connect, and thrive in a male-dominated field.",
  cta: null,
 },
 {
  title: "Co-founding, Leading, and Selling a Women-Owned Software Agency",
  subheadline: "Navigating Growth, Culture, and Hard Decisions",
  content:
   "Later, with my combined understanding of marketing, tech teams, and community, I co-founded and scaled a software agency, Upstate Interactive. Amid managing the complexities of bootstrapping, business partnerships, and building an inclusive culture, Upstate Interactive went from four partners to more than 25 team members in 6 years. This steady growth caught the eye of a VC-backed cryptocurrency startup, Foundry.\n The decision to be acquired was no easy feat, but it marked a milestone of strategic pivots and resilient leadership through uncertainty. All team members had the opportunity and guidance to join Foundry, a company seeing a 43% increase in headcount — and more than 90% of the team chose to transition to the fast-paced, rapidly growing organization. \n Simultaneously helping the Upstate Interactive team get settled while leading a new product development department was a lot to juggle, but showed me the importance of having courage and taking responsibility.",
  cta: null,
 },
 {
  title:
   "Strengthening Leadership and Supporting the Next Generation of Innovators",
  subheadline:
   "Sharing Lessons and Inspiring Harmonious Connections within Human Systems",
  content:
   "Fast forward to today. After experiencing a few years of team restructuring and rapid scaling in a volatile market, I developed a deep interest in guiding teams through stable growth, leadership development, and organizational change. I’ve learned that investing in leadership and optimizing human systems enhances performance and mitigates risk amid transitions like growth, acquisitions, team restructuring, and changes in strategic direction.\n This inspired me to start my own independent consulting company, Transform with Irini, where I uphold the values of decentralization, trust, and data privacy shaped by my career in tech and crypto. I also work alongside Grinnell Leadership, a behavioral sciences company that specializes in organizational development. We help leaders of growth-oriented companies ease and speed positive change.",
 },
 {
  title: "Let's connect",
  subheadline: "Schedule a consultation to discuss your transformation.",
  content: null,
  cta: {
   label: "Schedule a Consultation",
   href: "/contact",
  },
 },
];

const TransSequenceV2 = () => {
 const [animationState, setAnimationState] = useState<number>(0); // ✅ Explicitly define as number

 const handlePreviousClick = () => {
  setAnimationState((prev) => (prev - 1 + slides.length) % slides.length);
 };

 const handleNextClick = () => {
  setAnimationState((prev) => (prev + 1) % slides.length);
 };

 return (
  <div>
   <Container width="full" height="full" noPadding>
    <Row alignItems="stretch" height="full">
     <Col xs={12} sm={6}>
      <div
       style={{
        backgroundColor: "#794a4d",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
       }}
      >
       <OliveBranchKeyFrames step={animationState} />
      </div>
     </Col>
     <Col xs={12} sm={6}>
      <div
       style={{
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
       }}
      >
       <Heading level={1} marginBottom={2}>
        {slides[animationState].title}
       </Heading>
       {slides[animationState].subheadline && (
        <Heading level={3} marginBottom={2}>
         {slides[animationState].subheadline}
        </Heading>
       )}
       {slides[animationState].content && (
        <Paragraph marginBottom={2}>{slides[animationState].content}</Paragraph>
       )}
       {slides[animationState].cta && (
        <Button.Group>
         <Button
         _type="button"
          variant="primary"
          label={slides[animationState].cta.label}
          href={slides[animationState].cta.href}
         />
        </Button.Group>
       )}
       <Button.Group>
        {animationState > 0 && (
         <Button.UI type="previous" clickHandler={handlePreviousClick} />
        )}
        <Paragraph>
         {animationState + 1} of {slides.length}
        </Paragraph>
        {animationState < slides.length - 1 && (
         <Button.UI type="next" clickHandler={handleNextClick} />
        )}
       </Button.Group>
      </div>
     </Col>
    </Row>
   </Container>
  </div>
 );
};

export default TransSequenceV2;
