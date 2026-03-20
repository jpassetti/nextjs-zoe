"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { showcaseMoments } from "./moments";
import styles from "./ShowcaseExperimentBasic.module.scss";

export default function ShowcaseExperimentBasic() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = useMemo(() => showcaseMoments[activeIndex], [activeIndex]);
  const visualStyle = {
    "--accent-1": activeItem.visual.accent1,
    "--accent-2": activeItem.visual.accent2,
  } as CSSProperties;

  return (
    <Section backgroundColor="white" paddingTop="none" paddingBottom="none">
      <div className={styles.basic}>
        <Container align="wide">
          <header className={styles.header}>
            <Heading level={1} className={styles.title} marginTop={0} marginBottom={0}>
              Practical leadership moments, clearly framed.
            </Heading>
            <Paragraph className={styles.subtitle} marginTop={0} marginBottom={0}>
              A calm, structured presentation for decision-makers who want clarity first.
            </Paragraph>
          </header>

          <div className={styles.layout}>
            <nav className={styles.nav} aria-label="Select a leadership moment">
              {showcaseMoments.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`${styles.navButton} ${isActive ? styles.navButtonActive : ""}`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </nav>

            <article className={styles.card} key={activeItem.id}>
              <div className={styles.visual} style={visualStyle} aria-hidden="true" />
              <div className={styles.body}>
                <Heading level={2} className={styles.momentTitle} marginTop={0} marginBottom={0}>
                  {activeItem.title}
                </Heading>

                <section className={styles.block}>
                  <Paragraph className={styles.label}>What You’re Facing</Paragraph>
                  <Paragraph className={styles.text} marginTop={0} marginBottom={0}>
                    {activeItem.hook}
                  </Paragraph>
                </section>

                <section className={styles.block}>
                  <Paragraph className={styles.label}>How Irini Partners With You</Paragraph>
                  <Paragraph className={styles.text} marginTop={0} marginBottom={0}>
                    {activeItem.pitch}
                  </Paragraph>
                </section>

                <section className={styles.block}>
                  <Paragraph className={styles.label}>What Changes</Paragraph>
                  <Paragraph className={styles.text} marginTop={0} marginBottom={0}>
                    {activeItem.happyEnding}
                  </Paragraph>
                </section>

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
              </div>
            </article>
          </div>
        </Container>
      </div>
    </Section>
  );
}
