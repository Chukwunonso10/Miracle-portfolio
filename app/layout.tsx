import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miracles Studio | Creative Director, Photographer & Brand Identity Designer",
  description: "Bespoke media production, high-end commercial photography, minimalist graphic layouts, and digital branding solutions for corporate and creative brands.",
  keywords: ["Photography", "Graphic Design", "Branding", "Creative Director", "Media Production", "Content Creator"],
  authors: [{ name: "Miracles Studio" }],
  openGraph: {
    title: "Miracles Studio | Creative Portfolio",
    description: "Bespoke media production, commercial photography, and brand identity design.",
    url: "https://miraclesstudio.com",
    siteName: "Miracles Studio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Miracles Studio Creative Works Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miracles Studio | Creative Director & Photographer",
    description: "Bespoke branding and visual creation services.",
    images: ["https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=1200"],
  },
  metadataBase: new URL("https://miraclesstudio.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <body className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-zinc-950">
          <ThemeProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
