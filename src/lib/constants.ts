/**
 * Application constants and configuration
 * Centralized configuration for better maintainability
 */

// ============================================================================
// APPLICATION CONFIGURATION
// ============================================================================

export const APP_CONFIG = {
  name: 'NSDC VCET',
  description: 'National Student Data Corps - Vidyavardhini\'s College of Engineering and Technology',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://nsdc-vcet.vercel.app',
  version: '1.0.0',
  author: 'NSDC VCET Team',
  keywords: [
    'NSDC',
    'VCET',
    'Data Science',
    'Artificial Intelligence',
    'Student Chapter',
    'Machine Learning',
    'Data Visualization',
  ],
} as const;

// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================

export const NAVIGATION = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
  ],
  footer: [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/contact' },
    { label: 'Socials', href: '/socials' },
  ],
  social: [
    { label: 'Instagram', href: '#instagram', icon: 'instagram' },
    { label: 'LinkedIn', href: '#linkedin', icon: 'linkedin' },
    { label: 'YouTube', href: '#youtube', icon: 'youtube' },
    { label: 'Email', href: 'mailto:nsdc@vcet.edu.in', icon: 'mail' },
  ],
} as const;

// ============================================================================
// CONTACT INFORMATION
// ============================================================================

export const CONTACT_INFO = {
  email: 'nsdc@vcet.edu.in',
  chairperson: 'shreya@vcet.edu.in',
  secretary: 'saloni.225257205@vcet.edu.in',
  address: {
    street: 'Vidyavardhini\'s College Of Engineering and Technology, K.T. Marg',
    campus: 'Vartak College Campus Vasai Road',
    city: 'Vasai-Virar',
    state: 'Maharashtra',
    pincode: '401202',
    country: 'India',
  },
  coordinates: {
    lat: 19.4700,
    lng: 72.8000,
  },
} as const;

// ============================================================================
// STATISTICS
// ============================================================================

export const STATS = {
  teamMembers: 50,
  events: 12,
  participants: 1000,
  yearsActive: 1,
} as const;

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number',
  },
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Name must contain only letters and spaces',
  },
  message: {
    minLength: 10,
    maxLength: 1000,
    message: 'Message must be between 10 and 1000 characters',
  },
} as const;

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  contactSent: 'Thank you! Your message has been sent successfully.',
  eventRegistered: 'You have been registered for the event successfully.',
  profileUpdated: 'Your profile has been updated successfully.',
} as const;
