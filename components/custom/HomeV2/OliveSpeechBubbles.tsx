"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

type OliveSpeechBubblesProps = {
  color: string;
  className?: string;
};

type SvgNode = {
  tagName: "path" | "line" | "circle";
  attrs: Record<string, string>;
  className: string;
};

const SVG_VIEW_BOX = "0 0 846.7 802.8";

const STROKE_DASHARRAYS: Record<string, string> = {
  st0: "12 12 12",
  st1: "8.8 8.8 8.8 8.8 8.8 8.8",
  st2: "7.4 7.4 7.4 7.4",
  st3: "8.8 8.8 8.8 8.8",
  st5: "7.4 7.4 7.4 7.4 7.4 7.4",
};

function loadSvgNodes() {
  return fetch("/experiments/olive-speech-bubbles.svg")
    .then((response) => (response.ok ? response.text() : ""))
    .then((svgText) => {
      if (!svgText) {
        return [] as SvgNode[];
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(svgText, "image/svg+xml");

      return Array.from(doc.querySelectorAll("path, line, circle")).map((element) => ({
        tagName: element.tagName as SvgNode["tagName"],
        className: element.getAttribute("class") || "",
        attrs: Array.from(element.attributes).reduce<Record<string, string>>((accumulator, attribute) => {
          accumulator[attribute.name] = attribute.value;
          return accumulator;
        }, {}),
      }));
    })
    .catch(() => [] as SvgNode[]);
}

function parseFirstMoveY(pathData: string) {
  const match = pathData.match(/[Mm]\s*([-\d.]+)[,\s]+([-\d.]+)/);

  if (!match) {
    return Number.POSITIVE_INFINITY;
  }

  return Number.parseFloat(match[2]) || Number.POSITIVE_INFINITY;
}

function getNodeY(node: SvgNode) {
  if (node.tagName === "circle") {
    return Number.parseFloat(node.attrs.cy) || Number.POSITIVE_INFINITY;
  }

  if (node.tagName === "line") {
    const y1 = Number.parseFloat(node.attrs.y1) || 0;
    const y2 = Number.parseFloat(node.attrs.y2) || 0;
    return (y1 + y2) / 2;
  }

  return parseFirstMoveY(node.attrs.d);
}

function sortNodesByY(nodes: SvgNode[]) {
  return [...nodes].sort((leftNode, rightNode) => getNodeY(leftNode) - getNodeY(rightNode));
}

function isStrokeNode(node: SvgNode) {
  return node.tagName !== "path" || node.className.startsWith("st");
}

function getDasharray(node: SvgNode) {
  return STROKE_DASHARRAYS[node.className] || undefined;
}

function renderDottedLine(node: SvgNode, key: string, color: string, variants: Variants) {
  const x1 = Number.parseFloat(node.attrs.x1) || 0;
  const y1 = Number.parseFloat(node.attrs.y1) || 0;
  const x2 = Number.parseFloat(node.attrs.x2) || 0;
  const y2 = Number.parseFloat(node.attrs.y2) || 0;
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const length = Math.hypot(deltaX, deltaY);
  const spacing = 12;
  const dotCount = Math.max(2, Math.floor(length / spacing));

  return (
    <motion.g key={key} variants={variants}>
      {Array.from({ length: dotCount + 1 }).map((_, dotIndex) => {
        const progress = dotIndex / dotCount;
        const cx = x1 + deltaX * progress;
        const cy = y1 + deltaY * progress;

        return (
          <motion.circle
            key={`${key}-dot-${dotIndex}`}
            cx={cx}
            cy={cy}
            r={3.1}
            fill={color}
          />
        );
      })}
    </motion.g>
  );
}

export default function OliveSpeechBubbles({ color, className }: OliveSpeechBubblesProps) {
  const [nodes, setNodes] = useState<SvgNode[]>([]);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    let isActive = true;

    loadSvgNodes().then((loadedNodes) => {
      if (isActive) {
        setNodes(sortNodesByY(loadedNodes));
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  const parentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.055,
        delayChildren: 0.05,
      },
    },
  };

  const fillVariants: Variants = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const strokeVariants: Variants = {
    hidden: { opacity: 0, pathLength: 0, y: 10 },
    visible: {
      opacity: 1,
      pathLength: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <motion.svg
      viewBox={SVG_VIEW_BOX}
      className={className}
      aria-hidden="true"
      initial="hidden"
      animate={hasEntered ? "visible" : "hidden"}
      onViewportEnter={() => setHasEntered(true)}
      viewport={{ once: true, amount: 0.35 }}
      variants={parentVariants}
    >
      {nodes.map((node, index) => {
        const key = `${node.tagName}-${index}`;

        if (node.tagName === "path") {
          if (isStrokeNode(node)) {
            return (
              <motion.path
                key={key}
                d={node.attrs.d}
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={5}
                strokeDasharray={getDasharray(node)}
                vectorEffect="non-scaling-stroke"
                variants={strokeVariants}
              />
            );
          }

          return (
            <motion.path
              key={key}
              d={node.attrs.d}
              fill={color}
              stroke="none"
              variants={fillVariants}
            />
          );
        }

        if (node.tagName === "line") {
          return renderDottedLine(node, key, color, strokeVariants);
        }

        return (
          <motion.circle
            key={key}
            cx={node.attrs.cx}
            cy={node.attrs.cy}
            r={node.attrs.r}
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={5}
            strokeDasharray={getDasharray(node)}
            vectorEffect="non-scaling-stroke"
            variants={strokeVariants}
          />
        );
      })}
    </motion.svg>
  );
}