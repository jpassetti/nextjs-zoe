"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { showcaseMoments } from "./moments";
import styles from "./ShowcaseExperimentAdvanced.module.scss";

const nextIndex = (index: number) => (index + 1) % showcaseMoments.length;
const previousIndex = (index: number) => (index - 1 + showcaseMoments.length) % showcaseMoments.length;

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 50 : -50,
    filter: "blur(6px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -40 : 40,
    filter: "blur(5px)",
  }),
};

export default function ShowcaseExperimentAdvanced() {
  const [[activeIndex, direction], setSlide] = useState<[number, number]>([0, 1]);
  const prefersReducedMotion = useReducedMotion();

  const paginate = (delta: 1 | -1) => {
    setSlide((current) => [
      delta === 1 ? nextIndex(current[0]) : previousIndex(current[0]),
      delta,
    ]);
  };

  const goTo = (index: number) => {
    const normalized = (index + showcaseMoments.length) % showcaseMoments.length;
    const computedDirection = normalized > activeIndex ? 1 : -1;
    setSlide([normalized, computedDirection]);
  };

  useEffect(() => {
    setSlide([Math.floor(Math.random() * showcaseMoments.length), 1]);
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      paginate(1);
    }, 8500);

    return () => window.clearInterval(intervalId);
  }, []);

  const activeItem = useMemo(() => showcaseMoments[activeIndex], [activeIndex]);
  const visualStyle = {
    "--accent-1": activeItem.visual.accent1,
    "--accent-2": activeItem.visual.accent2,
  } as CSSProperties;

  return (
    <Section backgroundColor="black" paddingTop="none" paddingBottom="none">
      <div className={styles.immersive}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={`${activeItem.id}-backdrop`}
            className={styles.backgroundLayer}
            style={visualStyle}
            custom={direction}
            initial={prefersReducedMotion ? false : "enter"}
            animate="center"
            exit={prefersReducedMotion ? undefined : "exit"}
            variants={slideVariants}
            transition={{ duration: 0.55, ease: "easeOut" }}
            aria-hidden="true"
          />
        </AnimatePresence>

        <div className={styles.backdropVeil} aria-hidden="true" />

        <Container align="full">
          <Container align="wide">
            <div className={styles.viewport}>
              <header className={styles.header}>
                <div className={styles.title}>
                  <Heading level={1} color="white" marginTop={0} marginBottom={0}>
                    Immersive storytelling for leaders navigating high-stakes change.
                  </Heading>
                </div>
              </header>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.article
                  key={activeItem.id}
                  className={styles.story}
                  custom={direction}
                  initial={prefersReducedMotion ? false : "enter"}
                  animate="center"
                  exit={prefersReducedMotion ? undefined : "exit"}
                  variants={slideVariants}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <div className={styles.metaLine}>
                    <Paragraph color="white" marginTop={0} marginBottom={0}>
                      Moment {String(activeIndex + 1).padStart(2, "0")} of {String(showcaseMoments.length).padStart(2, "0")}
                    </Paragraph>
                  </div>
                  <div className={styles.momentTitle}>
                    <Heading level={2} color="white" marginTop={0} marginBottom={0}>
                      {activeItem.title}
                    </Heading>
                  </div>

                  <div className={styles.narrativeFlow}>
                    <section>
                      <div className={styles.label}>
                        <Paragraph color="white" marginTop={0} marginBottom={0}>
                          What You’re Facing
                        </Paragraph>
                      </div>
                      <div className={styles.copy}>
                        <Paragraph color="white" marginTop={0} marginBottom={0}>
                          {activeItem.hook}
                        </Paragraph>
                      </div>
                    </section>
                    <section>
                      <div className={styles.label}>
                        <Paragraph color="white" marginTop={0} marginBottom={0}>
                          How Irini Partners With You
                        </Paragraph>
                      </div>
                      <div className={styles.copy}>
                        <Paragraph color="white" marginTop={0} marginBottom={0}>
                          {activeItem.pitch}
                        </Paragraph>
                      </div>
                    </section>
                    <section>
                      <div className={styles.label}>
                        <Paragraph color="white" marginTop={0} marginBottom={0}>
                          What Changes
                        </Paragraph>
                      </div>
                      <div className={styles.copy}>
                        <Paragraph color="white" marginTop={0} marginBottom={0}>
                          {activeItem.happyEnding}
                        </Paragraph>
                      </div>
                    </section>
                  </div>

                  <div className={styles.ctaRow}>
                    <Button
                      _type="button"
                      label={activeItem.primaryCTA.label}
                      linkType="external"
                      externalUrl={activeItem.primaryCTA.href}
                      variant="accent"
                      size="large"
                    />
                    {activeItem.secondaryCTA && (
                      <Button
                        _type="button"
                        label={activeItem.secondaryCTA.label}
                        linkType="external"
                        externalUrl={activeItem.secondaryCTA.href}
                        variant="inverted-white"
                        size="large"
                      />
                    )}
                  </div>
                </motion.article>
              </AnimatePresence>

              <div className={styles.bottomBar}>
                <div className={styles.controls}>
                  <button
                    type="button"
                    className={styles.arrow}
                    aria-label="Previous moment"
                    onClick={() => paginate(-1)}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className={styles.arrow}
                    aria-label="Next moment"
                    onClick={() => paginate(1)}
                  >
                    Next
                  </button>
                </div>

                <nav className={styles.timeline} aria-label="Select a showcase moment">
                  {showcaseMoments.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`${styles.dot} ${isActive ? styles.dotActive : ""}`}
                        onClick={() => goTo(index)}
                        aria-label={`Show moment ${index + 1}: ${item.title}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </Container>
        </Container>
      </div>
    </Section>
  );
}
