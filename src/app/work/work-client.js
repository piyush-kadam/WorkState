"use client";
import { useState, useRef, useEffect } from "react";

export default function CrazySpacePortfolio() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);
  const [hasPlayedVideo, setHasPlayedVideo] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const videoRef = useRef(null);

  const projects = [
    {
      name: "TIXOO",
      mainImage: "/tixoo.png",
      images: ["/t1.jpeg", "/t2.jpeg", "/t3.jpeg", "/t4.jpeg", "/t5.jpeg", "/t6.jpeg"],
      description: "EVENT • REVOLUTION • DIGITAL",
      details: "Revolutionary event management platform"
    },
    {
      name: "SHOEHIVE", 
      mainImage: "/shoehive.png",
      images: ["/s1.jpeg", "/s2.jpeg", "/s3.jpeg", "/s4.jpeg", "/s5.jpeg"],
      description: "PREMIUM • SHOES • EXPERIENCE",
      details: "Next-generation shoe shopping platform"
    },
    {
      name: "APPLIEDPLUS",
      mainImage: "/appliedplus.png", 
      images: ["/a1.jpeg", "/a2.jpeg", "/a3.jpeg", "/a4.jpeg", "/a5.jpeg"],
      description: "CAREERS • JOBS • FUTURE",
      details: "Advanced job application platform"
    }
  ];

  const enableAudio = () => {
    setMuted(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  useEffect(() => {
    const videoPlayed = sessionStorage.getItem('videoPlayed');
    if (videoPlayed) {
      setVideoEnded(true);
      setHasPlayedVideo(true);
    } else {
      if (videoRef.current) {
        videoRef.current.playbackRate = 0.8;
        videoRef.current.pause();
        const timer = setTimeout(() => {
          setVideoVisible(true);
          videoRef.current.play();
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    setHasPlayedVideo(true);
    sessionStorage.setItem('videoPlayed', 'true');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {!videoEnded && !hasPlayedVideo ? (
        <div className="relative w-full h-screen">
          <video
            ref={videoRef}
            src="/h5.mp4"
            muted={muted}
            playsInline
            onEnded={handleVideoEnd}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoVisible ? "opacity-100" : "opacity-0"
            }`}
          />

          {muted && videoVisible && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <button
                onClick={enableAudio}
                className="space-button bg-white text-black px-8 py-3 rounded-full font-bold shadow-2xl hover:scale-110 transition-all duration-300"
              >
                🔊 ACTIVATE AUDIO
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full min-h-screen relative">
          {/* Space Background */}
          <div className="fixed inset-0 z-0">
            <div className="stars-bg"></div>
            <div className="space-grid"></div>
          </div>

          {/* Floating Elements */}
          <div className="fixed inset-0 z-10 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="space-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-20 pt-20">
            {/* Space Header */}
            <div className="text-center mb-32">
              <h1 className="space-glitch text-9xl font-black mb-12" data-text="PORTFOLIO">
                PORTFOLIO
              </h1>
              <div className="space-subtitle text-3xl tracking-[0.5em] font-light">
                ◦ DIGITAL • COSMOS • EXPLORATION ◦
              </div>
            </div>

            {/* Crazy Space Grid */}
            <div className="max-w-[1600px] mx-auto px-8">
              <div className="space-chaos-grid">
                {projects.map((project, index) => (
                  <div
                    key={project.name}
                    className={`space-module space-module-${index + 1}`}
                    onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                  >
                    <div className="module-container">
                      {/* Main Project Display */}
                      <div className="main-display">
                        <div className="hologram-border">
                          <img
                            src={project.mainImage}
                            alt={project.name}
                            className="main-project-image"
                          />
                          <div className="scan-overlay"></div>
                          <div className="corner-brackets">
                            <div className="bracket top-left"></div>
                            <div className="bracket top-right"></div>
                            <div className="bracket bottom-left"></div>
                            <div className="bracket bottom-right"></div>
                          </div>
                        </div>
                        
                        <div className="project-terminal">
                          <div className="terminal-header">
                            <span className="terminal-dots">
                              <span></span><span></span><span></span>
                            </span>
                            <span className="terminal-title">{project.name}.exe</span>
                          </div>
                          <div className="terminal-content">
                            <div className="typing-text">{project.description}</div>
                            <div className="cursor-blink">_</div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Gallery */}
                      {selectedProject === index && (
                        <div className="expanded-gallery">
                          <div className="gallery-grid">
                            {project.images.map((imageSrc, imgIndex) => (
                              <div key={imgIndex} className="gallery-item">
                                <div className="gallery-frame">
                                  <img
                                    src={imageSrc}
                                    alt={`${project.name} screenshot ${imgIndex + 1}`}
                                    className="gallery-image"
                                  />
                                  <div className="image-static"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Floating Data */}
                      <div className="floating-data">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="data-fragment"
                            style={{
                              animationDelay: `${i * 0.3}s`,
                              left: `${10 + (i * 12)}%`
                            }}
                          >
                            {Math.floor(Math.random() * 9999).toString().padStart(4, '0')}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Space Footer */}
            <div className="mt-40 mb-20 text-center relative">
              <div className="cosmic-waves"></div>
              <h2 className="text-7xl font-black mb-8 space-glow">
                MISSION COMPLETE
              </h2>
              <div className="text-2xl font-light tracking-widest opacity-80">
                🌌 EXPLORING • INFINITE • POSSIBILITIES 🌌
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@100;300;400;700;900&family=Orbitron:wght@400;700;900&display=swap');

        * {
          font-family: 'Exo 2', 'Orbitron', monospace;
        }

        /* Space Background */
        .stars-bg {
          background-image: 
            radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, white 0.5px, transparent 0.5px),
            radial-gradient(circle at 50% 10%, white 0.8px, transparent 0.8px),
            radial-gradient(circle at 20% 80%, white 0.6px, transparent 0.6px),
            radial-gradient(circle at 80% 20%, white 1.2px, transparent 1.2px);
          background-size: 200px 200px, 150px 150px, 300px 300px, 250px 250px, 180px 180px;
          animation: starsMove 50s linear infinite;
          opacity: 0.6;
        }

        @keyframes starsMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-200px, -200px); }
        }

        .space-grid {
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
          animation: gridDrift 15s linear infinite;
        }

        @keyframes gridDrift {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(80px, 80px) rotate(2deg); }
        }

        /* Space Particles */
        .space-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: spaceFloat 8s ease-in-out infinite;
          box-shadow: 0 0 4px white, 0 0 8px white;
        }

        @keyframes spaceFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.3; }
          25% { transform: translate(50px, -30px) rotate(90deg); opacity: 1; }
          50% { transform: translate(-20px, -60px) rotate(180deg); opacity: 0.7; }
          75% { transform: translate(-40px, -10px) rotate(270deg); opacity: 0.9; }
        }

        /* Space Glitch Text */
        .space-glitch {
          position: relative;
          color: white;
          text-shadow: 0 0 20px rgba(255,255,255,0.5);
          animation: spaceGlitch 3s infinite;
        }

        .space-glitch::before,
        .space-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          color: white;
        }

        .space-glitch::before {
          animation: spaceGlitch1 0.6s infinite;
          z-index: -1;
          text-shadow: 2px 0 #666;
        }

        .space-glitch::after {
          animation: spaceGlitch2 0.6s infinite;
          z-index: -2;
          text-shadow: -2px 0 #333;
        }

        @keyframes spaceGlitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
        }

        @keyframes spaceGlitch1 {
          0% { transform: translate(0); opacity: 1; }
          20% { transform: translate(-2px, 2px); opacity: 0.8; }
          40% { transform: translate(-2px, -2px); opacity: 0.6; }
          60% { transform: translate(2px, 2px); opacity: 0.8; }
          80% { transform: translate(2px, -2px); opacity: 0.4; }
          100% { transform: translate(0); opacity: 1; }
        }

        @keyframes spaceGlitch2 {
          0% { transform: translate(0); opacity: 0.7; }
          20% { transform: translate(2px, -2px); opacity: 0.5; }
          40% { transform: translate(2px, 2px); opacity: 0.3; }
          60% { transform: translate(-2px, -2px); opacity: 0.5; }
          80% { transform: translate(-2px, 2px); opacity: 0.2; }
          100% { transform: translate(0); opacity: 0.7; }
        }

        /* Space Subtitle */
        .space-subtitle {
          text-shadow: 0 0 10px rgba(255,255,255,0.3);
          animation: spaceBreath 4s ease-in-out infinite;
        }

        @keyframes spaceBreath {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }

        /* Crazy Space Grid */
        .space-chaos-grid {
          display: grid;
          grid-template-columns: repeat(16, 1fr);
          grid-template-rows: repeat(12, 80px);
          gap: 30px;
          transform: perspective(1200px) rotateX(8deg) rotateY(-2deg);
        }

        .space-module-1 {
          grid-column: 1 / 7;
          grid-row: 1 / 6;
          transform: rotate(-8deg) scale(1.1);
          animation: spaceFloat1 12s ease-in-out infinite;
        }

        .space-module-2 {
          grid-column: 9 / 17;
          grid-row: 3 / 9;
          transform: rotate(5deg) scale(0.95);
          animation: spaceFloat2 15s ease-in-out infinite;
        }

        .space-module-3 {
          grid-column: 4 / 12;
          grid-row: 7 / 12;
          transform: rotate(-3deg) scale(1.05);
          animation: spaceFloat3 18s ease-in-out infinite;
        }

        @keyframes spaceFloat1 {
          0%, 100% { transform: rotate(-8deg) scale(1.1) translateY(0px) translateX(0px); }
          33% { transform: rotate(-5deg) scale(1.15) translateY(-30px) translateX(15px); }
          66% { transform: rotate(-10deg) scale(1.08) translateY(-15px) translateX(-10px); }
        }

        @keyframes spaceFloat2 {
          0%, 100% { transform: rotate(5deg) scale(0.95) translateY(0px) translateX(0px); }
          25% { transform: rotate(8deg) scale(1) translateY(-25px) translateX(-20px); }
          50% { transform: rotate(2deg) scale(0.98) translateY(-40px) translateX(25px); }
          75% { transform: rotate(6deg) scale(0.92) translateY(-10px) translateX(5px); }
        }

        @keyframes spaceFloat3 {
          0%, 100% { transform: rotate(-3deg) scale(1.05) translateY(0px) translateX(0px); }
          40% { transform: rotate(-6deg) scale(1.1) translateY(-35px) translateX(-15px); }
          80% { transform: rotate(0deg) scale(1.02) translateY(-20px) translateX(20px); }
        }

        /* Space Module */
        .space-module {
          position: relative;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .space-module:hover {
          transform: scale(1.05) rotate(0deg) !important;
          z-index: 200;
        }

        .module-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #111, #222, #111);
          border-radius: 15px;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.2);
          box-shadow: 
            0 0 30px rgba(255,255,255,0.1),
            inset 0 0 30px rgba(255,255,255,0.05),
            0 20px 40px rgba(0,0,0,0.5);
        }

        .module-container::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, 
            transparent 30%, 
            rgba(255,255,255,0.2) 50%, 
            transparent 70%);
          border-radius: 17px;
          z-index: -1;
          animation: hologramBorder 6s ease-in-out infinite;
        }

        @keyframes hologramBorder {
          0%, 100% { opacity: 0; transform: rotate(0deg); }
          50% { opacity: 1; transform: rotate(180deg); }
        }

        /* Main Display */
        .main-display {
          padding: 25px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .hologram-border {
          position: relative;
          flex: 1;
          margin-bottom: 20px;
          border-radius: 10px;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
        }

        .main-project-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(1.3) brightness(0.9);
          transition: all 0.5s ease;
        }

        .space-module:hover .main-project-image {
          transform: scale(1.1);
          filter: contrast(1.5) brightness(1.1);
        }

        .scan-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255,255,255,0.1) 50%, 
            transparent 100%);
          animation: scanSweep 4s ease-in-out infinite;
        }

        @keyframes scanSweep {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(200%) skewX(-20deg); }
        }

        /* Corner Brackets */
        .corner-brackets {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .bracket {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid white;
          animation: bracketPulse 2s ease-in-out infinite alternate;
        }

        .bracket.top-left {
          top: 10px;
          left: 10px;
          border-right: none;
          border-bottom: none;
        }

        .bracket.top-right {
          top: 10px;
          right: 10px;
          border-left: none;
          border-bottom: none;
        }

        .bracket.bottom-left {
          bottom: 10px;
          left: 10px;
          border-right: none;
          border-top: none;
        }

        .bracket.bottom-right {
          bottom: 10px;
          right: 10px;
          border-left: none;
          border-top: none;
        }

        @keyframes bracketPulse {
          from { opacity: 0.4; }
          to { opacity: 1; }
        }

        /* Terminal */
        .project-terminal {
          background: rgba(0,0,0,0.8);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          overflow: hidden;
        }

        .terminal-header {
          background: rgba(255,255,255,0.1);
          padding: 8px 15px;
          display: flex;
          align-items: center;
          font-size: 12px;
        }

        .terminal-dots {
          display: flex;
          gap: 4px;
          margin-right: 15px;
        }

        .terminal-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: white;
          opacity: 0.7;
        }

        .terminal-title {
          color: #ccc;
          font-weight: 600;
        }

        .terminal-content {
          padding: 15px;
          display: flex;
          align-items: center;
          font-family: 'Courier New', monospace;
          font-size: 14px;
        }

        .typing-text {
          color: white;
          font-weight: 600;
          letter-spacing: 1px;
        }

        .cursor-blink {
          margin-left: 5px;
          animation: blink 1s infinite;
          color: white;
          font-weight: bold;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Expanded Gallery */
        .expanded-gallery {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(0,0,0,0.98);
          border: 2px solid rgba(255,255,255,0.4);
          border-top: none;
          border-radius: 0 0 15px 15px;
          padding: 25px;
          z-index: 150;
          animation: expandDown 0.5s ease-out forwards;
          box-shadow: 
            0 10px 30px rgba(0,0,0,0.8),
            0 0 50px rgba(255,255,255,0.1);
        }

        @keyframes expandDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
        }

        .gallery-item {
          aspect-ratio: 4/3;
          cursor: pointer;
        }

        .gallery-frame {
          position: relative;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 8px;
          overflow: hidden;
          background: rgba(255,255,255,0.02);
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          filter: grayscale(0.2) contrast(1.2);
        }

        .gallery-frame:hover .gallery-image {
          transform: scale(1.1);
          filter: grayscale(0) contrast(1.4);
        }

        .image-static {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.05) 3px
          );
          animation: staticNoise 0.1s linear infinite;
          pointer-events: none;
        }

        @keyframes staticNoise {
          0% { transform: translateX(0); }
          100% { transform: translateX(10px); }
        }

        /* Floating Data */
        .floating-data {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .data-fragment {
          position: absolute;
          top: -20px;
          color: rgba(255,255,255,0.4);
          font-family: 'Courier New', monospace;
          font-size: 10px;
          font-weight: bold;
          animation: dataFall 8s linear infinite;
          text-shadow: 0 0 5px rgba(255,255,255,0.3);
        }

        @keyframes dataFall {
          0% { 
            transform: translateY(-20px) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(120%) rotate(360deg); 
            opacity: 0; 
          }
        }

        /* Space Button */
        .space-button {
          position: relative;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.3);
        }

        .space-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.6s;
        }

        .space-button:hover::before {
          left: 100%;
        }

        /* Space Glow */
        .space-glow {
          text-shadow: 
            0 0 10px rgba(255,255,255,0.5),
            0 0 20px rgba(255,255,255,0.3),
            0 0 30px rgba(255,255,255,0.2);
          animation: spaceGlowPulse 3s ease-in-out infinite;
        }

        @keyframes spaceGlowPulse {
          0%, 100% {
            text-shadow: 
              0 0 10px rgba(255,255,255,0.5),
              0 0 20px rgba(255,255,255,0.3),
              0 0 30px rgba(255,255,255,0.2);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(255,255,255,0.8),
              0 0 30px rgba(255,255,255,0.6),
              0 0 40px rgba(255,255,255,0.4),
              0 0 50px rgba(255,255,255,0.2);
          }
        }

        /* Cosmic Waves */
        .cosmic-waves {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at center, transparent 30%, rgba(255,255,255,0.1) 70%);
          animation: cosmicPulse 8s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes cosmicPulse {
          0%, 100% { transform: scale(0.8); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.1; }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .space-chaos-grid {
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(16, 60px);
            transform: perspective(800px) rotateX(5deg);
          }

          .space-module-1 {
            grid-column: 1 / 5;
            grid-row: 1 / 6;
          }

          .space-module-2 {
            grid-column: 5 / 9;
            grid-row: 2 / 7;
          }

          .space-module-3 {
            grid-column: 2 / 7;
            grid-row: 8 / 13;
          }
        }

        @media (max-width: 768px) {
          .space-chaos-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 40px;
            transform: none;
          }

          .space-module-1, .space-module-2, .space-module-3 {
            grid-column: 1;
            grid-row: auto;
            transform: none !important;
            animation: none !important;
            height: 500px;
          }

          .space-glitch {
            font-size: 4rem;
          }

          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Special Effects */
        .space-module::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: 
            radial-gradient(circle, transparent 30%, rgba(255,255,255,0.05) 70%);
          animation: energyField 10s linear infinite;
          pointer-events: none;
          z-index: -1;
        }

        @keyframes energyField {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .space-module:nth-child(even)::after {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
}