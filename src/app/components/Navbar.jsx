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
        ? 'top-4 left-6' 
        : 'top-6 left-1/2 -translate-x-1/2'
    }`}>
      {/* Morphing Container */}
      <div 
        className={`transition-all duration-1000 ease-in-out cursor-pointer ${
          shouldShowIcon
            ? 'w-20 h-10' 
            : 'w-[90vw] max-w-6xl h-auto cursor-default'
        }`}
        onClick={shouldShowIcon ? toggleMenu : undefined}
      >
        {/* Background - Pure dark black */}
        <div className={`relative w-full h-full transition-all duration-1000 ease-in-out 
          bg-black border border-white/10 shadow-2xl ${
          shouldShowIcon
            ? 'rounded-2xl' 
            : 'rounded-full'
        }`}>
          
          {/* Folded Icon State */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            shouldShowIcon ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            
            {/* Custom Image */}
            <img 
              src="h4.jpeg" 
              alt="Navigation Icon"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl drop-shadow-sm"
            />
          </div>

          {/* Navigation Content - Only visible when expanded */}
          <div className={`transition-opacity duration-500 ${
            shouldShowMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <nav className="px-8 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold tracking-wide text-white hover:text-gray-300 transition">
                WorkState
              </Link>

              <div className="flex gap-6 text-white">
                <Link href="/" className="hover:text-gray-300 transition">Home</Link>
                <Link href="/work" className="hover:text-gray-300 transition">Work</Link>
                <Link href="/about" className="hover:text-gray-300 transition">About</Link>
                <Link href="/contact" className="hover:text-gray-300 transition">Contact</Link>
              </div>

              <Link
                href="/contact"
                className="bg-white text-black px-5 py-2 rounded-full font-medium
                           hover:bg-gray-200 hover:scale-105 active:scale-95
                           transition-transform duration-200"
              >
                Start a Project
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}