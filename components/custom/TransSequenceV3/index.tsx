"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { getTransformationSlides } from "@/lib/sanity";
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

interface Slide {
 title: string;
 subheadline?: string | null;
 content?: string | null;
 cta?: {
  label: string;
  href: string;
 } | null;
}

const TransSequenceV3 = () => {
 const [animationState, setAnimationState] = useState<number>(0);
 const [slides, setSlides] = useState<Slide[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  getTransformationSlides()
   .then((data) => {
    if (data.length > 0) {
     setSlides(data);
    }
   })
   .finally(() => setLoading(false));
 }, []);

 if (loading) return <p>Loading...</p>;
 if (slides.length === 0) return <p>No slides available.</p>;

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
        {slides[animationState]?.title}
       </Heading>
       {slides[animationState]?.subheadline && (
        <Heading level={3} marginBottom={2}>
         {slides[animationState].subheadline}
        </Heading>
       )}
       {slides[animationState]?.content && (
        <Paragraph marginBottom={2}>{slides[animationState].content}</Paragraph>
       )}
       {slides[animationState]?.cta && (
        <Button.Group>
         <Button
          type="primary"
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

export default TransSequenceV3;
