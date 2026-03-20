import { ViewportProvider } from "@/lib/context/ViewportContext"; // Adjust path if needed
import AppShell from "@/components/regions/AppShell";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Lora, Poppins } from "next/font/google"; // ✅ Import additional fonts

config.autoAddCss = false;

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

export const metadata = {
  title: 'Transform with Irini',
  description: 'Guiding human systems through growth and change.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
 children,
}: Readonly<{ children: React.ReactNode }>) {

 return (
  <html
   lang="en"
   className={`p-0 m-0 ${lora.variable + " " + poppins.variable}`}
  >
   <body className="p-0 m-0">
    <GoogleAnalytics />    
    <ViewportProvider>
     <AppShell>{children}</AppShell>
    </ViewportProvider>
   </body>
  </html>
 );
}
