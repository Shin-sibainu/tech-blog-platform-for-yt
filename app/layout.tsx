import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import { PageTransition } from "@/components/ui/page-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevSpace - 技術者のためのブログプラットフォーム",
  description:
    "技術者たちが知識を共有し、学び合うモダンなプラットフォーム。最新の技術情報をシェアして、コミュニティとともに成長しましょう。",
  keywords: [
    "技術ブログ",
    "プログラミング",
    "開発者",
    "テック",
    "エンジニア",
    "コミュニティ",
  ],
  authors: [{ name: "DevSpace Team" }],
  openGraph: {
    title: "DevSpace - 技術者のためのブログプラットフォーム",
    description: "技術者たちが知識を共有し、学び合うモダンなプラットフォーム",
    url: "https://devspace.tech",
    siteName: "DevSpace",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "DevSpace - Code • Share • Grow - 技術者たちが知識を共有し、学び合うプラットフォーム",
        type: "image/svg+xml",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevSpace - 技術者のためのブログプラットフォーム",
    description: "技術者たちが知識を共有し、学び合うモダンなプラットフォーム",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
