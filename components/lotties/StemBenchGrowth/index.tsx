"use client";

import Image from "next/image";
import styles from "./stem-bench-growth.module.scss";

type StemBenchGrowthProps = {
  className?: string;
};

const StemBenchGrowth = ({ className }: StemBenchGrowthProps) => {
  return (
    <div className={`${styles.scene} ${className || ""}`.trim()}>
      <Image
        src="/plants/plants-hierarchy.svg"
        alt="Plant hierarchy illustration"
        className={styles.hierarchyIllustration}
        width={520}
        height={520}
      />
    </div>
  );
};

export default StemBenchGrowth;
