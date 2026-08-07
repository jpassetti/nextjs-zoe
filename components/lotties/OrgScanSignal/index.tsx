"use client";

import dynamic from "next/dynamic";
import animationData from "./orgscan-signal.json";
import LeadershipCore from "@/components/lotties/LeadershipCore";
import styles from "./orgscan-signal.module.scss";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type OrgScanSignalProps = {
  className?: string;
};

const OrgScanSignal = ({ className }: OrgScanSignalProps) => {
  return (
    <div className={`${styles.scene} ${className || ""}`.trim()}>
      <Lottie animationData={animationData} loop autoplay />
      <LeadershipCore />
    </div>
  );
};

export default OrgScanSignal;
