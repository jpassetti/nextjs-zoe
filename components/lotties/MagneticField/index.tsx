"use client";

import Image from "next/image";
import styles from "./magnetic-field.module.scss";

type MagneticFieldProps = {
  className?: string;
  motion?: "ambient" | "subtle";
};

const MagneticField = ({ className, motion = "ambient" }: MagneticFieldProps) => {
  const motionClass = motion === "subtle" ? styles.subtleMotion : styles.ambientMotion;

  return (
    <div className={`${styles.field} ${motionClass} ${className || ""}`.trim()}>
      <Image
        src="/plants/plants--small-medium-large.svg"
        alt="Small, medium, and large plants illustration"
        className={styles.plantIllustration}
        width={520}
        height={520}
      />
    </div>
  );
};

export default MagneticField;