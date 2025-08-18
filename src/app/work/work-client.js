"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function WorkClient() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef(null);

  const appImages = [{ id: "t1" }, { id: "t2" }, { id: "t3" }, { id: "t4" }, { id: "t5" }, { id: "t6" }];

  const shoeHiveImages = [{ id: "s1" }, { id: "s2" }, { id: "s3" }, { id: "s4" }, { id: "s5" }];

  const appliedPlusImages = [{ id: "a1" }, { id: "a2" }, { id: "a3" }, { id: "a4" }, { id: "a5" }];

  const enableAudio = () => {
    setMuted(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
      videoRef.current.pause();
      const timer = setTimeout(() => {
        setVideoVisible(true);
        videoRef.current.play();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pt-8">
      {!videoEnded ? (
        <div className="relative w-full h-screen">
          <video
            ref={videoRef}
            src="/h5.mp4"
            muted={muted}
            playsInline
            onEnded={() => setVideoEnded(true)}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoVisible ? "opacity-100" : "opacity-0"
            }`}
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
        <div className="w-full animate-fadeInUp pt-20">
          <h1 className="text-4xl font-bold mb-4 text-center">Tixoo Event App</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-16 text-center">
            Here&apos;s a showcase of our mobile app development process, from initial design to final implementation.
          </p>

          {/* Infinite Scrolling Images */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {appImages.concat(appImages).map((image, index) => (
                <div
                  key={`app-${index}`}
                  className="flex-shrink-0 mx-4 transition-all duration-300 hover:scale-110 image-container"
                >
                  <div className="w-48 h-80 rounded-xl overflow-hidden shadow-lg bg-gray-800">
                    <Image
                      src={`/${image.id}.jpeg`}
                      alt=""
                      width={192}
                      height={320}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ShoeHive Section */}
          <div className="mt-32">
            <h1 className="text-4xl font-bold mb-4 text-center">ShoeHive</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-16 text-center">
              Premium shoe shopping experience with modern e-commerce features and seamless user interface.
            </p>

            <div className="relative overflow-hidden">
              <div className="flex animate-scroll">
                {shoeHiveImages.concat(shoeHiveImages).map((image, index) => (
                  <div
                    key={`shoe-${index}`}
                    className="flex-shrink-0 mx-4 transition-all duration-300 hover:scale-110 image-container"
                  >
                    <div className="w-48 h-80 rounded-xl overflow-hidden shadow-lg bg-gray-800">
                      <Image
                        src={`/${image.id}.jpeg`}
                        alt=""
                        width={192}
                        height={320}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AppliedPlus Section */}
          <div className="mt-32 mb-20">
            <h1 className="text-4xl font-bold mb-4 text-center">AppliedPlus</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-16 text-center">
              Advanced job application platform with smart tracking, profile management, and career insights.
            </p>

            <div className="relative overflow-hidden">
              <div className="flex animate-scroll">
                {appliedPlusImages.concat(appliedPlusImages).map((image, index) => (
                  <div
                    key={`applied-${index}`}
                    className="flex-shrink-0 mx-4 transition-all duration-300 hover:scale-110 image-container"
                  >
                    <div className="w-48 h-80 rounded-xl overflow-hidden shadow-lg bg-gray-800">
                      <Image
                        src={`/${image.id}.jpeg`}
                        alt=""
                        width={192}
                        height={320}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .image-container:nth-child(3n + 2) {
          transform: scale(1.2);
          z-index: 10;
          position: relative;
        }

        .image-container:hover {
          z-index: 20;
        }
      `}</style>
    </div>
  );
}
