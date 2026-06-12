"use client";

import { motion } from "framer-motion";

type OliveLeafProps = {
  color: string;
  className?: string;
};

const LEAF_PATH_D =
  "M179.5,0c0,0,.1.3.2.3h5.2c39.6,2.3,77.2,9.6,115.5,20.2,18.5,5.1,36.8,10.7,54.9,17.1l27.1,9.6-25,11.5-4.7,2.3-23.1,9c-47,16.6-100.5,28.2-150.3,30.2l-6.2.2h-17s-6.4-.3-6.4-.3c-31.8-1.3-64.5-7.3-94-19.6-14.1-5.9-27.5-13-39.8-21.8L0,47.5v-1.7s15.9-8.4,15.9-8.4C56.9,14.7,100.9,2.9,147.7.4l5.5-.4h26.4ZM168.1,77.3c20-.2,39.6-2.1,59.2-5.2,31.4-5,62.1-12.9,92.1-23.5-17.5-5.4-34.6-10-52-14.1-16.7-3.8-33.4-7-50.4-9.2-17.8-2.3-35.6-3.6-53.5-3.4-42.1.3-82.9,8.3-121.4,26.4,24.6,14,51.3,22.1,79.2,26.1,15.5,2.2,31,3,46.9,2.9Z";

export default function OliveLeaf({ color, className }: OliveLeafProps) {
  return (
    <motion.svg
      viewBox="-70 -38 522.4 176.4"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={{ scaleY: 0.58, scaleX: [0.58, 0.8] }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <path d={LEAF_PATH_D} fill={color} stroke="none" />
      </motion.g>
    </motion.svg>
  );
}