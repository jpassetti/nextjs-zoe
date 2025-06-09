"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { PortableTextBlock } from "@portabletext/types";
import { useViewport } from "@/lib/context/ViewportContext"; // Adjust path if needed

import dynamic from "next/dynamic";
import { getTransformationSlides } from "@/lib/sanity/queries/getTransformationSlides";
import Container from "@/components/layout/Container";
import Heading from "@/components/html/Heading";
import Loading from "@/components/custom/Loading";
import Row from "@/components/layout/Row";
import Col from "@/components/layout/Col";
import SequenceSlide from "./SequenceSlide";
// Lazy load Lottie animation
const OliveBranchKeyFramesWhite = dynamic(
  () => import("@/components/lotties/OliveBranchKeyFrames"),
  { ssr: false }
);

const OliveBranchKeyFramesTan = dynamic(
  () => import("@/components/lotties/OliveBranchKeyFrames"),
  { ssr: false }
);

// Slide type
interface Slide {
  title: string;
  subheadline?: string;
  content?: PortableTextBlock[];
  cta?: {
    label: string;
    href: string;
  };
}

const TransSequenceV4 = () => {
  console.log("transsequencev4");
  const [slides, setSlides] = useState<Slide[]>([]);
  const [animationState, setAnimationState] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useViewport();
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    getTransformationSlides()
      .then((data) => {
       if (data.length > 0) setSlides(data);
       //console.log({data});
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
        height: isMobile === false ? "100vh" : "100%",
        overflowY: isMobile === false ? "scroll" : "auto",
        scrollSnapType: isMobile === false ? "y mandatory" : "none",
        backgroundColor: isMobile ? "white" : "inherit",
      }}
    >
      <Container width={isMobile === false ? "full" : null} noPadding={isMobile === false ? true : false}>
        {isMobile && <Row>
          <Col xs={12} sm={12}>
            <Heading level={1}>My Transformation</Heading>
            </Col>
        </Row>
        }
        <Row alignItems="stretch">
          {isMobile === false ? <Col xs={12} sm={6}>
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
              <OliveBranchKeyFramesWhite fill="white" step={animationState} />
            </div>
          </Col> : <div
            style={{
              backgroundColor: "white",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              top: "0px",
              left: "0px",
              zIndex: 0,
              width: "100%",
              opacity: 0.2,
            }}
          >
            <OliveBranchKeyFramesTan fill="mauve" step={animationState} />
          </div>}

          <Col xs={12} sm={6}>
            {slides.map((slide, index) => (
              <SequenceSlide slide={slide} key={index} ref={(el) => {
                  slideRefs.current[index] = el;
                }} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TransSequenceV4;
