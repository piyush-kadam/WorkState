export const metadata = {
  title: "Contact - WorkState",
};

import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 
                        flex flex-col items-center justify-center px-6 pt-30 pb-20 text-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-gray-400 mt-4 max-w-xl mx-auto">
          Let’s build something amazing together. Whether it’s a mobile app, a
          website, or a creative project, we’d love to hear from you.
        </p>
      </div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10">
        {/* Left: Info */}
        <div className="space-y-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:border-white transition">
            <h2 className="text-2xl font-semibold mb-4">Our Office</h2>
            <p className="text-gray-400">Mumbai, India</p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:border-white transition">
            <h2 className="text-2xl font-semibold mb-4">Email Us</h2>
            <p className="text-gray-400">workstateofficial@gmail.com</p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:border-white transition">
            <h2 className="text-2xl font-semibold mb-4">Call Us</h2>
            <p className="text-gray-400">+91 9876543210</p>
          </div>
        </div>

        {/* Right: Form (Client Component) */}
        <ContactForm />
      </div>
    </section>
  );
}
