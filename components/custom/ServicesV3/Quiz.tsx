"use client"
import React, { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
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
  const prefersReducedMotion = useReducedMotion()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const revealTargetRef = useRef<string | null>(null)
  const [navDirection, setNavDirection] = useState<1 | -1>(1)

  const current = questions[step]

  const transition = useMemo(
    () => ({ duration: prefersReducedMotion ? 0 : 0.28, ease: 'easeOut' as const }),
    [prefersReducedMotion]
  )

  const cardVariants: Variants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        enter: { opacity: 1, x: 0 },
        center: { opacity: 1, x: 0 },
        exit: { opacity: 1, x: 0 },
      }
    }

    return {
      enter: (direction: 1 | -1) => ({
        opacity: 0,
        x: 24 * direction,
      }),
      center: {
        opacity: 1,
        x: 0,
      },
      exit: (direction: 1 | -1) => ({
        opacity: 0,
        x: -24 * direction,
      }),
    }
  }, [prefersReducedMotion])

  const optionListVariants: Variants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 1 },
        show: { opacity: 1 },
      }
    }

    return {
      hidden: { opacity: 1 },
      show: {
        opacity: 1,
        transition: {
          delayChildren: 0.06,
          staggerChildren: 0.05,
        },
      },
    }
  }, [prefersReducedMotion])

  const optionItemVariants: Variants = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 1, x: 0 },
        show: { opacity: 1, x: 0 },
      }
    }

    return {
      hidden: { opacity: 0, x: 10 },
      show: { opacity: 1, x: 0, transition: { duration: 0.18, ease: 'easeOut' } },
    }
  }, [prefersReducedMotion])

  function choose(optionId: string) {
    setAnswers(prev => ({ ...prev, [current.id]: optionId }))
  }

  function goNext() {
    if (!answers[current.id]) return
    setNavDirection(1)
    setStep(s => Math.min(s + 1, questions.length))
  }

  function goBack() {
    setNavDirection(-1)
    setStep(s => Math.max(0, s - 1))
  }

  function finish() {
    if (submitting) return
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

    // Show a short reveal animation before navigation.
    revealTargetRef.current = target
    setNavDirection(1)
    setIsRevealing(true)

    const revealDelayMs = prefersReducedMotion ? 0 : 1200
    setTimeout(() => {
      setSubmitting(false)
      router.push(revealTargetRef.current || target)
    }, revealDelayMs)
  }

  if (isRevealing) {
    return (
      <div className={styles.container}>
        <AnimatePresence mode="wait">
          <motion.div
            key="reveal"
            className={styles.card}
            variants={cardVariants}
            custom={navDirection}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <div className={styles.reveal}>
              <Heading level={3} marginBottom={1} textAlign="center">
                Great — you’re done.
              </Heading>
              <Paragraph marginBottom={2} textAlign="center">
                Revealing your best match…
              </Paragraph>

              <div className={styles.revealBar} aria-hidden>
                <motion.div
                  className={styles.revealBarFill}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 1.0, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  if (step >= questions.length) {
    return (
      <div className={styles.container}>
        <AnimatePresence mode="wait">
          <motion.div
            key="summary"
            className={styles.card}
            variants={cardVariants}
            custom={navDirection}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <div className={styles.result}>
              <Heading level={3} marginBottom={1} textAlign="center">
                Ready — find the right service
              </Heading>
              <Paragraph marginBottom={2} textAlign="center">
                We have a recommendation based on your answers.
              </Paragraph>
              <Button.Group justifyContent="center">
                <Button.Step
                  clickHandler={() => {
                    setNavDirection(-1)
                    setStep(0)
                  }}
                  label="Start over"
                />
                <Button.Step
                  clickHandler={finish}
                  label={submitting ? 'Preparing…' : 'Reveal recommendation'}
                  variant="primary"
                  disabled={submitting}
                />
              </Button.Group>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Heading level={4} marginBottom={0} className={styles.question}>
          {current.text}
        </Heading>
        <Paragraph type="caption" className={styles.progress}>
          Step {step + 1} of {questions.length}
        </Paragraph>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          className={styles.card}
          variants={cardVariants}
          custom={navDirection}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
        >
          <motion.ul
            className={styles.options}
            variants={optionListVariants}
            initial="hidden"
            animate="show"
          >
            {current.options.map(o => (
              <motion.li key={o.id} className={styles.option} variants={optionItemVariants}>
                <label className={styles.optionLabel} data-checked={answers[current.id] === o.id}>
                  <input
                    type="radio"
                    name={current.id}
                    checked={answers[current.id] === o.id}
                    onChange={() => choose(o.id)}
                    className={styles.optionInput}
                  />
                  <span className={styles.optionIndicator} aria-hidden />
                  <span className={styles.optionContent}>
                    <span className={styles.optionText}>{o.text}</span>
                  </span>
                </label>
              </motion.li>
            ))}
          </motion.ul>
          <div className={styles.controls}>
            <Button.Step clickHandler={goBack} label="Back" variant="secondary" disabled={step === 0} />
            {step < questions.length - 1 ? (
              <Button.Step clickHandler={goNext} label="Next" variant="primary" disabled={!answers[current.id]} />
            ) : (
              <Button.Step
                clickHandler={goNext}
                label={submitting ? 'Submitting…' : 'Finish'}
                variant="primary"
                disabled={!answers[current.id] || submitting}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
