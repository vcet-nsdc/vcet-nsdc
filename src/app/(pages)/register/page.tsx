"use client";

import RegisterForm from "@/components/RegisterForm";
import { motion } from "framer-motion";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold mb-4">
            <span className="text-white">Enroll </span>
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Now
            </span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg font-sans">
            Secure your spot in the upcoming challenge. Assemble your team and prepare for the ultimate technical showdown.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RegisterForm />
        </motion.div>
      </main>
    </div>
  );
}
