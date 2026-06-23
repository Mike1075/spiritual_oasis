import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "心灵家园 Spiritual Oasis · 从精神内耗，到内在清明",
  description:
    "懂了那么多道理，依然过不好这一生？心灵家园以赛斯智慧、沉浸式闭关与每日陪伴，陪你看清内心的剧本，把人生的主导权拿回自己手里。",
  keywords: [
    "心灵家园",
    "Spiritual Oasis",
    "灵性成长",
    "冥想",
    "赛斯资料",
    "价值完成",
    "信念创造实相",
  ],
  openGraph: {
    title: "心灵家园 Spiritual Oasis",
    description: "2026：用一年的时间，踏上终极自由之路",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
