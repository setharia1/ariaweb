"use client";

import { useEffect, useState } from "react";

interface RequestDraftProps {
  postTitle: string;
}

export default function RequestDraft({ postTitle }: RequestDraftProps) {
  const [open, setOpen] = useState(false);
  
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Insights Draft Request",
          email,
          message: `Draft requested: ${postTitle}\n\nNote: ${note || "(none)"}`,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(typeof err?.message === "string" ? err.message : "Request failed");
    }
  }

  

  return (
    <div className="mt-3 w-full">
      {open ? (
        <div
          className="rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm p-4 shadow-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 -translate-y-1 scale-[0.98]"
          onAnimationEnd={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.classList.remove("opacity-0", "-translate-y-1", "scale-[0.98]");
            el.classList.add("opacity-100", "translate-y-0", "scale-100");
          }}
          style={{ animation: "none" }}
          ref={(el) => {
            if (el) {
              requestAnimationFrame(() => {
                el.classList.remove("opacity-0", "-translate-y-1", "scale-[0.98]");
                el.classList.add("opacity-100", "translate-y-0", "scale-100");
              });
            }
          }}
        >
            <p className="t-muted text-sm mb-3">
              How it works: Tell us where to send it. We’ll email you this draft
              within 1–2 business days. You can reply with feedback or questions.
            </p>
            {status === "success" ? (
              <div className="text-sm text-green-400">Thanks—check your inbox soon.</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-a/40 focus:border-accent-a/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  placeholder="Anything specific you want covered? (optional)"
                  className="w-full min-h-20 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent-a/40 focus:border-accent-a/40"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex items-center gap-2 pt-1">
                  <button className="btn-primary" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Send request"}
                  </button>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => setOpen(false)}
                    disabled={status === "sending"}
                  >
                    Cancel
                  </button>
                </div>
                {status === "error" && (
                  <div className="text-sm text-red-400">{errorMsg || "Something went wrong."}</div>
                )}
              </form>
            )}
        </div>
      ) : (
        <button
          className="btn-ghost mt-4 self-start"
          onClick={() => setOpen(true)}
        >
          Request draft →
        </button>
      )}
    </div>
  );
}


