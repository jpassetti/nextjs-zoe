"use client";

import React, { type ReactNode } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/regions/Header";
import Footer from "@/components/regions/Footer";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const hideChrome = pathname?.startsWith("/services-v4");
  const useOverlayHeader = pathname?.startsWith("/showcase-test-advanced");

  return (
    <>
      {!hideChrome ? <Header variant={useOverlayHeader ? "overlay" : "default"} /> : null}
      <main>{children}</main>
      {!hideChrome ? <Footer /> : null}
    </>
  );
}
