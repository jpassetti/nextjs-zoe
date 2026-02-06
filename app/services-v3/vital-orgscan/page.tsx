import React from 'react'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import Row from '@/components/layout/Row'
import Col from '@/components/layout/Col'
import Heading from '@/components/html/Heading'
import Paragraph from '@/components/html/Paragraph'
import CTA from '@/components/custom/CTA'
import { Ul, Li } from '@/components/html/List'
import FlowHeader from '@/components/custom/ServicesV3/FlowHeader'
import FlowFooter from '@/components/custom/ServicesV3/FlowFooter'
import ServiceMatchCard from '@/components/custom/ServicesV3/ServiceMatchCard'

const pageCTA = {
  headline: 'Ready to ease and speed the change you need?',
  paragraph:
    'Tell us whether you are navigating an individual shift, a team inflection point, or an organization-wide transformation. We will match you to the right path.',
  buttons: {
    _type: 'buttonBlock' as const,
    buttonGroup: [
      {
        _type: 'button' as const,
        label: 'Schedule a consultation',
        linkType: 'internal' as const,
        internalPage: { slug: { current: 'consultation' } },
        variant: 'secondary' as const,
      },
    ],
  },
}

export default function VitalOrgScanPage() {
  return (
    <main>
      <Section backgroundColor="secondary" paddingTop="large" paddingBottom="large">
        <Container type="content">
          <FlowHeader
            title="Your Service Match"
            subtitle="Based on your answers, here’s the service that best fits what you’re navigating right now."
          />

          <ServiceMatchCard
            title="Organizational Scan"
            summary="A systems view of your organization that surfaces friction across people, process, and culture—with pragmatic moves to ease and speed positive change."
          >
            <Row alignItems="flex-start">
              <Col xs={12} md={6} marginBottom={4}>
                <Heading level={3} marginBottom={1} color="primary">
                  Ideal for
                </Heading>
                <Ul>
                  <Li>Growth-stage companies moving from heroic efforts to repeatable systems</Li>
                  <Li>Organizations preparing for scaling, integration, or transformation</Li>
                  <Li>Leaders who need an objective read before investing in change</Li>
                </Ul>
              </Col>

              <Col xs={12} md={6} marginBottom={4}>
                <Heading level={3} marginBottom={1} color="primary">
                  Outcomes
                </Heading>
                <Ul>
                  <Li>Clear change priorities tied to business goals</Li>
                  <Li>Recommendations across individuals, teams, and organizational design</Li>
                  <Li>Roadmap for the first 90 days of focused action</Li>
                </Ul>
              </Col>
            </Row>
          </ServiceMatchCard>

          <FlowFooter />
        </Container>
      </Section>
      <CTA headline={pageCTA.headline} paragraph={pageCTA.paragraph} buttons={pageCTA.buttons} />
    </main>
  )
}
