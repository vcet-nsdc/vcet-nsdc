/**
 * Internationalization (i18n) Configuration
 * Prepared for future multi-language support
 */

// ============================================================================
// SUPPORTED LANGUAGES
// ============================================================================

export const SUPPORTED_LANGUAGES = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

// ============================================================================
// TRANSLATION KEYS
// ============================================================================

export const TRANSLATION_KEYS = {
  // Navigation
  nav: {
    home: 'nav.home',
    events: 'nav.events',
    team: 'nav.team',
    contact: 'nav.contact',
  },
  // Common
  common: {
    loading: 'common.loading',
    error: 'common.error',
    success: 'common.success',
    cancel: 'common.cancel',
    confirm: 'common.confirm',
    save: 'common.save',
    edit: 'common.edit',
    delete: 'common.delete',
  },
  // Home page
  home: {
    title: 'home.title',
    subtitle: 'home.subtitle',
    about: 'home.about',
    vision: 'home.vision',
    stats: 'home.stats',
    highlights: 'home.highlights',
    cta: 'home.cta',
  },
  // Events page
  events: {
    title: 'events.title',
    description: 'events.description',
    upcoming: 'events.upcoming',
    ongoing: 'events.ongoing',
    past: 'events.past',
    readMore: 'events.readMore',
  },
  // Team page
  team: {
    title: 'team.title',
    description: 'team.description',
    heads: 'team.heads',
    deputys: 'team.deputys',
  },
  // Contact page
  contact: {
    title: 'contact.title',
    description: 'contact.description',
    form: 'contact.form',
    info: 'contact.info',
  },
} as const;

// ============================================================================
// TRANSLATION FUNCTION
// ============================================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function t(key: string, _: SupportedLanguage = DEFAULT_LANGUAGE): string {
  // In a real implementation, this would load translations from JSON files
  // For now, return the key as fallback
  return key;
}

// ============================================================================
// LANGUAGE DETECTION
// ============================================================================

export function detectLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
  return Object.keys(SUPPORTED_LANGUAGES).includes(browserLang) 
    ? browserLang 
    : DEFAULT_LANGUAGE;
}

// ============================================================================
// FUTURE IMPLEMENTATION NOTES
// ============================================================================

/*
To implement full i18n support:

1. Create translation files:
   - src/locales/en.json
   - src/locales/hi.json
   - src/locales/mr.json

2. Install i18n library:
   npm install next-intl

3. Configure next-intl in next.config.ts

4. Create middleware for language detection

5. Update components to use t() function

6. Add language switcher component

Example translation file structure:
{
  "nav": {
    "home": "Home",
    "events": "Events",
    "team": "Team",
    "contact": "Contact"
  },
  "home": {
    "title": "National Student Data Corps",
    "subtitle": "VCET's first Student Chapter for Data Visualization and Machine Learning"
  }
}
*/
