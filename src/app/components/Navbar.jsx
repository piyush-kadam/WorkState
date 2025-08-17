// app/components/Navbar.jsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl
                    bg-black/90 backdrop-blur-md border border-white/20
                    rounded-full px-8 py-4 flex justify-between items-center
                    z-50 shadow-lg">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold tracking-wide text-white hover:text-gray-300 transition">
        WorkState
      </Link>

      {/* Menu */}
      <div className="flex gap-6 text-white">
        <Link href="/" className="hover:text-gray-300 transition">Home</Link>
        <Link href="/work" className="hover:text-gray-300 transition">Work</Link>
        <Link href="/about" className="hover:text-gray-300 transition">About</Link>
        <Link href="/contact" className="hover:text-gray-300 transition">Contact</Link>
      </div>

      {/* Button */}
      <Link
        href="/contact"
        className="bg-white text-black px-5 py-2 rounded-full font-medium
                   hover:bg-gray-200 hover:scale-105 active:scale-95
                   transition-transform duration-200"
      >
        Start a Project
      </Link>
    </nav>
  );
}
