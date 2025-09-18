"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Instagram } from "lucide-react"

export default function SocialSidebar() {
  const socialLinks = [
    { icon: Mail, href: "mailto:nsdc@vcet.edu.in", label: "Email" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/vcet-nsdc/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/vcet.nsdc/", label: "Instagram" },
  ]

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="flex flex-col space-y-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-purple-500/30 transition-all duration-300 border border-white/20"
          >
            <social.icon size={20} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
