/**
 * Core application types and interfaces
 * Centralized type definitions for better maintainability and type safety
 */

// ============================================================================
// TEAM MEMBER TYPES
// ============================================================================

export interface TeamMember {
  readonly id: number;
  readonly name: string;
  readonly position: string;
  readonly email: string;
  readonly instagram: string;
  readonly linkedin: string;
  readonly photo: string;
}

export interface TeamData {
  readonly heads: readonly TeamMember[];
  readonly deputys: readonly TeamMember[];
}

// ============================================================================
// EVENT TYPES
// ============================================================================

export interface Event {
  readonly id: string;
  readonly title: string;
  readonly dateTime: string;
  readonly venue: string;
  readonly shortDescription: string;
  readonly imagePath: string;
  readonly overview: string;
  readonly highlights: readonly string[];
  readonly awards: readonly string[];
  readonly status: 'upcoming' | 'ongoing' | 'past';
  readonly category: 'competition' | 'workshop' | 'showcase' | 'meeting';
  readonly link?: string;
}

export interface EventCardProps {
  readonly event: Event;
  readonly onReadMore: (event: Event) => void;
}

// ============================================================================
// CONTACT TYPES
// ============================================================================

export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly contact: string;
  readonly message: string;
  readonly createdAt?: Date;
}

export interface ContactFormData {
  readonly name: string;
  readonly email: string;
  readonly contact: string;
  readonly message: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly message: string;
  readonly data?: T;
  readonly error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
  };
}

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface BaseComponentProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
}

export interface LayoutProps extends BaseComponentProps {
  readonly title?: string;
  readonly description?: string;
}

export interface SectionProps extends BaseComponentProps {
  readonly id?: string;
  readonly title?: string;
  readonly subtitle?: string;
}

// ============================================================================
// THEME TYPES
// ============================================================================

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  readonly theme: Theme;
  readonly setTheme: (theme: Theme) => void;
  readonly toggleTheme: () => void;
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly icon?: React.ComponentType<{ className?: string }>;
  readonly external?: boolean;
}

export interface NavigationConfig {
  readonly main: readonly NavItem[];
  readonly footer: readonly NavItem[];
  readonly social: readonly NavItem[];
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface AppError {
  readonly message: string;
  readonly code?: string;
  readonly statusCode?: number;
  readonly timestamp: Date;
  readonly stack?: string;
}

export interface ErrorBoundaryState {
  readonly hasError: boolean;
  readonly error?: AppError;
}

// ============================================================================
// LOADING TYPES
// ============================================================================

export interface LoadingState {
  readonly isLoading: boolean;
  readonly error?: string;
}

export interface AsyncState<T> {
  readonly isLoading: boolean;
  readonly error?: string;
  readonly data?: T;
}

// ============================================================================
// SEO TYPES
// ============================================================================

export interface SEOProps {
  readonly title: string;
  readonly description: string;
  readonly keywords?: string[];
  readonly image?: string;
  readonly url?: string;
  readonly type?: 'website' | 'article' | 'profile';
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
  readonly authors?: string[];
  readonly section?: string;
  readonly tags?: string[];
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface FormFieldProps {
  readonly name: string;
  readonly label: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly type?: 'text' | 'email' | 'tel' | 'textarea';
  readonly error?: string;
  readonly value?: string;
  readonly onChange?: (value: string) => void;
}

export interface FormState {
  readonly isSubmitting: boolean;
  readonly errors: Record<string, string>;
  readonly values: Record<string, string>;
}

// ============================================================================
// ANIMATION TYPES
// ============================================================================

export interface AnimationVariants {
  readonly hidden: Record<string, unknown>;
  readonly visible: Record<string, unknown>;
  readonly exit?: Record<string, unknown>;
}

export interface MotionProps {
  readonly variants?: AnimationVariants;
  readonly initial?: string | Record<string, unknown>;
  readonly animate?: string | Record<string, unknown>;
  readonly exit?: string | Record<string, unknown>;
  readonly transition?: Record<string, unknown>;
  readonly whileHover?: Record<string, unknown>;
  readonly whileTap?: Record<string, unknown>;
  readonly whileInView?: Record<string, unknown>;
}
