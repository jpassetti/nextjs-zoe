"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Icon from "@/components/html/Icon";
import Paragraph from "@/components/html/Paragraph";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ScrollDown from "@/components/lotties/ScrollDown";
import { showcaseMoments } from "./moments";
import styles from "./ShowcaseExperimentAdvanced.module.scss";

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction >= 0 ? 24 : -24,
    filter: "blur(6px)",
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction >= 0 ? -20 : 20,
    filter: "blur(5px)",
  }),
};

const chapterTextGroupVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.56,
    },
  },
};

const connectorRevealVariants = {
  hidden: {
    scaleY: 0,
    opacity: 0.45,
  },
  show: {
    scaleY: 1,
    opacity: 1,
    transition: {
      delay: 0.12,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const connectorDotVariants = {
  hidden: {
    opacity: 0,
    scale: 0.72,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.9,
      duration: 0.22,
      ease: "easeOut",
    },
  },
};

const connectorPulseVariants = {
  hidden: {
    opacity: 0,
    scale: 1,
  },
  show: {
    opacity: [0.5, 0],
    scale: [1, 2.15],
    transition: {
      delay: 1.02,
      duration: 1.6,
      ease: "easeOut",
      repeat: Infinity,
    },
  },
};

const chapterTextItemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: "easeOut",
    },
  },
};

const introFragmentsContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.34,
      delayChildren: 0.12,
    },
  },
};

const introFragmentItemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.44,
      ease: "easeOut",
    },
  },
};

const expansionFlowVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const expansionItemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: "easeOut",
    },
  },
};

type StageCard = {
  id: string;
  label?: string;
  title: string;
  body: string;
  cta: {
    label: string;
    href: string;
  };
};

type StageCardContentProps = {
  card: StageCard;
  showLabel?: boolean;
};

const integratedChapters: StageCard[] = [
  {
    id: "method",
    label: "How we'll work together",
    title: "A clear process for high-pressure leadership moments.",
    body:
      "Each engagement follows three moves: clarify what is happening, align how decisions get made, and execute with confidence.",
    cta: { label: "See the approach", href: "services-v3" },
  },
  {
    id: "levels",
    label: "Where I can help",
    title: "Support at the level where your challenge lives.",
    body:
      "Whether the shift is personal, team-wide, or organizational, we choose the service that matches your real pressure point.",
    cta: { label: "Explore services", href: "services-v3" },
  },
  {
    id: "entry-points",
    label: "How to start now",
    title: "Start with the issue that is costing the most momentum.",
    body:
      "Leadership transition, team misalignment, or systems strain: we identify the right first intervention and begin there.",
    cta: { label: "Find your entry point", href: "services-v3" },
  },
  {
    id: "outcomes",
    label: "What changes",
    title: "What you can expect to see shift.",
    body:
      "Clients report faster decisions, clearer ownership, stronger executive alignment, and steadier leadership under pressure.",
    cta: { label: "View outcomes", href: "services-v3" },
  },
];

const optionCards: StageCard[] = [
  {
    id: "coaching",
    title: "Individual leadership coaching",
    body: "For founders and executives navigating role stretch, visibility pressure, or identity transitions in growth.",
    cta: { label: "Explore coaching", href: "services-v3/leadership-coaching" },
  },
  {
    id: "team",
    title: "Team alignment sprint",
    body: "For leadership teams who need faster decisions, cleaner ownership, and stronger cross-functional trust.",
    cta: { label: "Explore team options", href: "services-v3/leadership-decathlon" },
  },
  {
    id: "org",
    title: "Organization scan",
    body: "For companies preparing to scale or transform and needing an objective view of friction across the system.",
    cta: { label: "Explore org options", href: "services-v3/vital-orgscan" },
  },
  {
    id: "advisory",
    title: "Where should we start?",
    body: "If the challenge is broad or still unclear, start with a strategic consult to define the right first move.",
    cta: { label: "Book consultation", href: "consultation" },
  },
];

const momentBridges: Record<
  string,
  {
    answer: string;
    serviceTitle: string;
    serviceDescription: React.ReactNode;
    serviceLabel: string;
    serviceHref: string;
    actionTitle: string;
    actionDescription: string;
    actionLabel: string;
    actionHref: string;
  }
> = {
  "founder-shift": {
    answer:
      "This moment usually signals a leadership architecture issue, not a personal failure. The work is to shift from expert operator to enterprise leader.",
    serviceTitle: "Recommended Service",
    serviceDescription: (
      <>
        <strong>Leadership Coaching</strong> for founders stepping into enterprise-level leadership and team redesign.
      </>
    ),
    serviceLabel: "Match with Leadership Coaching",
    serviceHref: "services-v3/leadership-coaching",
    actionTitle: "Strategic Next Step",
    actionDescription: "Book a focused conversation to map the first 90 days of your leadership shift.",
    actionLabel: "Book a strategic consultation",
    actionHref: "consultation",
  },
  "first-time-manager": {
    answer:
      "This is a scope-expansion moment. Early coaching helps leaders build decision confidence, communication clarity, and sustainable pace before habits harden.",
    serviceTitle: "Recommended Service",
    serviceDescription: (
      <>
        <strong>Leadership Jumpstart</strong> for leaders who need immediate traction in a larger management role.
      </>
    ),
    serviceLabel: "Start with Leadership Jumpstart",
    serviceHref: "services-v3/leadership-jumpstart",
    actionTitle: "Strategic Next Step",
    actionDescription: "Clarify your role transition goals and where coaching will accelerate confidence fastest.",
    actionLabel: "Talk through fit",
    actionHref: "consultation",
  },
  "team-misalignment": {
    answer:
      "Repeated friction usually points to unclear operating agreements. The fastest path is aligning decision rights, accountability, and team rhythms.",
    serviceTitle: "Recommended Service",
    serviceDescription: (
      <>
        <strong>Leadership Decathlon</strong> to align decision pathways, ownership, and cross-functional execution.
      </>
    ),
    serviceLabel: "Explore Leadership Decathlon",
    serviceHref: "services-v3/leadership-decathlon",
    actionTitle: "Strategic Next Step",
    actionDescription: "Run a short diagnostic conversation to identify where team friction is costing momentum.",
    actionLabel: "Set up a team conversation",
    actionHref: "consultation",
  },
  "executive-departures": {
    answer:
      "After key departures, leaders need stabilization before acceleration. The bridge work is rebuilding coherence so strategy can move again.",
    serviceTitle: "Recommended Service",
    serviceDescription: (
      <>
        <strong>Organizational Scan</strong> to stabilize leadership structure and prioritize the right interventions.
      </>
    ),
    serviceLabel: "Review Organizational Scan",
    serviceHref: "services-v3/vital-orgscan",
    actionTitle: "Strategic Next Step",
    actionDescription: "Map immediate stabilization actions before committing to longer-term restructuring.",
    actionLabel: "Plan a stabilization session",
    actionHref: "consultation",
  },
  "technical-expert": {
    answer:
      "Influence expansion is a transition from specialist value to enterprise value. Coaching connects technical strength to broader leadership impact.",
    serviceTitle: "Recommended Service",
    serviceDescription: (
      <>
        <strong>Leadership Coaching</strong> to convert technical depth into broader strategic influence.
      </>
    ),
    serviceLabel: "See Leadership Coaching",
    serviceHref: "services-v3/leadership-coaching",
    actionTitle: "Strategic Next Step",
    actionDescription: "Define how to increase leadership visibility without sacrificing technical credibility.",
    actionLabel: "Discuss your next step",
    actionHref: "consultation",
  },
};

const momentOpenLabel = "Yes, this is me";

const introFragments = [
  "Role stretch.",
  "Team misalignment.",
  "Executive turnover.",
  "Identity shifts in leadership.",
  <>
    These moments feel <em>personal</em>, but they are patterned and predictable in growing companies.
  </>,
  "Start with the moment you are in. We meet you there with clarity, structure, and momentum.",
];

function StageCardContent({ card, showLabel = false }: StageCardContentProps) {
  return (
    <>
      {showLabel ? <p className={styles.chapterLabel}>{card.label}</p> : null}
      <Heading level={3} color="white" marginTop={0} marginBottom={0}>
        {card.title}
      </Heading>
      <Paragraph className={styles.stageCardParagraph} color="white" marginTop={0} marginBottom={0}>
        {card.body}
      </Paragraph>
      <div className={styles.chapterAction}>
        <Button
          _type="button"
          label={card.cta.label}
          linkType="internal"
          internalPage={{ slug: { current: card.cta.href } }}
          variant="inverted-white"
          size="medium"
        />
      </div>
    </>
  );
}

export default function ShowcaseExperimentAdvanced() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expandedMomentId, setExpandedMomentId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);

  // Scroll position selects the active chapter and drives the background transition.
  useEffect(() => {
    const nodes = chapterRefs.current.filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const indexValue = Number((entry.target as HTMLElement).dataset.index);
          if (Number.isNaN(indexValue)) {
            return;
          }

          setActiveIndex((current) => {
            if (current === indexValue) {
              return current;
            }

            setDirection(indexValue > current ? 1 : -1);
            return indexValue;
          });
        });
      },
      {
        threshold: 0.65,
        rootMargin: "-10% 0px -25% 0px",
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const activeItem = showcaseMoments[activeIndex];

  return (
    <>
      <Section backgroundColor="black" paddingTop="none" paddingBottom="none">
        <div className={styles.immersive}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeItem.id}-backdrop`}
              className={styles.backgroundLayer}
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
            <div className={styles.viewport}>
              <div className={styles.introScreen}>
                <header className={styles.header}>
                  <div className={styles.title}>
                    <Heading level={1} color="white" marginTop={0} marginBottom={0}>
                      Growth creates defining moments for every founder and leadership team.
                    </Heading>
                  </div>
                </header>

                <p className={styles.pauseDash} aria-hidden="true">-</p>

                <div className={styles.orientation}>
                  <Heading level={2} color="accent" marginTop={0} marginBottom={0}>
                    Founders and leadership teams face the same pressure points as they scale.
                  </Heading>
                  <motion.div
                    className={styles.orientationFragments}
                    variants={introFragmentsContainerVariants}
                    initial={prefersReducedMotion ? false : "hidden"}
                    whileInView={prefersReducedMotion ? undefined : "show"}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    {introFragments.map((fragment, index) => (
                      <motion.div key={`intro-fragment-${index}`} variants={introFragmentItemVariants}>
                        <Paragraph type="lede" className={styles.orientationFragment} color="white" marginTop={0} marginBottom={0}>
                          {fragment}
                        </Paragraph>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <div className={styles.scrollCue} aria-hidden="true">
                  <ScrollDown size={48} />
                </div>

                <span className={styles.introConnector} aria-hidden="true">
                  <motion.span
                    className={styles.connectorLine}
                    style={{ originY: 0 }}
                    variants={connectorRevealVariants}
                    initial={prefersReducedMotion ? false : "hidden"}
                    whileInView={prefersReducedMotion ? undefined : "show"}
                    viewport={{ once: true, amount: 0.9 }}
                  />
                  <motion.span
                    className={styles.connectorPulse}
                    variants={connectorPulseVariants}
                    initial={prefersReducedMotion ? false : "hidden"}
                    whileInView={prefersReducedMotion ? undefined : "show"}
                    viewport={{ once: true, amount: 0.9 }}
                  />
                  <motion.span
                    className={styles.connectorDot}
                    variants={connectorDotVariants}
                    initial={prefersReducedMotion ? false : "hidden"}
                    whileInView={prefersReducedMotion ? undefined : "show"}
                    viewport={{ once: true, amount: 0.9 }}
                  />
                </span>
              </div>

              <div className={styles.scrollytelling}>
                <div className={styles.chapters} aria-label="Growth moments scrollytelling chapters">
                  {showcaseMoments.map((item, index) => (
                    <motion.article
                      key={item.id}
                      data-index={index}
                      className={`${styles.chapter} ${index === activeIndex ? styles.chapterActive : ""}`}
                      ref={(node) => {
                        chapterRefs.current[index] = node;
                      }}
                      initial={false}
                    >
                      {(() => {
                        const bridge = momentBridges[item.id];
                        const isExpanded = expandedMomentId === item.id;

                        return (
                          <>
                      <motion.div
                        className={styles.chapterInner}
                        variants={chapterTextGroupVariants}
                        initial={prefersReducedMotion ? false : "hidden"}
                        whileInView={prefersReducedMotion ? undefined : "show"}
                        viewport={{ once: true, amount: 0.45 }}
                      >
                        <motion.p className={styles.chapterLabel} variants={chapterTextItemVariants}>
                          Moment {String(index + 1).padStart(2, "0")}
                        </motion.p>
                        <motion.div variants={chapterTextItemVariants}>
                          <Heading level={2} color="white" marginTop={0} marginBottom={0}>
                            {item.title}
                          </Heading>
                        </motion.div>
                        <motion.div variants={chapterTextItemVariants}>
                          <Paragraph type="lede" color="white" marginTop={0} marginBottom={0}>
                            {item.hook}
                          </Paragraph>
                        </motion.div>

                        <AnimatePresence>
                          {isExpanded && bridge ? (
                            <motion.div
                              className={styles.momentExpansion}
                              initial={
                                prefersReducedMotion
                                  ? false
                                  : { height: 0, opacity: 0, marginTop: 0, paddingTop: 0 }
                              }
                              animate={{ height: "auto", opacity: 1, marginTop: 16, paddingTop: 22 }}
                              exit={
                                prefersReducedMotion
                                  ? undefined
                                  : { height: 0, opacity: 0, marginTop: 0, paddingTop: 0 }
                              }
                              transition={{
                                height: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                                opacity: { duration: 0.24, ease: "easeOut" },
                                marginTop: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                                paddingTop: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                              }}
                            >
                              <motion.div
                                variants={expansionFlowVariants}
                                initial={prefersReducedMotion ? false : "hidden"}
                                animate="show"
                              >
                                <motion.p className={styles.momentAnswer} variants={expansionItemVariants}>
                                  {bridge.answer}
                                </motion.p>

                                <motion.div className={styles.momentBridgeGrid} variants={expansionItemVariants}>
                                  <motion.article className={styles.momentBridgeCard} variants={expansionItemVariants}>
                                    <span className={styles.momentBridgeCardTitle}>{bridge.serviceTitle}</span>
                                    <p className={styles.momentBridgeCardText}>{bridge.serviceDescription}</p>
                                    <Button
                                      _type="button"
                                      label={bridge.serviceLabel}
                                      linkType="internal"
                                      internalPage={{ slug: { current: bridge.serviceHref } }}
                                      variant="inverted-white"
                                      size="medium"
                                    />
                                  </motion.article>

                                  <motion.article className={styles.momentBridgeCard} variants={expansionItemVariants}>
                                    <span className={styles.momentBridgeCardTitle}>{bridge.actionTitle}</span>
                                    <p className={styles.momentBridgeCardText}>{bridge.actionDescription}</p>
                                    <Button
                                      _type="button"
                                      label={bridge.actionLabel}
                                      linkType="internal"
                                      internalPage={{ slug: { current: bridge.actionHref } }}
                                      variant="accent"
                                      size="medium"
                                    />
                                  </motion.article>
                                </motion.div>
                              </motion.div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>

                        <motion.div className={styles.chapterAction} variants={chapterTextItemVariants}>
                          {isExpanded ? (
                            <button
                              type="button"
                              className={styles.closeMomentIconButton}
                              onClick={() => {
                                setExpandedMomentId((current) => (current === item.id ? null : item.id));
                              }}
                              aria-label="Close moment details"
                            >
                              <Icon name="xmark" color="white" size="small" />
                            </button>
                          ) : (
                            <Button
                              _type="button"
                              clickHandler={() => {
                                setExpandedMomentId((current) => (current === item.id ? null : item.id));
                              }}
                              variant={index === activeIndex ? "accent" : "inverted-white"}
                              size="medium"
                            >
                              {momentOpenLabel}
                            </Button>
                          )}
                        </motion.div>
                      </motion.div>
                      <span className={styles.chapterConnector} aria-hidden="true">
                        <motion.span
                          className={styles.connectorLine}
                          style={{ originY: 0 }}
                          variants={connectorRevealVariants}
                          initial={prefersReducedMotion ? false : "hidden"}
                          whileInView={prefersReducedMotion ? undefined : "show"}
                          viewport={{ once: true, amount: 0.9 }}
                        />
                        <motion.span
                          className={styles.connectorPulse}
                          variants={connectorPulseVariants}
                          initial={prefersReducedMotion ? false : "hidden"}
                          whileInView={prefersReducedMotion ? undefined : "show"}
                          viewport={{ once: true, amount: 0.9 }}
                        />
                        <motion.span
                          className={styles.connectorDot}
                          variants={connectorDotVariants}
                          initial={prefersReducedMotion ? false : "hidden"}
                          whileInView={prefersReducedMotion ? undefined : "show"}
                          viewport={{ once: true, amount: 0.9 }}
                        />
                      </span>
                          </>
                        );
                      })()}
                    </motion.article>
                  ))}

                </div>

                <motion.section
                  className={styles.integratedStage}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className={styles.integratedStageIntro}>
                    <p className={styles.chapterLabel}>How engagement works</p>
                    <Heading level={2} color="white" marginTop={0} marginBottom={0}>
                      The framework we use to move from leadership pressure to measurable traction.
                    </Heading>
                  </div>

                  <div className={styles.integratedGrid}>
                    {integratedChapters.map((chapter, index) => (
                      <motion.article
                        key={chapter.id}
                        className={styles.integratedCard}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.42, ease: "easeOut", delay: index * 0.08 }}
                      >
                        <StageCardContent card={chapter} showLabel />
                      </motion.article>
                    ))}
                  </div>
                </motion.section>

                <motion.section
                  className={styles.optionsStage}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 48 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.35 }}
                >
                  <div className={styles.optionsIntro}>
                    <p className={styles.chapterLabel}>Pick your starting service</p>
                    <Heading level={2} color="white" marginTop={0} marginBottom={0}>
                      Choose the support path that best fits your immediate challenge.
                    </Heading>
                  </div>

                  <motion.div
                    className={styles.optionsGrid}
                    initial={prefersReducedMotion ? false : "hidden"}
                    whileInView={prefersReducedMotion ? {} : "show"}
                    viewport={{ once: true, amount: 0.25 }}
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.08,
                        },
                      },
                    }}
                  >
                    {optionCards.map((card) => (
                      <motion.article
                        key={card.id}
                        className={styles.optionCard}
                        variants={{
                          hidden: { opacity: 0, y: 22 },
                          show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      >
                        <StageCardContent card={card} />
                      </motion.article>
                    ))}
                  </motion.div>
                </motion.section>
              </div>

            </div>
          </Container>
        </div>
      </Section>
    </>
  );
}
