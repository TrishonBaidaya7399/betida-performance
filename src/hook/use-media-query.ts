// src/hook/use-media-query.ts

"use client";
import { useState, useEffect } from "react";

const MOBILE_QUERY = "(max-width: 767px)";

export function useMediaQuery() {
  // 1. Initial state is `undefined` (we don't know yet)
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    
    // 2. Set the *real* value on mount
    setIsMobile(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return { isMobile };
}