"use client";
import { useState, useEffect, useMemo } from 'react';

export default function HeroSection() {
  const [animationStep, setAnimationStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pre-generate fixed positions to avoid hydration mismatch
  const particlePositions = useMemo(() => {
    const positions = [];
    
    // Main particles (8 total)
    for (let i = 0; i < 8; i++) {
      positions.push({
        left: `${10 + (i * 10)}%`,
        top: `${20 + (i * 8)}%`,
        size: 2 + (i % 3),
        duration: 3 + (i * 0.3),
        delay: i * 300
      });
    }
    
    // Accent particles (4 total)
    for (let i = 0; i < 4; i++) {
      positions.push({
        left: `${70 + (i * 7)}%`,
        top: `${60 + (i * 10)}%`,
        size: 1,
        duration: 5 + (i * 0.4),
        delay: i * 800,
        isAccent: true
      });
    }
    
    return positions;
  }, []);

  // Fixed positions for background particles to avoid hydration issues
  const backgroundParticles = useMemo(() => [
    { left: '15%', top: '25%' },
    { left: '35%', top: '15%' },
    { left: '65%', top: '35%' },
    { left: '85%', top: '20%' },
    { left: '25%', top: '75%' },
    { left: '75%', top: '80%' }
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const steps = [
      () => setAnimationStep(1), // Show main image
      () => setAnimationStep(2), // Show text overlay
      () => setAnimationStep(3), // Final state
    ];

    steps.forEach((step, index) => {
      setTimeout(step, (index + 1) * 1000);
    });
  }, [isLoaded]);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* Background with subtle grid pattern */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/90 to-black"></div>
        </div>

        {/* Main Hero Background - h1.jpeg (orange eye image) */}
        <div className={`absolute inset-0 transition-all duration-2000 ease-out ${
          animationStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}>
          <img 
            src="/h1.jpeg" 
            alt="Where innovation meets imagination"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40"></div>
        </div>

        {/* Animated text overlay with glassmorphism effect */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1500 delay-700 ${
          animationStep >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-20'
        }`}>
          <div className="text-center px-8 py-12 rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 max-w-4xl mx-auto">
            <div className="relative">
              {/* Animated typing effect for main text */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                <span className="block">YOUR ONE STOP</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white animate-pulse">
                  DIGITAL SOLUTION
                </span>
              </h1>
              
              {/* Animated subtitle */}
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8 opacity-60"></div>
              
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                Where innovation meets limitless possibilities. We craft digital experiences that transcend expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Call-to-action section */}
        <div className={`absolute bottom-0 left-0 right-0 pb-20 transition-all duration-1000 delay-1200 ${
          animationStep >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <div className="text-center px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="relative z-10">EXPLORE OUR WORK</span>
                <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
              
              <div className="flex items-center space-x-2 text-white/60">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                <span className="text-sm">Scroll to discover more</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced floating particles with fixed positions */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particlePositions.slice(0, 8).map((particle, i) => (
            <div
              key={i}
              className={`absolute bg-white/10 rounded-full transition-all duration-3000 ${
                animationStep >= 2 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: particle.left,
                top: particle.top,
                animationDelay: `${particle.delay}ms`,
                animation: isLoaded ? `float ${particle.duration}s ease-in-out infinite` : 'none'
              }}
            ></div>
          ))}
          
          {/* Larger accent particles */}
          {particlePositions.slice(8).map((particle, i) => (
            <div
              key={`accent-${i}`}
              className={`absolute w-1 h-1 bg-white/20 rounded-full transition-all duration-4000 ${
                animationStep >= 3 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: `${particle.delay}ms`,
                animation: isLoaded ? `float ${particle.duration}s ease-in-out infinite reverse` : 'none'
              }}
            ></div>
          ))}
        </div>

        {/* Loading overlay */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          <div className="flex items-center justify-center h-full">
            <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      </section>

      {/* What We Create Section with h3 image */}
      <section className="relative min-h-screen bg-black border-t border-white/10 flex items-center">
        <div className="container mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            
            {/* Left: Text Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-sm font-medium rounded-full">
                    WHAT WE CREATE
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  ENDLESS
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
                    POSSIBILITIES
                  </span>
                </h2>
                
                <div className="h-px w-24 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
              </div>

              <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                We don't just build websites and apps. We architect digital universes where your wildest ideas come to life. Every pixel, every interaction, every moment is crafted with precision and passion.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Web Experiences", desc: "Responsive, lightning-fast websites that captivate" },
                  { title: "Mobile Apps", desc: "Native and cross-platform solutions" },
                  { title: "Digital Branding", desc: "Visual identities that leave lasting impressions" },
                  { title: "Video Production", desc: "Cinematic content that tells your story" }
                ].map((item, index) => (
                  <div key={index} className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer">
                    <div className="w-2 h-2 bg-white/40 rounded-full mt-2 group-hover:bg-white group-hover:scale-150 transition-all duration-300"></div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-white/90 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <span className="relative z-10">START YOUR PROJECT</span>
                <div className="absolute inset-0 bg-black/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
            </div>

            {/* Right: Interactive h3 Image - Much Larger */}
            <div className="lg:col-span-3 relative flex justify-center lg:justify-end">
              <div className="group relative w-full max-w-4xl">
                {/* Main image container with hover effects */}
                <div className="relative overflow-hidden rounded-3xl border border-white/20 shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1">
                  <img
                    src="/h3.jpeg"
                    alt="Knowledge has a beginning but no end"
                    className="w-full h-[600px] object-contain transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Interactive overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Floating elements around the image */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full backdrop-blur-md group-hover:scale-150 transition-all duration-500"></div>
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/10 rounded-full backdrop-blur-md group-hover:scale-125 transition-all duration-700 delay-100"></div>
                </div>

                {/* Animated background elements with fixed positions */}
                <div className="absolute inset-0 -z-10">
                  {backgroundParticles.map((particle, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/20 rounded-full"
                      style={{
                        left: particle.left,
                        top: particle.top,
                        animation: `float ${3 + (i * 0.5)}s ease-in-out infinite`,
                        animationDelay: `${i * 200}ms`
                      }}
                    ></div>
                  ))}
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-xl scale-110"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.3;
          }
          25% { 
            transform: translateY(-15px) translateX(5px) rotate(90deg); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-8px) translateX(-3px) rotate(180deg); 
            opacity: 1;
          }
          75% { 
            transform: translateY(-20px) translateX(8px) rotate(270deg); 
            opacity: 0.4;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(255,255,255,0.1);
          }
          50% { 
            box-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.1);
          }
        }
      `}</style>
    </div>
  );
}