"use client";

import React, { Suspense, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
// import { TooltipProvider } from "@/app/[locale]/components/ui/tooltip";
// import { Toaster } from "@/app/[locale]/components/ui/sonner";
import Loading from "@/app/[locale]/loading";
import RouteLoader from "@/app/[locale]/route-loader";
import useRouteLoading from "@/hook/use-route-loading";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";
import QueryClientWrapper from "@/providers/QueryClientWrapper";

// This is a small client hook that *must* be inside the NextIntlProvider
function RouteLoadingIndicator() {
  useRouteLoading();
  return <RouteLoader />;
}

// This is our new, lean provider component
export function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // This prevents a hydration mismatch for next-themes
  if (!mounted) {
    return (
      <body className="antialiased">
        <Loading />
      </body>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* <TooltipProvider> */}
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientWrapper>
          <Suspense fallback={<Loading />}>
            <RouteLoadingIndicator />
            {children}
            {/* <Toaster /> */}
          </Suspense>
        </QueryClientWrapper>
      </NextIntlClientProvider>
      {/* </TooltipProvider> */}
    </ThemeProvider>
  );
}