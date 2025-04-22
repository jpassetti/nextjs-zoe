"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import whiteAnimationData from "./olive-branch--keyframes--white.json"; // Adjust path
import mauveAnimationData from "./olive-branch--keyframes--mauve.json"; // Adjust path

interface OliveBranchKeyFramesProps {
  step: number;
  fill?: "white" | "mauve"; // Restrict fill to "white" or "mauve"
}
const OliveBranchKeyFrames: React.FC<OliveBranchKeyFramesProps> = ({ step, fill }) => { const lottieRef = useRef<LottieRefCurrentProps | null>(null);

 // ✅ Memoize keyframes to prevent unnecessary re-renders
 const keyframes = useMemo(() => [17, 25, 37], []);

 // Define scaling values for each step
 const scaleValues = [1, 1.5, 2];

 useEffect(() => {
  if (lottieRef.current) {
   lottieRef.current.playSegments(
    [keyframes[step - 1] || 0, keyframes[step]],
    true
   );
  }
 }, [step, keyframes]); // ✅ No unnecessary re-renders now

 return (
  <motion.div
   style={{ width: 300, height: 300 }}
   animate={{ scale: scaleValues[step] }}
   transition={{ duration: 0.5, ease: "easeOut" }}
  >
   <Lottie
    animationData={fill === "white" ? whiteAnimationData : mauveAnimationData}
    lottieRef={lottieRef} // Attach Lottie instance to ref
    loop={false}
    autoplay={false}
   />
  </motion.div>
 );
};

export default OliveBranchKeyFrames;
