'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!enableTilt) return;
    const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const allowTilt = isMobile ? !!enableMobileTilt : true;
    if (allowTilt) {
      setTiltClass("[transform:perspective(1000px)] hover:[transform:perspective(1000px)_rotateX(4deg)_rotateY(-4deg)]");
    }
  }, [enableTilt, enableMobileTilt]);

  return (
    <div className={`group relative w-full max-w-[420px] mx-auto rounded-2xl border border-slate-800/60 bg-slate-800/50 backdrop-blur-sm shadow-xl transition-transform duration-300 ${tiltClass}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-700/20 to-slate-900/40 pointer-events-none" />
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative w-full h-[350px] sm:h-[400px] overflow-hidden">
          <img
            src={avatarUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Hover social overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-slate-900/70 px-4 py-2 backdrop-blur-md shadow-lg">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="text-pink-400 hover:text-pink-300 text-xl"
                >
                  <FaInstagram />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-sky-400 hover:text-sky-300 text-xl"
                >
                  <FaLinkedin />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  aria-label="Email"
                  className="text-emerald-300 hover:text-emerald-200 text-xl"
                >
                  <FaEnvelope />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="mt-1 inline-block rounded-full bg-slate-700/60 px-3 py-1 text-sm font-medium text-slate-200">
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;


