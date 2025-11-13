"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import CasinoIconSVG from "../common/svg_icons/sidebar-icons/casino-icon-svg";
import SportsIconSVG from "../common/svg_icons/sidebar-icons/sports-icon-svg";

export default function AnimatedMobileMenu({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobileMenu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full flex items-start flex-col gap-2 overflow-hidden"
        >
          <Link
            className={`inline-block p-3 transition-all duration-300 rounded-lg 
              ${
                pathname === "/casino"
                  ? "bg-linear-to-t from-purple-1 to-blue-1 hover:opacity-80"
                  : "bg-background-2 hover:bg-background-2/55"
              }`}
            href="/casino"
            aria-label="to go casino"
            prefetch
          >
            <CasinoIconSVG />
          </Link>

          <Link
            className={`inline-block p-3 transition-all duration-300 rounded-lg 
              ${
                pathname === "/sports"
                  ? "bg-linear-to-t from-cyan-1 to-green-1 hover:opacity-80"
                  : "bg-background-2 hover:bg-background-2/55"
              }`}
            href="/sports"
            aria-label="go to sports"
            prefetch
          >
            <SportsIconSVG />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}