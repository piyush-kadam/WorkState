"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, message }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send email");
      }

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setErrorMsg("❌ Something went wrong: " + error.message);
      setSuccess(false);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (success || errorMsg) {
      setSuccess(false);
      setErrorMsg("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-6 shadow-lg space-y-4"
    >
      <div>
        <label className="block mb-1 text-sm text-gray-400">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={handleInputChange(setName)}
          required
          className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-400">Your Email</label>
        <input
          type="email"
          value={email}
          onChange={handleInputChange(setEmail)}
          required
          className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-400">Message</label>
        <textarea
          rows={3}
          value={message}
          onChange={handleInputChange(setMessage)}
          required
          className="w-full bg-transparent border border-gray-600 rounded-md px-3 py-2 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition"
        ></textarea>
      </div>

      {/* ✅ Button + messages together (no wasted space below) */}
      <div className="space-y-2">
        <button
          type="submit"
          className="w-full bg-white text-black font-semibold px-5 py-2.5 rounded-full hover:bg-gray-200 hover:scale-105 active:scale-95 transition-transform"
        >
          {success ? "Sent" : "Send Message"}
        </button>

        {success && (
          <p className="text-green-400 text-center animate-fadeIn text-sm">
            ✅ Your message has been submitted!
          </p>
        )}

        {errorMsg && (
          <p className="text-red-400 text-center animate-fadeIn text-sm">
            {errorMsg}
          </p>
        )}
      </div>
    </form>
  );
}
