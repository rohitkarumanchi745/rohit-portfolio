import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rohitkarumanchi.com'),
  title: "Rohit Karumanchi — Software Engineer | Data, Backend & AI Systems",
  description: "Rohit Karumanchi - Software Engineer specializing in Data Engineering, Full Stack Development, AI/ML, and Cloud Infrastructure. Expert in Kafka, Spark, Databricks, Python, Rust, React Native, and PyTorch. MS from UT Dallas. Currently at Neiman Marcus Group.",
  keywords: [
    "Rohit Karumanchi",
    "Software Engineer",
    "Data Engineer",
    "Full Stack Developer",
    "Machine Learning Engineer",
    "Kafka",
    "Spark",
    "Databricks",
    "Python",
    "Rust",
    "React Native",
    "PyTorch",
    "AWS",
    "Azure",
    "Kubernetes",
    "FastAPI",
    "GraphQL",
    "Neiman Marcus",
    "UT Dallas",
    "University of Texas at Dallas"
  ],
  authors: [{ name: "Rohit Karumanchi" }],
  creator: "Rohit Karumanchi",
  publisher: "Rohit Karumanchi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rohitkarumanchi.com',
    title: "Rohit Karumanchi — Software Engineer | Data, Backend & AI Systems",
    description: "Software Engineer specializing in Data Engineering, Full Stack Development, AI/ML. Expert in Kafka, Spark, Python, Rust, React Native.",
    siteName: "Rohit Karumanchi Portfolio",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rohit Karumanchi — Software Engineer",
    description: "Data Engineer & Full Stack Developer | Kafka, Spark, Python, Rust, ML",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Rohit Karumanchi"
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#07090F",
  colorScheme: "dark" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
