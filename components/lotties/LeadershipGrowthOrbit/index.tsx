"use client";

import LeadershipCore from "@/components/lotties/LeadershipCore";
import styles from "./leadership-growth-orbit.module.scss";

type LeadershipGrowthOrbitProps = {
  className?: string;
};

const orbiters = [
  { id: 1, near: "86px", far: "132px", angle: "8deg", spin: "9.4s" },
  { id: 2, near: "94px", far: "146px", angle: "52deg", spin: "10.8s" },
  { id: 3, near: "88px", far: "136px", angle: "102deg", spin: "9.8s" },
  { id: 4, near: "98px", far: "154px", angle: "150deg", spin: "11.6s" },
  { id: 5, near: "92px", far: "142px", angle: "204deg", spin: "10.2s" },
  { id: 6, near: "84px", far: "128px", angle: "258deg", spin: "9.2s" },
  { id: 7, near: "96px", far: "152px", angle: "304deg", spin: "11.1s" },
  { id: 8, near: "90px", far: "138px", angle: "334deg", spin: "10s" },
];

const softOrbiters = [
  { id: 1, near: "116px", far: "176px", angle: "24deg", spin: "13.5s" },
  { id: 2, near: "124px", far: "186px", angle: "126deg", spin: "12.4s" },
  { id: 3, near: "120px", far: "180px", angle: "216deg", spin: "14.1s" },
  { id: 4, near: "112px", far: "170px", angle: "300deg", spin: "12.8s" },
];

const LeadershipGrowthOrbit = ({ className }: LeadershipGrowthOrbitProps) => {
  return (
    <div className={`${styles.scene} ${className || ""}`.trim()}>
      <div className={styles.coreStage}>
        <LeadershipCore />
      </div>

      {orbiters.map((orb, index) => (
        <div
          key={`orb-${orb.id}`}
          className={styles.orbSpinner}
          style={
            {
              "--orbit-spin": orb.spin,
              "--orbit-delay": `${index * 0.2}s`,
            } as React.CSSProperties
          }
        >
          <div
            className={styles.orbTrack}
            style={
              {
                "--orbit-angle": orb.angle,
                "--orbit-near": orb.near,
                "--orbit-far": orb.far,
              } as React.CSSProperties
            }
          >
            <span className={styles.orb} />
          </div>
        </div>
      ))}

      {softOrbiters.map((orb, index) => (
        <div
          key={`soft-orb-${orb.id}`}
          className={styles.orbSpinnerSoft}
          style={
            {
              "--orbit-spin": orb.spin,
              "--orbit-delay": `${index * 0.28}s`,
            } as React.CSSProperties
          }
        >
          <div
            className={styles.orbTrack}
            style={
              {
                "--orbit-angle": orb.angle,
                "--orbit-near": orb.near,
                "--orbit-far": orb.far,
              } as React.CSSProperties
            }
          >
            <span className={styles.orbSoft} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadershipGrowthOrbit;