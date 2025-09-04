import React from "react";
// Using standard img to avoid Next image domain config for now
import { FaInstagram, FaLinkedin } from "react-icons/fa";

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

// Import JSON file via alias
import teamData from "@staticdata/TE.json";

// Tell TypeScript it’s an array of TeamMember
const team: TeamMember[] = teamData as TeamMember[];

const Teams: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-10 text-gray-900">
        Meet Our Team
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="group bg-white border border-gray-200 shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-full h-56 overflow-hidden">
              <img
                src={member.photo.startsWith('http') ? member.photo : `/${member.photo}`}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="mt-1 inline-block rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                  {member.position}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Contact
                </a>
                <div className="flex items-center gap-4 text-2xl">
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="text-pink-500 hover:text-pink-600 transition-colors"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
