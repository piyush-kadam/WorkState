"use client";
import { useState, useRef, useEffect } from "react";

export default function SimpleSpacePortfolio() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const videoRef = useRef(null);

  const projects = [
    {
      name: "TIXOO",
      mainImage: "/tixoo.png",
      images: ["/t1.jpeg","/t2.jpeg","/t3.jpeg","/t4.jpeg","/t5.jpeg","/t6.jpeg","/t7.jpeg","/t8.jpeg"],
      description: "EVENT MANAGEMENT PLATFORM",
      details: "Revolutionary digital experience for event organization and ticketing system",
      year: "2024",
    },
    {
      name: "SHOEHIVE",
      mainImage: "/shoehive.png",
      images: ["/s1.jpeg","/s2.jpeg","/s3.jpeg","/s4.jpeg","/s5.jpeg","/s6.jpeg","/s7.jpeg","/s8.jpeg"],
      description: "PREMIUM SHOE MARKETPLACE",
      details: "Next-generation shopping experience with premium shoe collections",
      year: "2023",
    },
    {
      name: "APPLIEDPLUS",
      mainImage: "/appliedplus.png",
      images: ["/a1.jpeg","/a2.jpeg","/a3.jpeg","/a4.jpeg","/a5.jpeg","/a6.jpeg","/a7.jpeg","/a8.jpeg"],
      description: "CAREER PLATFORM",
      details: "Advanced job application system connecting talent with opportunities",
      year: "2024",
    },
  ];

  // ✅ Setup playback rate (slows video down)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // slow motion
    }
  }, []);

  const handleVideoEnd = () => {
    setIsFadingOut(true); // trigger fade-out
    setTimeout(() => {
      setVideoEnded(true); // remove video after transition
    }, 1200); // match fade-out duration
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const skipVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    handleVideoEnd();
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* ✅ Intro Video Overlay with fade in/out */}
      {!videoEnded && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000 ${
            isFadingOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <video
            ref={videoRef}
            src="/h5.mp4"
            autoPlay
            muted={muted}
            className="w-full h-full object-cover fade-in"
            onEnded={handleVideoEnd}
          />
          {/* Controls */}
          <div className="absolute bottom-6 right-6 flex gap-3">
            <button
              onClick={toggleMute}
              className="px-4 py-2 bg-white/20 text-white rounded-lg border border-white/40 hover:bg-white/30 transition"
            >
              {muted ? "Unmute" : "Mute"}
            </button>
            <button
              onClick={skipVideo}
              className="px-4 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600/90 transition"
            >
              Skip Intro
            </button>
          </div>
        </div>
      )}

      {/* ✅ Portfolio Content */}
      <div className="w-full min-h-screen relative">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-black"></div>
          <div className="stars"></div>
        </div>

        <div className="relative z-20 pt-32 pb-16">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-wider">PORTFOLIO</h1>
            <div className="text-lg tracking-[0.3em] text-gray-400 font-light">DIGITAL ARCHITECT</div>
          </div>

          {/* Projects List */}
          <div className="max-w-7xl mx-auto px-6 space-y-32">
            {projects.map((project, index) => (
              <div key={project.name} className="project-section">
                {/* Project Header */}
                <div className="project-header mb-12">
                  <div className="titlebar flex items-baseline justify-between mb-4">
                    <h2 className="project-title">{project.name}</h2>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <p className="project-details">{project.details}</p>
                </div>

                {/* Project Content */}
                <div className="project-content">
                  {/* Main App Image */}
                  <div className="main-app-display mb-16">
                    <div className="app-container">
                      <div className="app-frame">
                        <img src={project.mainImage} alt={project.name} className="app-image" />
                      </div>
                      <div className="app-label">MAIN APPLICATION</div>
                    </div>
                  </div>

                  {/* App Screenshots */}
                  <div className="screenshots-section">
                    <div className="section-label mb-8">
                      APP SCREENSHOTS • {project.images.length} IMAGES
                    </div>
                    <div className="screenshots-grid">
                      {project.images.map((imageSrc, imgIndex) => (
                        <div key={imgIndex} className="screenshot-item">
                          <div className="screenshot-frame">
                            <img
                              src={imageSrc}
                              alt={`${project.name} screenshot ${imgIndex + 1}`}
                              className="screenshot-image"
                            />
                          </div>
                          <div className="screenshot-number">
                            {String(imgIndex + 1).padStart(2, "0")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index < projects.length - 1 && (
                  <div className="project-divider">
                    <div className="divider-line"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center mt-40">
            <div className="text-4xl font-black mb-4">END TRANSMISSION</div>
            <div className="text-sm tracking-widest text-gray-500">PORTFOLIO • 2024 • SPACE</div>
          </div>
        </div>
      </div>

      {/* ⭐ Styles */}
      <style jsx>{`
        :global(html), :global(body) { overflow-x: hidden; }
        .fade-in {
          animation: fadeIn 1.5s ease-in forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(1px 1px at 20px 30px, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.2), transparent),
            radial-gradient(1px 1px at 160px 30px, rgba(255,255,255,0.2), transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          opacity: 0.3;
        }
        .project-section { position: relative; }
        .project-header { text-align: left; max-width: 600px; }
        .project-title { font-size: 4rem; font-weight: 900; letter-spacing: 0.05em; margin: 0; }
        .project-year { font-size: 1.2rem; color: #666; font-weight: 600; }
        .project-description { font-size: 14px; color: #888; font-weight: 600; letter-spacing: 0.2em; margin: 8px 0; }
        .project-details { font-size: 18px; color: #ccc; line-height: 1.5; margin: 0; }
        .main-app-display { display: flex; justify-content: center; }
        .app-container { display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .app-frame { width: 700px; height: 500px; border: 2px solid rgba(255,255,255,0.2); border-radius: 16px; overflow: hidden; background: rgba(255,255,255,0.02); display: flex; align-items: center; justify-content: center; padding: 24px; }
        .app-image { max-width: 100%; max-height: 100%; object-fit: contain; filter: contrast(1.1); }
        .app-label { font-size: 14px; color: #666; font-weight: 600; letter-spacing: 0.15em; }
        .screenshots-section { margin-top: 80px; }
        .section-label { font-size: 13px; color: #888; font-weight: 700; letter-spacing: 0.2em; text-align: center; }
        .screenshots-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 40px; max-width: 1200px; margin: 0 auto; justify-items: center; }
        .screenshot-item { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; }
        .screenshot-frame { width: 240px; height: 420px; border: 1px solid rgba(255,255,255,0.3); border-radius: 10px; overflow: hidden; background: rgba(255,255,255,0.01); display: flex; align-items: center; justify-content: center; padding: 16px; transition: all 0.3s ease; margin: 0 auto; margin-right: 20px; }
        .screenshot-image { max-width: 100%; max-height: 100%; object-fit: contain; filter: grayscale(0.1) contrast(1.1); transition: filter 0.3s ease; }
        .screenshot-frame:hover { border-color: rgba(255,255,255,0.5); transform: translateY(-6px); }
        .screenshot-frame:hover .screenshot-image { filter: grayscale(0) contrast(1.2); }
        .screenshot-number { font-size: 12px; color: #666; font-weight: 600; background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 4px; }
        .project-divider { margin-top: 100px; display: flex; justify-content: center; }
        .divider-line { width: 220px; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); }
        @media (max-width: 640px) {
          .project-header { text-align: center; margin-left: auto; margin-right: auto; max-width: 90vw; }
          .titlebar { flex-direction: column; align-items: center; gap: 6px; }
          .project-title { font-size: 2.25rem; line-height: 1.1; }
          .project-year { font-size: 1rem; }
          .main-app-display { justify-content: center; }
          .app-frame { width: min(92vw, 360px); height: auto; aspect-ratio: 4 / 3; padding: 12px; margin: 0 auto; }
          .screenshots-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; width: 100%; }
          .screenshot-item { width: 100%; align-items: center; }
          .screenshot-frame { width: 100%; aspect-ratio: 9 / 16; height: auto; padding: 6px; }
          .section-label { text-align: center; }
          .project-divider { margin-top: 60px; }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .project-header { max-width: 90vw; }
          .app-frame { width: 90vw; height: auto; aspect-ratio: 4 / 3; }
          .screenshots-grid { grid-template-columns: repeat(2, 1fr); justify-items: center; }
          .screenshot-frame { width: 280px; height: auto; aspect-ratio: 9 / 16; }
        }
      `}</style>
    </div>
  );
}
