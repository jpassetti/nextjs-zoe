"use client";

import { useEffect, useState } from "react";
import { ViewportProvider } from "@/lib/context/ViewportContext"; // Adjust path if needed
import Header from "@/components/regions/Header";
import Footer from "@/components/regions/Footer";
import { Montserrat, Playfair, Lora, Poppins } from "next/font/google"; // ✅ Import additional fonts

// Theme 1 Fonts
const montserrat = Montserrat({
 subsets: ["latin"],
 weight: ["400", "700"],
 style: ["normal", "italic"],
 variable: "--font-primary",
 display: "swap",
});

const playfair = Playfair({
 subsets: ["latin"],
 weight: ["400", "700"],
 style: ["normal", "italic"],
 variable: "--font-secondary",
 display: "swap",
});

// Theme 2 Fonts
const lora = Lora({
 subsets: ["latin"],
 weight: ["400", "700"],
 style: ["normal", "italic"],
 variable: "--font-primary-alt",
 display: "swap",
});

const poppins = Poppins({
 subsets: ["latin"],
 weight: ["400", "700"],
 style: ["normal", "italic"],
 variable: "--font-secondary-alt",
 display: "swap",
});

import "@/sass/global.scss";

export default function RootLayout({
 children,
}: Readonly<{ children: React.ReactNode }>) {
 const [theme, setTheme] = useState<string>("theme1");

 useEffect(() => {
  const savedTheme = localStorage.getItem("theme") || "theme1";
  setTheme(savedTheme);
  document.documentElement.setAttribute("data-theme", savedTheme);
 }, []);

 return (
  <html
   lang="en"
   className={`p-0 m-0 ${theme === "theme1" ? montserrat.variable + " " + playfair.variable : lora.variable + " " + poppins.variable}`}
   data-theme={theme}
  >
   <body className="p-0 m-0">
    <ViewportProvider>
     <Header />
     <main>{children}</main>
     <Footer />
    </ViewportProvider>
   </body>
  </html>
 );
}
