"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import styles from "./homepage-v10.module.scss";

const diagrams = [
  { title: "Leadership in the operating system", labels: ["Human", "Operations", "Tech"] },
  { title: "Leadership in the human system", labels: ["Organization", "Teams", "Individuals"] },
];

function VennDiagram({ title, labels, index }: { title: string; labels: string[]; index: number }) {
  const [active, setActive] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className={styles.vennFigure}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : index * 0.15 }}
    >
      <figcaption>{title}</figcaption>
      <div className={styles.vennCanvas}>
        <motion.div
          className={styles.situationRing}
          initial={{ scale: reduceMotion ? 1 : 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.8 }}
        >
          <span>Situation</span>
        </motion.div>
        {labels.map((label, circleIndex) => (
          <motion.button
            type="button"
            className={`${styles.vennCircle} ${styles[`vennCircle${circleIndex + 1}`]} ${active && active !== label ? styles.vennMuted : ""} ${active === label ? styles.vennActive : ""}`}
            key={label}
            onMouseEnter={() => setActive(label)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(label)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(active === label ? null : label)}
            aria-pressed={active === label}
            initial={{ scale: reduceMotion ? 1 : 0.65, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.18 + circleIndex * 0.12 }}
          >
            <span>{label}</span>
          </motion.button>
        ))}
        <motion.div
          className={styles.vennLeadership}
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.65 }}
        >
          Leadership
        </motion.div>
      </div>
    </motion.figure>
  );
}

export default function LeadershipVenn() {
  return (
    <div className={styles.vennGrid}>
      {diagrams.map((diagram, index) => <VennDiagram {...diagram} index={index} key={diagram.title} />)}
    </div>
  );
}
