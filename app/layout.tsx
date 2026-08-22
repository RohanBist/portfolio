import type { Metadata } from "next";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";
import ScrollToTop from "@/components/ui/ScrollToTop";

export const metadata: Metadata = {
  title: "Rohan Bist — Software Developer",
  description: "Personal portfolio of Rohan Bist, Software Developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=sora@300,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GrainOverlay />
        <CustomCursor />
        <ScrollToTop />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}