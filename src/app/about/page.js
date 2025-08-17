// app/about/page.js
export const metadata = {
  title: "About - WorkState",
};

export default function AboutPage() {
  const founders = [
    {
      name: "Sonu Khumhar",
      role: "Co-Founder • Web Developer",
      bio: "Creates modern, responsive, and fast websites, bringing ideas to life on the web with clean code and creative design.",
      image: "/sonu.jpeg",
    },
    {
      name: "Piyush Kadam",
      role: "Founder • Flutter App Developer",
      bio: "Specializes in crafting smooth, high-performance mobile applications with Flutter, delivering apps that are beautiful, functional, and reliable.",
      image: "/piyush.jpeg",
    },
    {
      name: "Vishal Mane",
      role: "Co-Founder • Video Editor",
      bio: "Transforms raw footage into compelling stories, delivering videos that capture attention and elevate brands.",
      image: "/vishal.jpeg",
    },
  ];

  return (
    <section
      className="relative px-8 py-20 pt-30 min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/about-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative max-w-5xl text-center text-white">
        <h1 className="text-5xl font-bold mb-6">About WorkState</h1>
        <p className="text-lg leading-relaxed mb-12">
          We’re on a mission to build digital platforms and deliver services that help individuals
          and businesses thrive online. From websites to mobile apps, video editing to social media
          management, we provide complete solutions — merging technical expertise with creative vision.
        </p>
      </div>

      {/* Founder Cards */}
<div className="relative grid gap-8 md:grid-cols-3 max-w-6xl w-full mt-8">
  {founders.map((founder, index) => (
    <div
      key={index}
      className="bg-black backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center shadow-lg hover:scale-105 transition-transform duration-300"
    >
      <img
        src={founder.image}
        alt={founder.name}
        className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-white shadow-md"
      />
      <h2 className="text-2xl font-semibold mt-4">{founder.name}</h2>
      <p className="text-sm text-gray-300">{founder.role}</p>
      <p className="mt-4 text-gray-200 text-sm">{founder.bio}</p>
    </div>
  ))}
</div>


      {/* Business Concept */}
      <div className="relative max-w-4xl mt-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Business Concept Overview</h2>
        <p className="text-gray-200 leading-relaxed">
          Our goal is to help businesses and individuals establish a powerful digital presence by
          providing high-quality, reliable, and creative solutions. Born from real-world industry
          experience, WorkState combines technical expertise with entrepreneurial insight to deliver
          impactful results.
        </p>
      </div>
    </section>
  );
}
