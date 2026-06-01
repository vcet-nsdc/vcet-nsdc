# NSDC VCET — Project Overview & Architecture

> **Project:** National Student Data Corps (NSDC) — VCET Chapter Website  
> **Repository:** `vcet-nsdc/vcet-nsdc`  
> **Version:** 1.0.0  
> **License:** MIT  
> **Primary Author:** Surajphirke3  
> **Last Updated:** 2026-06-02

---

## README — Project Overview

### What This Is

The **NSDC VCET Website** is the official digital presence for the National Student Data Corps chapter at Vidyavardhini College of Engineering & Technology, Vasai. It serves as both a public-facing brand site and an operational platform for event management, team registration, payment verification, and administrative oversight.

The site handles real operational workloads: students register for events with payment proof, admins review registrations and export data, and certificates are tracked in a MongoDB-backed system.

### Live Deployment

- **Production URL:** `https://vcet-nsdc.vercel.app`
- **Platform:** Vercel (serverless)
- **Output Mode:** Standalone (Docker-compatible)

### Feature List

| Category | Features |
|----------|----------|
| **Public Pages** | Hero landing, About, Stats, Events (upcoming + past), Team directory, Contact form, Social links |
| **Registration Flow** | Squad-based event registration, payment screenshot upload, transaction ID tracking |
| **Admin Dashboard** | HTTP Basic Auth-protected registration viewer, domain filtering, Excel/PDF export, screenshot retrieval |
| **Certificates** | Email-based certificate lookup, CRUD operations, download/share analytics tracking |
| **Animations** | WebGL shader background, Framer Motion scroll animations, 3D tilt cards, image carousels |
| **SEO** | OpenGraph, Twitter Cards, canonical URLs, Google Search Console verification support |

### Installation & Setup

```bash
# 1. Clone
git clone https://github.com/vcet-nsdc/vcet-nsdc.git
cd vcet-nsdc

# 2. Install
npm install

# 3. Environment variables
cp .env.local.example .env.local
# Edit .env.local with your MongoDB URI and admin credentials

# 4. Dev server
npm run dev        # Turbopack enabled
npm run build      # Production build
npm run lint       # ESLint check
```

### Required Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `ADMIN_USERNAME` | Strongly recommended | Admin API username |
| `ADMIN_PASSWORD` | Strongly recommended | Admin API password |
| `NEXT_PUBLIC_APP_URL` | No | Public URL for metadata |
| `GOOGLE_SITE_VERIFICATION` | No | GSC verification token |

---

## ARCHITECTURE — Tech Stack & System Design

### Full Stack Breakdown

```
+------------------------+     +------------------------+     +------------------------+
|      CLIENT LAYER      |     |    SERVER LAYER        |     |      DATA LAYER        |
|  Next.js 16 App Router | --> |  Next.js API Routes    | --> |  MongoDB (document)    |
|  React 19 + TypeScript |     |  Mongoose 8            |     |  Collections:          |
|  Tailwind CSS v4       |     |  HTTP Basic Auth       |     |    registrations       |
|  Framer Motion         |     |  xlsx + jsPDF exports  |     |    messages            |
|  WebGL Shader          |     |                        |     |    certificates        |
|  shadcn/ui primitives  |     |                        |     |                        |
+------------------------+     +------------------------+     +------------------------+
```

### Why Each Technology Was Chosen

| Technology | Reasoning |
|------------|-----------|
| **Next.js 16 + App Router** | Server components for SEO, API routes in one codebase, image optimization, Turbopack for fast builds |
| **React 19** | Latest React with improved concurrent features, automatic batching |
| **Tailwind CSS v4** | Utility-first styling with CSS variables for theming, minimal bundle overhead |
| **Framer Motion** | Declarative animations, gesture support, AnimatePresence for mount/unmount transitions |
| **Mongoose 8** | Schema validation, middleware hooks, indexing — MongoDB object modeling |
| **Zod + React Hook Form** | Type-safe form validation with minimal runtime overhead |
| **shadcn/ui** | Headless, accessible primitives with full style control — no lock-in to a component library |
| **WebGL Shader** | Custom animated background without video assets — lightweight, runs on GPU |

### Request Lifecycle

```
User Request
    |
    +-- Static Page? --> Next.js caches / serves from CDN
    |
    +-- Dynamic Page? --> React Server Component --> fetch data --> hydrate client
    |
    +-- API Route? --> NextRequest --> Handler --> MongoDB
```

### Authentication Flow (Admin)

```
Admin Browser --> Admin Dashboard (/admin)
    |
    +-- No session? --> Login form --> POST credentials to /api/admin/registrations
    |                    (token stored in sessionStorage as Base64)
    |
    +-- Has token? --> Attach "Authorization: Basic <token>" to every API call
                        --> Server: verifyAdminAuth() --> decode Base64 --> compare env vars
```

### System Diagrams

```
USER FLOW (Registration)
========================
  User visits /register
        |
        v
  Fills squad details, leader info, member details
        |
        v
  Scans QR code for UPI payment (150 Rs)
        |
        v
  Uploads payment screenshot + enters transaction ID
        |
        v
  POST /api/register (multipart/form-data)
        |
        v
  Server: validate fields, convert image to base64
        |
        v
  Mongoose: save to MongoDB registrations collection
        |
        v
  Response: success + redirect to WhatsApp group
```

```
ADMIN FLOW (Data Export)
========================
  Admin visits /admin
        |
        v
  Login form: username + password
        |
        v
  Browser: base64(username:password) -> sessionStorage
        |
        v
  GET /api/admin/registrations?domain=all
        |
        v
  Server: verifyAdminAuth() checks env credentials
        |
        v
  MongoDB: Registration.find(filter).lean()
        |
        v
  Admin UI: renders table with domain-filter tabs
        |
        v
  Export buttons: GET /api/admin/export?domain={filter}
        |
        v
  Server: xlsx generation -> binary response -> file download
```

---

## PROJECT_STRUCTURE — File-by-File Documentation

### Root Configuration

| File | Purpose | Notes |
|------|---------|-------|
| `next.config.ts` | Next.js configuration | Standalone output, image remotePatterns for ImageKit & Cloudinary, SVG allowed |
| `tsconfig.json` | TypeScript compiler config | Strict mode enabled, path aliases (`@/*`), `noUnusedLocals`/`noUnusedParameters` on |
| `tailwind.config.js` | Tailwind v4 config | **Largely unused** — project uses CSS variables in `globals.css`; kept for backwards compatibility |
| `components.json` | shadcn/ui registry config | Style: "new-york", aliases for components/utils/ui/lib/hooks |
| `postcss.config.mjs` | PostCSS pipeline | Minimal — Tailwind v4 handles its own processing |
| `eslint.config.mjs` | ESLint flat config | Extends Next.js core-web-vitals + typescript rules |
| `.prettierrc` / `.prettierignore` | Code formatting | Standard config |

### `src/app/` — Next.js App Router

| File/Folder | Purpose | Key Details |
|-------------|---------|-------------|
| `layout.tsx` | Root layout | Metadata (OG, Twitter, robots), font preconnects, ErrorBoundary wrap, Navbar + Footer + ShaderBackground |
| `page.tsx` | Home page wrapper | Delegates to `HomePage` component |
| `error.tsx` | Global error boundary | Client component with reset + home navigation |
| `loading.tsx` | Global loading state | `LoadingSpinner` from UI kit |
| `globals.css` | Global styles + Tailwind | CSS variables for theming, custom scrollbar classes, certificate modal overrides |
| `(pages)/` | Route groups | `contact/`, `events/`, `register/`, `socials/`, `team/` — page entry points |
| `admin/page.tsx` | Admin dashboard | **18KB client component** — login form, domain-filtered registration table, Excel/PDF export |
| `api/register/route.ts` | Registration POST | FormData parsing, base64 image encoding, 5MB file limit |
| `api/contact/route.ts` | Contact POST | JSON body, stores message in MongoDB |
| `api/certificates/route.ts` | Certificate GET/POST | Search by email, create new certificate |
| `api/certificates/[id]/route.ts` | Certificate single | GET / PUT (download/share tracking) / DELETE |
| `api/admin/registrations/route.ts` | Admin list | Basic Auth, domain filter, excludes `paymentScreenshot` |
| `api/admin/export/route.ts` | Excel export | XLSX generation, domain filter, screenshot URL column |
| `api/admin/screenshot/[id]/route.ts` | Screenshot serve | Base64 decode -> binary image response, query-param auth fallback |

### `src/components/` — React Components

| File/Folder | Purpose | Key Details |
|-------------|---------|-------------|
| `home/home.tsx` | Home page composition | Assembles Hero, About, Stats, Highlights, QuickLinks, CTA sections with Suspense |
| `layout/navbar.tsx` | Fixed navigation | Glassmorphism navbar, mobile hamburger menu, Image logo |
| `layout/footer.tsx` | Site footer | 4-column layout (About, Address, Quick Links, Contact), Framer Motion animations |
| `shader-background.tsx` | WebGL background | Custom GLSL vertex + fragment shaders, animated plasma grid, requestAnimationFrame loop |
| `RegisterForm.tsx` | Event registration | 6-section form: squad details, leader, members, payment QR, verification |
| `socialsidebar.tsx` | Floating social links | Fixed left sidebar, animated icons (Mail, LinkedIn, Instagram) |
| `sections/hero-section.tsx` | Hero landing | Logo animation, headline, quote, CTA button |
| `sections/about-section.tsx` | About + Vision | Framer Motion scroll-triggered reveals, gradient divider lines |
| `sections/stats-section.tsx` | Statistics cards | Team members, events, participants counters with hover scale |
| `sections/highlights-section.tsx` | What we do | 3-card grid: Events, Projects, Community |
| `sections/quick-links-section.tsx` | Navigation cards | Links to Events, Team, Contact pages |
| `sections/cta-section.tsx` | Call to action | Gradient banner with dual buttons |
| `events/Events.tsx` | Events page shell | Combines Upcoming + PastEvents sections |
| `events/upcoming/upcoming.tsx` | Upcoming events | Single Techblitz 2026 card, scroll-to-top button, heavy `<style jsx global>` |
| `events/upcoming/EventCard.tsx` | 3D tilt event card | Mouse-move parallax, modal with AnimatePresence, Image component |
| `events/past/PastEvents.tsx` | Past events grid | 13 hardcoded past events with galleries, EventModal trigger |
| `events/past/EventCard.tsx` | Past event card | Shadcn Card + Badge, hover scale, click-to-modal |
| `events/past/eventmodal.tsx` | Event detail modal | Framer Motion modal, date/venue/about/highlights display |
| `events/past/imagecrousal.tsx` | Image carousel | Auto-rotating every 5s, video support, fullscreen modal with navigation arrows |
| `team/Teams.tsx` | Team page | Fetches BE.json + TE.json at runtime, grid of ProfileCards |
| `team/ProfileCard.tsx` | Team member card | Tilt effect (client-side only), hover social overlay (Instagram, LinkedIn, Email) |
| `contact/contact-form.tsx` | Contact form | React Hook Form + Zod validation, submit to `/api/contact` |
| `contact/contact-info.tsx` | Contact details | Embedded Google Maps iframe, chairperson/secretary emails |
| `social/social.tsx` | Socials page | **Placeholder — returns empty `<div>Social</div>`** |

### `src/components/ui/` — shadcn/ui Primitives

| File | Purpose | Key Details |
|------|---------|-------------|
| `button.tsx` | Button | CVA variants: default, destructive, outline, secondary, ghost, link |
| `input.tsx` | Input | Styled text input with focus ring |
| `textarea.tsx` | Textarea | Styled multi-line input |
| `label.tsx` | Label | Radix primitive wrapper |
| `badge.tsx` | Badge | CVA variants: default, secondary, destructive, outline |
| `card.tsx` | Card | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| `loading.tsx` | Loading states | Spinner, Overlay, Skeleton variants, EmptyState |
| `error-boundary.tsx` | Error boundary | Class component catching errors, fallback UI with reset |
| `lamp.tsx` | Lamp effect | **Unused** — decorative conic-gradient animation component |
| `demo.tsx` | Lamp demo | **Unused** — renders LampContainer with placeholder text |

### `src/lib/` — Utilities

| File | Purpose | Key Details |
|------|---------|-------------|
| `mongodb.ts` | Database connection | Global mongoose cache for hot-reload safety, 10s timeouts, IPv4 forced |
| `admin-auth.ts` | Admin authentication | Basic Auth header parser, hardcoded fallback credentials |
| `constants.ts` | App constants | APP_CONFIG, NAVIGATION, CONTACT_INFO, STATS, THEME, API_CONFIG, ANIMATION, VALIDATION, error/success messages |
| `utils.ts` | Utility functions | `cn()` (clsx + tailwind-merge), date formatting, validation, array/object utilities, debounce/throttle, safe JSON parse |
| `logger.ts` | Logging utility | LogLevel enum, Logger class with remote endpoint support, structured JSON logs |
| `certificate-storage.ts` | Certificate client API | CRUD wrappers around `/api/certificates` endpoints |
| `i18n.ts` | i18n skeleton | Language definitions, translation keys, **non-functional** `t()` stub |

### `src/models/` — Mongoose Schemas

| File | Purpose | Key Details |
|------|---------|-------------|
| `Registration.ts` | Registration schema | Squad + leader + members nested structure, paymentScreenshot as base64 string, createdAt |
| `Message.ts` | Contact message schema | Simple flat schema: name, email, contact, message, createdAt |
| `Certificate.ts` | Certificate schema | certificateNumber (unique indexed), name, product, email (indexed), status enum, download/share counters, lastAccessed |

### `src/types/` — TypeScript Definitions

| File | Purpose | Key Details |
|------|---------|-------------|
| `index.ts` | All shared types | TeamMember, Event, ContactMessage, ApiResponse, PaginatedResponse, BaseComponentProps, Theme, NavItem, Form types, Animation types, SEO types |

### `src/hooks/` — Custom Hooks

| File | Purpose | Key Details |
|------|---------|-------------|
| `use-async.ts` | Async state management | Loading/error/data states, auto-execute on mount |
| `use-debounce.ts` | Debounced values | Standard useState + setTimeout pattern |
| `use-local-storage.ts` | Persisted state | SSR-safe localStorage with JSON serialization |

### `src/data/` — Static Data

| File | Purpose | Key Details |
|------|---------|-------------|
| `events.ts` | Event data | Hardcoded upcoming event, JSON import for past events, filter/sort utilities |
| `team.ts` | Team data | Heads + Deputys arrays with full member details, utility functions |

### `public/` — Static Assets

| Path | Purpose | Notes |
|------|---------|-------|
| `assests/` | Images and logos | **Typo in name** — should be `assets/`; contains logos, payment QR, event images |
| `staticdata/` | JSON data files | `BE.json` (heads), `TE.json` (deputys), `SE.json` (**empty**), `pasteventsdata.json` (event archive) |
| `uploads/` | Upload directory | **Empty** — unused legacy |
| `fonts/` | Font files | **Empty** — Google Fonts loaded via CDN |
| `favicon.ico`, file.svg, globe.svg, next.svg, vercel.svg, window.svg | Static assets | SVG icons, favicon |

---

## COMPONENT_DOCS — UI System & Patterns

### Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#7F45DB` | Buttons, links, accents |
| Primary Dark | `#4A2293` | Hover states, depth |
| Primary Light | `#A472F7` | Highlights, gradients |
| Background | Dark theme default | `bg-black/30` to `bg-black/50` with `backdrop-blur` |
| Font Sans | Manrope | Body text, UI elements |
| Font Heading | Dosis | Headlines, section titles |
| Border Radius | `0.625rem` (10px) | Cards, buttons |

### Component Patterns

**Glassmorphism:**
```
bg-black/40 backdrop-blur-md border border-white/10
```
Used consistently across: navbar, cards, modals, form sections.

**Gradient Buttons:**
```
bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500
```
Primary CTA pattern site-wide.

**Framer Motion Scroll Reveals:**
```tsx
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={containerVariants}
>
```
Used in About, Stats, and team sections.

**3D Tilt Cards:**
- Event cards: Mouse-tracking via `requestAnimationFrame` + inline transform
- Profile cards: CSS `perspective(1000px)` with `rotateX/rotateY` on hover

### Responsive Strategy

| Breakpoint | Tailwind Prefix | Changes |
|------------|-----------------|---------|
| 640px | `sm:` | 2-column grids begin |
| 768px | `md:` | Desktop nav visible, mobile menu hidden |
| 1024px | `lg:` | 3-column grids, social sidebar visible |
| 1280px | `xl:` | Max container widths |

### Accessibility Notes

- **Semantic HTML:** Proper heading hierarchy (h1 -> h2 -> h3)
- **ARIA labels:** Mobile menu toggle, modal close buttons, scroll-to-top
- **Focus rings:** Visible on all interactive elements via Tailwind `focus-visible:ring-2`
- **Color contrast:** White text on dark backgrounds generally passes WCAG AA, but some `text-white/50` labels may fail
- **Missing:** No `aria-live` regions for form submissions, no skip-to-content link

### Key Reusable Components

**`@/components/ui/button.tsx`** — Primary action component. Supports 6 variants and 4 sizes via `class-variance-authority`. Uses Radix `Slot` for polymorphic rendering.

**`@/components/ui/loading.tsx`** — Comprehensive loading state system: spinner (3 sizes), overlay wrapper, skeleton (generic, card, event, team variants), and empty state.

**`@/components/ui/error-boundary.tsx`** — Class-based error boundary catching unhandled errors in child tree. Renders fallback UI with error details and reset/reload actions.

**`@/components/shader-background.tsx`** — Full-page WebGL animated background using custom GLSL shaders. Runs a continuous `requestAnimationFrame` loop rendering a plasma grid effect with orbiting particles.

**`@/components/team/ProfileCard.tsx`** — Interactive team member card with 3D CSS perspective tilt, image zoom on hover, and social media overlay (Instagram, LinkedIn, Email) with spring animations.

**`@/components/events/upcoming/EventCard.tsx`** — Complex 3D parallax event card tracking mouse position via `requestAnimationFrame`. Includes modal overlay with full event details using Framer Motion `AnimatePresence`.

**`@/components/events/past/imagecrousal.tsx`** — Auto-rotating image carousel (5s interval) supporting both images and video. Includes fullscreen lightbox modal with navigation arrows and image counter.

**`@/components/RegisterForm.tsx`** — Multi-section registration form with payment QR display, file upload, and WhatsApp group redirect on success.

**`@/components/contact/contact-form.tsx`** — Zod-validated contact form using React Hook Form. Features loading states, success/error feedback, and accessibility labels.

**`@/app/admin/page.tsx`** — Full admin dashboard: login gate with Basic Auth, domain-filtered data table, Excel/PDF export, screenshot viewer links, and real-time stats cards.
