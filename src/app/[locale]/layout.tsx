import "./globals.css";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import dynamic from "next/dynamic";
import { hasLocale } from "next-intl";
// import QueryClientWrapper from "@/providers/QueryClientWrapper";
import { type ReactNode } from "react";
import { routing } from "@/i18n/routing";
import NotFound from "./not-found";
import { getMessages, setRequestLocale } from "next-intl/server";
// import ServerSiteComponents from "./components/modals/server-site-components/server-site-components";
// import { fetchHero } from "@/lib/fetchers/home-page-details";
import { Providers } from "./providers";
// import AppSidebar from "./components/layout/app-sidebar";
import MainLayout from "./components/layout/main-layout";
// import AppHeader from "./components/layout/app-header";
// import { Footer } from "react-day-picker";
// import MobileFooter from "./components/layout/mobile-footer";
// import MobileBrowsePanel from "./components/layout/mobile-browse-panel";
// import Footer from "./components/common/footer/footer";
import CookieBotLoader from "./components/common/cookie-bot-loader";

// const GlobalProvider = dynamic(() => import("@/providers/GlobalProvider"));
import dynamic from "next/dynamic";
const AppSidebar = dynamic(() => import("./components/layout/app-sidebar"));
const AppHeader = dynamic(() => import("./components/layout/app-header"));
const Footer = dynamic(() => import("./components/common/footer/footer"));
const MobileFooter = dynamic(() => import("./components/layout/mobile-footer"));
const MobileBrowsePanel = dynamic(() => import("./components/layout/mobile-browse-panel"));
const ServerSiteComponents = dynamic(() => import("./components/modals/server-site-components/server-site-components"));
// export const runtime = "edge";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BETIDA - Casino & Sports Betting",
  description: "Welcome to BETIDA - Your ultimate gaming destination!",
  keywords: [
    "online casino",
    "sports betting",
    "live casino",
    "BETIDA",
    "gaming platform",
  ],
  openGraph: {
    title: "BETIDA",
    description: "Your ultimate gaming destination!",
    url: "https://betida.dev",
    siteName: "BETIDA",
    images: [
      {
        url: "https://betida.dev/detida.png",
        width: 1200,
        height: 630,
        alt: "BETIDA - Ultimate Gaming Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BETIDA",
    description: "Your ultimate gaming destination!",
    images: ["https://betida.dev/detida.png"],
    creator: "@BETIDAOfficial",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    NotFound();
  }

  setRequestLocale(locale);
  // const hero = await fetchHero();
  // pre-load herop lcp
  // const lcpImage = hero?.[0]?.imagePublicId;
  // const lcpImage2 = hero?.[1]?.imagePublicId;
  const messages = await getMessages();
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>

        {/* DYNAMIC LCP PRELOAD */}
        {/* {lcpImage && (
          <link
            rel="preload"
            as="image"
            href={`https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_auto,q_auto/${lcpImage}`}
            imageSrcSet={`
              https://res.cloudinary.com/dfogbvws/image/upload/w_400,c_fill,f_auto,q_auto/${lcpImage} 400w,
              https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_auto,q_auto/${lcpImage} 648w
            `}
            imageSizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {lcpImage2 && (
          <link
            rel="preload"
            as="image"
            href={`https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_auto,q_auto/${lcpImage2}`}
            imageSrcSet={`
              https://res.cloudinary.com/dfogbvws/image/upload/w_400,c_fill,f_auto,q_auto/${lcpImage2} 400w,
              https://res.cloudinary.com/dfogbvws/image/upload/w_648,c_fill,f_auto,q_auto/${lcpImage2} 648w
            `}
            imageSizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          />
        )} */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
      </head>
      <body className="antialiased">
        <CookieBotLoader />
        <Providers locale={locale} messages={messages}>
          <div className="bg-background text-foreground relative flex items-start min-h-screen pb-24 md:pb-0">
            {/* These are rendered on the SERVER, fixing your TBT */}
            <AppSidebar />

            {/* This small client component handles the dynamic width */}
            <MainLayout>
              <AppHeader />
              <main>{children}</main>
              <Footer />
            </MainLayout>

            <MobileFooter />
            <MobileBrowsePanel />
            <ServerSiteComponents />
          </div>
        </Providers>
      </body>
    </html>
  );
}
