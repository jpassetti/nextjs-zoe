"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import dynamic from "next/dynamic";
import { getTransformationSlides } from "@/lib/sanity";
import Button from "@/components/html/Button";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Loading from "@/components/custom/Loading";
import Row from "@/components/layout/Row";
import Col from "@/components/layout/Col";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@/components/utils/PortableTextComponents";

// Lazy load Lottie animation
const OliveBranchKeyFrames = dynamic(
 () => import("@/components/lotties/OliveBranchKeyFrames"),
 { ssr: false }
);

// Slide type
interface Slide {
 title: string;
 subheadline?: string | null;
 content?: PortableTextBlock[]; // ✅ Strongly typed rich text
 cta?: {
  label: string;
  href: string;
 } | null;
}

const TransSequenceV4 = () => {
 const [slides, setSlides] = useState<Slide[]>([]);
 const [animationState, setAnimationState] = useState<number>(0);
 const [loading, setLoading] = useState(true);
 const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

 useEffect(() => {
  getTransformationSlides()
   .then((data) => {
    if (data.length > 0) setSlides(data);
   })
   .finally(() => setLoading(false));
 }, []);

 const handleIntersection = useCallback(
  (entries: IntersectionObserverEntry[]) => {
   entries.forEach((entry) => {
    if (entry.isIntersecting) {
     const index = slideRefs.current.indexOf(entry.target as HTMLDivElement);
     if (index !== -1) setAnimationState(index);
    }
   });
  },
  []
 );

 useEffect(() => {
  const observer = new IntersectionObserver(handleIntersection, {
   root: null,
   rootMargin: "0px",
   threshold: 0.6,
  });

  const currentSlides = slideRefs.current;

  currentSlides.forEach((slide) => {
   if (slide) observer.observe(slide);
  });

  return () => {
   currentSlides.forEach((slide) => {
    if (slide) observer.unobserve(slide);
   });
  };
 }, [slides, handleIntersection]);

 if (loading) return <Loading />;
 if (slides.length === 0) return <p>No slides available.</p>;

 return (
  <div
   style={{
    height: "100vh",
    overflowY: "scroll",
    scrollSnapType: "y mandatory",
   }}
  >
   <Container width="full" noPadding>
    <Row alignItems="stretch">
     <Col xs={12} sm={6}>
      <div
       style={{
        backgroundColor: "#a06367",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        top: "0px",
        left: "0px",
       }}
      >
       <OliveBranchKeyFrames step={animationState} />
      </div>
     </Col>

     <Col xs={12} sm={6}>
      {slides.map((slide, index) => (
       <div
        key={index}
        ref={(el) => {
         slideRefs.current[index] = el;
        }}
        style={{
         minHeight: "100vh",
         display: "flex",
         flexDirection: "column",
         justifyContent: "center",
         scrollSnapAlign: "start",
         padding: "20px",
        }}
       >
        <Heading level={1} marginBottom={2}>
         {slide.title}
        </Heading>
        {slide.subheadline && (
         <Heading
          level={3}
          marginBottom={2}
          color="black"
          fontWeight="normal"
          fontFamily="primary"
          fontStyle="italic"
         >
          {slide.subheadline}
         </Heading>
        )}
        {slide.content && (
         <div className="prose">
          <PortableText
           value={slide.content}
           components={PortableTextComponents}
          />
         </div>
        )}
        {slide.cta && (
         <Button.Group>
          <Button
           type="primary"
           label={slide.cta.label}
           href={slide.cta.href}
          />
         </Button.Group>
        )}
       </div>
      ))}
     </Col>
    </Row>
   </Container>
  </div>
 );
};

export default TransSequenceV4;
