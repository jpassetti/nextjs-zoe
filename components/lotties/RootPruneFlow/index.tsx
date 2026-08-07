"use client";

import Image from "next/image";
import styles from "./root-prune-flow.module.scss";

type RootPruneFlowProps = {
  className?: string;
};

const RootPruneFlow = ({ className }: RootPruneFlowProps) => {
  return (
    <div className={`${styles.scene} ${className || ""}`.trim()}>
      <Image
        src="/plants/plant--pruned.svg"
        alt="Pruned plant illustration"
        className={styles.prunedIllustration}
        width={520}
        height={520}
      />
    </div>
  );
};

export default RootPruneFlow;
