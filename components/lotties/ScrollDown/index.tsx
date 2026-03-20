"use client";

import dynamic from "next/dynamic";
import animationData from "./scroll-down.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type ScrollDownProps = {
  size?: number;
};

const ScrollDown = ({ size = 48 }: ScrollDownProps) => {
  return (
    <div style={{ width: size, height: size }}>
      <Lottie animationData={animationData} loop />
    </div>
  );
};

export default ScrollDown;
