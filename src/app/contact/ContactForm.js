"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setErrorMsg("");

    try {
      console.log("🚀 Submitting form with:", { name, email, message });

      // Call API to send emails
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, message }),
      });

      console.log("📢 Raw API response:", res);

      const data = await res.json();
      console.log("📩 API JSON response:", data);

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send email");
      }

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("❌ Error in ContactForm:", error);
      setErrorMsg("❌ Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-8 shadow-lg space-y-5"
    >
      <div>
        <label className="block mb-1 text-sm text-gray-400">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
          className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-400">Your Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm text-gray-400">Message</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={loading}
          className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition disabled:opacity-50"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

      {success && (
        <p className="text-green-400 text-center mt-4 animate-fadeIn">
          ✅ Your message has been sent & email delivered!
        </p>
      )}

      {errorMsg && (
        <p className="text-red-400 text-center mt-4 animate-fadeIn">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
