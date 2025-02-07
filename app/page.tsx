"use client";
import { useState, useEffect, Fragment } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy-load IntroOverlay to prevent SSR errors
const IntroOverlay = dynamic(
 () => import("@/components/custom/Homepage/IntroOverlay"),
 { ssr: false }
);

import CTA from "../components/custom/CTA";
import HomepageAbout from "@/components/custom/Homepage/About";
import Showcase from "../components/custom/Homepage/Showcase";
import HomepageServices from "@/components/custom/Homepage/Services";

export default function Home() {
 const [overlayVisible, setOverlayVisible] = useState(true);

 useEffect(() => {
  const timeout = setTimeout(() => {
   setOverlayVisible(false);
  }, 5000);

  return () => clearTimeout(timeout);
 }, []);

 return (
  <AnimatePresence>
   {overlayVisible ? (
    <IntroOverlay />
   ) : (
    <Fragment>
     <Showcase />
     <HomepageAbout />
     <HomepageServices />
     <CTA />
    </Fragment>
   )}
  </AnimatePresence>
 );
}
