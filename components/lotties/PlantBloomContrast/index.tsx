"use client";

import Image from "next/image";
import styles from "./plant-bloom-contrast.module.scss";

type PlantBloomContrastProps = {
  className?: string;
};

const PlantBloomContrast = ({ className }: PlantBloomContrastProps) => {
  return (
    <div className={`${styles.scene} ${className || ""}`.trim()}>
      <figure className={styles.singlePlant} aria-hidden="true">
        <Image
          src="/plants/plants--contrast.svg"
          alt="Plant contrast illustration"
          className={styles.plantAsset}
          width={520}
          height={520}
        />
      </figure>
    </div>
  );
};

export default PlantBloomContrast;
