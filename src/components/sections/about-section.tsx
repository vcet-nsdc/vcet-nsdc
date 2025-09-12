/**
 * About Section Component
 * Information about NSDC and VCET
 */

'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1
    }
  }
  return (
    <motion.section 
      id="about" 
      className="relative z-10 max-w-7xl mx-auto px-6 py-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, staggerChildren: 0.2 }}
    >
      <div className="grid grid-cols-1 gap-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            About NSDC @ VCET
          </motion.h2>
          <motion.div 
            className="mx-auto mt-4 w-44"
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              className="h-0.5 w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent"
              variants={lineVariants}
              style={{ originX: 0.5 }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
            <motion.div 
              className="mx-auto mt-1 h-0.5 w-20 bg-gradient-to-r from-transparent via-purple-300 to-transparent"
              variants={lineVariants}
              style={{ originX: 0.5 }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </motion.div>
          <motion.div 
            className="mt-6 rounded-2xl border border-white/10 bg-black/30 backdrop-blur px-6 md:px-8 py-6 space-y-5 text-lg md:text-xl text-white/90 leading-relaxed shadow-lg"
            variants={itemVariants}
          >
            <motion.p
              variants={itemVariants}
            >
              The National Student Data Corps (NSDC) stands as a beacon of opportunity, ushering students into the vibrant world of data science within a nurturing community. With a keen eye towards empowering underserved institutions and students, NSDC offers a transformative journey filled with resources and support.
            </motion.p>
            <motion.p
              variants={itemVariants}
            >
              At its heart lies the NSDC Founding Committee, a dynamic assembly of 24 luminaries hailing from academia, industry, and nonprofits. Their collaborative spirit fuels the creation of a pioneering platform, uniting diverse perspectives to craft a groundbreaking program in data science, set to redefine inclusivity and innovation.
            </motion.p>
          </motion.div>

          <motion.h3 
            className="text-2xl md:text-3xl font-semibold pt-10 text-center"
            variants={itemVariants}
          >
            Our Vision
          </motion.h3>
          <motion.div 
            className="mx-auto mt-3 w-36"
            variants={itemVariants}
          >
            <motion.div 
              className="h-0.5 w-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              variants={lineVariants}
              style={{ originX: 0.5 }}
            ></motion.div>
            <motion.div 
              className="mx-auto mt-1 h-0.5 w-16 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
              variants={lineVariants}
              style={{ originX: 0.5 }}
            ></motion.div>
          </motion.div>
          <motion.div 
            className="mt-6 rounded-2xl border border-white/10 bg-slate-900/40 px-6 md:px-8 py-6 space-y-5 text-lg md:text-xl text-white/85 leading-relaxed shadow"
            variants={itemVariants}
          >
            <motion.p
              variants={itemVariants}
            >
              VCET-NSDC, the Professional Student Chapter, represents a gateway to the world of Data Science and Artificial Intelligence. It&apos;s not just a chapter; it is a community of learning and growth. This professional chapter is part of a global network of 650+ chapters! This gives our students wide exposure and the chance to communicate and collaborate globally.
            </motion.p>
            <motion.p
              variants={itemVariants}
            >
              The main aim of VCET-NSDC is to foster budding AI Engineers by providing them the opportunities to learn, explore, collaborate and enhance their skills in the field of Artificial Intelligence and Data Science.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
