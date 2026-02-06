"use client";

import React, { createContext, useContext, useLayoutEffect, useState } from "react";

// Create the ViewportContext
const ViewportContext = createContext();

// Breakpoints for mobile, tablet, and desktop
const BREAKPOINTS = {
 mobile: 700,
 tablet: 980,
 desktop: 1140,
};

const DEFAULT_VIEWPORT = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  isLargeDesktop: false,
};

// Provider Component
export const ViewportProvider = ({ children }) => {
 // Use a stable, SSR-safe initial value to avoid hydration mismatches.
 // We only read from `window` after mount.
 const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);

 useLayoutEffect(() => {
  const getViewport = () => {
    if (typeof window === "undefined") {
      return DEFAULT_VIEWPORT;
    }

    const width = window.innerWidth;
    return {
      isMobile: width <= BREAKPOINTS.mobile,
      isTablet: width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet,
      isDesktop: width > BREAKPOINTS.tablet,
      isLargeDesktop: width > BREAKPOINTS.desktop,
    };
  };

  const handleResize = () => setViewport(getViewport());
  handleResize();
  window.addEventListener("resize", handleResize);

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
