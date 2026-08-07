"use client";

import LeadershipCore from "@/components/lotties/LeadershipCore";
import styles from "./coaching-fusion.module.scss";

type CoachingFusionProps = {
  className?: string;
};

const CoachingFusion = ({ className }: CoachingFusionProps) => {
  return (
    <div className={`${styles.scene} ${className || ""}`.trim()}>
      <div className={styles.partnerLayer}>
        <div className={`${styles.circle} ${styles.circleLeft}`} />
        <div className={`${styles.circle} ${styles.circleRight}`} />
      </div>

      <svg viewBox="0 0 320 180" className={styles.bridgeLayer} aria-hidden="true" role="presentation">
        <line className={`${styles.bridgeFlow} ${styles.bridgeFlowLong}`} x1="62" y1="70" x2="258" y2="70" />

        <line className={`${styles.bridgeFlow} ${styles.bridgeFlowMedium}`} x1="62" y1="90" x2="258" y2="90" />

        <line className={`${styles.bridgeFlow} ${styles.bridgeFlowShort}`} x1="62" y1="110" x2="258" y2="110" />
      </svg>

      <div className={styles.fusionGlow} />
      <LeadershipCore className={styles.coreMark} />

      <div className={`${styles.spark} ${styles.sparkOne}`} />
      <div className={`${styles.spark} ${styles.sparkTwo}`} />
      <div className={`${styles.spark} ${styles.sparkThree}`} />
      <div className={`${styles.spark} ${styles.sparkFour}`} />
    </div>
  );
};

export default CoachingFusion;