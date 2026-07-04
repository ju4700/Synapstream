import type { Metadata } from "next";
import {
    Geist,
    Geist_Mono,
    Chakra_Petch,
    JetBrains_Mono,
    Inter,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import InitialLoader from "@/components/InitialLoader";

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
    weight: ["400", "600", "700"],
    variable: "--font-chakra",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Synapstream | Next-Generation Data Engineering & Threat Telemetry",
    description: "Synapstream engineers mission-critical software solutions, high-throughput out-of-core data infrastructure, and mathematically verified threat telemetry for enterprise and government partners.",
    keywords: [
        "Synapstream",
        "Data Engineering",
        "Threat Telemetry",
        "Out-Of-Core Execution",
        "Cybersecurity",
        "Honeypot Architecture",
        "Government Software",
        "Enterprise Data Infrastructure",
    ],
    authors: [{ name: "Synapstream Engineering" }],
    openGraph: {
        title: "Synapstream | Next-Generation Data Engineering",
        description: "Synapstream engineers mission-critical software solutions and high-throughput data infrastructure for enterprise and government.",
        siteName: "Synapstream",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Synapstream | Next-Generation Data Engineering",
        description: "Synapstream engineers mission-critical software solutions and high-throughput data infrastructure for enterprise and government.",
    },
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
            <body className="min-h-full flex flex-col bg-black text-white">
                <InitialLoader />
                <SmoothScroll>{children}</SmoothScroll>
            </body>
        </html>
    );
}
