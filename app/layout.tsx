import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { paperlogy } from "./fonts/paperlogy";
import { Toaster } from "sonner";
import { Footer } from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "리버스 챌린지",
  description:
    "녹음하고 뒤집어 들어봐! 역재생 음성을 따라 역으로 말해 원본과 맞추는 리버스 챌린지",
  verification: {
    google: "X8abBNxolxp2vkT2B7w1uCMZm9zkCEGLo0xpbL7Fw",
  },
  other: {
    "google-adsense-account": "ca-pub-70344649235542",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang="ko">
      <head>
        {/* 비표준 head 내용이 필요하면 여기 추가 (Next.js app router는 metadata로도 주입됨) */}
        {/* 주의: next/script는 <head> 밖에 둬도 strategy로 head 근처에 삽입됨 */}
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${paperlogy.variable} antialiased`}
      >
        <div id="portal" />

        {/* ---------- AdSense 스크립트 (프로덕션에서만 로드) ---------- */}
        {isProd && (
          <>
            {/* 가능한 한 문서 상단(헤드 직후)에 가까운 시점에 로드 */}
            <Script
              id="adsbygoogle-js"
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7034464923554278"
              strategy="beforeInteractive"
              crossOrigin="anonymous"
            />

            {/* 전역 초기화(광고 영역이 따로 있을 때에도 중복 초기화는 피하도록 try/catch) */}
            <Script id="adsbygoogle-init" strategy="afterInteractive">
              {`(function(){
                try {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch(e) {
                  // 초기화 실패시 콘솔에 남기고 실제 광고 영역 컴포넌트에서 다시 시도
                  console.warn('adsbygoogle init failed', e);
                }
              })();`}
            </Script>
          </>
        )}
        {/* ----------------------------------------------------------- */}

        <main className="max-w-screen-md md:px-8 px-5 py-12 space-y-8 mx-auto font-paperlogy">
          {children}
        </main>

        <Footer />
        <Toaster toastOptions={{ classNames: { toast: "font-paperlogy" } }} />
      </body>
    </html>
  );
}
