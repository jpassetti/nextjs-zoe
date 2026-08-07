"use client";

import { useState } from "react";
import Button from "@/components/html/Button";
import EyeBrow from "@/components/html/EyeBrow";
import Heading from "@/components/html/Heading";
import Number from "@/components/html/Number";
import Paragraph from "@/components/html/Paragraph";
import { Li, Ul } from "@/components/html/List";
import OrgScanSignal from "@/components/lotties/OrgScanSignal";
import PressureMagnet from "@/components/lotties/PressureMagnet";
import AbstractCircleField from "@/components/lotties/AbstractCircleField";
import LeadershipGrowthOrbit from "@/components/lotties/LeadershipGrowthOrbit";
import LeadershipSuitcase from "@/components/lotties/LeadershipSuitcase";
import CoachingFusion from "@/components/lotties/CoachingFusion";
import styles from "./home-v3.module.scss";

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
    title: "Get your executive team aligned around what is really happening",
    intro:
      "When priorities are clear but execution is uneven, leadership teams need better signal, not more noise.",
    howItWorks:
      "You gain candid, anonymous organization-wide feedback, then work through it in a facilitated executive retreat that converts insight into aligned commitments.",
    outcomes: [
      "Decisions grounded in a shared understanding of what employees are experiencing.",
      "Stronger trust through a visible feedback loop from listening to action.",
      "A focused execution agenda leadership can carry into strategic planning and daily operations.",
    ],
    fit:
      "Ideal when the CEO needs vertical alignment across leadership levels and a credible way to surface hard truths early.",
    lens:
      "This creates the structural conditions for healthier leadership behavior and stronger organizational performance.",
    primaryHref: "/services-v3/vital-orgscan",
  },
  {
    id: "02",
    service: "Leadership JumpStart",
    title: "Accelerate leadership readiness when someone steps into bigger scope",
    intro:
      "As leaders move up, direct feedback often thins out at exactly the moment they need it most.",
    howItWorks:
      "In a four-day immersive cohort, participants work on their real leadership challenges with facilitated peer pressure and practical reflection outside internal politics.",
    outcomes: [
      "Sharper self-awareness and stronger judgment in high-stakes moments.",
      "A concrete action plan tied to real responsibilities back at work.",
      "A shared leadership language that helps teams adapt faster across the organization.",
    ],
    fit:
      "Best for owners, senior leaders, and high-potential talent taking on expanded responsibility.",
    lens:
      "It is an accelerated development environment designed to strengthen leadership habits under pressure.",
    primaryHref: "/services-v3/leadership-jumpstart",
  },
  {
    id: "03",
    service: "Leadership Decathlon",
    title: "Build a stronger leadership bench while the business keeps moving",
    intro:
      "When growth accelerates, leadership depth can lag and culture starts to fragment unless development is intentional.",
    howItWorks:
      "This year-long, ten-session program develops nominated leaders around your real strategic priorities with active executive involvement.",
    outcomes: [
      "A visible pipeline of emerging leaders ready for greater responsibility.",
      "Better cross-functional coordination and less siloed execution.",
      "Stronger succession readiness during growth, transition, or acquisition.",
    ],
    fit:
      "Best when your senior team is strong but middle-management consistency and depth need to scale quickly.",
    lens:
      "This strengthens the leadership system at multiple levels so growth does not outpace capability.",
    primaryHref: "/services-v3/leadership-decathlon",
  },
  {
    id: "04",
    service: "Executive Coaching",
    title: "Support pivotal leaders through moments that define the business",
    intro:
      "In critical transitions, strong leaders benefit from a confidential thought partner who challenges assumptions and sharpens action.",
    howItWorks:
      "Each engagement combines assessment, 360 feedback, and a tailored coaching plan focused on the few behavior shifts that matter most to business outcomes.",
    outcomes: [
      "Visible leadership behavior change in day-to-day decisions.",
      "Greater courage, perspective, and steadiness under pressure.",
      "A clear link between personal growth and organizational impact.",
    ],
    fit:
      "Best for leaders navigating high-stakes transitions, expanded scope, or post-program follow-through.",
    lens:
      "This is disciplined one-to-one development that turns insight into sustained leadership practice.",
    primaryHref: "/services-v3/leadership-coaching",
  },
];

export default function HomeV3Client() {
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
          <Paragraph className={styles.kicker}>For Growing Leadership Teams</Paragraph>
          <Heading level={1} className={styles.title}>
            Build the leadership capacity your strategy requires.
          </Heading>
          <Paragraph className={styles.lede}>
            If your organization is scaling, changing, or redefining leadership expectations, this work helps
            your leaders align faster, lead with greater clarity, and translate strategy into execution.
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
              <Heading level={2}>Leadership pressure compounds as organizations grow.</Heading>
              <Paragraph>
                In organizations with 50-100 people, especially technical and scientifically oriented teams,
                growth can expose leadership gaps that stall momentum.
              </Paragraph>
              <Paragraph>
                The services below are designed to meet leaders where the pressure is highest: executive
                alignment, accelerated development, succession depth, and accountable behavior change.
              </Paragraph>
            </div>
            <div className={styles.introAnimation}>
              <PressureMagnet className={styles.animationCanvas} />
            </div>
          </article>
        </div>
      </section>

      <section className={styles.showcase}>
        <div className={styles.container}>
          <Heading level={2} className={styles.sectionTitle}>
            Choose the intervention that fits your leadership challenge.
          </Heading>
          <Paragraph className={styles.sectionIntro}>
            Each path is built to strengthen leadership performance and create measurable organizational impact.
          </Paragraph>

          <div className={styles.storyList}>
            {showcases.map((story, index) => {
              const isReverse = index % 2 === 1;
              const isExpanded = !!expandedStories[story.id];
              const AnimationComponent = index % 2 === 0 ? OrgScanSignal : PressureMagnet;
              const isSlideOne = story.id === "01";
              const isSlideTwo = story.id === "02";
              const isSlideThree = story.id === "03";
              const isSlideFour = story.id === "04";

              return (
                <article key={story.id} className={styles.storyCard}>
                  <div className={`${styles.storyStep} ${isReverse ? styles.storyStepReverse : ""}`}>
                    <div className={styles.storyVisualZone}>
                      {isSlideOne ? (
                        <AbstractCircleField className={styles.animationCanvas} />
                      ) : isSlideTwo ? (
                        <LeadershipGrowthOrbit className={styles.animationCanvas} />
                      ) : isSlideThree ? (
                        <LeadershipSuitcase className={styles.animationCanvas} />
                      ) : isSlideFour ? (
                        <CoachingFusion className={styles.animationCanvas} />
                      ) : (
                        <AnimationComponent className={styles.animationCanvas} />
                      )}
                    </div>

                    <div className={styles.storyContentZone}>
                      <div className={styles.storyHeader}>
                        <Number className={styles.storyIndex}>{story.id}</Number>
                        <div>
                          <EyeBrow className={styles.storyMapTo}>{story.service}</EyeBrow>
                          <Heading level={3}>{story.title}</Heading>
                        </div>
                      </div>

                      <div className={styles.storyNarrative}>
                        <Paragraph>{story.intro}</Paragraph>

                        <div
                          className={`${styles.storyDetails} ${isExpanded ? styles.storyDetailsExpanded : ""}`}
                          id={`story-details-${story.id}`}
                        >
                          <div className={styles.storyDetailsInner}>
                            <Paragraph>{story.howItWorks}</Paragraph>
                            <Ul>
                              {story.outcomes.map((outcome) => (
                                <Li key={outcome}>{outcome}</Li>
                              ))}
                            </Ul>
                            <Paragraph>{story.fit}</Paragraph>
                            <Paragraph>{story.lens}</Paragraph>
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
                        {isExpanded && (
                          <>
                            <Button
                              href="/transformation"
                              label="Schedule Discovery Conversation"
                              variant="primary"
                            />
                            <Button
                              href={story.primaryHref}
                              label={`Explore ${story.service}`}
                              variant="secondary"
                            />
                            <Button href="/about" label="About Zoe" variant="inverted" />
                          </>
                        )}
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
          <Heading level={2}>Ready to strengthen leadership where it matters most?</Heading>
          <Paragraph>
            A discovery conversation clarifies where execution is getting blocked and which intervention will
            deliver the strongest return for your team.
          </Paragraph>
          <Button href="/transformation" label="Book Discovery Conversation" variant="primary" />
        </div>
      </section>
    </main>
  );
}
