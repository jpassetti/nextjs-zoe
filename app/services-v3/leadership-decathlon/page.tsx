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

export default function LeadershipDecathlonPage() {
  return (
    <main>
      <Container type="content">
        <Heading level={1}>Decathlon</Heading>
        <Paragraph>
          A team-focused sprint that tests alignment, decision speed, and collaboration so leaders can operate as one
          system, not ten separate performers.
        </Paragraph>
        <Heading level={3}>Ideal for</Heading>
        <ul>
          <li>Executive teams that need to move from consensus to commitment</li>
          <li>Functional teams facing stalled initiatives or siloed execution</li>
          <li>Newly formed teams that must gel quickly</li>
        </ul>
        <Heading level={3}>Outcomes</Heading>
        <ul>
          <li>Shared operating norms that hold under pressure</li>
          <li>Faster, clearer decisions with defined owner/approver roles</li>
          <li>Greater cross-team trust and accountability</li>
        </ul>
      </Container>
      <CTA headline={pageCTA.headline} paragraph={pageCTA.paragraph} buttons={pageCTA.buttons} />
    </main>
  )
}
