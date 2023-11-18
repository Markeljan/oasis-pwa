import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#000" }],
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Oasis",
  description: "Lens Protocol Dapp with smart-posts",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["oasis", "oasis lens", "lens protocol", "lens", "lens.xyz"],
  authors: [
    {
      name: "Markeljan Sokoli",
      url: "https://www.x.com/0xmarkeljan",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" },
    { rel: "icon", url: "/icons/icon-192x192.png" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}