"use client";

import dynamic from "next/dynamic";

// Dynamically import the CookieBot component
// 'ssr: false' is allowed here because this is a Client Component
const CookieBot = dynamic(() => import("./cookie-bot"), {
  ssr: false,
});

export default function CookieBotLoader() {
  return <CookieBot />;
}