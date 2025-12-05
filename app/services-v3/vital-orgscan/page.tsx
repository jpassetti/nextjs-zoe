import React from 'react'
import Container from '@/components/layout/Container'
import Heading from '@/components/html/Heading'
import Paragraph from '@/components/html/Paragraph'
import CTA from '@/components/custom/CTA'

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
      <Container type="content">
        <Heading level={1}>Organizational Scan</Heading>
        <Paragraph>
          A systems view of your organization that surfaces friction across people, process, and culture—with pragmatic
          moves to ease and speed positive change.
        </Paragraph>
        <Heading level={3}>Ideal for</Heading>
        <ul>
          <li>Growth-stage companies moving from heroic efforts to repeatable systems</li>
          <li>Organizations preparing for scaling, integration, or transformation</li>
          <li>Leaders who need an objective read before investing in change</li>
        </ul>
        <Heading level={3}>Outcomes</Heading>
        <ul>
          <li>Clear change priorities tied to business goals</li>
          <li>Recommendations across individuals, teams, and organizational design</li>
          <li>Roadmap for the first 90 days of focused action</li>
        </ul>
      </Container>
      <CTA headline={pageCTA.headline} paragraph={pageCTA.paragraph} buttons={pageCTA.buttons} />
    </main>
  )
}
