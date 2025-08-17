// app/components/HeroSection.jsx
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-28"> {/* increased top padding for fixed navbar */}
      {/* Left Text */}
      <div className="md:w-1/2">
        <h1 className="text-5xl font-bold leading-tight">
          YOUR ONE STOP FOR <span className="underline decoration-4">digital</span> SOLUTIONS.
        </h1>
        <p className="mt-6 text-gray-600">
          At WorkState, we specialize in creating unique websites that swiftly launch startups into the
          digital world with flair. By merging your goals with our creative expertise, we craft a unique
          online presence that stands out and embodies your innovative vision.
        </p>
        <button className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800">
          EXPLORE WORKSTATE
        </button>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <Image
          src="/heroo.jpeg"
          alt="Digital Solutions"
          width={400}
          height={350}
          className="rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}
