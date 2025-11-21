import Link from "next/link";

import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Showcase from "@/components/custom/Showcase";
import CTA from "@/components/custom/CTA";
import type { ButtonBlockProps } from "@/lib/interfaces";
import Image from "next/image";

import styles from "./services-v2.module.scss";

export const metadata = {
  title: "Services | Transform with Irini",
  description:
    "Leadership and organizational development services for individuals, teams, and organizations rooted in perspective → integrity → courage.",
};

type Service = {
  level: "Individuals" | "Teams" | "Organizations";
  title: string;
  summary: string;
  idealFor: string[];
  outcomes: string[];
  slug: string;
};

const services: Service[] = [
  {
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
    slug: "leadership-coaching",
  },
  {
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
    slug: "leadership-jumpstart",
  },
  {
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
    slug: "leadership-decathlon",
  },
  {
    level: "Organizations",
    title: "Organizational Scan",
    summary:
      "A systems view of your organization that surfaces friction across people, process, and culture—with pragmatic moves to ease and speed positive change.",
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
    slug: "vital-orgscan",
  },
];

const process = [
  {
    title: "Perspective",
    detail:
      "We begin with context—what the business needs, who is affected, and the constraints around the work—so your next moves are grounded and intentional.",
  },
  {
    title: "Integrity",
    detail:
      "We align actions to values and commitments. Stakeholder input, assessment data, and straightforward conversation keep the work honest and useful.",
  },
  {
    title: "Courage",
    detail:
      "We test change in the real world: critical conversations, decisions, and experiments that build resilience across people, teams, and the broader system.",
  },
];

const quickPaths = [
  {
    title: "Individual shift",
    description: "You need a leader to move faster with clarity and confidence.",
    highlights: ["1:1 coaching with 360° input and action plans", "Fast-reset option via Leadership Jumpstart®"],
    href: "/services-v2/leadership-coaching",
    cta: "View individual services",
  },
  {
    title: "Team friction",
    description: "Alignment, decisions, or collaboration are stalling progress.",
    highlights: ["Leadership Decathlon® to build shared norms and decision speed", "Executive involvement to keep momentum"],
    href: "/services-v2/leadership-decathlon",
    cta: "View team services",
  },
  {
    title: "Organization-wide change",
    description: "You need an objective view before scaling or transforming.",
    highlights: ["Vital OrgScan™ to surface friction with safe, anonymous input", "Retreat and roadmap with clear accountability"],
    href: "/services-v2/vital-orgscan",
    cta: "View organization services",
  },
];

const capabilities = [
  {
    label: "Individuals",
    items: [
      "Leadership identity and influence",
      "Resilience through transitions",
      "Decision-making aligned to strategy",
    ],
  },
  {
    label: "Teams",
    items: [
      "Operating rhythms and norms",
      "Alignment on priorities and roles",
      "Trusted collaboration under pressure",
    ],
  },
  {
    label: "Organizations",
    items: [
      "Systems thinking across people and process",
      "Change roadmaps that balance speed and integrity",
      "Leadership development integrated with business outcomes",
    ],
  },
];

const pageCTAButtons: ButtonBlockProps = {
  _type: "buttonBlock",
  buttonGroup: [
    {
      _type: "button",
      label: "Schedule a consultation",
      linkType: "internal",
      internalPage: { slug: { current: "consultation" } },
      variant: "secondary",
      size: "medium",
      actionType: "button",
    },
  ],
};

const pageCTA = {
  headline: "Ready to ease and speed the change you need?",
  paragraph:
    "Tell us whether you are navigating an individual shift, a team inflection point, or an organization-wide transformation. We will match you to the right path.",
  buttons: pageCTAButtons,
};

export default function ServicesV2Page() {
  return (
    <div className={styles.page}>
      <Showcase
        data={{
          backgroundImageUrl: "/action/zoe-54.jpg",
          textTone: "light",
          title: "Services",
          description:
            "We strengthen the human systems that power your business. Choose the level of change—individual, team, or organization—and we’ll guide you to the right path.",
          buttons: [
            {
              label: "Book a consultation",
              linkType: "internal",
              internalPage: { slug: { current: "consultation" } },
              variant: "accent",
            },
            {
              label: "See the service structure",
              linkType: "external",
              externalUrl: "#services",
              variant: "inverted-white",
            },
          ],
        }}
      />

      <Section backgroundColor="secondary-light" paddingTop="medium" paddingBottom="medium">
        <Container type="content">
          <div className={styles.process}>
            <div>
              <Heading level={2} marginBottom={1} lineHeight="more">
                A consistent way of working
              </Heading>
              <Paragraph marginBottom={1}>
                Every service uses three repeatable moves so clients can see how we progress from initial perspective to
                lasting courage.
              </Paragraph>
            </div>
            <div className={styles.processGrid}>
              {process.map((step, idx) => (
                <div key={step.title} className={styles.processCard}>
                  <span className={styles.processNumber}>{idx + 1}</span>
                  <Heading level={3} marginBottom={0.5} color="primary">
                    {step.title}
                  </Heading>
                  <Paragraph>{step.detail}</Paragraph>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section backgroundColor="white" paddingTop="medium" paddingBottom="medium">
        <Container type="content">
          <div className={styles.odModels}>
            <Heading level={2} marginBottom={1} lineHeight="more">
              Organizational development models
            </Heading>
            <Paragraph marginBottom={2}>
              We strengthen the human system leaders are part of, and we offer services for individuals, teams, and
              organizations depending on the situation.
            </Paragraph>
            <div className={styles.odImageWrap}>
              <Image
                src="/illustrations/od-models.svg"
                alt="Organizational development model diagrams"
                fill
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section backgroundColor="white" paddingTop="large" paddingBottom="large">
        <Container type="content">
          <div id="services" className={styles.servicesHeader}>
            <Heading level={2} marginBottom={1} lineHeight="more">
              Services organized by the level of change
            </Heading>
            <Paragraph marginBottom={2}>
              See who each offer is for, how it helps, and the outcomes clients care about most.
            </Paragraph>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <Link key={service.title} href={`/services-v2/${service.slug}`} className={styles.cardLink}>
                <article className={styles.serviceCard}>
                  <div className={styles.serviceHeader}>
                    <span className={styles.level}>{service.level}</span>
                    <Heading level={3} marginBottom={0.5} lineHeight="tight">
                      {service.title}
                    </Heading>
                    <Paragraph marginBottom={1}>{service.summary}</Paragraph>
                  </div>
                  <div className={styles.metaBlock}>
                    <Heading level={4} marginBottom={0.5} color="primary">
                      Ideal for
                    </Heading>
                    <ul>
                      {service.idealFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.metaBlock}>
                    <Heading level={4} marginBottom={0.5} color="primary">
                      Outcomes clients ask for
                    </Heading>
                    <ul>
                      {service.outcomes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.cardFooter}>View the full service →</div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section backgroundColor="secondary" paddingTop="medium" paddingBottom="medium">
        <Container type="content">
          <div className={styles.guidanceSimple}>
            <Heading level={2} marginBottom={1} lineHeight="more">
              Not sure where to start?
            </Heading>
            <Paragraph marginBottom={1}>
              Pick where the friction sits—one leader, a team dynamic, or the whole system—and jump into the right
              starting point.
            </Paragraph>
            <ul className={styles.pathList}>
              {quickPaths.map((path) => (
                <li key={path.title}>
                  <Heading level={4} marginBottom={0.25} color="primary">
                    {path.title}
                  </Heading>
                  <Paragraph marginBottom={0.5}>{path.description}</Paragraph>
                  <ul className={styles.pathHighlights}>
                    {path.highlights.map((item) => (
                      <li key={item}>
                        <Paragraph marginBottom={0}>{item}</Paragraph>
                      </li>
                    ))}
                  </ul>
                  <Link href={path.href} className={styles.pathCtaLink}>
                    <Paragraph marginBottom={0} fontWeight="bold">
                      {path.cta} →
                    </Paragraph>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.capabilitiesSimple}>
              <Heading level={3} marginBottom={0.5} color="primary">
                Capabilities by level
              </Heading>
              <div className={styles.capabilityList}>
                {capabilities.map((group) => (
                  <div key={group.label}>
                    <Paragraph marginBottom={0.25} fontWeight="bold">
                      {group.label}
                    </Paragraph>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>
                          <Paragraph marginBottom={0}>{item}</Paragraph>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section backgroundColor="primary" paddingTop="medium" paddingBottom="medium">
        <CTA
          headline={pageCTA.headline}
          paragraph={pageCTA.paragraph}
          buttons={pageCTA.buttons}
        />
      </Section>
    </div>
  );
}
