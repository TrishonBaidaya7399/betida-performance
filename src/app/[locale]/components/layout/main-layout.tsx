"use client";

import { useSidebarStore } from "@/store/sidebar-store";

// This component's ONLY job is to manage the layout state
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mobileOpen } = useSidebarStore();

  return (
    <div
      className={`mx-auto min-h-[calc(100vh-4rem)] ${
        mobileOpen
          ? "w-full md:w-[calc(100%-5rem)]"
          : "w-full md:w-[calc(100%-15.3rem)]"
      }`}
    >
      {children}
    </div>
  );
}