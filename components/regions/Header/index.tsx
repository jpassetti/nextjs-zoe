"use client";
import { useState } from "react";
import { useViewport } from "@/lib/context/ViewportContext"; // Adjust path if needed
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence from Framer Motion

import Button from "@/components/html/Button";
import MobileNav from "@/components/regions/MobileNav";
import Nav from "@/components/regions/Nav";
import Row from "@/components/layout/Row";

import styles from "./header.module.scss";

// Define the types for the component props if needed
const Header: React.FC = () => {
 // Destructure isDesktop from the viewport context
 const { isDesktop } = useViewport();

 // State for controlling the mobile menu
 const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

 return (
  <header className={styles.header}>
   <h1 className={styles.wordmark}>
    Transform <span>with Irini</span>
   </h1>

   {isDesktop && (
    <Row alignItems="center" gap={3} className={styles.header_desktop_nav}>
     <Nav />
     <Button.Group>
      <Button href="/contact" label="Schedule a consultation" type="accent" />
     </Button.Group>
    </Row>
   )}

   {!isDesktop && (
    <Button.UI
     type="menu"
     backgroundColor="accent"
     clickHandler={() => {
      setIsMenuOpen(true);
     }}
    />
   )}

   <AnimatePresence>
    {isMenuOpen && (
     <MobileNav
      closeHandler={() => {
       setIsMenuOpen(false);
      }}
     />
    )}
   </AnimatePresence>
  </header>
 );
};

export default Header;
