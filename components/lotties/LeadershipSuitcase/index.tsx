"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import LeadershipCore from "@/components/lotties/LeadershipCore";
import styles from "./leadership-suitcase.module.scss";

type LeadershipSuitcaseProps = {
  className?: string;
};

type PackedNode = {
  id: number;
  radius: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
};

const CYCLE_MS = 7600;
const ENTRY_DURATION = 0.075;
const SHELL_PADDING = 16;
const PACK_COUNT = 24;
const BASE_SHELL_RADIUS = 42;
const SHELL_STROKE_WIDTH = 3;
const MIN_DOT_RADIUS = 7.5;
const MAX_DOT_RADIUS = 17.5;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const easeOutMagnetic = (t: number) => 1 - Math.pow(1 - t, 3.4);

const seededRandom = (seed: number) => {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
};

const buildPackedNodes = (): PackedNode[] => {
  const rand = seededRandom(220311);
  const boundary = 100;

  const points = Array.from({ length: PACK_COUNT }, (_, idx) => {
    const theta = rand() * Math.PI * 2;
    const r = 8 + rand() * 74;
    const radius = MIN_DOT_RADIUS + rand() * (MAX_DOT_RADIUS - MIN_DOT_RADIUS);
    return {
      id: idx + 1,
      x: Math.cos(theta) * r,
      y: Math.sin(theta) * r,
      radius,
    };
  });

  for (let step = 0; step < 280; step += 1) {
    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.0001;
        const minGap = a.radius + b.radius + 1.4;
        const overlap = minGap - dist;

        if (overlap > 0) {
          const push = (overlap * 0.55) / 2;
          const nx = dx / dist;
          const ny = dy / dist;
          a.x -= nx * push;
          a.y -= ny * push;
          b.x += nx * push;
          b.y += ny * push;
        }
      }
    }

    for (const p of points) {
      p.x *= 0.989;
      p.y *= 0.989;

      const radial = Math.hypot(p.x, p.y);
      const maxRadial = boundary - p.radius;
      if (radial > maxRadial) {
        const s = maxRadial / radial;
        p.x *= s;
        p.y *= s;
      }
    }
  }

  return points
    .sort((a, b) => Math.hypot(a.x, a.y) - Math.hypot(b.x, b.y))
    .map((p, index) => {
      const entryAngle = rand() * Math.PI * 2;
      const startRadius = 190 + rand() * 90;
      return {
        id: p.id,
        radius: p.radius,
        startX: Math.cos(entryAngle) * startRadius,
        startY: Math.sin(entryAngle) * startRadius,
        endX: p.x,
        endY: p.y,
        delay: 0.02 + index * 0.016,
      };
    });
};

const LeadershipSuitcase = ({ className }: LeadershipSuitcaseProps) => {
  const [now, setNow] = useState(0);
  const packedNodes = useMemo(() => buildPackedNodes(), []);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();

    const loop = (time: number) => {
      setNow((time - start) % CYCLE_MS);
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  const phase = now / CYCLE_MS;

  const packedState = useMemo(() => {
    const nodes = packedNodes.map((node) => {
      const tLinear = clamp((phase - node.delay) / ENTRY_DURATION);
      const t = easeOutMagnetic(tLinear);
      const x = lerp(node.startX, node.endX, t);
      const y = lerp(node.startY, node.endY, t);
      return { ...node, t, x, y };
    });

    const footprintRadius = nodes.reduce((maxR, node) => {
      // Use packed target footprint weighted by attraction progress so the
      // suitcase grows as circles are captured, without spiking to entry radius.
      const packedRadial = Math.hypot(node.endX, node.endY) + node.radius;
      const effectiveRadial = packedRadial * node.t;
      return Math.max(maxR, effectiveRadial);
    }, 0);

    const shellRadius = Math.max(
      BASE_SHELL_RADIUS,
      footprintRadius + SHELL_PADDING + SHELL_STROKE_WIDTH / 2
    );

    const maxPackedFootprint = packedNodes.reduce((maxR, node) => {
      const radial = Math.hypot(node.endX, node.endY) + node.radius;
      return Math.max(maxR, radial);
    }, 1);

    const fillRatio = clamp(footprintRadius / maxPackedFootprint);

    return { nodes, shellRadius, fillRatio };
  }, [phase, packedNodes]);

  const shellSize = packedState.shellRadius * 2;

  const sceneStyle = {
    "--shell-size": `${shellSize}px`,
    "--core-scale": `${0.86 + packedState.fillRatio * 0.28}`,
  } as CSSProperties;

  return (
    <div className={`${styles.scene} ${className || ""}`.trim()} style={sceneStyle}>
      <div className={styles.suitcaseShell}>
        <LeadershipCore className={styles.coreMark} />

        {packedState.nodes.map((node) => {
          const nodeStyle = {
            "--dot-x": `${node.x}px`,
            "--dot-y": `${node.y}px`,
            "--dot-size": `${node.radius * 2}px`,
            "--dot-halo": `${Math.max(3, node.radius * 0.55)}px`,
            opacity: node.t,
          } as CSSProperties;

          return <span key={node.id} className={styles.packedDot} style={nodeStyle} />;
        })}
      </div>
    </div>
  );
};

export default LeadershipSuitcase;