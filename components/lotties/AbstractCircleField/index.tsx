"use client";

import { useMemo, type CSSProperties } from "react";
import LeadershipCore from "@/components/lotties/LeadershipCore";
import styles from "./abstract-circle-field.module.scss";

type AbstractCircleFieldProps = {
  className?: string;
};

type NodePoint = {
  id: number;
  x: number;
  y: number;
  r: number;
};

const WIDTH = 1000;
const HEIGHT = 700;
const NODE_COUNT = 20;
const MIN_DISTANCE = 110;
const GROUP_COUNT = 4;
const CENTER_NODE: NodePoint = {
  id: 999,
  x: WIDTH / 2,
  y: HEIGHT / 2,
  r: 20,
};

const DASH_PATTERNS: Array<[number, number]> = [
  [58, 40],
  [38, 52],
  [16, 34],
  [44, 22],
  [12, 46],
  [28, 60],
];

const seededRandom = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
};

const toStablePx = (value: number) => Number(value.toFixed(3));

const distance = (a: NodePoint, b: NodePoint) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
};

const generateNodes = (count: number) => {
  const rand = seededRandom(912547);
  const nodes: NodePoint[] = [];
  let attempts = 0;

  while (nodes.length < count && attempts < 6000) {
    attempts += 1;
    const angle = rand() * Math.PI * 2;
    const radialBias = Math.sqrt(rand());
    const radius = 150 + radialBias * 250;
    const x = CENTER_NODE.x + Math.cos(angle) * radius;
    const y = CENTER_NODE.y + Math.sin(angle) * radius;

    if (x < 70 || x > WIDTH - 70 || y < 70 || y > HEIGHT - 70) {
      continue;
    }

    const candidate: NodePoint = {
      id: nodes.length,
      x: toStablePx(x),
      y: toStablePx(y),
      r: toStablePx(6 + rand() * 4),
    };

    const tooCloseToCenter = distance(candidate, CENTER_NODE) < 130;
    const tooClose = nodes.some((node) => distance(node, candidate) < MIN_DISTANCE);
    if (!tooClose && !tooCloseToCenter) {
      nodes.push(candidate);
    }
  }

  return nodes;
};

const AbstractCircleField = ({ className }: AbstractCircleFieldProps) => {
  const nodes = useMemo(() => generateNodes(NODE_COUNT), []);

  return (
    <div className={`${styles.scene} ${className || ""}`.trim()}>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className={styles.network} aria-hidden="true" role="presentation">
        {nodes.map((node, index) => {
          const d = distance(node, CENTER_NODE);
          const duration = `${2.2 + (d % 120) / 46}s`;
          const delay = `${(index % 10) * 0.18}s`;
          const groupDelay = `${(node.id % GROUP_COUNT) * 2}s`;
          const pattern = DASH_PATTERNS[(node.id * 7 + Math.floor(d)) % DASH_PATTERNS.length];
          const offset = pattern[0] + pattern[1] + 16;
          const driftX = ((index * 17) % 11) - 5;
          const driftY = ((index * 13) % 9) - 4;
          const driftDuration = `${3 + ((index * 7) % 18) / 10}s`;
          const driftDelay = `${(index % 6) * 0.23}s`;
          const x2Values = `${node.x};${toStablePx(node.x + driftX)};${node.x}`;
          const y2Values = `${node.y};${toStablePx(node.y + driftY)};${node.y}`;
          const lineStyle = {
            "--flow-duration": duration,
            "--flow-delay": delay,
            "--group-delay": groupDelay,
            "--flow-offset": `${offset}`,
            strokeDasharray: `${pattern[0]} ${pattern[1]}`,
          } as CSSProperties;

          return (
            <g key={`edge-${node.id}`}>
              <line
                x1={CENTER_NODE.x}
                y1={CENTER_NODE.y}
                x2={node.x}
                y2={node.y}
                className={styles.linkFlow}
                style={lineStyle}
              >
                <animate
                  attributeName="x2"
                  values={x2Values}
                  dur={driftDuration}
                  begin={driftDelay}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y2"
                  values={y2Values}
                  dur={driftDuration}
                  begin={driftDelay}
                  repeatCount="indefinite"
                />
              </line>
            </g>
          );
        })}

        {nodes.map((node, index) => {
          const driftX = ((index * 17) % 11) - 5;
          const driftY = ((index * 13) % 9) - 4;
          const driftDuration = `${3 + ((index * 7) % 18) / 10}s`;
          const driftDelay = `${(index % 6) * 0.23}s`;
          const cxValues = `${node.x};${toStablePx(node.x + driftX)};${node.x}`;
          const cyValues = `${node.y};${toStablePx(node.y + driftY)};${node.y}`;
          const pulseStyle = {
            "--pulse-delay": `${(index % 7) * 0.21}s`,
            "--group-delay": `${(node.id % GROUP_COUNT) * 2}s`,
          } as CSSProperties;

          return (
            <g key={node.id} style={pulseStyle}>
              <circle className={styles.nodeHalo} cx={node.x} cy={node.y} r={node.r + 6}>
                <animate attributeName="cx" values={cxValues} dur={driftDuration} begin={driftDelay} repeatCount="indefinite" />
                <animate attributeName="cy" values={cyValues} dur={driftDuration} begin={driftDelay} repeatCount="indefinite" />
              </circle>
              <circle className={styles.node} cx={node.x} cy={node.y} r={node.r}>
                <animate attributeName="cx" values={cxValues} dur={driftDuration} begin={driftDelay} repeatCount="indefinite" />
                <animate attributeName="cy" values={cyValues} dur={driftDuration} begin={driftDelay} repeatCount="indefinite" />
              </circle>
              <circle className={styles.nodeActive} cx={node.x} cy={node.y} r={node.r + 0.3}>
                <animate attributeName="cx" values={cxValues} dur={driftDuration} begin={driftDelay} repeatCount="indefinite" />
                <animate attributeName="cy" values={cyValues} dur={driftDuration} begin={driftDelay} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
      </svg>
      <LeadershipCore />
    </div>
  );
};

export default AbstractCircleField;