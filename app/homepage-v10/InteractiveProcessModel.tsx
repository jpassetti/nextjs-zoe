"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import styles from "./homepage-v10.module.scss";

export type ProcessType = "coaching" | "jumpstart" | "orgscan" | "decathlon";

const processes = {
  coaching: [
    ["Kickoff", "Align on objectives and commitment. Intake interview."],
    ["Awareness", "Personality self-assessments (MBTI, PRF) and a verbal 360° Image Study or Leadership JumpStart®."],
    ["Alignment", "Develop the coaching plan, review it with the manager when applicable, and schedule the coaching sessions."],
    ["Accountable action", "Gain clarity through the loopback process, complete homework between sessions, and notice where momentum lags."],
  ],
  jumpstart: [
    ["Pre-work", "Online 360° Image Study, personality self-assessments, and Manager Compass™."],
    ["Workshop", "Group learning with 9–12 leaders, intensive facilitation, real-situation mapping, and a customized plan."],
    ["Integration", "A one-month group reconnect and a 60-minute coaching session focused on implementing the plan."],
  ],
  orgscan: [
    ["Kickoff", "The CEO and Consultant discuss the process, followed by a commitment meeting with the Executive Team."],
    ["Awareness", "An organization-wide 360° Image Study, anonymous interviews, and an anonymized report with recommendations."],
    ["Alignment", "Preparation for the executive retreat, followed by team alignment, accountability-mapping, and strategic execution planning."],
    ["Accountable action", "Organization-wide loopback, execution-plan finalization, and implementation support with quarterly meetings and coaching."],
  ],
  decathlon: [
    ["Kickoff", "Orient the Executive Leadership Team, establish Decathlete commitment, and initiate the development process together."],
    ["Awareness", "A three-day Leadership Activation Workshop creates a learning community, establishes trust, and networks Decathletes."],
    ["Alignment", "Ten monthly consulting sessions with reporting, homework, and rotating Q&A with executive leaders."],
    ["Advanced leadership", "A two-day Leadership Activation Workshop for Decathletes."],
    ["Ethics Session & graduation", "A one-day session with executives and Decathletes."],
  ],
} satisfies Record<ProcessType, readonly (readonly [string, string])[]>;

export default function InteractiveProcessModel({ type }: { type: ProcessType }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const steps = processes[type];

  return (
    <div className={styles.interactiveProcess}>
      <motion.div
        className={`${styles.processSteps} ${styles[`processSteps_${type}`]}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.11 } } }}
        aria-label={`${type} process steps`}
      >
        {steps.map(([label], index) => (
          <motion.button
            type="button"
            className={`${styles.processStepButton} ${active === index ? styles.processStepActive : ""}`}
            key={label}
            onClick={() => setActive(index)}
            onFocus={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
            aria-pressed={active === index}
            variants={{
              hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
              visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.48 } },
            }}
          >
            <span>0{index + 1}</span>
            <strong>{label}</strong>
          </motion.button>
        ))}
      </motion.div>

      <div className={styles.processDetail} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`${type}-${active}`}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            {steps[active][1]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
