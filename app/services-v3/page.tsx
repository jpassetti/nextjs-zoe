import React from 'react'
import Quiz from '../../components/custom/ServicesV3'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import FlowHeader from '@/components/custom/ServicesV3/FlowHeader'

export const metadata = {
  title: 'Services Quiz',
  description: 'Interactive quiz to help visitors find the right services',
}

export default function ServicesV3Page() {
  return (
    <main>
      <Section backgroundColor="white" paddingTop="large" paddingBottom="large">
        <Container type="content">
          <FlowHeader
            title="Find the Right Service for You"
            subtitle="Answer a few quick questions and we’ll recommend the best service."
          />
          <Quiz />
        </Container>
      </Section>
    </main>
  )
}
