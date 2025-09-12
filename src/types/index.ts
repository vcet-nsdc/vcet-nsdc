/**
 * Core application types and interfaces
 * Centralized type definitions for better maintainability and type safety
 */

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
