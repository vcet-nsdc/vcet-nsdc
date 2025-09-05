"use client";
import React, { useEffect, useState } from "react";
// Using standard img to avoid Next image domain config for now
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import ProfileCard from "./ProfileCard";

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
    <div className="relative min-h-screen py-12 overflow-hidden bg-slate-950">
      {/* Ripple Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Dark vignette to deepen background */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(1200px circle at center, rgba(0,0,0,0.0) 20%, rgba(0,0,0,0.35) 78%)" }} />
        {/* Static dual spotlights: left brighter, right slightly dimmer */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="spotlight-left absolute -top-60 -left-1/3 h-[170%] w-[200%] opacity-100 mix-blend-screen" />
          <div className="spotlight-right absolute -top-60 -right-1/3 h-[170%] w-[200%] opacity-85 mix-blend-screen" />
        </div>
      </div>
      <div className="relative z-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-white">Meet Our Team</h1>

      {/* HEADS Section (BE.json) */}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-wide text-white mb-8">HEADS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {beTeam.map((member) => {
            const avatar = member.photo.startsWith('http') ? member.photo : `/${member.photo}`;
            return (
              <ProfileCard
                key={member.id}
                name={member.name}
                title={member.position}
                avatarUrl={avatar}
                enableTilt={true}
                enableMobileTilt={false}
                instagramUrl={member.instagram}
                linkedinUrl={member.linkedin}
                email={member.email}
              />
            );
          })}
        </div>
      </div>

      {/* Deputys Section (TE.json) */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-wide text-white mb-8">Deputys</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teTeam.map((member) => {
            const avatar = member.photo.startsWith('http') ? member.photo : `/${member.photo}`;
            return (
              <ProfileCard
                key={member.id}
                name={member.name}
                title={member.position}
                avatarUrl={avatar}
                enableTilt={true}
                enableMobileTilt={false}
                instagramUrl={member.instagram}
                linkedinUrl={member.linkedin}
                email={member.email}
              />
            );
          })}
        </div>
      </div>
      </div>
    {/* Scoped styles for static spotlights */}
    <style jsx>{`
      .spotlight-left {
        background:
          radial-gradient(1400px 560px at 32% 0%, rgba(255,255,255,0.32), rgba(255,255,255,0) 62%),
          radial-gradient(1200px 480px at 32% 0%, rgba(99,102,241,0.45), rgba(99,102,241,0) 57%);
        filter: blur(0.5px);
      }
      .spotlight-right {
        background:
          radial-gradient(1300px 520px at 68% 0%, rgba(255,255,255,0.22), rgba(255,255,255,0) 62%),
          radial-gradient(1100px 440px at 68% 0%, rgba(59,130,246,0.35), rgba(59,130,246,0) 57%);
        filter: blur(0.5px);
      }
    `}</style>
    </div>
  );
};

export default Teams;
