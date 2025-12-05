import React from 'react'
import Quiz from '../../components/custom/ServicesV3'
import Container from '@/components/layout/Container'
import Heading from '@/components/html/Heading'
import Paragraph from '@/components/html/Paragraph'

export const metadata = {
  title: 'Services Quiz',
  description: 'Interactive quiz to help visitors find the right services',
}

export default function ServicesV3Page() {
  return (
    <main>
      <Container type="content">
        <div style={{maxWidth:900,margin:'0 auto',padding:'2.5rem 1rem',textAlign:'center'}}>
          <Heading level={1} marginBottom={1} textAlign="center">
            Find the Right Service for You
          </Heading>
          <Paragraph marginBottom={2} textAlign="center">
            Answer a few quick questions and we&apos;ll recommend the best service.
          </Paragraph>
          <Quiz />
        </div>
      </Container>
    </main>
  )
}
