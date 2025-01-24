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
 const [viewport, setViewport] = useState({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
 });

 const handleResize = () => {
  const width = window.innerWidth;
  setViewport({
   isMobile: width <= BREAKPOINTS.mobile,
   isTablet: width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet,
   isDesktop: width > BREAKPOINTS.tablet,
  });
 };

 useEffect(() => {
  handleResize(); // Initialize on load
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
