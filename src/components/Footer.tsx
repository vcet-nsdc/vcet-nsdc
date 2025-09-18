"use client"

import { motion } from "framer-motion"
import { Mail, Linkedin, Youtube, Instagram } from "lucide-react"

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <footer className="relative z-10 text-white overflow-hidden bg-black/50 rounded-2xl m-4 mt-8">
      
      {/* Main footer content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">About Us</h3>
            <div className="w-16 h-0.5 bg-purple-400 mb-6"></div>
            <p className="text-gray-300 leading-relaxed text-sm">
              The Official NSDC Student Chapter of VCET&apos;s Artificial Intelligence and Data Science Department provides a
              community to support Artificial Intelligence & Data Science learners of all ages, backgrounds and skills.
            </p>
          </motion.div>

          {/* Address Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Address</h3>
            <div className="w-16 h-0.5 bg-purple-400 mb-6"></div>
            <div className="text-gray-300 text-sm space-y-2">
              <p>Vidyavardhini&apos;s College Of Engineering and Technology, K.T. Marg,</p>
              <p>Vartak College Campus Vasai Road,</p>
              <p>Vasai-Virar, Maharashtra 401202</p>
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Quick Links</h3>
            <div className="w-16 h-0.5 bg-purple-400 mb-6"></div>
            <nav className="space-y-3">
              {["Home", "Events", "Team", "Contact"].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-300 hover:text-purple-400 transition-colors duration-200 text-sm"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Us Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Contact Us</h3>
            <div className="w-16 h-0.5 bg-purple-400 mb-6"></div>
            <div className="space-y-4">
              <motion.a
                href="mailto:nsdc@vcet.edu.in"
                className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail size={18} />
                <span className="text-sm">nsdc@vcet.edu.in</span>
              </motion.a>

              <div className="flex space-x-4 pt-2">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/vcet-nsdc/" },
                  { icon: Youtube, href: "#youtube" },
                  { icon: Instagram, href: "https://www.instagram.com/vcet.nsdc/" },
                ].map(({ icon: Icon, href }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom border line */}
        <motion.div className="mt-12 pt-8 border-t border-gray-800" variants={itemVariants}>
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2025 NSDC Student Chapter. All rights reserved.</p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer
