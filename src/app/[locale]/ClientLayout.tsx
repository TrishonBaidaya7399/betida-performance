"use client";

import dynamic from "next/dynamic";
import ServerSiteComponents from "./components/modals/server-site-components/server-site-components";

// Lazy-load heavy UI parts
const AppSidebar = dynamic(() => import("./components/layout/app-sidebar"), {
  loading: () => null,
});
const MainLayout = dynamic(() => import("./components/layout/main-layout"), {
  loading: () => null,
});
const AppHeader = dynamic(() => import("./components/layout/app-header"), {
  loading: () => null,
});
const Footer = dynamic(() => import("./components/common/footer/footer"), {
  loading: () => null,
});
const MobileFooter = dynamic(() => import("./components/layout/mobile-footer"), {
  loading: () => null,
});
const MobileBrowsePanel = dynamic(
  () => import("./components/layout/mobile-browse-panel"),
  { loading: () => null }
);

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background text-foreground flex items-start min-h-screen pb-24 md:pb-0">
      <AppSidebar />
      <MainLayout>
        <AppHeader />
        <main>{children}</main>
        <Footer />
      </MainLayout>
      <MobileFooter />
      <MobileBrowsePanel />
      <ServerSiteComponents />
    </div>
  );
}
