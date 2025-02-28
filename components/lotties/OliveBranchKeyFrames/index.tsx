"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "./olive-branch--keyframes.json"; // Adjust path

const OliveBranchKeyFrames = ({ step }: { step: number }) => {
 const lottieRef = useRef<LottieRefCurrentProps | null>(null);

 // ✅ Memoize keyframes to prevent unnecessary re-renders
 const keyframes = useMemo(() => [17, 17, 25, 37, 37], []);

 // Define scaling values for each step
 const scaleValues = [1, 1, 1.5, 2, 2];

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
    animationData={animationData}
    lottieRef={lottieRef} // Attach Lottie instance to ref
    loop={false}
    autoplay={false}
   />
  </motion.div>
 );
};

export default OliveBranchKeyFrames;
