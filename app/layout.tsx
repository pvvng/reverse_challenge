// fortawesome
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { paperlogy } from "./fonts/paperlogy";
import { Toaster } from "sonner";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "리버스 챌린지",
  description:
    "녹음하고 뒤집어 들어봐! 역재생 음성을 따라 역으로 말해 원본과 맞추는 리버스 챌린지",
  verification: {
    google: "X8abBNxolxp2vkT2B7w1uCMZm9zkCEGLo0xpbL7Fw9U",
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
        className={`${geistSans.variable} ${geistMono.variable} ${paperlogy.variable} antialiased`}
      >
        <div id="portal" />
        <main className="max-w-screen-md md:px-8 px-5 py-12 space-y-8 mx-auto font-paperlogy">
          {children}
        </main>
        <Footer />
        <Toaster toastOptions={{ classNames: { toast: "font-paperlogy" } }} />
      </body>
    </html>
  );
}
