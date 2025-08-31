"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // ✅ for internal navigation

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [currentTime, setCurrentTime] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const services = [
    "Web Development",
    "Mobile Apps",
    
    "UI/UX Design",
   "Graphics Design",
   "video editing",
    "SEO & Marketing",
  ];

  // ✅ Updated to real pages
  const company = [
    { name: "About Us", href: "/about" },
    { name: "Our Work", href: "/work" },
    { name: "Contact", href: "/contact" },
  ];

  // Stable date/time formatter (avoids hydration mismatch)
  const formatDateTime = (date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const s = String(date.getSeconds()).padStart(2, "0");
    return `${d}/${m}/${y} | ${h}:${min}:${s}`;
  };

  useEffect(() => {
    setIsMounted(true);
    setCurrentTime(new Date());
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Big Footer Tagline */}
        <div className="mb-12 text-center space-y-2">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
            Transforming Ideas Into Digital Reality
          </h2>
          <p className="text-white/60 text-lg md:text-xl">
            Innovation, creativity, and excellence in every project we deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black">
              Work
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
                State
              </span>
            </h2>
            <div className="h-px w-16 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
            <p className="text-white/70 text-base md:text-lg max-w-md">
              Your go-to digital solution. Where innovation meets limitless
              possibilities. We craft digital experiences that transcend
              expectations.
            </p>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Follow Us</h3>
              <div className="flex space-x-4">
                <SocialIcon href="https://www.instagram.com/workstate.in?igsh=cWx4aGw4MW40bXoy">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </SocialIcon>
                <SocialIcon href="https://www.linkedin.com/company/workstate.in">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </SocialIcon>
                <SocialIcon href="https://x.com/WorkstateIn">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </SocialIcon>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xl md:text-2xl font-bold">Services</h3>
            <div className="space-y-3">
              {services.map((s, i) => (
                <div key={i} className="flex items-center space-x-2 h-10">
                  <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                  <span className="text-white/70 hover:text-white transition-all">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl md:text-2xl font-bold">Company</h3>
            <div className="space-y-3">
              {company.map((c, i) => (
                <Link
                  key={i}
                  href={c.href}
                  className="flex items-center space-x-2 text-white/70 hover:text-white transition-all h-10"
                >
                  <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-3 md:space-y-0">
          <div>
            <p className="text-white/60 text-base md:text-lg">
              © {currentYear} WorkState. All rights reserved.
            </p>
            {isMounted && currentTime && (
              <p className="text-white/50 text-sm md:text-base">
                {formatDateTime(currentTime)}
              </p>
            )}
          </div>
          <p className="text-white/50 text-base md:text-lg italic">
  Designed & Developed by{" "}
  <a
    href="https://www.linkedin.com/in/piyush-kadam2004/"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-white hover:text-blue-400"
  >
    Piyush Kadam
  </a>
</p>

        </div>
      </div>
    </footer>
  );
}

// SocialIcon component
function SocialIcon({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
      <svg
        className="w-5 h-5 relative z-10"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {children}
      </svg>
    </a>
  );
}
