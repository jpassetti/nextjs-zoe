"use client";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBuilding,
  faCircleCheck,
  faCompass,
  faFlagCheckered,
  faHandshake,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/html/Button";
import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import styles from "./ShowcaseFlowContent.module.scss";

type ShowcaseFlowContentProps = {
  anchorId: string;
};

type ServiceCard = {
  icon: IconDefinition;
  level: "Individuals" | "Teams" | "Organizations";
  title: string;
  summary: string;
  idealFor: string[];
  outcomes: string[];
  slug: string;
};

type ProcessStep = {
  icon: IconDefinition;
  title: string;
  description: string;
};

type QuickPath = {
  icon: IconDefinition;
  title: string;
  description: string;
  highlights: string[];
  href: string;
  cta: string;
};

const processSteps: ProcessStep[] = [
  {
    icon: faCompass,
    title: "Perspective",
    description:
      "We begin with context—what the business needs, who is affected, and the constraints around the work—so your next moves are grounded and intentional.",
  },
  {
    icon: faHandshake,
    title: "Integrity",
    description:
      "We align actions to values and commitments. Stakeholder input, assessment data, and straightforward conversation keep the work honest and useful.",
  },
  {
    icon: faFlagCheckered,
    title: "Courage",
    description:
      "We test change in the real world: critical conversations, decisions, and experiments that build resilience across people, teams, and the broader system.",
  },
];

const services: ServiceCard[] = [
  {
    icon: faUser,
    level: "Individuals",
    title: "Leadership Coaching",
    summary:
      "Twelve focused sessions that align how you lead with the outcomes your organization needs most. Each journey stays grounded in perspective, integrity, and courage.",
    idealFor: [
      "Leaders stepping into bigger roles or navigating a new mandate",
      "Executives preparing for succession or post-merger integration",
      "Founders who need clarity while the business evolves",
    ],
    outcomes: [
      "Sharper decision-making anchored in strategy",
      "Actionable growth commitments tied to stakeholder feedback",
      "Greater confidence in navigating complex transitions",
    ],
    slug: "services-v3/leadership-coaching",
  },
  {
    icon: faUser,
    level: "Individuals",
    title: "Leadership Jumpstart",
    summary:
      "A concentrated Grinnell Leadership immersion paired with coaching to rapidly reset beliefs, habits, and influence across your ecosystem.",
    idealFor: [
      "Leaders who need traction fast in a new role",
      "Executives who want a reset after a 360° or assessment",
      "High-potential talent preparing for a stretch opportunity",
    ],
    outcomes: [
      "Clear personal thesis for leading through change",
      "Integrated insights from assessments into daily behaviors",
      "Momentum plan that connects team, organization, and customers",
    ],
    slug: "services-v3/leadership-jumpstart",
  },
  {
    icon: faUsers,
    level: "Teams",
    title: "Decathlon",
    summary:
      "A team-focused sprint that tests alignment, decision speed, and collaboration so leaders can operate as one system, not ten separate performers.",
    idealFor: [
      "Executive teams that need to move from consensus to commitment",
      "Functional teams facing stalled initiatives or siloed execution",
      "Newly formed teams that must gel quickly",
    ],
    outcomes: [
      "Shared operating norms that hold under pressure",
      "Faster, clearer decisions with defined owner/approver roles",
      "Greater cross-team trust and accountability",
    ],
    slug: "services-v3/leadership-decathlon",
  },
  {
    icon: faBuilding,
    level: "Organizations",
    title: "Organizational Scan",
    summary:
      "A systems view of your organization that surfaces friction across people, process, and culture-with pragmatic moves to ease and speed positive change.",
    idealFor: [
      "Growth-stage companies moving from heroic efforts to repeatable systems",
      "Organizations preparing for scaling, integration, or transformation",
      "Leaders who need an objective read before investing in change",
    ],
    outcomes: [
      "Clear change priorities tied to business goals",
      "Recommendations across individuals, teams, and organizational design",
      "Roadmap for the first 90 days of focused action",
    ],
    slug: "services-v3/vital-orgscan",
  },
];

const quickPaths: QuickPath[] = [
  {
    icon: faUser,
    title: "Individual shift",
    description: "You need a leader to move faster with clarity and confidence.",
    highlights: [
      "1:1 coaching with 360° input and action plans",
      "Fast-reset option via Leadership Jumpstart®",
    ],
    href: "services-v3/leadership-coaching",
    cta: "View individual services",
  },
  {
    icon: faUsers,
    title: "Team friction",
    description: "Alignment, decisions, or collaboration are stalling progress.",
    highlights: [
      "Leadership Decathlon® to build shared norms and decision speed",
      "Executive involvement to keep momentum",
    ],
    href: "services-v3/leadership-decathlon",
    cta: "View team services",
  },
  {
    icon: faBuilding,
    title: "Organization-wide change",
    description: "You need an objective view before scaling or transforming.",
    highlights: [
      "Vital OrgScan™ to surface friction with safe, anonymous input",
      "Retreat and roadmap with clear accountability",
    ],
    href: "services-v3/vital-orgscan",
    cta: "View organization services",
  },
];

export default function ShowcaseFlowContent({ anchorId }: ShowcaseFlowContentProps) {
  return (
    <>
      <Section backgroundColor="white" paddingTop="large" paddingBottom="large">
        <Container align="wide">
          <div id={anchorId} className={styles.anchor} />

          <header className={styles.introHeader}>
            <Paragraph className={styles.kicker} marginTop={0} marginBottom={0}>
              Continue the Flow
            </Paragraph>
            <div className={styles.title}>
              <Heading level={2} marginTop={0} marginBottom={0}>
                A consistent way of working.
              </Heading>
            </div>
            <div className={styles.subtitle}>
              <Paragraph marginTop={0} marginBottom={0}>
                Every service uses three repeatable moves so clients can see how we progress from
                initial perspective to lasting courage.
              </Paragraph>
            </div>
          </header>

          <div className={styles.processGrid}>
            {processSteps.map((step) => (
              <article key={step.title} className={styles.processCard}>
                <div className={styles.processTitle}>
                  <FontAwesomeIcon icon={step.icon} className={styles.sectionIcon} aria-hidden="true" />
                  <Heading level={3} marginTop={0} marginBottom={0}>
                    {step.title}
                  </Heading>
                </div>
                <Paragraph className={styles.processText} marginTop={0} marginBottom={0}>
                  {step.description}
                </Paragraph>
              </article>
            ))}
          </div>

          <div className={styles.sectionActions}>
            <Button
              _type="button"
              label="Schedule a consultation"
              linkType="internal"
              internalPage={{ slug: { current: "consultation" } }}
              variant="primary"
              size="medium"
            />
            <Button
              _type="button"
              label="Retake the quiz"
              linkType="internal"
              internalPage={{ slug: { current: "services-v3" } }}
              variant="inverted"
              size="medium"
            />
          </div>
        </Container>
      </Section>

      <Section backgroundColor="white" paddingTop="small" paddingBottom="large">
        <Container align="wide">
          <header className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Heading level={2} marginTop={0} marginBottom={0}>
                Services organized by the level of change.
              </Heading>
            </div>
            <div className={styles.sectionText}>
              <Paragraph marginTop={0} marginBottom={0}>
                See who each offer is for, how it helps, and the outcomes clients care about most.
              </Paragraph>
            </div>
          </header>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <article key={service.slug} className={styles.serviceCard}>
                <div className={styles.serviceTitle}>
                  <FontAwesomeIcon icon={service.icon} className={styles.sectionIcon} aria-hidden="true" />
                  <Heading level={3} marginTop={0} marginBottom={0}>
                    {service.title}
                  </Heading>
                </div>
                <div className={styles.serviceText}>
                  <Paragraph marginTop={0} marginBottom={0}>{service.summary}</Paragraph>
                </div>
                <Paragraph className={styles.serviceLevel} marginTop={0} marginBottom={0}>
                  {service.level}
                </Paragraph>
                <Button
                  _type="button"
                  label="View Service"
                  linkType="internal"
                  internalPage={{ slug: { current: service.slug } }}
                  variant="secondary"
                  size="medium"
                />
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section backgroundColor="white" paddingTop="small" paddingBottom="large">
        <Container align="wide">
          <header className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Heading level={2} marginTop={0} marginBottom={0}>
                Common entry points.
              </Heading>
            </div>
          </header>

          <div className={styles.pathGrid}>
            {quickPaths.map((path) => (
              <article key={path.title} className={styles.pathCard}>
                <div className={styles.pathTitle}>
                  <FontAwesomeIcon icon={path.icon} className={styles.sectionIcon} aria-hidden="true" />
                  <Heading level={3} marginTop={0} marginBottom={0}>
                    {path.title}
                  </Heading>
                </div>
                <Paragraph className={styles.pathText} marginTop={0} marginBottom={0}>
                  {path.description}
                </Paragraph>
                <ul className={styles.highlightList}>
                  {path.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <Button
                  _type="button"
                  linkType="internal"
                  internalPage={{ slug: { current: path.href } }}
                  variant="secondary"
                  size="medium"
                >
                  <span className={styles.pathButtonContent}>
                    {path.cta}
                    <FontAwesomeIcon icon={faArrowRight} className={styles.pathArrow} aria-hidden="true" />
                  </span>
                </Button>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section backgroundColor="white" paddingTop="small" paddingBottom="large">
        <Container align="wide">
          <header className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Heading level={2} marginTop={0} marginBottom={0}>
                Outcomes clients care about most.
              </Heading>
            </div>
          </header>

          <div className={styles.outcomesGrid}>
            {services.map((service) => (
              <article key={`${service.slug}-outcomes`} className={styles.outcomeCard}>
                <Paragraph className={styles.outcomeLabel} marginTop={0} marginBottom={0}>
                  <FontAwesomeIcon icon={faCircleCheck} className={styles.outcomeIcon} aria-hidden="true" />
                  {service.title}
                </Paragraph>
                <ul className={styles.highlightList}>
                  {service.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section backgroundColor="white" paddingTop="small" paddingBottom="large">
        <Container align="wide">
          <div className={styles.ctaBand}>
            <div className={styles.ctaTitle}>
              <Heading level={2} color="white" marginTop={0} marginBottom={0}>
                Ready to ease and speed the change you need?
              </Heading>
            </div>
            <div className={styles.ctaText}>
              <Paragraph color="white" marginTop={0} marginBottom={0}>
                Tell us whether you are navigating an individual shift, a team inflection point, or
                an organization-wide transformation. We will match you to the right path.
              </Paragraph>
            </div>
            <div className={styles.ctaActions}>
              <Button
                _type="button"
                label="Schedule a consultation"
                linkType="internal"
                internalPage={{ slug: { current: "consultation" } }}
                variant="accent"
                size="large"
              />
              <Button
                _type="button"
                label="See All Services"
                linkType="internal"
                internalPage={{ slug: { current: "services-v3" } }}
                variant="inverted-white"
                size="large"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
