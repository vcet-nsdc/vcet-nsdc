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
  chairperson: 'shreya.225297202@vcet.edu.in ',
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
// THEME CONFIGURATION
// ============================================================================

export const THEME = {
  colors: {
    primary: '#7F45DB',
    primaryDark: '#4A2293',
    primaryLight: '#A472F7',
    secondary: '#8A8A8A',
    accent: '#A472F7',
    background: 'hsl(0 0% 100%)',
    foreground: 'hsl(0 0% 3.9%)',
    muted: 'hsl(0 0% 96.1%)',
    mutedForeground: 'hsl(0 0% 45.1%)',
    border: 'hsl(0 0% 89.8%)',
    input: 'hsl(0 0% 89.8%)',
    ring: 'hsl(0 0% 3.9%)',
  },
  fonts: {
    sans: ['Manrope', 'sans-serif'],
    heading: ['Dosis', 'sans-serif'],
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 10000,
  retries: 3,
  endpoints: {
    contact: '/contact',
    events: '/events',
    team: '/team',
  },
} as const;

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

export const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  },
  stagger: {
    children: 0.1,
    delay: 0.05,
  },
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
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  validation: 'Please check your input and try again.',
  notFound: 'The requested resource was not found.',
  unauthorized: 'You are not authorized to perform this action.',
  server: 'Server error. Please try again later.',
} as const;

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  contactSent: 'Thank you! Your message has been sent successfully.',
  eventRegistered: 'You have been registered for the event successfully.',
  profileUpdated: 'Your profile has been updated successfully.',
} as const;
