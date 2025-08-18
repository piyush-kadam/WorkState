"use client";
import { useState, useRef, useEffect } from "react";

export default function WorkClient() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false); // new
  const videoRef = useRef(null);

  const enableAudio = () => {
    setMuted(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // slower video
      videoRef.current.pause(); // pause initially
      const timer = setTimeout(() => {
        setVideoVisible(true); // show video
        videoRef.current.play();
      }, 1000); // delay before starting
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {!videoEnded ? (
        <div className="relative w-full h-screen">
          <video
            ref={videoRef}
            src="/h5.mp4"
            muted={muted}
            playsInline
            onEnded={() => setVideoEnded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${videoVisible ? 'opacity-100' : 'opacity-0'}`}
          />

          {muted && videoVisible && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <button
                onClick={enableAudio}
                className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition"
              >
                🔊 Click for Audio
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center fadeIn w-full animate-fadeInUp">
          <h1 className="text-4xl font-bold mb-4">Our Work</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Here’s a showcase of our recent projects, highlighting the creativity
            and technical expertise we bring to every collaboration. Each project
            is crafted to meet our client’s vision while delivering an exceptional
            user experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transform transition"
              >
                <h2 className="text-xl font-semibold">Project {i}</h2>
                <p className="text-gray-400 mt-2">
                  This is a dummy description for project {i}.
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .fadeIn {
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
