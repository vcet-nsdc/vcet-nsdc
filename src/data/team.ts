/**
 * Team data with strong typing and validation
 * Centralized team management for better maintainability
 */

import type { TeamMember, TeamData } from '@/types';

// ============================================================================
// TEAM MEMBERS DATA
// ============================================================================

const heads: readonly TeamMember[] = [
  {
    id: 1,
    name: 'Shreya Wankhede',
    position: 'Chairperson',
    email: 'shreya.225297202@vcet.edu.in',
    instagram: 'https://www.instagram.com/shreyeeahh?igsh=amRucjlmNTRsMGxo/',
    linkedin: 'https://www.linkedin.com/in/shreya-wankhede-880308260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://res.cloudinary.com/ddjcjgi7a/image/upload/v1757573245/NSDC_copy_kxlyop.png',
  },
  {
    id: 2,
    name: 'Saloni Sutar',
    position: 'Secretary',
    email: 'saloni.225257205@vcet.edu.in',
    instagram: 'https://www.instagram.com/saloni_5261/',
    linkedin: 'https://www.linkedin.com/in/salonisutar1304avsc?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://res.cloudinary.com/ddjcjgi7a/image/upload/v1757572418/NSDC_copy_ota7cj.png',
  },
  {
    id: 3,
    name: 'Dhir Surti',
    position: 'Treasurer',
    email: 'dhir.225247102@vcet.edu.in',
    instagram: 'https://www.instagram.com/dhir.surti_/',
    linkedin: 'https://www.linkedin.com/in/dhir-surti-202532315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://res.cloudinary.com/ddjcjgi7a/image/upload/v1757573090/NSDC_copy_uku2un.png',
  },
  {
    id: 4,
    name: 'Ninad Patil',
    position: 'Organizing Head',
    email: 'ninad.225097101@vcet.edu.in',
    instagram: 'https://www.instagram.com/ninadddddd/',
    linkedin: 'https://www.linkedin.com/in/ninad-patil-87b20532b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Vishwatej Sarang',
    position: 'Organizing Head/Social Media Head/Website Head',
    email: 'vishwatej.225187101@vcet.edu.in',
    instagram: 'https://www.instagram.com/_.vishu_06/',
    linkedin: 'https://www.linkedin.com/in/vishwatej-sarang-709174291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'Aniruddh Sawant',
    position: 'Creative Head',
    email: 'aniruddh.225197108@vcet.edu.in',
    instagram: 'https://www.instagram.com/aniruddh_s_/',
    linkedin: 'http://linkedin.com/in/aniruddh-sawant-6ba8a2314',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    name: 'Gautam Chaudhari',
    position: 'Technical Head',
    email: 'gautam.224677101@vcet.edu.in',
    instagram: 'https://www.instagram.com/chaudhari.gautam09/',
    linkedin: 'https://www.linkedin.com/in/gautam-chaudhari-b70435279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    name: 'Sakshi Prabhakar Patil',
    position: 'Documentation & PR Head',
    email: 'sakshi.225117205@vcet.edu.in',
    instagram: 'https://www.instagram.com/sakshi_11204_/',
    linkedin: 'https://www.linkedin.com/in/sakshi-patil-3933a6328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
] as const;

const deputys: readonly TeamMember[] = [
  {
    id: 1,
    name: 'James Lewis',
    position: 'Co-Chairperson',
    email: 'james.236127101@vcet.edu.in',
    instagram: 'https://www.instagram.com/jamesjlewis_/',
    linkedin: 'https://www.linkedin.com/in/-jameslewis/',
    photo: 'https://images.unsplash.com/photo-1744091212191-add5a525b380?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Varun Dhanak',
    position: 'Deputy Treasurer',
    email: 'varun.235957101@vcet.edu.in',
    instagram: 'https://www.instagram.com/_varrruunnn_/',
    linkedin: 'https://www.linkedin.com/in/varun-dhanak-522396215?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://images.unsplash.com/photo-1743844914274-9e34fc75f841?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Swara Sameer Save',
    position: 'Deputy PR/Documentation Head',
    email: 'swara.236367205@vcet.edu.in',
    instagram: 'https://www.instagram.com/swarasave_10/',
    linkedin: 'https://www.linkedin.com/in/swara-save-587ab3370?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://images.unsplash.com/photo-1554907720-dad29c110141?q=80&w=726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Shruti Gauchandra',
    position: 'Deputy PR/Documentation Head',
    email: 'shruti.235997201@vcet.edu.in',
    instagram: 'https://www.instagram.com/shruti.___g/',
    linkedin: 'https://www.linkedin.com/in/shruti-gauchandra-03298b312?trk=contact-info',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Soham Sawant',
    position: 'Deputy Technical Head',
    email: 'soham.236387101@vcet.edu.in',
    instagram: 'https://www.instagram.com/_sawant_soham/',
    linkedin: 'https://www.linkedin.com/in/soham-sawant-54674b356?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'Sumit Patel',
    position: 'Deputy Technical Head',
    email: 'sumit.236247105@vcet.edu.in',
    instagram: 'https://www.instagram.com/sumitvpatel_/',
    linkedin: 'https://www.linkedin.com/in/sumitvpatel',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    name: 'Suraj Phirke',
    position: 'Deputy Social and Website Head',
    email: 'suraj.s2409467105@vcet.edu.in',
    instagram: 'https://www.instagram.com/developer.suraj.dev/',
    linkedin: 'https://www.linkedin.com/in/surajphirke',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    name: 'Divya Davane',
    position: 'Deputy Creative Head',
    email: 'divya.235937202@vcet.edu.in',
    instagram: 'https://www.instagram.com/divyacado/',
    linkedin: 'https://www.linkedin.com/in/divya-davane-973514316?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 9,
    name: 'Shifa Shaikh',
    position: 'Deputy Creative Head',
    email: 'shifa.s2409487209@vcet.edu.in',
    instagram: 'https://www.instagram.com/shifaa_18_/',
    linkedin: 'https://www.linkedin.com/in/shifa-shaikh-84b0b1375?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 10,
    name: 'Sharvari Bhondekar',
    position: 'Deputy Organizing Head',
    email: 'sharvari.235897202@vcet.edu.in',
    instagram: 'https://www.instagram.com/saru_.23_/',
    linkedin: 'https://www.linkedin.com/in/sharvari-bhondekar-872a7a282',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 11,
    name: 'Vaishnavi Vijay Pathare',
    position: 'Deputy Organizing Head',
    email: 'vaishnavi.236257201@vcet.edu.in',
    instagram: 'https://www.instagram.com/itsjusttt._vaishnavi_/',
    linkedin: 'https://www.linkedin.com/in/vaishnavi-vijay-pathare-872a7a282',
    photo: 'https://images.unsplash.com/photo-1650954913935-05f7a819b745?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
] as const;

// ============================================================================
// TEAM DATA EXPORT
// ============================================================================

export const teamData: TeamData = {
  heads,
  deputys,
} as const;

// ============================================================================
// TEAM UTILITIES
// ============================================================================

/**
 * Get all team members
 */
export function getAllTeamMembers(): readonly TeamMember[] {
  return [...heads, ...deputys];
}

/**
 * Get team members by position
 */
export function getTeamMembersByPosition(position: string): readonly TeamMember[] {
  return getAllTeamMembers().filter(member => 
    member.position.toLowerCase().includes(position.toLowerCase())
  );
}

/**
 * Get team member by ID
 */
export function getTeamMemberById(id: number): TeamMember | undefined {
  return getAllTeamMembers().find(member => member.id === id);
}

/**
 * Get team member by email
 */
export function getTeamMemberByEmail(email: string): TeamMember | undefined {
  return getAllTeamMembers().find(member => member.email === email);
}

// ============================================================================
// TEAM STATISTICS
// ============================================================================

export const teamStats = {
  total: getAllTeamMembers().length,
  heads: heads.length,
  deputys: deputys.length,
  technical: getTeamMembersByPosition('technical').length,
  creative: getTeamMembersByPosition('creative').length,
  organizing: getTeamMembersByPosition('organizing').length,
  pr: getTeamMembersByPosition('pr').length,
  documentation: getTeamMembersByPosition('documentation').length,
} as const;
