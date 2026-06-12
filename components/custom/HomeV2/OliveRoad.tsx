"use client";

import { motion, type Variants } from "framer-motion";
import { useId } from "react";

type OliveRoadProps = {
  color: string;
  className?: string;
};

const ROAD_LINE_PATHS = [
  {
    d: "M11.4,169.3c91.8,13,234.6-129.1,375,16.3",
    strokeWidth: 10,
    strokeDasharray: undefined as string | undefined,
  },
  {
    d: "M10.4,182.2c90.6,19.3,243-112.5,373,42.3",
    strokeWidth: 5,
    strokeDasharray: "12 12 12",
  },
  {
    d: "M10.2,198.1c89.5,24.1,248.7-99.4,370.2,62.1",
    strokeWidth: 10,
    strokeDasharray: undefined as string | undefined,
  },
];

const ROAD_LEAF_PATHS = [
  "M405.6,67.5v16.1c0,.3-.3.8-.2,1.1.2,1.1,0,2.1-.2,3.2-1.7,18.3-6.8,35.6-17.9,50.4l-6.2,7.7-3.1-6.9c-15.2-31.5-13.3-64.1-3.8-97l8.8-25.7,6.5-16.4,4.5,11.8,2.5,6.9c4.7,14.7,7.7,29.7,8.9,45l.3,3.8h0ZM396.2,78.3c.1-17.1-2.5-34.1-7-50.6-3.9,10.6-7,20.8-9.3,31.5-2.2,10.2-3.4,20.4-3.4,30.9.2,12.6,2.2,24.9,6.9,36.9,9.2-14.7,12.5-31.6,12.8-48.7Z",
  "M24.9,138.5l-6.2,9.1-4-7.4C4.1,120.6-.3,102.6,0,80s1.3-20.2,3.3-30.2c2-10,4.2-19.4,7.2-29L16.6,1.4l5.3,11.2c1.1,2.4,2.1,4.5,3.2,7,5.5,13.7,9.5,27.9,11.7,42.6,4,25.8,2.4,53.6-11.9,76.2h0ZM19.7,128.3c3.6-6.7,5.8-13.4,7.3-20.5,1.4-6.7,2-13.3,2.1-20.2,0-9.1-.8-17.9-2.4-26.9-2-10.8-4.7-21.1-8.5-31.7-4.3,14.6-7.2,29.1-8.3,44-1.2,19.1,1.4,38,9.7,55.3h.1Z",
];

const ROAD_VIEWBOX_WIDTH = 405.7;
const ROAD_VIEWBOX_HEIGHT = 263.2;

export default function OliveRoad({ color, className }: OliveRoadProps) {
  const clipPrefix = useId().replace(/:/g, "");

  const leafVariants: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut", delay: 0.75 + index * 0.1 },
    }),
  };

  const lineClipVariants: Variants = {
    hidden: { width: 0 },
    visible: (index: number) => ({
      transition: {
        duration: 1.05,
        ease: "easeInOut",
        delay: index * 0.2,
      },
      width: ROAD_VIEWBOX_WIDTH,
    }),
  };

  return (
    <motion.svg
      viewBox={`0 0 ${ROAD_VIEWBOX_WIDTH} ${ROAD_VIEWBOX_HEIGHT}`}
      className={className}
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <defs>
        {ROAD_LINE_PATHS.map((_, index) => (
          <clipPath key={`road-line-clip-${index}`} id={`${clipPrefix}-road-line-clip-${index}`}>
            <motion.rect
              x={0}
              y={0}
              height={ROAD_VIEWBOX_HEIGHT}
              variants={lineClipVariants}
              custom={index}
            />
          </clipPath>
        ))}
      </defs>
      {ROAD_LINE_PATHS.map((line, index) => (
        <motion.path
          key={`road-line-${index}`}
          d={line.d}
          fill="none"
          stroke={color}
          strokeWidth={line.strokeWidth}
          strokeMiterlimit={10}
          strokeDasharray={line.strokeDasharray}
          clipPath={`url(#${clipPrefix}-road-line-clip-${index})`}
        />
      ))}
      {ROAD_LEAF_PATHS.map((d, index) => (
        <motion.path
          key={`road-leaf-${index}`}
          d={d}
          fill={color}
          stroke="none"
          variants={leafVariants}
          custom={index}
        />
      ))}
    </motion.svg>
  );
}