"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setErrorMsg(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="flex justify-center mb-6 relative z-10">
          <div className="h-24 w-24 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-400" />
          </div>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold mb-4 relative z-10 text-white leading-tight">
          Registration <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Successful!</span>
        </h2>
        <p className="text-white/80 text-lg mb-8 relative z-10 max-w-lg mx-auto font-sans">
          Welcome to the event. Your team details have been recorded. Check your email for further instructions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <a
            href="https://chat.whatsapp.com/KQoIfrNGOuPElrd1Nwyst7"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white font-semibold text-lg px-8 py-3 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
          >
            Join WhatsApp Group
          </a>
          <button
            onClick={() => router.push("/")}
            className="bg-white/10 text-white font-semibold text-lg px-8 py-3 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-6 sm:p-10 relative">
      <div className="mb-10 text-center pb-8 border-b border-white/10">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-white">
          Join the <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Event</span>
        </h2>
        <p className="text-white/70 font-sans text-sm sm:text-base">
          Assemble your squad of 2 to 3 members.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-200">
          <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
          <p className="font-sans">{errorMsg}</p>
        </div>
      )}

      <div className="space-y-8 font-sans">
        {/* Section 1: Team Details */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-8 relative">
          <div className="absolute -top-3 left-6 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            1. Squad Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 block">Squad Name *</label>
              <input
                required
                type="text"
                name="squadName"
                placeholder="e.g. Byte Brawlers"
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-sans"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 block">Domain *</label>
              <select
                required
                name="domain"
                className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all appearance-none cursor-pointer font-sans [&>option]:bg-zinc-900"
              >
                <option value="">-- Choose Your Path --</option>
                <option value="ai">Agentic AI</option>
                <option value="vibeathon">Vibeathon</option>
                <option value="uiux">UI/UX Challenge</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Team Leader */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-8 relative">
          <div className="absolute -top-3 left-6 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            2. The Leader
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 block">Full Name *</label>
              <input required type="text" name="leaderFullName" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 block">Email Address *</label>
              <input required type="email" name="leaderEmail" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 block">Phone Number *</label>
              <input required type="tel" name="leaderPhone" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 block">College / Institution *</label>
              <input required type="text" name="leaderCollege" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
            </div>
          </div>
        </div>

        {/* Section 3: Member 2 */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-8 relative">
          <div className="absolute -top-3 left-6 bg-zinc-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            3. Member Two
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 block">Full Name *</label>
              <input required type="text" name="member2FullName" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 block">Email Address *</label>
              <input required type="email" name="member2Email" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
            </div>
          </div>
        </div>

        {/* Section 4: Member 3 (Optional) */}
        <div className="bg-white/5 border border-white/10 border-dashed rounded-xl p-5 sm:p-8 relative">
          <div className="absolute -top-3 left-6 bg-zinc-700 text-white/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            4. Member Three (Optional)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 block">Full Name</label>
              <input type="text" name="member3FullName" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70 block">Email Address</label>
              <input type="email" name="member3Email" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all" />
            </div>
          </div>
        </div>

        {/* Section 5: Make Payment */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-8 relative">
          <div className="absolute -top-3 left-6 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            5. Make Payment (150 Rs)
          </div>

          <div className="flex flex-col items-center mt-4 space-y-4">
            <p className="text-white/80 text-sm text-center">
              Scan the QR code below to make the payment via UPI
            </p>
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <img
                src="/assests/payment.jpeg"
                alt="Payment QR Code"
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain"
              />
            </div>
            <p className="text-white/60 text-sm font-mono">
              UPI ID: varunsoni998@okaxis
            </p>
          </div>
        </div>

        {/* Section 6: Payment Verification */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-8 relative">
          <div className="absolute -top-3 left-6 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            6. Payment Verification
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 block">Transaction ID *</label>
              <input required type="text" name="transactionId" placeholder="e.g. T1234567890" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all font-mono" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90 block">Payment Screenshot *</label>
              <input required type="file" name="paymentScreenshot" accept="image/*" className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-white/10 text-center">
        <button
          disabled={isSubmitting}
          type="submit"
          className="relative inline-flex items-center justify-center w-full sm:w-auto px-10 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:-translate-y-1"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              PROCESSING...
            </>
          ) : (
            "SUBMIT REGISTRATION"
          )}
        </button>
      </div>
    </form>
  );
}
