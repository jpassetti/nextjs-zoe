"use client";

import type { CSSProperties } from "react";
import styles from "./pressure-magnet.module.scss";
import LeadershipCore from "@/components/lotties/LeadershipCore";

type PressureMagnetProps = {
  className?: string;
};

type MagnetNode = {
  id: string;
  sx: number;
  sy: number;
  tx: number;
  ty: number;
  size: number;
  delay: number;
  duration: number;
  soft?: boolean;
};

const boundaryAngles = [
  -164, -144, -124, -104, -84, -64, -44, -24,
  -4, 16, 36, 56, 76, 96, 116, 136,
  156, 176,
];

const softAngles = [-172, -132, -92, -52, -12, 28, 68, 108, 148, 188];

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toStablePx = (value: number) => Number(value.toFixed(3));

const seededRandom = (seed: number) => {
  let state = seed >>> 0;

  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
};

const hardNodes: MagnetNode[] = boundaryAngles.map((angle, index) => {
  const rand = seededRandom(9411 + index * 17);
  const theta = toRad(angle);
  const radius = 108;
  const entryRadius = 408 + rand() * 74;
  const angularOffset = (rand() - 0.5) * 0.16;
  const entryTheta = theta + angularOffset;
  const sx = toStablePx(Math.cos(entryTheta) * entryRadius);
  const sy = toStablePx(Math.sin(entryTheta) * entryRadius);
  return {
    id: `h${index + 1}`,
    sx,
    sy,
    tx: toStablePx(Math.cos(theta) * radius),
    ty: toStablePx(Math.sin(theta) * radius),
    size: index % 4 === 0 ? 19 : 18,
    delay: 0.02 + index * 0.045 + rand() * 0.32,
    duration: 3.8 + rand() * 0.55,
  };
});

const softNodes: MagnetNode[] = softAngles.map((angle, index) => {
  const rand = seededRandom(11837 + index * 23);
  const theta = toRad(angle);
  const radius = 126;
  const entryRadius = 448 + rand() * 78;
  const angularOffset = (rand() - 0.5) * 0.18;
  const entryTheta = theta + angularOffset;
  const sx = toStablePx(Math.cos(entryTheta) * entryRadius);
  const sy = toStablePx(Math.sin(entryTheta) * entryRadius);
  return {
    id: `s${index + 1}`,
    sx,
    sy,
    tx: toStablePx(Math.cos(theta) * radius),
    ty: toStablePx(Math.sin(theta) * radius),
    size: index % 3 === 0 ? 14 : 13,
    delay: 0.08 + index * 0.07 + rand() * 0.42,
    duration: 4.3 + rand() * 0.7,
    soft: true,
  };
});

const allNodes = [...hardNodes, ...softNodes];

const PressureMagnet = ({ className }: PressureMagnetProps) => {
  return (
    <div className={`${styles.magnetScene} ${className || ""}`}>
      <LeadershipCore className={styles.centerCore} pressure />

      {allNodes.map((node) => {
        const nodeStyle = {
          "--sx": `${node.sx}px`,
          "--sy": `${node.sy}px`,
          "--tx": `${node.tx}px`,
          "--ty": `${node.ty}px`,
          "--node-size": `${node.size}px`,
          "--node-delay": `${node.delay}s`,
          "--node-duration": `${node.duration}s`,
        } as CSSProperties;

        return <div key={node.id} className={node.soft ? styles.dotSoft : styles.dot} style={nodeStyle} />;
      })}
    </div>
  );
};

export default PressureMagnet;
