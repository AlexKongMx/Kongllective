import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kongllective.com"),
  title: "Kongllective | Strategic Creative Partnerships",
  description:
    "Connecting exceptional studios, clients and partners across animation, VFX, games, film, advertising and immersive media.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Kongllective",
    title: "Kongllective | Strategic Creative Partnerships",
    description:
      "Connecting exceptional studios, clients and partners across animation, VFX, games, film, advertising and immersive media.",
    images: [
      {
        url: "/brand/kongllective-social-card-v1.png",
        width: 1200,
        height: 630,
        alt: "Kongllective — Exceptional studios. Exceptional opportunities.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kongllective | Strategic Creative Partnerships",
    description:
      "Connecting exceptional studios, clients and partners across animation, VFX, games, film, advertising and immersive media.",
    images: ["/brand/kongllective-social-card-v1.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
