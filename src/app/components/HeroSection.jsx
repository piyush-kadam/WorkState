"use client";
import { useState, useEffect, useMemo } from 'react';

export default function HeroSection() {
  const [animationStep, setAnimationStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animated text states
  const [leftWordIndex, setLeftWordIndex] = useState(0);
  const [rightWordIndex, setRightWordIndex] = useState(0);

  // Word arrays
  const leftWords = ['EVERYTHING', 'IDENTITY', 'VISION', 'STORY', 'POWER'];
  const rightWords = ['RESULTS', 'SUCCESS', 'GROWTH', 'VALUE', 'IMPACT'];

  // Floating particles
  const particlePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 8; i++) {
      positions.push({
        left: `${10 + (i * 10)}%`,
        top: `${20 + (i * 8)}%`,
        size: 2 + (i % 3),
        duration: 3 + (i * 0.3),
        delay: i * 300
      });
    }
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
      () => setAnimationStep(1),
      () => setAnimationStep(2),
      () => setAnimationStep(3),
    ];
    steps.forEach((step, index) => {
      setTimeout(step, (index + 1) * 1000);
    });
  }, [isLoaded]);

  // Cycle through words
  useEffect(() => {
    const leftInterval = setInterval(() => {
      setLeftWordIndex((prev) => (prev + 1) % leftWords.length);
    }, 2500);

    const rightInterval = setInterval(() => {
      setRightWordIndex((prev) => (prev + 1) % rightWords.length);
    }, 2500);

    return () => {
      clearInterval(leftInterval);
      clearInterval(rightInterval);
    };
  }, [leftWords.length, rightWords.length]);

  return (
    <div className="relative w-full max-w-full overflow-x-hidden">
{/* Hero Section */}
<section className="relative w-full min-h-[90vh] sm:min-h-screen overflow-hidden bg-black">
  {/* Background */}
  <div className="absolute inset-0 w-full h-full bg-black">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/90 to-black"></div>
  </div>

  {/* Main Hero Background */}
  <div
    className={`absolute inset-0 transition-all duration-2000 ease-out ${
      animationStep >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-105"
    }`}
  >
    <img
      src="/h1.jpeg"
      alt="Where innovation meets imagination"
      className="w-full h-[45vh] sm:h-[60vh] lg:h-[100vh] object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40"></div>
  </div>

 {/* Text Overlay */}
<div
  className={`absolute w-full px-4 sm:px-8 transition-all duration-1500 delay-700 ${
    animationStep >= 2  
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-20"
  } top-[15%] sm:top-[20%] lg:top-[25%]`}
>

  <div className="text-center px-4 sm:px-8 py-6 sm:py-10 rounded-2xl sm:rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 max-w-4xl mx-auto">
    <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white leading-tight mb-4 sm:mb-6">
      <span className="block">YOUR ONE STOP</span>
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white animate-pulse">
        DIGITAL SOLUTION
      </span>
    </h1>
    <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6 opacity-60"></div>
    <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
      Where innovation meets limitless possibilities. We craft digital
      experiences that transcend expectations.
    </p>
  </div>
</div>


<div
  className={`absolute left-0 right-0 transition-all duration-1000 delay-1200 ${
    animationStep >= 3
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10"
  } bottom-[30%] sm:bottom-[20%] lg:bottom-[10%]`}
>
  <div className="text-center px-6 sm:px-8">
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
      <button className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 hover:scale-105 transition-all duration-300 overflow-hidden">
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

  {/* Particles */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {particlePositions.slice(0, 8).map((particle, i) => (
      <div
        key={i}
        className={`absolute bg-white/10 rounded-full transition-all duration-3000 ${
          animationStep >= 2 ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          left: particle.left,
          top: particle.top,
          animationDelay: `${particle.delay}ms`,
          animation: isLoaded
            ? `float ${particle.duration}s ease-in-out infinite`
            : "none",
        }}
      />
    ))}
    {particlePositions.slice(8).map((particle, i) => (
      <div
        key={`accent-${i}`}
        className={`absolute w-1 h-1 bg-white/20 rounded-full transition-all duration-4000 ${
          animationStep >= 3 ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: particle.left,
          top: particle.top,
          animationDelay: `${particle.delay}ms`,
          animation: isLoaded
            ? `float ${particle.duration}s ease-in-out infinite reverse`
            : "none",
        }}
      />
    ))}
  </div>

  {/* Loading Overlay */}
  <div
    className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
      isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
    }`}
  >
    <div className="flex items-center justify-center h-full">
      <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
    </div>
  </div>
</section>

     {/* Video Section */}
<section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center">
  <div className="w-full px-[4vw] py-[8vh]">
    <div className="grid grid-cols-7 gap-[4vw] items-center w-full max-w-full">
      
      {/* Left Words */}
      <div className="col-span-7 lg:col-span-2 relative h-[30vh] lg:h-[40vh] flex items-center justify-center lg:justify-start">
        <div className="text-center lg:text-left space-y-[1vh]">
          <div className="text-[clamp(2rem,8vw,4rem)] font-black text-white leading-tight">
            <div>branding</div>
            <div className="text-white/60">is</div>
          </div>
          <div className="overflow-hidden h-[clamp(3rem,8vw,4.5rem)]">
            <span
              key={leftWordIndex}
              className="block text-[clamp(1.5rem,6vw,3rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white animate-slideIn"
            >
              {leftWords[leftWordIndex]}
            </span>
          </div>
        </div>
      </div>

      {/* Video Center */}
      <div className="col-span-7 lg:col-span-3 relative flex justify-center">
        <div className="relative w-full max-w-full">
          <div className="relative overflow-hidden">
            <video autoPlay loop muted playsInline className="w-full h-[40vh] lg:h-[90vh] object-cover bg-black">
              <source src="/h2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* Right Words */}
      <div className="col-span-7 lg:col-span-2 relative h-[30vh] lg:h-[40vh] flex items-center justify-center lg:justify-end">
        <div className="text-center lg:text-right space-y-[1vh]">
          <div className="text-[clamp(2rem,8vw,4rem)] font-black text-white leading-tight">
            <div className="text-white">freelancing</div>
            <div className="text-white" >brings</div>
          </div>
          <div className="overflow-hidden h-[clamp(3rem,8vw,4.5rem)]">
            <span
              key={rightWordIndex}
              className="block text-[clamp(1.5rem,6vw,3rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white animate-slideIn"
            >
              {rightWords[rightWordIndex]}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Technologies Section */}
<section className="relative w-full bg-black py-[6vh] overflow-hidden">
  <div className="w-full px-[2vw]">
    {/* Section Header */}
    <div className="text-center mb-[4vh]">
      <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black text-white leading-tight mb-4">
        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">Tech Stack</span>
      </h2>
      <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/60 to-transparent mx-auto mb-6"></div>
      <p className="text-white/60 text-[clamp(1rem,3vw,1.25rem)] max-w-2xl mx-auto">
        Cutting-edge technologies that power infinite possibilities
      </p>
    </div>

    {/* Scrolling Tech Stack */}
    <div className="relative space-y-8">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none"></div>
      
      {/* First Row - Moving Left */}
      <div className="relative overflow-hidden py-4">
        <div className="flex gap-8 animate-marquee-left">
          {[
            { name: 'React', logo: 'https://skillicons.dev/icons?i=react', fallback: '⚛️' },
            { name: 'MongoDB', logo: 'https://skillicons.dev/icons?i=mongodb', fallback: '🍃' },
            { name: 'Express', logo: 'https://skillicons.dev/icons?i=express', fallback: '🚀' },
            { name: 'Node.js', logo: 'https://skillicons.dev/icons?i=nodejs', fallback: '🟢' },
            { name: 'Flask', logo: 'https://skillicons.dev/icons?i=flask', fallback: '🧪' },
            { name: 'Flutter', logo: 'https://skillicons.dev/icons?i=flutter', fallback: '💙' },
            { name: 'WordPress', logo: 'https://skillicons.dev/icons?i=wordpress', fallback: '📝' },
            { name: 'Firebase', logo: 'https://skillicons.dev/icons?i=firebase', fallback: '🔥' },
            { name: 'AWS', logo: 'https://skillicons.dev/icons?i=aws', fallback: '☁️' },
            { name: 'Vercel', logo: 'https://skillicons.dev/icons?i=vercel', fallback: '▲' },
            { name: 'Netlify', logo: 'https://skillicons.dev/icons?i=netlify', fallback: '🌐' },
            { name: 'Supabase', logo: 'https://skillicons.dev/icons?i=supabase', fallback: '💚' }
          ].concat([
            { name: 'React', logo: 'https://skillicons.dev/icons?i=react', fallback: '⚛️' },
            { name: 'MongoDB', logo: 'https://skillicons.dev/icons?i=mongodb', fallback: '🍃' },
            { name: 'Express', logo: 'https://skillicons.dev/icons?i=express', fallback: '🚀' },
            { name: 'Node.js', logo: 'https://skillicons.dev/icons?i=nodejs', fallback: '🟢' },
            { name: 'Flask', logo: 'https://skillicons.dev/icons?i=flask', fallback: '🧪' },
            { name: 'Flutter', logo: 'https://skillicons.dev/icons?i=flutter', fallback: '💙' },
            { name: 'WordPress', logo: 'https://skillicons.dev/icons?i=wordpress', fallback: '📝' },
            { name: 'Firebase', logo: 'https://skillicons.dev/icons?i=firebase', fallback: '🔥' },
            { name: 'AWS', logo: 'https://skillicons.dev/icons?i=aws', fallback: '☁️' },
            { name: 'Vercel', logo: 'https://skillicons.dev/icons?i=vercel', fallback: '▲' },
            { name: 'Netlify', logo: 'https://skillicons.dev/icons?i=netlify', fallback: '🌐' },
            { name: 'Supabase', logo: 'https://skillicons.dev/icons?i=supabase', fallback: '💚' }
          ]).map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 group relative z-10"
              style={{ margin: '0 4px' }}
            >
              <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-2xl hover:bg-gradient-to-r hover:from-white/15 hover:to-white/25 hover:border-white/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer min-w-[180px] transform hover:scale-105 hover:-translate-y-2">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <img 
                    src={tech.logo} 
                    alt={tech.name}
                    className="w-8 h-8 object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                    onLoad={(e) => {
                      const fallback = e.target.nextElementSibling;
                      if (fallback) {
                        fallback.style.display = 'none';
                      }
                    }}
                  />
                  <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-lg items-center justify-center text-lg font-bold text-white border border-white/20 hidden">
                    {tech.fallback}
                  </div>
                </div>
                <span className="text-white font-semibold text-base whitespace-nowrap group-hover:text-white/90 transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second Row - Moving Right */}
      <div className="relative overflow-hidden py-4">
        <div className="flex gap-8 animate-marquee-right">
          {[
            { name: 'Figma', logo: 'https://skillicons.dev/icons?i=figma', fallback: '🎨' },
            { name: 'Photoshop', logo: 'https://skillicons.dev/icons?i=ps', fallback: '🖼️' },
            { name: 'Illustrator', logo: 'https://skillicons.dev/icons?i=ai', fallback: '🎭' },
            { name: 'After Effects', logo: 'https://skillicons.dev/icons?i=ae', fallback: '🎬' },
            { name: 'Premiere Pro', logo: 'https://skillicons.dev/icons?i=pr', fallback: '🎥' },
            { name: 'Blender', logo: 'https://skillicons.dev/icons?i=blender', fallback: '🔮' },
            { name: 'React Native', logo: 'https://skillicons.dev/icons?i=react', fallback: '📱' },
            { name: 'Shopify',logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Shopify_logo_2018.svg', fallback: '🛒' },
            { name: 'Next.js', logo: 'https://skillicons.dev/icons?i=nextjs', fallback: '⏭️' },
            { name: 'Framer', logo: 'https://uxwing.com/framer-color-icon/', fallback: '🖱️' },
            { name: 'Tailwind', logo: 'https://skillicons.dev/icons?i=tailwind', fallback: '🎨' },
            { name: 'Git', logo: 'https://skillicons.dev/icons?i=git', fallback: '🔀' }
          ].concat([
            { name: 'Figma', logo: 'https://skillicons.dev/icons?i=figma', fallback: '🎨' },
            { name: 'Photoshop', logo: 'https://skillicons.dev/icons?i=ps', fallback: '🖼️' },
            { name: 'Illustrator', logo: 'https://skillicons.dev/icons?i=ai', fallback: '🎭' },
            { name: 'After Effects', logo: 'https://skillicons.dev/icons?i=ae', fallback: '🎬' },
            { name: 'Premiere Pro', logo: 'https://skillicons.dev/icons?i=pr', fallback: '🎥' },
            { name: 'Blender', logo: 'https://skillicons.dev/icons?i=blender', fallback: '🔮' },
            { name: 'React Native', logo: 'https://skillicons.dev/icons?i=react', fallback: '📱' },
            { name: 'Shopify', logo: 'https://skillicons.dev/icons?i=shopify', fallback: '🛒' },
            { name: 'Next.js', logo: 'https://skillicons.dev/icons?i=nextjs', fallback: '⏭️' },
            { name: 'Framer', logo: 'https://skillicons.dev/icons?i=framer', fallback: '🖱️' },
            { name: 'Tailwind', logo: 'https://skillicons.dev/icons?i=tailwind', fallback: '🎨' },
            { name: 'Git', logo: 'https://skillicons.dev/icons?i=git', fallback: '🔀' }
          ]).map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 group relative z-10"
              style={{ margin: '0 4px' }}
            >
              <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-2xl hover:bg-gradient-to-r hover:from-white/15 hover:to-white/25 hover:border-white/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer min-w-[180px] transform hover:scale-105 hover:-translate-y-2">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <img 
                    src={tech.logo} 
                    alt={tech.name}
                    className="w-8 h-8 object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                    onLoad={(e) => {
                      const fallback = e.target.nextElementSibling;
                      if (fallback) {
                        fallback.style.display = 'none';
                      }
                    }}
                  />
                  <div className="w-8 h-8 bg-gradient-to-br from-white/20 to-white/10 rounded-lg items-center justify-center text-lg font-bold text-white border border-white/20 hidden">
                    {tech.fallback}
                  </div>
                </div>
                <span className="text-white font-semibold text-base whitespace-nowrap group-hover:text-white/90 transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>



     {/* What We Create Section */}
<section className="relative w-full bg-black flex items-center">
  <div className="w-full px-[4vw] py-[8vh]">
    <div className="grid grid-cols-5 gap-[6vw] items-center w-full max-w-full">
      
      {/* Left Content */}
      <div className="col-span-5 lg:col-span-2 space-y-[4vh]">
        <div className="space-y-4">
          <h2 className="text-[clamp(2rem,8vw,4rem)] font-black text-white leading-tight">
            What <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">We Create</span>
          </h2>
          <div className="h-px w-[15vw] max-w-24 bg-gradient-to-r from-white via-white/60 to-transparent"></div>
        </div>

        <p className="text-[clamp(1rem,3vw,1.25rem)] text-white/70 leading-relaxed max-w-lg">
          We don't just build websites and apps. We architect digital universes where your wildest ideas come to life.
        </p>

        <div className="space-y-[3vh]">
          {[
            { title: "Web Experiences", desc: "Responsive, lightning-fast websites that captivate" },
            { title: "Mobile Apps", desc: "Native and cross-platform solutions" },
            { title: "Digital Branding", desc: "Visual identities that leave lasting impressions" },
            { title: "Portfolio Design", desc: "personlal portfolios that tell your story" }
          ].map((item, index) => (
            <div
              key={index}
              className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              <div className="w-2 h-2 bg-white/40 rounded-full mt-2 group-hover:bg-white group-hover:scale-150 transition-all duration-300 flex-shrink-0"></div>
              <div>
                <h3 className="text-white font-semibold group-hover:text-white/90 transition-colors text-[clamp(0.875rem,2.5vw,1rem)]">
                  {item.title}
                </h3>
                <p className="text-white/50 text-[clamp(0.75rem,2vw,0.875rem)] group-hover:text-white/70 transition-colors">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image */}
      <div className="col-span-5 lg:col-span-3 relative flex justify-center lg:justify-end">
        <div className="group relative w-full max-w-full">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1">
            <img
              src="/h3.jpeg"
              alt="Knowledge has a beginning but no end"
              className="w-full h-[60vh] object-contain transition-all duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

           {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-15px) translateX(5px) rotate(90deg); opacity: 0.6; }
          50% { transform: translateY(-8px) translateX(-3px) rotate(180deg); opacity: 1; }
          75% { transform: translateY(-20px) translateX(8px) rotate(270deg); opacity: 0.4; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.1); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.1); }
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(100%); }
          25% { opacity: 1; transform: translateY(0%); }
          75% { opacity: 1; transform: translateY(0%); }
          100% { opacity: 0; transform: translateY(-100%); }
        }
        .animate-slideIn {
          animation: slideIn 2.5s ease-in-out;
        }

        /* 🔥 Added marquee animations */
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 30s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 30s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
        
        /* Prevent horizontal scroll */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}
