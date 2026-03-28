"use client";

import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="min-h-full w-full overflow-x-hidden">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold mb-4">
            <span className="text-white">Registrations </span>
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Full!  
            </span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg font-sans">
            Techblitz 2026 registrations are now full. Thank you for your interest!
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="flex justify-center mb-6 relative z-10">
              <div className="h-24 w-24 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold mb-4 relative z-10 text-white leading-tight">
              Thank You for <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Registering!</span>
            </h2>
            <p className="text-white/80 text-lg mb-8 relative z-10 max-w-lg mx-auto font-sans">
              Registrations for Techblitz 2026 are now full. We appreciate your overwhelming response and enthusiasm!
            </p>
            <p className="text-white/70 text-lg mb-8 relative z-10 max-w-lg mx-auto font-sans">
              See you in our next event. Stay tuned for more exciting opportunities!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button
                onClick={() => window.location.href = "/"}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-lg px-8 py-3 rounded-lg transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                Return to Home
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
