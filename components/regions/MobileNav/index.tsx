import React from "react";
import Button from "@/components/html/Button";
import Nav from "@/components/regions/Nav";
import { motion } from "framer-motion"; // Import motion from Framer Motion

import styles from "./mobilenav.module.scss";

// Define the types for the component props
interface MobileNavProps {
 closeHandler: () => void; // Type for the function that will close the mobile nav
}

const MobileNav: React.FC<MobileNavProps> = ({ closeHandler }) => {
 return (
  <motion.div
   className={styles.mobile_nav}
   initial={{ x: "100%" }} // Start off-screen (to the right)
   animate={{ x: 0 }} // Slide in from the right
   exit={{ x: "100%" }} // Slide out to the right
   transition={{ duration: 0.3 }} // Duration of the animation
  >
   <Button.UI
    iconProps={{ name: "close" }}
    clickHandler={closeHandler}
    backgroundColor="black"
   />
   <div className={styles.mobile_nav_content}>
    <Nav flexDirection="column" closeHandler={closeHandler} size="large" />
   </div>
  </motion.div>
 );
};

export default MobileNav;
