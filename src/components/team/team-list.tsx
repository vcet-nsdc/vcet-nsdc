/**
 * Team List Component
 * Server component that displays team members
 */

import { teamData } from '@/data/team';
import { TeamMemberCard } from '@/components/team/team-member-card';

export async function TeamList() {
  const { heads, deputys } = teamData;

  return (
    <div className="space-y-16">
      {/* Heads Section */}
      <section>
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-wide text-white mb-8">
          HEADS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {heads.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {/* Deputys Section */}
      <section>
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold tracking-wide text-white mb-8">
          DEPUTYS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deputys.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}
