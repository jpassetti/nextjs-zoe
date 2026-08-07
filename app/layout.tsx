import { ViewportProvider } from "@/lib/context/ViewportContext"; // Adjust path if needed
import AppShell from "@/components/regions/AppShell";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

import "@/sass/global.scss";

const fontVariables = {
  "--font-primary-alt": "Georgia, 'Times New Roman', serif",
  "--font-secondary-alt": "'Helvetica Neue', Helvetica, Arial, sans-serif",
} as React.CSSProperties;

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
   className="p-0 m-0"
   style={fontVariables}
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
