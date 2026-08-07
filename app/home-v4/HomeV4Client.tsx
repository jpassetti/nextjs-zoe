"use client";

import { useState } from "react";
import Button from "@/components/html/Button";
import EyeBrow from "@/components/html/EyeBrow";
import Heading from "@/components/html/Heading";
import Number from "@/components/html/Number";
import Paragraph from "@/components/html/Paragraph";
import { Li, Ul } from "@/components/html/List";
import Link from "next/link";
import MagneticField from "@/components/lotties/MagneticField";
import PlantBloomContrast from "@/components/lotties/PlantBloomContrast";
import CanopyLanguagePulse from "@/components/lotties/CanopyLanguagePulse";
import StemBenchGrowth from "@/components/lotties/StemBenchGrowth";
import RootPruneFlow from "@/components/lotties/RootPruneFlow";
import styles from "./home-v4.module.scss";

type Showcase = {
  id: string;
  service: string;
  title: string;
  intro: string;
  howItWorks: string;
  outcomes: string[];
  fit: string;
  lens: string;
  primaryHref: string;
};

const showcases: Showcase[] = [
  {
    id: "01",
    service: "Vital Organizational Scan",
    title: "See where the system is blooming and where it is root-bound",
    intro:
      "Healthy organizations show visible growth: stronger branches, fuller canopy, and tangible fruit. When growth stalls, structural constraints and unaddressed decay quietly limit what leadership can produce.",
    howItWorks:
      "We surface the real condition of the leadership ecosystem through candid organization-wide signal, then translate those findings into focused leadership choices and structural interventions.",
    outcomes: [
      "A clear view of where growth is healthy versus where constraints are choking momentum.",
      "Shared executive clarity on what to prune, what to nourish, and what to rebuild.",
      "Action priorities tied to measurable leadership and business outcomes.",
    ],
    fit:
      "Best when leadership senses underperformance but needs a trustworthy diagnosis of root causes before acting.",
    lens:
      "This intervention distinguishes visible symptoms from structural issues so growth efforts actually compound.",
    primaryHref: "/services-v3/vital-orgscan",
  },
  {
    id: "02",
    service: "Leadership JumpStart",
    title: "Accelerate readiness while strengthening the shared canopy",
    intro:
      "As leaders step into bigger scope, they need rapid growth in judgment and a shared language for seeing both the forest and the trees.",
    howItWorks:
      "In an immersive cohort, leaders work in a controlled development environment where reflection, challenge, and practical tools accelerate growth even in difficult operating conditions.",
    outcomes: [
      "Faster development of high-potential leaders under real pressure.",
      "A common leadership language that improves coordination across functions.",
      "Visible shifts from reactive behavior to intentional, system-aware decisions.",
    ],
    fit:
      "Best when organizations need leaders to mature quickly without sacrificing alignment across the broader system.",
    lens:
      "Individuals grow fastest when they are developed as interconnected parts of the larger leadership ecosystem.",
    primaryHref: "/services-v3/leadership-jumpstart",
  },
  {
    id: "03",
    service: "Leadership Decathlon",
    title: "Build a resilient bench that can carry long-term production",
    intro:
      "Sustainable growth depends on healthy stems, aligned leaves, and succession-ready depth across multiple leadership layers.",
    howItWorks:
      "This multi-session pathway develops leaders in context, linking individual growth to team coordination, succession potential, and enterprise resilience.",
    outcomes: [
      "A stronger leadership bench with clearer succession pathways.",
      "Higher system resilience when roles shift, pressure rises, or strategy changes.",
      "Better alignment across teams so growth is not dependent on a few individuals.",
    ],
    fit:
      "Best when leadership depth must scale to support expansion, transition, or increased complexity.",
    lens:
      "Long-term performance comes from developing leadership as a durable system, not isolated talent events.",
    primaryHref: "/services-v3/leadership-decathlon",
  },
  {
    id: "04",
    service: "Executive Coaching",
    title: "Create the conditions where pivotal leaders can redirect energy and grow",
    intro:
      "In defining moments, executives need a trusted partner to challenge assumptions, prune distractions, and strengthen the invisible root work that supports durable growth.",
    howItWorks:
      "Coaching combines targeted assessment, deep reflection, and behavior experiments that redirect leadership energy toward what matters most.",
    outcomes: [
      "Sharper executive focus on high-leverage decisions.",
      "Behavior changes that improve team conditions and business execution.",
      "Sustained personal growth supported by stronger underlying leadership habits.",
    ],
    fit:
      "Best for pivotal leaders navigating transition, complexity, or high-stakes transformation.",
    lens:
      "The strongest visible leadership growth is supported by disciplined, often invisible, development work below the surface.",
    primaryHref: "/services-v3/leadership-coaching",
  },
];

export default function HomeV4Client() {
  const [expandedStories, setExpandedStories] = useState<Record<string, boolean>>({});

  const toggleStory = (storyId: string) => {
    setExpandedStories((prev) => ({
      ...prev,
      [storyId]: !prev[storyId],
    }));
  };

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <EyeBrow className={styles.heroEyebrow}>For Growth-Stage Leadership Systems</EyeBrow>
          <Heading level={1} className={styles.title}>
            Grow leadership like a living system, not a one-off intervention.
          </Heading>
          <Paragraph className={styles.lede}>
            This approach helps leadership teams read system health, accelerate development under pressure,
            strengthen succession depth, and coach pivotal leaders through moments that shape long-term results.
          </Paragraph>
          <div className={styles.ctaRow}>
            <Button href="/transformation" label="Schedule A Discovery Conversation" variant="primary" />
            <Button href="/about" label="Learn About Zoe" variant="inverted" />
          </div>
        </div>
      </section>

      <section className={styles.context}>
        <div className={styles.container}>
          <article className={styles.introStep}>
            <div className={styles.introCopy}>
              <Heading level={2}>When conditions change, leadership systems either adapt or decay.</Heading>
              <Paragraph>
                Growth exposes what is healthy and what is constrained. The right interventions restore flow,
                redirect energy, and create the conditions where leaders and teams can produce sustainably.
              </Paragraph>
              <Paragraph>
                The pathways below are designed to strengthen the full leadership ecosystem, from root-level
                dynamics to visible performance.
              </Paragraph>
            </div>
            <div className={styles.introAnimation}>
              <MagneticField className={styles.animationCanvas} motion="ambient" />
            </div>
          </article>
        </div>
      </section>

      <section className={styles.showcase}>
        <div className={styles.container}>
          <Heading level={2} className={styles.sectionTitle}>
            Choose the intervention that matches your current growth condition.
          </Heading>
          <Paragraph className={styles.sectionIntro}>
            Each service develops individual leaders while improving the health of the broader organizational system.
          </Paragraph>

          <div className={styles.storyList}>
            {showcases.map((story, index) => {
              const isReverse = index % 2 === 1;
              const isExpanded = !!expandedStories[story.id];
              const isSlideOne = story.id === "01";
              const isSlideTwo = story.id === "02";
              const isSlideThree = story.id === "03";
              const isSlideFour = story.id === "04";

              return (
                <article key={story.id} className={styles.storyCard}>
                  <div className={`${styles.storyStep} ${isReverse ? styles.storyStepReverse : ""}`}>
                    <div className={styles.storyVisualZone}>
                      {isSlideOne ? (
                        <PlantBloomContrast className={styles.animationCanvas} />
                      ) : isSlideTwo ? (
                        <CanopyLanguagePulse className={styles.animationCanvas} />
                      ) : isSlideThree ? (
                        <StemBenchGrowth className={styles.animationCanvas} />
                      ) : isSlideFour ? (
                        <RootPruneFlow className={styles.animationCanvas} />
                      ) : null}
                    </div>

                    <div className={styles.storyContentZone}>
                      <div className={styles.storyContentGrid}>
                        <div className={styles.storyIndexRail}>
                          <Number className={styles.storyIndex}>{story.id}</Number>
                        </div>

                        <div className={styles.storyMainColumn}>
                          <div className={styles.storyHeader}>
                            <div>
                              <EyeBrow className={styles.storyMapTo}>{story.service}</EyeBrow>
                              <Heading level={3}>{story.title}</Heading>
                            </div>
                          </div>

                          <div className={styles.storyTextBlock}>
                            <div className={styles.storyNarrative}>
                              <Paragraph>{story.intro}</Paragraph>

                              <div
                                className={`${styles.storyDetails} ${isExpanded ? styles.storyDetailsExpanded : ""}`}
                                id={`story-details-${story.id}`}
                              >
                                <div className={styles.storyDetailsInner}>
                                  <div className={styles.storyRevealItem}>
                                    <Paragraph>{story.howItWorks}</Paragraph>
                                  </div>
                                  <div className={styles.storyRevealItem}>
                                    <Ul>
                                      {story.outcomes.map((outcome) => (
                                        <Li key={outcome}>{outcome}</Li>
                                      ))}
                                    </Ul>
                                  </div>
                                  <div className={styles.storyRevealItem}>
                                    <Paragraph>{story.fit}</Paragraph>
                                  </div>
                                  <div className={styles.storyRevealItem}>
                                    <Paragraph>{story.lens}</Paragraph>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className={styles.storyActions}>
                              <Button
                                label={isExpanded ? "Show Less" : "Read More"}
                                variant="inverted"
                                actionType="button"
                                clickHandler={() => toggleStory(story.id)}
                              />
                            </div>

                            {isExpanded && (
                              <div className={styles.storySecondaryLinks} aria-label={`${story.service} action links`}>
                                <Link className={styles.storySecondaryLink} href="/transformation">
                                  Schedule Discovery Conversation
                                </Link>
                                <Link className={styles.storySecondaryLink} href={story.primaryHref}>
                                  {`Explore ${story.service}`}
                                </Link>
                                <Link className={styles.storySecondaryLink} href="/about">
                                  About Zoe
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.footerCta}>
        <div className={styles.container}>
          <Heading level={2}>Ready to cultivate the leadership conditions your strategy needs?</Heading>
          <Paragraph>
            A discovery conversation helps identify where the system is constrained, what to strengthen first,
            and which intervention will create the strongest long-term growth.
          </Paragraph>
          <Button href="/transformation" label="Book Discovery Conversation" variant="primary" />
        </div>
      </section>
    </main>
  );
}
