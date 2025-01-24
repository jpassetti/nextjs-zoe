"use client";

import { ViewportProvider } from "@/lib/context/ViewportContext"; // Adjust path if needed
import Header from "@/components/regions/Header";
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
 return (
  <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
   <body>
    <ViewportProvider>
     <Header />
     {children}
     <Footer />
    </ViewportProvider>
   </body>
  </html>
 );
}
