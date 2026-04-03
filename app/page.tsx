"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Badge */}
      <div
        className="mb-10 animate-fade-in"
        style={{ animationDelay: "0ms" }}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-zinc-500 border border-zinc-800 rounded-full px-4 py-1.5">
          Tele-expertise · Endometriosis
        </span>
      </div>

      {/* Headline */}
      <h1
        className="text-center font-sans font-semibold text-white animate-fade-up"
        style={{
          fontSize: "clamp(2.5rem, 7vw, 5rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          animationDelay: "80ms",
          opacity: 0,
        }}
      >
        A second opinion,
        <br />
        <span className="text-zinc-500">finally.</span>
      </h1>

      {/* Subtext */}
      <p
        className="mt-6 text-center text-zinc-400 max-w-sm animate-fade-up"
        style={{
          fontSize: "1.0625rem",
          lineHeight: 1.65,
          animationDelay: "180ms",
          opacity: 0,
        }}
      >
        Endometriosis takes an average of 7 years to diagnose.
        Get a specialist&apos;s second opinion — remotely, within days.
      </p>

      {/* Form */}
      <div
        className="mt-12 w-full max-w-sm animate-fade-up"
        style={{ animationDelay: "280ms", opacity: 0 }}
      >
        {status === "success" ? (
          <div className="text-center">
            <p className="text-white font-medium text-sm tracking-wide">
              You&apos;re on the list.
            </p>
            <p className="text-zinc-500 text-sm mt-1">
              We&apos;ll reach out when we launch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === "loading"}
              className="w-full bg-transparent border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 text-sm outline-none focus:border-zinc-600 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="w-full bg-white text-black rounded-lg px-4 py-3 text-sm font-medium tracking-wide transition-all hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Joining..." : "Join the waitlist"}
            </button>
            {status === "error" && (
              <p className="text-center text-red-400 text-xs mt-1">{errorMessage}</p>
            )}
          </form>
        )}
      </div>

      {/* Footer */}
      <p
        className="mt-16 text-zinc-700 text-xs tracking-widest uppercase animate-fade-in"
        style={{ animationDelay: "500ms", opacity: 0 }}
      >
        Docaz
      </p>
    </main>
  );
}
