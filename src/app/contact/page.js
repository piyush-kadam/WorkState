export const metadata = {
  title: "Contact - WorkState",
};

import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-black 
                        flex flex-col items-center justify-center px-6 pt-30 pb-20 text-white">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-white">
          Contact Us
        </h1>
        <p className="text-white/70 mt-4 max-w-xl mx-auto">
          Let’s build something amazing together. We’d love to hear from you.
        </p>
      </div>

      {/* ✅ Fixed missing < here */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10">
        {/* Left: Video */}
       <div className="rounded-xl overflow-hidden shadow-lg">
  <video
    src="/contact.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-80 md:h-95 object-cover rounded-xl"
  />
</div>

        {/* Right: Form (Client Component) */}
        <ContactForm />
      </div>
    </section>
  );
}
