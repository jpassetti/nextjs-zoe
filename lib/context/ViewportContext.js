"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Create the ViewportContext
const ViewportContext = createContext();

// Breakpoints for mobile, tablet, and desktop
const BREAKPOINTS = {
 mobile: 700,
 tablet: 980,
 desktop: 1140,
};

// Provider Component
export const ViewportProvider = ({ children }) => {
 const getViewport = () => {
  if (typeof window === "undefined") {
   return {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
   };
  }

  const width = window.innerWidth;
  return {
   isMobile: width <= BREAKPOINTS.mobile,
   isTablet: width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet,
   isDesktop: width > BREAKPOINTS.tablet,
   isLargeDesktop: width > BREAKPOINTS.desktop,
  };
 };

 const [viewport, setViewport] = useState(getViewport);

 useEffect(() => {
    const handleResize = () => setViewport(getViewport());
    window.addEventListener("resize", handleResize);

  // Cleanup the event listener
  return () => window.removeEventListener("resize", handleResize);
 }, []);

 return (
  <ViewportContext.Provider value={viewport}>
   {children}
  </ViewportContext.Provider>
 );
};

// Custom hook to access the context
export const useViewport = () => useContext(ViewportContext);
