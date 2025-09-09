"use client";
import React, { useEffect, useState } from "react";
// Using standard img to avoid Next image domain config for now
// import { FaInstagram, FaLinkedin } from "react-icons/fa";
import ProfileCard from "./ProfileCard";
import Footer from "../Footer";
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
    <div className="relative py-12 overflow-hidden">
      <div className="relative z-10 mt-20">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-white">Meet Our Team</h1>

      {/* HEADS Section (BE.json) */}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-wide text-white mb-8">HEADS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-wide text-white mb-8">Deputys</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      {/* Add bottom padding to ensure proper spacing before footer */}
      <div className=""><Footer/></div>
    </div>
  );
};

export default Teams;
