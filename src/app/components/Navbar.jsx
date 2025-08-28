"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isManuallyOpened, setIsManuallyOpened] = useState(false);
  const [shouldMoveToLeft, setShouldMoveToLeft] = useState(false);

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      
      // Clear any existing timeout
      clearTimeout(scrollTimeout);
      
      // If user starts scrolling while menu is manually opened, fold it
      if (isManuallyOpened) {
        setIsManuallyOpened(false);
      }
      
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
        
        if (scrolled) {
          // First fold in center, then move to left after animation
          setShouldMoveToLeft(false);
          scrollTimeout = setTimeout(() => {
            setShouldMoveToLeft(true);
          }, 1000); // Match the transition duration
        } else {
          setShouldMoveToLeft(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolled, isManuallyOpened]);

  const toggleMenu = () => {
    if (isScrolled) {
      setIsManuallyOpened(!isManuallyOpened);
      setShouldMoveToLeft(false); // Move back to center when opening
    }
  };

  // Determine if menu should be shown
  const shouldShowMenu = !isScrolled || isManuallyOpened;
  const shouldShowIcon = isScrolled && !isManuallyOpened;

  return (
    <div className={`fixed z-50 transition-all duration-1000 ease-in-out ${
      shouldShowIcon && shouldMoveToLeft
        ? 'top-2 sm:top-4 left-2 sm:left-6' 
        : 'top-3 sm:top-6 left-1/2 -translate-x-1/2 px-4 sm:px-6 lg:px-0'
    }`}>
      {/* Morphing Container */}
      <div 
        className={`transition-all duration-1000 ease-in-out cursor-pointer ${
          shouldShowIcon
            ? 'w-16 sm:w-20 h-8 sm:h-10' 
            : 'w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] lg:w-[90vw] max-w-6xl h-auto cursor-default'
        }`}
        onClick={shouldShowIcon ? toggleMenu : undefined}
      >
        {/* Background - Pure dark black with thin white border */}
        <div className={`relative w-full h-full transition-all duration-1000 ease-in-out 
          bg-black border border-white/30 shadow-2xl ${
          shouldShowIcon
            ? 'rounded-xl sm:rounded-2xl' 
            : 'rounded-3xl sm:rounded-full'
        }`}>
          
          {/* Folded Icon State */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            shouldShowIcon ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            
            {/* Custom Image */}
            <img 
              src="h4.jpeg" 
              alt="Navigation Icon"
              className="absolute inset-0 w-full h-full object-cover rounded-xl sm:rounded-2xl drop-shadow-sm"
            />
          </div>

          {/* Navigation Content - Only visible when expanded */}
          <div className={`transition-opacity duration-500 overflow-hidden ${
            shouldShowMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <nav className="px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center min-h-[3rem] sm:min-h-[3.5rem]">
              <Link href="/" className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide text-white hover:text-gray-300 transition flex-shrink-0">
                WorkState
              </Link>

              <div className="hidden sm:flex gap-3 md:gap-4 lg:gap-6 text-sm md:text-base text-white flex-shrink-0">
                <Link href="/" className="hover:text-gray-300 transition whitespace-nowrap">Home</Link>
                <Link href="/work" className="hover:text-gray-300 transition whitespace-nowrap">Work</Link>
                <Link href="/about" className="hover:text-gray-300 transition whitespace-nowrap">About</Link>
                <Link href="/contact" className="hover:text-gray-300 transition whitespace-nowrap">Contact</Link>
              </div>

              {/* Mobile menu for small screens */}
              <div className="flex sm:hidden gap-2 text-xs text-white flex-shrink-0">
                <Link href="/" className="hover:text-gray-300 transition">Home</Link>
                <Link href="/work" className="hover:text-gray-300 transition">Work</Link>
                <Link href="/about" className="hover:text-gray-300 transition">About</Link>
                <Link href="/contact" className="hover:text-gray-300 transition">Contact</Link>
              </div>

              <Link
                href="/contact"
                className="bg-white text-black px-3 sm:px-4 lg:px-5 py-2 rounded-full font-medium text-xs sm:text-sm lg:text-base
                           hover:bg-gray-200 hover:scale-105 active:scale-95
                           transition-transform duration-200 flex-shrink-0 whitespace-nowrap"
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