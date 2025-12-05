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

export default function LeadershipCoachingPage() {
  return (
    <main>
      <Container type="content">
        <Heading level={1}>Leadership Coaching</Heading>
        <Paragraph>
          Twelve focused sessions that align how you lead with the outcomes your organization needs most. Each journey stays
          grounded in perspective, integrity, and courage.
        </Paragraph>
        <Heading level={3}>Ideal for</Heading>
        <ul>
          <li>Leaders stepping into bigger roles or navigating a new mandate</li>
          <li>Executives preparing for succession or post-merger integration</li>
          <li>Founders who need clarity while the business evolves</li>
        </ul>
        <Heading level={3}>Outcomes</Heading>
        <ul>
          <li>Sharper decision-making anchored in strategy</li>
          <li>Actionable growth commitments tied to stakeholder feedback</li>
          <li>Greater confidence in navigating complex transitions</li>
        </ul>
      </Container>
      <CTA headline={pageCTA.headline} paragraph={pageCTA.paragraph} buttons={pageCTA.buttons} />
    </main>
  )
}
