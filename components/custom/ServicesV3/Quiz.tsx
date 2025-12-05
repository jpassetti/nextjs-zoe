"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'
import Heading from '@/components/html/Heading'
import Paragraph from '@/components/html/Paragraph'
import Button from '@/components/html/Button'

type Option = { id: string; text: string; services: string[] }
type Question = { id: string; text: string; options: Option[] }

// Questions and option service tags use the actual services-v2 slugs
const questions: Question[] = [
  {
    id: 'q1',
    text: 'Which level best describes the scope of change?',
    options: [
      { id: 'q1a1', text: 'An individual leader (one-to-one coaching)', services: ['leadership-coaching'] },
      { id: 'q1a2', text: 'A leader who needs a fast reset', services: ['leadership-jumpstart'] },
      { id: 'q1a3', text: 'A team that must operate as one system', services: ['leadership-decathlon'] },
      { id: 'q1a4', text: 'A whole-organization read and roadmap', services: ['vital-orgscan'] },
    ],
  },
  {
    id: 'q2',
    text: 'What outcome matters most?',
    options: [
      { id: 'q2a1', text: 'Sharper individual decision-making and accountability', services: ['leadership-coaching'] },
      { id: 'q2a2', text: 'Quick traction and momentum for a leader', services: ['leadership-jumpstart'] },
      { id: 'q2a3', text: 'Faster team decisions and shared norms', services: ['leadership-decathlon'] },
      { id: 'q2a4', text: 'A prioritized change roadmap for the org', services: ['vital-orgscan'] },
    ],
  },
  {
    id: 'q3',
    text: 'How soon do you need results?',
    options: [
      { id: 'q3a1', text: 'Immediate (weeks)', services: ['leadership-jumpstart'] },
      { id: 'q3a2', text: 'Short program (months)', services: ['leadership-coaching', 'leadership-decathlon'] },
      { id: 'q3a3', text: 'System-level assessment and roadmap', services: ['vital-orgscan'] },
    ],
  },
]

export default function Quiz() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const current = questions[step]

  function choose(optionId: string) {
    setAnswers(prev => ({ ...prev, [current.id]: optionId }))
  }

  function goNext() {
    if (!answers[current.id]) return
    setStep(s => Math.min(s + 1, questions.length))
  }

  function goBack() {
    setStep(s => Math.max(0, s - 1))
  }

  function finish() {
    setSubmitting(true)
    // Tally service scores from selected options
    const scores: Record<string, number> = {}
    for (const q of questions) {
      const optId = answers[q.id]
      const opt = q.options.find(o => o.id === optId)
      if (!opt) continue
      for (const svc of opt.services) scores[svc] = (scores[svc] || 0) + 1
    }
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1])
    const winner = ranked[0]?.[0]

    // `winner` is already a services-v2 slug (we tagged options with slugs).
    const target = winner ? `/services-v3/${winner}` : '/services-v3'
    // small delay to show submitting state
    setTimeout(() => {
      setSubmitting(false)
      router.push(target)
    }, 300)
  }

  if (step >= questions.length) {
    return (
      <div className={styles.container}>
        <div className={styles.result}>
          <Heading level={3}>Ready — find the right service</Heading>
          <Paragraph>We have a recommendation based on your answers.</Paragraph>
          <Button.Group justifyContent="flex-end">
            <Button.Step clickHandler={() => setStep(0)} label="Start over" />
            <Button.Step
              clickHandler={finish}
              label={submitting ? 'Redirecting…' : 'View recommendation'}
              variant="primary"
              disabled={submitting}
            />
          </Button.Group>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem', marginBottom: '0.75rem'}}>
            <Heading level={3} marginBottom={0} className={styles.question}>{current.text}</Heading>
            <Paragraph fontWeight="bold" className={styles.progress}>Step {step + 1} of {questions.length}</Paragraph>
          </div>
        <div className={styles.card}>
          <ul className={styles.options}>
            {current.options.map(o => (
              <li key={o.id} className={styles.option}>
                <label>
                  <input
                    type="radio"
                    name={current.id}
                    checked={answers[current.id] === o.id}
                    onChange={() => choose(o.id)}
                  />
                  <span>{o.text}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className={styles.controls}>
            <Button.Step clickHandler={goBack} label="Back" variant="secondary" disabled={step === 0} />
            {step < questions.length - 1 ? (
              <Button.Step clickHandler={goNext} label="Next" variant="primary" disabled={!answers[current.id]} />
            ) : (
              <Button.Step clickHandler={finish} label={submitting ? 'Submitting…' : 'See recommendation'} variant="primary" disabled={!answers[current.id] || submitting} />
            )}
          </div>
        </div>
      </div>
  )
}
