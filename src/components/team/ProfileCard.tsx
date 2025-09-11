'use client'

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

type ProfileCardProps = {
  name: string;
  title: string;
  avatarUrl: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  instagramUrl?: string;
  linkedinUrl?: string;
  email?: string;
};

// Compute tilt on client only to avoid SSR/CSR markup mismatch

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  avatarUrl,
  enableTilt = true,
  enableMobileTilt = false,
  instagramUrl,
  linkedinUrl,
  email,
}) => {
  const [tiltClass, setTiltClass] = useState("");

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        duration: 0.3,
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0.8 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
      }
    }
  };

  const overlayVariants = {
    hidden: { scale: 0.98 },
    visible: { scale: 1 },
    hover: { scale: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
      }
    }
  };

  const iconContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    if (!enableTilt) return;
    const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const allowTilt = isMobile ? !!enableMobileTilt : true;
    if (allowTilt) {
      setTiltClass("[transform:perspective(1000px)] hover:[transform:perspective(1000px)_rotateX(4deg)_rotateY(-4deg)]");
    }
  }, [enableTilt, enableMobileTilt]);

  return (
    <motion.div 
      className={`group relative w-full max-w-[420px] mx-auto rounded-2xl border border-slate-800/60 bg-slate-800/50 backdrop-blur-sm shadow-xl transition-transform duration-300 ${tiltClass}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-700/20 to-slate-900/40 pointer-events-none" />
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative w-full h-[350px] sm:h-[400px] overflow-hidden">
          <motion.img
            src={avatarUrl}
            alt={name}
            className="w-screen h-full object-cover transition duration-300 ease-out group-hover:brightness-[0.55]"
            loading="lazy"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          />
          {/* Hover social overlay */}
          <motion.div 
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="pointer-events-auto flex items-center gap-5 rounded-full bg-slate-900/70 px-5 py-3 backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              variants={iconContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {instagramUrl && (
                <motion.a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-white hover:text-pink-300 text-3xl"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaInstagram />
                </motion.a>
              )}
              {linkedinUrl && (
                <motion.a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-white hover:text-sky-300 text-3xl"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin />
                </motion.a>
              )}
              {email && (
                <motion.a
                  href={`mailto:${email}`}
                  aria-label="Email"
                  className="text-white hover:text-emerald-200 text-3xl"
                  whileHover={{ scale: 1.2, rotate: 3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEnvelope />
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </div>
        <motion.div 
          className="p-6"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center">
            <motion.h3 
              className="text-xl font-semibold text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {name}
            </motion.h3>
            <motion.p 
              className="mt-1 inline-block rounded-full bg-slate-700/60 px-3 py-1 text-sm font-medium text-slate-200"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(71, 85, 105, 0.8)" }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;


