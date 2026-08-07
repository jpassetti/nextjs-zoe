"use client";

import styles from "./leadership-core.module.scss";

type LeadershipCoreProps = {
  className?: string;
  pressure?: boolean;
};

const LeadershipCore = ({ className, pressure = false }: LeadershipCoreProps) => {
  return (
    <div
      className={`${styles.coreShell} ${pressure ? styles.pressureCoreShell : ""} ${className || ""}`.trim()}
      aria-hidden="true"
    >
      <span className={`${styles.halo} ${pressure ? styles.pressureHalo : ""}`} />
      <span className={`${styles.ring} ${pressure ? styles.pressureRing : ""}`} />
      <span className={`${styles.core} ${pressure ? styles.pressureCore : ""}`} />
    </div>
  );
};

export default LeadershipCore;