import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google"

import { Web3Modal } from "@/providers/wallet-provider";
import { LensDataProvider } from "@/providers/lens-data-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { cn } from "@/lib/utils"
import { NavOverlay } from "./components/nav-overlay";
import { LensHelloWorldProvider } from "./context/useLensHelloWorld";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "grey-900" }],
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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <Web3Modal>
          <ToastProvider />
          <LensDataProvider>
            <LensHelloWorldProvider>
              <NavOverlay />
              {children}
            </LensHelloWorldProvider>
          </LensDataProvider>
        </Web3Modal>
      </body>
    </html>
  );
}