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

export default function LeadershipJumpstartPage() {
  return (
    <main>
      <Container type="content">
        <Heading level={1}>Leadership Jumpstart</Heading>
        <Paragraph>
          A concentrated Grinnell Leadership immersion paired with coaching to rapidly reset beliefs, habits, and influence
          across your ecosystem.
        </Paragraph>
        <Heading level={3}>Ideal for</Heading>
        <ul>
          <li>Leaders who need traction fast in a new role</li>
          <li>Executives who want a reset after a 360° or assessment</li>
          <li>High-potential talent preparing for a stretch opportunity</li>
        </ul>
        <Heading level={3}>Outcomes</Heading>
        <ul>
          <li>Clear personal thesis for leading through change</li>
          <li>Integrated insights from assessments into daily behaviors</li>
          <li>Momentum plan that connects team, organization, and customers</li>
        </ul>
      </Container>
      <CTA headline={pageCTA.headline} paragraph={pageCTA.paragraph} buttons={pageCTA.buttons} />
    </main>
  )
}
