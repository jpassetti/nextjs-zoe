"use client";

import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import type { PortableTextBlock } from "@portabletext/types";
import { useViewport } from "@/lib/context/ViewportContext"; // Adjust path if needed
import { getTransformationSlides } from "@/lib/sanity/queries/getTransformationSlides";
import dynamic from "next/dynamic";


import styles from './transsequence.module.scss';
import Col from '@/components/layout/Col';
import Container from '@/components/layout/Container';
import Heading from '@/components/html/Heading';
import Loading from "@/components/custom/Loading";
import OliveBranch from '@/components/brand/OliveBranch';
import Paragraph from '@/components/html/Paragraph';
import Row from '@/components/layout/Row';

import SequenceSlide from "./SequenceSlide";
import Button from '@/components/html/Button';
import SlideNumbers from './SlideNumbers';

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

const TransSequenceV5 = () => {
     const [slides, setSlides] = useState<Slide[]>([]);
      const [animationState, setAnimationState] = useState<number>(0);
      const [loading, setLoading] = useState(true);
      const { isMobile } = useViewport();
      const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

      useEffect(() => {
          getTransformationSlides()
            .then((data) => {
                // reverse slide order
                data.reverse();
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
              threshold: 0.5,
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

    return <Fragment>
        <section className={styles.sequence__showcase}>
            <Container height="full" alignItems="center" justifyContent='center'>
                <Row justifyContent='center' flexDirection='column' alignItems='center' textAlign='center'>
                    <div style={{width: '8rem', display: 'block', marginBottom: '1rem'}}>
                        <OliveBranch fill="primary" />
                    </div>
                    <Heading level={1} textAlign="center" marginBottom={2} color="primary">Transformation</Heading>
                    <Paragraph textAlign='center' marginBottom={2}>
                        From marketer to tech entrepreneur to transformational leader. Discover how each chapter shaped my path and purpose.
                    </Paragraph>
                    <Paragraph textAlign='center' fontWeight="bold" marginBottom={4}>Scroll to begin my journey</Paragraph>
                    <Button.UI
                    clickHandler={() =>{
                        // slide down to the transformation sequence section
                        const section = document.getElementById("transformation-sequence");
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                    iconProps={{
                        name: "double-chevron-down",
                        color: "orange",
                    }}
                    />
                </Row>
            </Container>
        </section>
        <div
        id="transformation-sequence"
      style={{
        height: isMobile === false ? "100vh" : "100%",
        overflowY: isMobile === false ? "scroll" : "auto",
        scrollSnapType: isMobile === false ? "y mandatory" : "none",
        backgroundColor: isMobile ? "white" : "white",
      }}
    >
      <Container width={isMobile === false ? "full" : null} noPadding={isMobile === false ? true : false}>
        
        <Row alignItems="stretch">
          {isMobile ? <div
            style={{
              backgroundColor: "white",
              minHeight: "100vh",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              position: "fixed",
              top: "0px",
              left: "0px",
              zIndex: 0,
              width: "100%",

            }}
          >
            <OliveBranchKeyFramesTan fill="mauve" step={animationState} isMobile={isMobile} />
          </div> : <Col xs={12} sm={6}><div
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
            </div></Col>}

          <Col xs={12} sm={5}>
            {slides.map((slide, index) => (
              <SequenceSlide totalSlides={slides?.length} activeSlide={animationState} isMobile={isMobile} id={`slide-${index}`} slide={slide} key={index} ref={(el) => {
                  slideRefs.current[index] = el;
                }} />
            ))}
          </Col>
          {!isMobile && <Col sm={1} paddingTop={0}><SlideNumbers totalSlides={slides?.length} activeSlide={animationState} /></Col>}
        </Row>
      </Container>
    </div>
    {/* <CTA /> */}
    </Fragment>
}
export default TransSequenceV5;