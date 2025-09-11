"use client"
import React from 'react'
import { motion } from 'framer-motion'
import eventImg from './event-img.png' // Make sure this path is correct
import EventCard from './EventCard'

const Upcoming: React.FC = () => {
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false) // Moved to EventCard
  // const overlayRef = useRef<HTMLDivElement | null>(null) // Moved to EventCard and internal to EventCard
  // const cardWrapperRef = useRef<HTMLDivElement | null>(null) // Moved to EventCard
  // const cardRef = useRef<HTMLDivElement | null>(null) // Moved to EventCard
  // const frameRef = useRef<number | null>(null) // Moved to EventCard

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1
    }
  }

  // Removed useEffect hook as its functionality is no longer needed in Upcoming or moved to EventCard
  
  const events = [
    {
      title: "Code‑o‑Fiesta",
      dateTime: "September 13, 2025 • 9:30 AM",
      venue: "VCET, Vasai",
      shortDescription: "A coding competition where participants build real-world software solutions and present them to judges.",
      imagePath: eventImg,
      overview: "Code-o-Fiesta is a dynamic coding event designed to challenge and enhance participants' problem-solving abilities while applying their skills to real-life scenarios. Prior to the event, teams receive problem statements focused on developing innovative software or product solutions with practical applications. On the event day, participants showcase their completed projects to a panel of judges, making this competition both a test of technical expertise and a platform for meaningful innovation.",
      highlights: [
        "Pre-event problem statements focusing on real-world challenges.",
        "Teams build complete software/products before the event day.",
        "Initial Presentation Round: Teams present their developed products to judges.",
        "Evaluation Round: Judges assess solutions on functionality, creativity, execution, and relevance.",
        "A platform to apply coding skills beyond theory, fostering innovation and teamwork.",
      ],
      awards: [
        "Prizes and recognition for top-performing teams.",
        "Certificates for participants and winners.",
        "Potential opportunities for projects to gain further mentorship or exposure.",
      ],
    },
    {
      title: "TechX Product Showcase 2025",
      dateTime: "September 19, 2025 • 10:00 AM",
      venue: "Labs 114 & 115, VCET, Vasai",
      shortDescription: "A one-day product showcase highlighting cutting-edge technologies, bridging academic learning with industry exposure.",
      imagePath: eventImg, // Using the same image for now
      overview: "TechX 2025 was a one-day Product Showcase event organized by the Department of Artificial Intelligence and Data Science at VCET on September 19, 2025. Guided by faculty coordinators Prof. Sejal Dmello, Prof. Bhavika Gharat, and Prof. Neha Raut, the event aimed to bridge academic learning with industry exposure.\n\nThe event brought together 35 students across 17 teams to exhibit projects infused with technical ingenuity and creative flair. Inaugurated by Principal Mr. Harish Vankudre and Dean of Academic Affairs Mr. Vikas Gupta, TechX emphasized the institution’s commitment to innovation and collaboration. Industry partners like Edba Academy, Tech Cryptors, and DataMango showcased products including advanced drones, high-performance GPUs, and blockchain-based tools.\n\nThrough hands-on engagement, students enhanced their technical expertise, presentation skills, and professional communication, while also fostering holistic personal and professional growth.",
      highlights: [
        "Organized by the Department of Artificial Intelligence and Data Science, VCET.",
        "Featured 17 student teams showcasing innovative projects.",
        "Industry participation from Edba Academy, Tech Cryptors, DataMango, Zaplet, VM Protect, and Cosmic Spirit.",
        "Products included the DJI AIR3S drone, RTX 3090/3080 graphics cards, blockchain-based tools, and wireless video systems.",
        "Focused on enhancing technical, presentation, and communication skills through real-world exposure.",
      ],
      awards: [
        "Recognition for outstanding projects and presentations.",
        "Certificates of participation for all student teams.",
        "Special mention for innovative and industry-relevant solutions.",
      ],
    },
  ]

  return (
    <motion.div 
      className="font-body min-h-screen flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${eventImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Background overlay for better text readability */}
      <motion.div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      ></motion.div>
      
      {/* Removed overlayRef div */}

      {/* Removed Header Section */}

      {/* Removed Statistics Cards Section */}

      <motion.div 
        className="max-w-3xl mx-auto px-6 pt-20 pb-20 md:pt-40 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, staggerChildren: 0.2 }}
      >
        <motion.div className="flex flex-col items-center gap-16">
          {events.map((event, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      

      <motion.div 
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button 
          className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-4 rounded-full shadow-lg"
          onClick={scrollToTop} 
          aria-label="Scroll to top"
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <motion.svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={{ y: [0, -2, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </motion.svg>
        </motion.button>
      </motion.div>

      {/* Removed Modal Section */}

      <style jsx global>{`
        /* Removed pulse-ring animation */
        /* Removed float animation */
        
        * {
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Edge */
        }
        body.modal-open { 
          overflow: hidden; 
          position: fixed;
          width: 100%;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #8B5CF6;
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #A78BFA;
        }

        .shimmer { position: relative; overflow: hidden; }
        .shimmer::before { 
          content: ''; 
          position: absolute; 
          top: -50%; 
          left: -50%; 
          width: 200%; 
          height: 200%; 
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.12), transparent); 
          transform: rotate(45deg) translateX(-100%) translateY(-100%); 
          opacity: 0; 
          transition: all 0.6s;
          z-index: 20;
        }
        .shimmer:hover::before { 
          opacity: 1; 
          transform: rotate(45deg) translateX(100%) translateY(100%); 
        }

        /* Removed status-indicator */
        /* Removed gradient-bg */
        /* Removed glass-effect */
        /* Removed loading-spinner */
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .event-card-wrapper { perspective: 1200px; position: relative; z-index: 20; transition: z-index 0s 0.6s; }
        .event-card-wrapper.is-tilted { z-index: 30; transition: z-index 0s 0s; }
        .event-card { transform-style: preserve-3d; transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 1s cubic-bezier(0.22, 1, 0.36, 1); }
        .event-card-wrapper.is-tilted .event-card { transform: rotate3d(0.5, 1, 0, 15deg); box-shadow: rgba(0,0,0,0.30) 30px 50px 25px -40px, rgba(0,0,0,0.18) 0px 25px 30px 0px; }
        .event-card .card-content { position: relative; transform-style: preserve-3d; }
        .glass-pane { position: absolute; inset: 8px; border-radius: 20px; transform: translateZ(20px); transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.1s; }
        .event-card-wrapper.is-tilted .glass-pane { transform: translateZ(45px); }
        .event-card .floating-element { transform: translateZ(25px); transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.2s; transform-style: preserve-3d; }
        .event-card-wrapper.is-tilted .floating-element { transform: translateZ(60px); }
        .read-more-btn { transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.4s; }
        .event-card-wrapper.is-tilted .read-more-btn { transform: translateZ(90px) scale(1.05); }
        .attendee-icons { transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.3s; }
        .event-card-wrapper.is-tilted .attendee-icons { transform: translateZ(80px); }
        .card-surface { background: linear-gradient(180deg, #a78bfa 0%, #8b5cf6 45%, #7c3aed 100%); border: 1px solid rgba(139,92,246,0.35); box-shadow: 0 0 0 1px rgba(139,92,246,0.15), 0 10px 30px rgba(99,102,241,0.18); }
        /* Removed side-panel-gradient */
        /* Removed image-cover */
      `}</style>
    </motion.div>
  )
}

export default Upcoming