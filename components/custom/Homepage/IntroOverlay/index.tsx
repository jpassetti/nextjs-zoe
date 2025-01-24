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
    y: "-100%", // Move to -100% on the y-axis to hide
    transition: { duration: 1 }, // Animation duration for exit
   }}
  >
   <OliveBranch />
   <Wordmark />
  </motion.div>
 );
};

export default IntroOverlay;
