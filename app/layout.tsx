import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AirKitProvider } from "@/contexts/AirKitContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AIR Cards - Digital Membership Cards",
  description: "Connect your AIR Wallet and claim your digital membership card with exclusive perks and NFC-enabled access",
  keywords: "AIR Cards, AIR Wallet, MOCA Chain, Digital Membership, NFC Card, Web3",
  openGraph: {
    title: "AIR Cards",
    description: "Your gateway to exclusive AIR perks and experiences",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AirKitProvider>
          {children}
        </AirKitProvider>
      </body>
    </html>
  );
}
