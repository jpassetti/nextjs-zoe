"use client";

import Image from "next/image";
import styles from "./canopy-language-pulse.module.scss";

type CanopyLanguagePulseProps = {
  className?: string;
};

const CanopyLanguagePulse = ({ className }: CanopyLanguagePulseProps) => {
  return (
    <div className={`${styles.scene} ${className || ""}`.trim()}>
      <Image
        src="/plants/greenhouse.svg"
        alt="Greenhouse illustration"
        className={styles.greenhouseIllustration}
        width={520}
        height={520}
      />
    </div>
  );
};

export default CanopyLanguagePulse;
