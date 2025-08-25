import OfflineBanner from "../components/shared/OfflineBanner";
import LoadingOverlay from "@/components/shared/LoadingOverlay";
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
        <head>
          <link rel="preload" as="image" href="/images/profile.webp" />
        </head>
        <body
          className={cn(
            ibm_plex_sans.className,
            chivo.variable,
            "w-full overflow-x-hidden transition-colors duration-700",
          )}
        >
          {/* Accessibility: Skip to main content link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50"
          >
            Skip to main content
          </a>
          {/* Accessibility: Aria-live region for alerts/messages */}
          <div aria-live="polite" className="sr-only" id="alert-region"></div>
            {/* Global loading overlay */}
            <LoadingOverlay />
          <ThemeProvider attribute="class" defaultTheme="system">
            <FramerMotionProvider>
              <ClientErrorBoundary>
                <OfflineBanner />
                {/* Main content anchor for skip link and semantic landmark */}
                <main id="main-content">
                  {children}
                </main>
              </ClientErrorBoundary>
              <Footer />
            </FramerMotionProvider>
          </ThemeProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
