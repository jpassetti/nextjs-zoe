import { ViewportProvider } from "@/lib/context/ViewportContext"; // Adjust path if needed
import Header from "@/components/regions/Header";
import Footer from "@/components/regions/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

import { Lora, Poppins } from "next/font/google"; // ✅ Import additional fonts

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
    icon: '/favicon.png',
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
     <Header />
     <main>{children}</main>
     <Footer />
    </ViewportProvider>
   </body>
  </html>
 );
}
