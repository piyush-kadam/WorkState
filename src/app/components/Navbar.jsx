"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);
  const [shouldMoveToLeft, setShouldMoveToLeft] = useState(false);
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      clearTimeout(scrollTimeout);

      if (isManuallyOpened) setIsManuallyOpened(false);

      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
        if (scrolled) {
          setShouldMoveToLeft(false);
          scrollTimeout = setTimeout(() => setShouldMoveToLeft(true), 1000);
        } else {
          setShouldMoveToLeft(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolled, isManuallyOpened]);

  const toggleMenu = () => {
    if (isScrolled) {
      setIsManuallyOpened(!isManuallyOpened);
      setShouldMoveToLeft(false);
    }
  };

  const shouldShowMenu = !isScrolled || isManuallyOpened;
  const shouldShowIcon = isScrolled && !isManuallyOpened;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
  ];

  return (
    <div
      className={`fixed z-50 transition-all duration-1000 ease-in-out ${
        shouldShowIcon && shouldMoveToLeft
          ? "top-2 sm:top-4 left-2 sm:left-6"
          : "top-3 sm:top-6 left-1/2 -translate-x-1/2 px-4 sm:px-6 lg:px-0"
      }`}
    >
      <div
        className={`transition-all duration-1000 ease-in-out cursor-pointer ${
          shouldShowIcon
            ? "w-16 sm:w-20 h-8 sm:h-10"
            : "w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] lg:w-[90vw] max-w-6xl h-auto cursor-default"
        }`}
        onClick={shouldShowIcon ? toggleMenu : undefined}
      >
        <div
          className={`relative w-full h-full transition-all duration-1000 ease-in-out bg-black border border-white/30 shadow-2xl ${
            shouldShowIcon
              ? "rounded-xl sm:rounded-2xl"
              : "rounded-3xl sm:rounded-full"
          }`}
        >
          {/* Folded icon */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              shouldShowIcon ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src="h4.jpeg"
              alt="Navigation Icon"
              className="absolute inset-0 w-full h-full object-cover rounded-xl sm:rounded-2xl drop-shadow-sm"
            />
          </div>

          {/* Expanded menu */}
          <div
            className={`transition-opacity duration-500 overflow-hidden ${
              shouldShowMenu ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <nav className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center min-h-[3rem] sm:min-h-[3.5rem]">
              <Link
                href="/"
                className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide text-white hover:text-gray-300 transition flex-shrink-0"
              >
                WorkState
              </Link>

              {/* Desktop Menu */}
              <div className="hidden sm:flex gap-6 md:gap-8 lg:gap-10 text-sm md:text-base text-white flex-shrink-0">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`whitespace-nowrap transition ${
                      pathname === href
                        ? "text-white font-semibold border-b-2 border-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu */}
              <div className="flex sm:hidden gap-4 text-xs text-white flex-shrink-0">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`transition ${
                      pathname === href
                        ? "text-white font-semibold underline"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Start a Project Button */}
              <Link
                href="/contact"
                className="bg-white text-black px-3 sm:px-4 lg:px-5 py-2 rounded-full font-medium text-xs sm:text-sm lg:text-base hover:bg-gray-200 hover:scale-105 active:scale-95 transition-transform duration-200 flex-shrink-0 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Start a Project</span>
                <span className="sm:hidden">Start</span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
