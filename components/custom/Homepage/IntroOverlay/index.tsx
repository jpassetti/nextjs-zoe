import { motion } from "framer-motion"; // Import motion for animation

import OliveBranch from "@/components/lotties/OliveBranch"; // Import the OliveBranch component
import Wordmark from "@/components/lotties/Wordmark"; // Import the Wordmark component
import styles from "./introoverlay.module.scss";

const IntroOverlay = () => {
 return (
  <motion.div
   className={styles.intro_overlay}
   initial={{ scale: 0 }} // Start from 0 scale
   animate={{
    scale: 1, // Animate to full scale
    transition: { duration: 1 }, // Animation duration for scaling
   }}
   exit={{
    opacity: 0, // Fade out when exiting
   }}
  >
   <OliveBranch />
   <motion.div
    initial={{ opacity: 0 }} // Start from 0 opacity
    animate={{
     opacity: 1, // Animate to full opacity
     transition: {
      duration: 1,
      delay: 1, // Delay the animation
     }, // Animation duration for opacity
    }}
   >
    <Wordmark />
   </motion.div>
  </motion.div>
 );
};

export default IntroOverlay;
