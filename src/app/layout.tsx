import type { Metadata } from "next";
import { Geist, Geist_Mono, Chakra_Petch, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const chakra = Chakra_Petch({
  weight: ['400', '600', '700'],
  variable: "--font-chakra",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synapstream | Next-Gen 3D Web",
  description: "Experience the future of the web with Synapstream and Spline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${chakra.variable} ${jetbrainsMono.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
