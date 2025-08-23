import OfflineBanner from "../components/shared/OfflineBanner";
import { useOnlineStatus } from "../lib/utils";
// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { IBM_Plex_Sans, Chivo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { FramerMotionProvider } from "@/components/shared/FramerMotionProvider";
import Footer from "@/components/shared/Footer";
import { cn } from "@/lib/utils";
import { CSPostHogProvider } from "./providers";
import ClientErrorBoundary from "@/components/shared/ClientErrorBoundary";

const ibm_plex_sans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm_plex_sans",
  weight: ["400", "600", "700"],
});
const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <CSPostHogProvider>
        <body
          className={cn(
            ibm_plex_sans.className,
            chivo.variable,
            "w-full overflow-x-hidden transition-colors duration-700",
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system">
            <FramerMotionProvider>
              <ClientErrorBoundary>
                <OfflineBanner />
                {children}
              </ClientErrorBoundary>
              <Footer />
            </FramerMotionProvider>
          </ThemeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
