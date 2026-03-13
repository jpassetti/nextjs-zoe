"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { showcaseMoments } from "./moments";
import styles from "./ShowcaseExperiment.module.scss";

const nextIndex = (index: number) => (index + 1) % showcaseMoments.length;
const previousIndex = (index: number) => (index - 1 + showcaseMoments.length) % showcaseMoments.length;

const panelVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -30 : 30,
  }),
};

export default function ShowcaseExperiment() {
  const [[activeIndex, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [isRandomized, setIsRandomized] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const goTo = (next: number) => {
    const normalized = (next + showcaseMoments.length) % showcaseMoments.length;
    const computedDirection = normalized > activeIndex ? 1 : -1;
    setSlide([normalized, computedDirection]);
  };

  const paginate = (delta: 1 | -1) => {
    setSlide((current) => [
      delta === 1 ? nextIndex(current[0]) : previousIndex(current[0]),
      delta,
    ]);
  };

  useEffect(() => {
    if (isRandomized || showcaseMoments.length === 0) {
      return;
    }

    setSlide([Math.floor(Math.random() * showcaseMoments.length), 1]);
    setIsRandomized(true);
  }, [isRandomized]);

  const activeItem = useMemo(() => showcaseMoments[activeIndex], [activeIndex]);
  const visualStyle = {
    "--accent-1": activeItem.visual.accent1,
    "--accent-2": activeItem.visual.accent2,
  } as CSSProperties;

  return (
    <Section backgroundColor="white" paddingTop="none" paddingBottom="none">
      <div className={styles.showcaseExperiment}>
        <Container align="wide">
          <div className={styles.inner}>
            <header className={styles.header}>
              <Paragraph className={styles.kicker} marginBottom={0}>
                Do These Moments Feel Familiar?
              </Paragraph>
              <Heading level={1} className={styles.title} marginTop={0} marginBottom={0}>
                You know something needs to change. You are not looking for generic leadership advice.
              </Heading>
              <Paragraph className={styles.subtitle} marginTop={0} marginBottom={0}>
                These are the inflection points where growing organizations get stuck. Explore the
                moment that sounds most like your reality, see how Irini partners with leaders like
                you, and what meaningful progress can look like.
              </Paragraph>
            </header>

            <div className={styles.storyLayout}>
              <nav className={styles.storyNav} aria-label="Select a showcase moment">
                {showcaseMoments.map((item, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      className={`${styles.momentButton} ${isActive ? styles.momentButtonActive : ""}`}
                      onClick={() => goTo(index)}
                      aria-current={isActive ? "true" : "false"}
                      whileHover={prefersReducedMotion ? undefined : { y: -1, scale: 1.01 }}
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                    >
                      <span className={styles.momentButtonEyebrow}>
                        Moment {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.momentButtonTitle}>{item.title}</span>
                    </motion.button>
                  );
                })}
              </nav>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.article
                  className={styles.storyCard}
                  key={activeItem.id}
                  custom={direction}
                  variants={panelVariants}
                  initial={prefersReducedMotion ? false : "enter"}
                  animate="center"
                  exit={prefersReducedMotion ? undefined : "exit"}
                  transition={{ duration: 0.36, ease: "easeOut" }}
                >
                  <motion.div
                    className={styles.visual}
                    style={visualStyle}
                    aria-hidden="true"
                    initial={prefersReducedMotion ? false : { scale: 1.03, opacity: 0.85 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.42, ease: "easeOut" }}
                  />

                  <div className={styles.storyBody}>
                    <div className={styles.storyMeta}>
                      <span className={styles.badge}>
                        Your Moment {String(activeIndex + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.badge}>Objective Partner + Practical Change</span>
                    </div>

                    <Heading level={2} className={styles.storyTitle} marginTop={0} marginBottom={0}>
                      {activeItem.title}
                    </Heading>

                    <div className={styles.sectionGrid}>
                      <section className={styles.block}>
                        <Paragraph className={styles.blockLabel} marginTop={0} marginBottom={0}>
                          What You’re Facing
                        </Paragraph>
                        <Paragraph className={styles.blockText} marginTop={0} marginBottom={0}>
                          {activeItem.hook}
                        </Paragraph>
                      </section>

                      <section className={styles.block}>
                        <Paragraph className={styles.blockLabel} marginTop={0} marginBottom={0}>
                          How Irini Partners With You
                        </Paragraph>
                        <Paragraph className={styles.blockText} marginTop={0} marginBottom={0}>
                          {activeItem.pitch}
                        </Paragraph>
                      </section>

                      <section className={styles.block}>
                        <Paragraph className={styles.blockLabel} marginTop={0} marginBottom={0}>
                          What Changes
                        </Paragraph>
                        <Paragraph className={styles.blockText} marginTop={0} marginBottom={0}>
                          {activeItem.happyEnding}
                        </Paragraph>
                      </section>
                    </div>

                    <div className={styles.ctaRow}>
                      <Button
                        _type="button"
                        label={activeItem.primaryCTA.label}
                        linkType="external"
                        externalUrl={activeItem.primaryCTA.href}
                        variant="primary"
                        size="medium"
                      />

                      {activeItem.secondaryCTA && (
                        <Button
                          _type="button"
                          label={activeItem.secondaryCTA.label}
                          linkType="external"
                          externalUrl={activeItem.secondaryCTA.href}
                          variant="inverted"
                          size="medium"
                        />
                      )}
                    </div>

                    <div className={styles.footerActions}>
                      <div className={styles.slideControls}>
                        <button
                          type="button"
                          className={styles.navArrow}
                          aria-label="Previous moment"
                          onClick={() => paginate(-1)}
                        >
                          Prev
                        </button>
                        <button
                          type="button"
                          className={styles.navArrow}
                          aria-label="Next moment"
                          onClick={() => paginate(1)}
                        >
                          Next
                        </button>
                      </div>
                      <div className={styles.progressRail} aria-hidden="true">
                        {showcaseMoments.map((item, index) => (
                          <span
                            key={item.id}
                            className={`${styles.progressDot} ${index === activeIndex ? styles.progressDotActive : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
