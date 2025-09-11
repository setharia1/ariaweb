"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || "Failed to send");
      }
      setStatus("sent");
      form.reset();
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <>
      {status === "sent" && (
        <div className="mb-6 p-3 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          Thanks—your message was sent.
        </div>
      )}
      {status === "error" && (
        <div className="mb-6 p-3 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30">
          {error}
        </div>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium t-strong mb-2">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 rounded-lg surface border-subtle t-strong focus:border-accent focus:outline-none"
            placeholder="Your name"
            disabled={status === "sending"}
          />
        </div>
        <div>
          <label className="block text-sm font-medium t-strong mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg surface border-subtle t-strong focus:border-accent focus:outline-none"
            placeholder="your@email.com"
            disabled={status === "sending"}
          />
        </div>
        <div>
          <label className="block text-sm font-medium t-strong mb-2">Message</label>
          <textarea
            rows={4}
            name="message"
            required
            className="w-full px-4 py-3 rounded-lg surface border-subtle t-strong focus:border-accent focus:outline-none"
            placeholder="Tell us about your opportunity..."
            disabled={status === "sending"}
          />
        </div>
        <button type="submit" className="btn-primary w-full" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
      </form>
    </>
  );
}


