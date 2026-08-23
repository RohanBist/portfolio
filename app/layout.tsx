import type { Metadata } from "next";
import "./globals.css";
import "../styles/fonts.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";
import ScrollToTop from "@/components/ui/ScrollToTop";

const baseUrl = "https://rohanbist.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Rohan Bist — Software Developer",
    template: "%s — Rohan Bist",
  },
  description:
    "Rohan Bist is a software developer and IT student based in Nepal, building clean web and mobile applications.",
  keywords: [
    "Rohan Bist",
    "Software Developer Nepal",
    "Web Developer Nepal",
    "Flutter Developer",
    "Next.js Developer",
    "IT Student Nepal",
    "Portfolio",
  ],
  authors: [{ name: "Rohan Bist", url: baseUrl }],
  creator: "Rohan Bist",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Rohan Bist",
    title: "Rohan Bist — Software Developer",
    description:
      "Software developer and IT student based in Nepal, building clean web and mobile applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rohan Bist — Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Bist — Software Developer",
    description:
      "Software developer and IT student based in Nepal, building clean web and mobile applications.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rohan Bist",
              url: baseUrl,
              image: `${baseUrl}/images/photo.png`,
              sameAs: [
                "https://github.com/RohanBist",
                "https://linkedin.com/in/rohan",
                "https://instagram.com/rohan",
              ],
              jobTitle: "Software Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "NP",
                addressLocality: "Nepal",
              },
              knowsAbout: [
                "Web Development",
                "Mobile Development",
                "Flutter",
                "Next.js",
                "TypeScript",
                "React",
                "SEO",
              ],
              description:
                "Software developer and IT student based in Nepal, building clean web and mobile applications.",
            }),
          }}
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