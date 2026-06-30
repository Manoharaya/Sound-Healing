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
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lemuriahealing.com.au"),
  title: {
    default: "Jenny Gillson | Kinesiologist, Sound Therapist & Aromatherapist | Lemuria",
    template: "%s | Lemuria",
  },
  description: "Kinesiology, Sound Therapy & Aromatherapy in Perth. Personalised healing sessions with Jenny Gillson to help reduce stress, find clarity and restore balance.",
  keywords: ["Jenny Gillson", "Lemuria", "sound therapy", "kinesiology", "Aromatherapy", "emotional wellness", "health education", "Perth wellness"],
  authors: [{ name: "Jenny Gillson" }],
  creator: "Jenny Gillson",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://lemuriahealing.com.au",
    title: "Jenny Gillson | Kinesiologist, Sound Therapist & Aromatherapist",
    description: "Kinesiology, Sound Therapy & Aromatherapy in Perth. Personalised healing sessions with Jenny Gillson to help reduce stress, find clarity and restore balance.",
    siteName: "Lemuria",
    images: [
      {
        url: "/lemuria-assets/hero/jenny-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Jenny Gillson - Lemuria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lemuria | Jenny Gillson",
    description: "Kinesiology, Sound Therapy & Aromatherapy in Perth. Personalised healing sessions with Jenny Gillson to help reduce stress, find clarity and restore balance.",
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
