import { notFound } from "next/navigation";

import Heading from "@/components/html/Heading";
import Paragraph from "@/components/html/Paragraph";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import CTA from "@/components/custom/CTA";
import Showcase from "@/components/custom/Showcase";

import styles from "./detail.module.scss";

type ServiceDetail = {
  slug: string;
  level: "Individuals" | "Teams" | "Organizations";
  title: string;
  intro: string;
  approach: string;
  idealFor: string[];
  outcomes: string[];
  phases: { title: string; items: string[] }[];
};

const services: ServiceDetail[] = [
  {
    slug: "leadership-coaching",
    level: "Individuals",
    title: "Leadership Coaching",
    intro:
      "Thought-provoking coaching that links personal growth to organizational impact. Confidential, direct, and built around change-action objectives.",
    approach:
      "We help leaders navigate uncertainty through self-discovery, feedback, and practical experiments that stick. Every plan ties back to the outcomes your organization needs now.",
    idealFor: [
      "Leaders entering bigger roles or new mandates",
      "Executives preparing for succession or post-merger integration",
      "Founders who need clarity while the business evolves",
    ],
    outcomes: [
      "Sharper decision-making anchored in strategy",
      "Actionable commitments tied to stakeholder feedback",
      "Momentum that holds under pressure and change",
    ],
    phases: [
      {
        title: "Commitment & Kickoff",
        items: ["Align objectives and commitment", "Intake interview to map goals and context"],
      },
      {
        title: "Perspective",
        items: [
          "Personality self-assessments (MBTI, PRF)",
          "360° Leadership Study or Grinnell Leadership JumpStart® experience",
        ],
      },
      {
        title: "Integrity",
        items: [
          "Coaching plan based on your situation and new insights",
          "Manager review plus periodic check-ins",
          "Bi-weekly or monthly 2-hour sessions, 3–6 month duration (customizable)",
        ],
      },
      {
        title: "Courage",
        items: [
          "Loopback on 360° insights to build accountability",
          "Targeted homework between sessions; track where momentum lags",
          "Coach provides high-level engagement updates to manager",
        ],
      },
    ],
  },
  {
    slug: "leadership-jumpstart",
    level: "Individuals",
    title: "Leadership Jumpstart®",
    intro:
      "A four-day off-site immersion in Wilmington, NC that rapidly resets beliefs, habits, and influence for leaders in transition.",
    approach:
      "Experiential, facilitated adult learning with real situations—not hypotheticals. Cohort-based with 9–12 leaders from different companies, guided by seasoned consultants.",
    idealFor: [
      "Executives and senior leaders who need traction fast",
      "Leaders transitioning into new roles",
      "High-potential managers preparing for greater responsibility",
    ],
    outcomes: [
      "Integrated insights from assessments into daily leadership",
      "A concrete plan aligned to your team’s priorities",
      "A trusted peer network and Human Systems certification (44 hrs)",
    ],
    phases: [
      {
        title: "Pre-work",
        items: [
          "Online 360° Leadership Study with anonymized feedback",
          "Personality self-assessments (MBTI, FIRO-B, PRF)",
          "Manager Compass™ to align on expectations",
        ],
      },
      {
        title: "Workshop",
        items: [
          "Four-day immersion with up to 12 leaders",
          "Mapping a real situation to build your plan",
          "Facilitated by two consultants per day; earns 44-hour Human Systems certification",
        ],
      },
      {
        title: "Integration",
        items: [
          "1-month group reconnection with consultants and peers",
          "60-minute coaching session to implement the plan",
          "Feedback loopback to reinforce new behaviors",
        ],
      },
    ],
  },
  {
    slug: "vital-orgscan",
    level: "Organizations",
    title: "Vital OrgScan™",
    intro:
      "An appreciative inquiry-based scan that surfaces friction across people, process, and culture—then aligns executives on a clear path forward.",
    approach:
      "We gather anonymous insights, facilitate direct dialogue, and convert findings into a roadmap that strengthens trust, alignment, and execution.",
    idealFor: [
      "Organizations preparing for scaling, integration, or transformation",
      "Executive teams that need an objective read before investing in change",
      "Leaders seeking a safe channel for candid feedback",
    ],
    outcomes: [
      "Clear priorities tied to business goals",
      "Executive alignment on commitments and accountability",
      "Roadmap for execution with built-in loopbacks to employees",
    ],
    phases: [
      {
        title: "Commitment & Kickoff",
        items: ["Overview and process with CEO", "Alignment meeting with CEO and executive team"],
      },
      {
        title: "Perspective",
        items: [
          "360° Leadership Study",
          "Anonymous interviews with key employees selected by the executive team",
          "Anonymized report with insights and recommendations",
        ],
      },
      {
        title: "Integrity",
        items: [
          "CEO and consultant prep for executive retreat",
          "OrgScan™ retreat: alignment, accountability-mapping, strategic execution planning",
        ],
      },
      {
        title: "Courage",
        items: [
          "Loopback with employees on decisions and commitments",
          "Finalized execution plan",
          "Quarterly meetings and coaching to support implementation",
        ],
      },
    ],
  },
  {
    slug: "leadership-decathlon",
    level: "Organizations",
    title: "Leadership Decathlon®",
    intro:
      "A year-long program with ten learning sessions that accelerates high-potential managers and emerging leaders while strengthening the organization.",
    approach:
      "Executive involvement, strategy alignment, and a blend of formal learning with applied practice. Named for the resilience and versatility it builds.",
    idealFor: [
      "High-potential managers ready for bigger responsibility",
      "Organizations that want executive-sponsored leadership development",
      "Teams that need shared norms and stretch assignments to grow",
    ],
    outcomes: [
      "Leaders who operate with discipline, versatility, and ethics",
      "Development tied directly to organizational goals",
      "A pipeline of ready-now talent across critical functions",
    ],
    phases: [
      {
        title: "Commitment & Kickoff",
        items: [
          "Executive alignment on outcomes, roles, expectations",
          "Select and invite decathletes; kickoff with executives and participants",
        ],
      },
      {
        title: "Perspective",
        items: [
          "Initiative development with a 3-day Leadership Activation Workshop (LAW)",
          "Build trust, network decathletes, and map real challenges",
        ],
      },
      {
        title: "Integrity",
        items: [
          "Monthly consultant sessions with reporting and homework",
          "Rotating Q&A with CEO or senior leaders",
        ],
      },
      {
        title: "Courage",
        items: [
          "Advanced leadership with a 2-day LAW",
          "Ethics session and graduation with executives and decathletes",
        ],
      },
    ],
  },
];

const serviceMap = services.reduce<Record<string, ServiceDetail>>((acc, svc) => {
  acc[svc.slug] = svc;
  return acc;
}, {});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceMap[slug];
  if (!service) return {};
  return {
    title: `${service.title} | Services | Transform with Irini`,
    description: service.intro,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceMap[slug];
  if (!service) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Showcase
        data={{
          backgroundImageUrl: "/action/zoe-54.jpg",
          textTone: "light",
          title: service.title,
          description: service.intro,
          buttons: [
            {
              label: "Book this service",
              linkType: "internal",
              internalPage: { slug: { current: "consultation" } },
              variant: "accent",
            },
            {
              label: "Back to services",
              linkType: "internal",
              internalPage: { slug: { current: "services-v2" } },
              variant: "inverted-white",
            },
          ],
        }}
      />

      <Section backgroundColor="white" paddingTop="medium" paddingBottom="medium">
        <Container type="content">
          <div className={styles.highlights}>
            <div className={styles.card}>
              <Heading level={3} marginBottom={0.5} color="primary">
                Approach
              </Heading>
              <Paragraph>{service.approach}</Paragraph>
            </div>
            <div className={styles.card}>
              <Heading level={3} marginBottom={0.5} color="primary">
                Ideal for
              </Heading>
              <ul>
                {service.idealFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.card}>
              <Heading level={3} marginBottom={0.5} color="primary">
                Outcomes
              </Heading>
              <ul>
                {service.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section backgroundColor="secondary-light" paddingTop="medium" paddingBottom="medium">
        <Container type="content">
          <div className={styles.process}>
            <Heading level={2} marginBottom={1} lineHeight="more">
              How it works
            </Heading>
            <div className={styles.processGrid}>
              {service.phases.map((phase) => (
                <div key={phase.title} className={styles.processCard}>
                  <Heading level={4} marginBottom={0.5} color="primary">
                    {phase.title}
                  </Heading>
                  <ul>
                    {phase.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CTA
        headline="Ready to get started?"
        paragraph="Tell us about your current challenge and we’ll confirm the right starting point for you."
        buttons={{
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
        }}
      />
    </div>
  );
}
