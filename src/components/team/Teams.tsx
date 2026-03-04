"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// Using standard img to avoid Next image domain config for now
// import { FaInstagram, FaLinkedin } from "react-icons/fa";
import ProfileCard from "./ProfileCard";
// import ShaderBackground from "../shader-background";

// Define type for JSON structure
interface TeamMember {
  id: number;
  name: string;
  position: string;
  email: string;
  instagram: string;
  linkedin: string;
  photo: string;
}

// Load team JSON at runtime to avoid importing from public/

const Teams: React.FC = () => {
  const [beTeam, setBeTeam] = useState<TeamMember[]>([]);
  const [teTeam, setTeTeam] = useState<TeamMember[]>([]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  useEffect(() => {
    Promise.all([
      fetch('/staticdata/BE.json').then(r => r.json()).catch(() => []),
      fetch('/staticdata/TE.json').then(r => r.json()).catch(() => []),
    ])
    .then(([be, te]) => {
      setBeTeam(Array.isArray(be) ? be : []);
      setTeTeam(Array.isArray(te) ? te : []);
    })
    .catch(() => {
      setBeTeam([]);
      setTeTeam([]);
    });
  }, []);

  return (
    <div className="relativ
    e py-12 overflow-hidden">
      <motion.div 
        className="relative z-10 mt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-white"
          variants={titleVariants}
        >
          Meet Our Team
        </motion.h1>

        {/* HEADS Section (BE.json) */}
        <motion.div className="max-w-7xl mx-auto px-6" variants={itemVariants}>
          <motion.h2 
            className="text-center text-4xl sm:text-5xl font-extrabold tracking-wide text-white mb-8"
            variants={titleVariants}
          >
            HEADS
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {beTeam.map((member) => {
              const avatar = member.photo.startsWith('http') ? member.photo : `/${member.photo}`;
              return (
                <motion.div key={member.id} variants={itemVariants}>
                  <ProfileCard
                    name={member.name}
                    title={member.position}
                    avatarUrl={avatar}
                    enableTilt={true}
                    enableMobileTilt={false}
                    instagramUrl={member.instagram}
                    linkedinUrl={member.linkedin}
                    email={member.email}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Deputys Section (TE.json) */}
        <motion.div className="max-w-7xl mx-auto px-6 mt-12" variants={itemVariants}>
          <motion.h2 
            className="text-center text-4xl sm:text-5xl font-extrabold tracking-wide text-white mb-8"
            variants={titleVariants}
          >
            Deputys
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {teTeam.map((member) => {
              const avatar = member.photo.startsWith('http') ? member.photo : `/${member.photo}`;
              return (
                <motion.div key={member.id} variants={itemVariants}>
                  <ProfileCard
                    name={member.name}
                    title={member.position}
                    avatarUrl={avatar}
                    enableTilt={true}
                    enableMobileTilt={false}
                    instagramUrl={member.instagram}
                    linkedinUrl={member.linkedin}
                    email={member.email}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
      
    </div>
  );
};

export default Teams;
