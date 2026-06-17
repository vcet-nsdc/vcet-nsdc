"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setError("Invalid email or password.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full w-full flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-purple-600/20 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Admin <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Login</span>
          </h1>
          <p className="text-white/50 text-center text-sm mb-8">Sign in with your admin account</p>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/80 block mb-1">Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                placeholder="admin@vcet-nsdc.in"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/80 block mb-1">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
