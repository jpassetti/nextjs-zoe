"use client";
import { useState, useEffect, Fragment } from "react";
import { ViewportProvider } from "@/lib/context/ViewportContext"; // Adjust path if needed
import { AnimatePresence } from "framer-motion"; // Import AnimatePresence and motion

import Header from "@/components/regions/Header";
import IntroOverlay from "@/components/custom/Homepage/IntroOverlay";
import Footer from "@/components/regions/Footer";
import { Montserrat, Playfair } from "next/font/google";

// Import Montserrat font (including italics)
const montserrat = Montserrat({
 subsets: ["latin"],
 weight: ["400", "700"],
 style: ["normal", "italic"],
 variable: "--font-primary",
 display: "swap",
});

// Import Playfair Display font (including italics)
const playfair = Playfair({
 subsets: ["latin"],
 weight: ["400", "700"],
 style: ["normal", "italic"],
 variable: "--font-secondary",
 display: "swap",
});

import "./global.scss";

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 const [overlayVisible, setOverlayVisible] = useState(true);
 useEffect(() => {
  // Set the overlay to disappear after 5 seconds
  const timeout = setTimeout(() => {
   setOverlayVisible(false);
  }, 5000); // 5 seconds

  // Cleanup the timeout if the component unmounts
  return () => clearTimeout(timeout);
 }, []);
 return (
  <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
   <body>
    <AnimatePresence>
     {/* Show the IntroOverlay if overlayVisible is true */}
     {overlayVisible ? (
      <IntroOverlay />
     ) : (
      <Fragment>
       <ViewportProvider>
        <Header />
        {children} {/* The page content */}
        <Footer />
       </ViewportProvider>
      </Fragment>
     )}
    </AnimatePresence>
   </body>
  </html>
 );
}
