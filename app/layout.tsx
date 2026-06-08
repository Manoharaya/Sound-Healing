import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.heartstrong.com.au"),
  title: {
    default: "Jenny Gillson | Kinesiologist & Sound Therapist | Heart Strong",
    template: "%s | Heart Strong",
  },
  description: "Live the life you want. Empowering physical wellness and emotional resilience through kinesiology and sound therapy education at Heart Strong.",
  keywords: ["Jenny Gillson", "Heart Strong", "sound therapy", "kinesiology", "Aromatherapy", "emotional wellness", "health education", "Victoria wellness"],
  authors: [{ name: "Jenny Gillson" }],
  creator: "Jenny Gillson",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://www.heartstrong.com.au",
    title: "Jenny Gillson | Kinesiologist & Sound Therapist",
    description: "Live the life you want. Experience wellness education and emotional resilience coaching.",
    siteName: "Heart Strong",
    images: [
      {
        url: "/lemuria-assets/hero/jenny-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Jenny Gillson - Heart Strong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heart Strong | Jenny Gillson",
    description: "Empowering physical wellness and emotional resilience through kinesiology and sound therapy.",
    images: ["/lemuria-assets/hero/jenny-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    },
};

import { JsonLd } from "@/components/seo/JsonLd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased text-brand-text bg-brand-bg bg-noise transition-smooth`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
