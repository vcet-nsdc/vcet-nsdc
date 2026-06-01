# NSDC VCET — Master System Restructure & Implementation Architecture

> **Project:** National Student Data Corps (NSDC) — VCET Chapter Platform
> **Document type:** Production restructure architecture + implementation roadmap
> **Scope:** Single-organization event operating system (NOT multi-tenant SaaS)
> **Stack lock:** Next.js (App Router) · React · TypeScript · Tailwind · shadcn/ui · Next.js Route Handlers · MongoDB Atlas · Mongoose · Auth.js (NextAuth) · Zod · DOMPurify · Cloudinary
> **Last updated:** 2026-06-02

---

## Executive Summary

The NSDC VCET platform is a **real operational system** that already handles event registrations, payment-proof verification, certificate tracking, and admin exports. It works, but it is held together by patterns that are unsafe and unscalable for continued operation:

- Admin access is protected by **HTTP Basic Auth with hardcoded fallback credentials** that are committed to source (`NSDC@AIDS` / `VCETNSDC@AIDS`).
- Auth tokens are passed through **query parameters** (`?auth=`), leaking credentials into logs, history, and referrers.
- All editable content (events, team, past events) is **hardcoded in TypeScript/JSON files** — every operational change requires a developer and a redeploy.
- Payment screenshots are stored as **5MB base64 blobs inside MongoDB documents**, bloating the database and slowing every query.
- There is **one implicit admin role**, no audit trail, no rate limiting, no pagination, and duplicate sources of truth for the same data.

This document restructures the platform into a **centralized, admin-controlled event operating system** where Faculty Admins manage the entire platform from a dashboard — no code edits, no direct database access — and Developer Admins handle stability/observability with strictly bounded permissions.

The restructure is **deliberately scoped**: no multi-tenancy, no billing, no Redis/Sentry/Pino/PostHog, no mobile app. It introduces only what the platform needs *now* to be secure, maintainable, and ready to grow.

**Target outcome:**
- Real RBAC with two roles (Faculty Admin / Developer Admin) backed by Auth.js + JWT sessions.
- A dynamic **Event Theme engine** + **form builder** so new event types are configured, not coded.
- A **CMS layer** making every public content surface admin-editable.
- Cloudinary-backed media with DB storing only URLs.
- Audit logging, rate limiting, CSRF protection, input validation, and a clean service-layer architecture.

---

## Current System Problems

### A. Security (highest priority)

| # | Problem | Evidence | Severity |
|---|---------|----------|----------|
| 1 | Hardcoded admin credentials with source-visible fallback | `src/lib/admin-auth.ts:3-4` | **Critical** |
| 2 | Basic Auth token in query param leaks to logs/history | `api/admin/screenshot/[id]/route.ts` (`?auth=`) | **Critical** |
| 3 | Base64 credentials in `sessionStorage`, never expires | `src/app/admin/page.tsx` | **High** |
| 4 | No rate limiting on any public endpoint | `api/register`, `api/contact`, `api/certificates` | **High** |
| 5 | No CSRF protection on state-changing routes | all forms/APIs | **Medium** |
| 6 | No input sanitization (stored XSS risk) | `api/contact/route.ts` | **Medium** |
| 7 | `dangerouslyAllowSVG: true` | `next.config.ts` | **Low** |
| 8 | No brute-force protection / lockout on admin login | `verifyAdminAuth` | **Medium** |

### B. Architecture

- **Single implicit admin** — no role separation, no permission boundaries.
- **No service layer** — route handlers contain DB logic, validation, and response formatting inline. Direct `fetch()` scattered across 6+ components.
- **No centralized error handling / validation** — each route has bespoke try/catch.
- **Duplicate sources of truth**: `src/data/team.ts` vs `public/staticdata/BE.json`/`TE.json`; `src/data/events.ts` vs hardcoded arrays in `PastEvents.tsx`.
- **Hardcoded operational content**: events, UPI ID, WhatsApp link, registration open/closed state — all require code changes.

### C. Data & storage

- `paymentScreenshot` stored as base64 in `registrations` (documents up to ~5MB).
- Missing indexes on `registrations` (`domain`, `createdAt`, `leader.email`) and `messages`.
- No pagination — `/api/admin/registrations` returns the entire collection.
- Weak schemas: `Message` has no required constraints; `Registration` has no enum/validation on `domain`, no status field, no payment-verification state.

### D. Technical debt / dead code

- Unused: `ui/lamp.tsx`, `ui/demo.tsx`, `lib/i18n.ts` (non-functional stub), `social/social.tsx` (placeholder).
- Empty: `public/SE.json`, `public/uploads/`, `public/fonts/`, `api/certificate-image/`, `api/linkedin/`.
- Typo directory `public/assests/`.
- Type-safety holes: 6× `@ts-expect-error`, 4× disabled `no-explicit-any`.
- Existing `SCALING_RECOMMENDATIONS.md` recommends Prisma/Stripe/multi-tenant/Sentry — **out of scope and contradicts the locked stack**; treat as deprecated.

---

## New Architecture

### Layered design

```
+---------------------------------------------------------------+
|  PRESENTATION  (Next.js App Router, React Server Components)   |
|  Public site  |  /admin (Faculty)  |  /admin/system (Developer)|
+---------------------------------------------------------------+
|  ROUTE HANDLERS  (src/app/api/**)  thin controllers            |
|   - parse request    - call service    - shape response        |
+---------------------------------------------------------------+
|  MIDDLEWARE PIPELINE                                            |
|   auth(JWT) -> rbac(permission) -> rateLimit -> csrf -> zod     |
+---------------------------------------------------------------+
|  SERVICE LAYER  (src/server/services/**)  business logic       |
|   eventService, registrationService, certificateService,       |
|   cmsService, mediaService, authService, auditService          |
+---------------------------------------------------------------+
|  DATA ACCESS  (src/server/models/**  Mongoose models)          |
+---------------------------------------------------------------+
|  EXTERNAL: MongoDB Atlas  |  Cloudinary  |  (email later)      |
+---------------------------------------------------------------+
```

### Target folder structure

```
src/
  app/
    (public)/                 # marketing + registration pages (server components)
    admin/                    # Faculty dashboard (protected layout)
      system/                 # Developer dashboard (protected sub-area)
    api/
      auth/[...nextauth]/     # Auth.js handler
      events/                 # public read
      registrations/          # public create + admin manage
      certificates/
      cms/                    # admin content CRUD
      media/                  # signed upload + management
      admin/                  # users, audit, settings
  server/
    services/                 # business logic (pure, testable)
    models/                   # Mongoose schemas
    repositories/             # optional thin data-access wrappers
    validation/               # Zod schemas (shared client+server)
    auth/                     # session, rbac, permissions matrix
    middleware/               # withAuth, withRbac, withRateLimit, withValidation
    lib/                      # mongodb, cloudinary, sanitize, errors
  components/                 # UI (existing strengths preserved)
  config/                     # permission matrix, role definitions
```

### Cross-cutting conventions

- **One source of truth**: all operational data lives in MongoDB, exposed via services. `src/data/*` static files are removed after migration.
- **Typed contracts**: every API request/response is described by a Zod schema; types are inferred (`z.infer`) — no hand-written duplicates.
- **Standard envelope**: `{ success: boolean, data?, error?: { code, message } }`.
- **No DB logic in components or route bodies** — always through a service.

---

## RBAC System

### Roles

Two operational roles plus a non-login system role.

| Role | Purpose | Login | Notes |
|------|---------|-------|-------|
| `FACULTY_ADMIN` | Super admin. Full control of content, events, registrations, certificates, media, admins, settings, audit. | Yes | The owner role. Can manage other admins. |
| `DEVELOPER_ADMIN` | Technical operations: health, logs, monitoring, technical settings, debugging. | Yes | **Cannot** delete business data, manage faculty admins, or alter sensitive business records. |
| `SYSTEM` | Reserved for automated/audit entries. | No | Used as actor for system-generated audit logs. |

### Design

- Roles stored on the `User` document as a single `role` enum (plus an optional `permissions` override array for fine-grained future tuning).
- **Permissions are derived from the role** via a static, version-controlled matrix in `src/config/permissions.ts` — the single authoritative definition. This avoids per-user permission drift while allowing overrides if ever needed.
- Sessions are **JWT (Auth.js Credentials provider)** with the role embedded in the token and re-validated against the DB on sensitive actions.
- Every protected route is guarded by `withRbac(permission)` middleware; UI elements are conditionally rendered with a `can(permission)` helper hydrated from the session.

```ts
// src/config/roles.ts
export const Roles = {
  FACULTY_ADMIN: 'FACULTY_ADMIN',
  DEVELOPER_ADMIN: 'DEVELOPER_ADMIN',
  SYSTEM: 'SYSTEM',
} as const;
export type Role = (typeof Roles)[keyof typeof Roles];
```

```ts
// src/config/permissions.ts
export const Permissions = {
  // events / themes
  'event:create': 'event:create',
  'event:update': 'event:update',
  'event:delete': 'event:delete',
  'theme:manage': 'theme:manage',
  // registrations
  'registration:read': 'registration:read',
  'registration:approve': 'registration:approve',
  'registration:export': 'registration:export',
  'registration:delete': 'registration:delete',
  // cms
  'cms:read': 'cms:read',
  'cms:write': 'cms:write',
  'cms:publish': 'cms:publish',
  // certificates
  'certificate:manage': 'certificate:manage',
  // media
  'media:upload': 'media:upload',
  'media:delete': 'media:delete',
  // admin / settings / audit
  'admin:manage': 'admin:manage',
  'settings:business': 'settings:business',
  'settings:technical': 'settings:technical',
  'audit:read': 'audit:read',
  // developer / system
  'system:health': 'system:health',
  'system:logs': 'system:logs',
} as const;
export type Permission = keyof typeof Permissions;

export const RolePermissions: Record<Role, Permission[]> = {
  FACULTY_ADMIN: Object.keys(Permissions) as Permission[], // all
  DEVELOPER_ADMIN: [
    'system:health', 'system:logs', 'audit:read',
    'settings:technical', 'event:create', 'event:update',
    'cms:read', 'registration:read', 'media:upload',
  ],
  SYSTEM: [],
};

export function can(role: Role, p: Permission): boolean {
  return RolePermissions[role]?.includes(p) ?? false;
}
```

### Escalation & restriction rules

- A `DEVELOPER_ADMIN` can never receive `admin:manage`, `registration:delete`, `registration:approve`, `certificate:manage`, `settings:business`, or `event:delete`.
- Only a `FACULTY_ADMIN` can create/modify/delete users (including other faculty admins).
- A user cannot modify their own role or elevate their own permissions (enforced server-side: actor’s `userId !== target.userId` for role changes, and target role change requires `admin:manage`).
- All role/permission changes write an audit log entry.

---

## Permission Matrix

Legend: ✅ allowed · ❌ denied · 👁 read-only.

| Module / Action | Faculty Admin | Developer Admin |
|---|---|---|
| **Events** — create | ✅ | ✅ |
| **Events** — edit | ✅ | ✅ |
| **Events** — delete | ✅ | ❌ |
| **Events** — publish/unpublish | ✅ | ❌ |
| **Event Themes/Templates** — manage | ✅ | ❌ |
| **Registrations** — view | ✅ | 👁 (no PII export) |
| **Registrations** — approve/reject | ✅ | ❌ |
| **Registrations** — export (Excel/PDF) | ✅ | ❌ |
| **Registrations** — delete | ✅ | ❌ |
| **Certificates** — create/edit/revoke | ✅ | ❌ |
| **CMS content** (team, FAQs, sponsors, announcements, pages, social links) — read | ✅ | 👁 |
| **CMS content** — write/edit | ✅ | ❌ (technical pages only, if granted) |
| **CMS content** — publish | ✅ | ❌ |
| **Media** — upload | ✅ | ✅ |
| **Media** — delete | ✅ | ❌ |
| **Admin users** — create/edit/delete | ✅ | ❌ |
| **Settings** — business (UPI ID, fees, registration open/close, contact) | ✅ | ❌ |
| **Settings** — technical (rate limits, feature flags, cache) | ✅ | ✅ |
| **Audit logs** — read | ✅ | ✅ |
| **System health / DB / API monitoring** | ✅ | ✅ |
| **System logs** | ✅ | ✅ |

> Rule of thumb: **Faculty owns business + content + people. Developer owns stability + observability.** Anything that touches student PII export, money, certificates, or admin identity is Faculty-only.

---

## Authentication System

### Decisions

- **Auth.js (NextAuth) Credentials provider** + **JWT session strategy** (stateless, Vercel-friendly, no session collection required initially).
- Passwords hashed with **bcrypt** (cost 12). No plaintext, no env-var credentials.
- **HTTP-only, Secure, SameSite=Lax cookies** for the session token (set by Auth.js).
- Role embedded in the JWT; sensitive mutations re-verify the user/role from DB.
- **Brute-force protection**: per-identifier + per-IP attempt counter (MongoDB-backed, TTL window) with progressive lockout.
- **CSRF**: Auth.js provides built-in CSRF tokens for its routes; for custom mutating routes use the double-submit cookie pattern via `withCsrf` middleware.

### Login flow (replaces Basic Auth)

```
Admin -> /admin/login (form, react-hook-form + zod)
   |
   v
POST /api/auth/callback/credentials  (Auth.js)
   |
   +-- authService.verify(email, password)
   |       - rate/lockout check (loginAttempts)
   |       - bcrypt.compare
   |       - on fail: increment attempts, audit AUTH_FAIL
   |
   v  on success
JWT issued { sub, role } -> HttpOnly Secure cookie
   |
   v
middleware.ts gate: /admin/** requires session; /admin/system/** requires DEVELOPER_ADMIN|FACULTY_ADMIN
```

### Middleware gate

```ts
// middleware.ts (Edge) — coarse gate
export { default } from 'next-auth/middleware';
export const config = { matcher: ['/admin/:path*', '/api/admin/:path*', '/api/cms/:path*'] };
```

Fine-grained permission checks happen in `withRbac(permission)` inside each route handler (Node runtime, DB-aware).

### What gets removed

- `src/lib/admin-auth.ts` (Basic Auth + hardcoded creds) — **deleted**.
- `?auth=` query param on screenshot route — **deleted** (replaced by Cloudinary signed/access-controlled URLs).
- `sessionStorage` Base64 token logic in `admin/page.tsx` — **deleted**.

### First-admin bootstrap

A one-time, idempotent `scripts/seed-admin.ts` (run manually, reads from a **secret env**, never committed) creates the initial `FACULTY_ADMIN`. After that, all admin creation happens through the dashboard.

---

## Database Architecture

All collections use Mongoose. New/upgraded schemas:

### `users`
```ts
{
  _id, name, email (unique, lowercase, indexed),
  passwordHash,                  // bcrypt
  role: 'FACULTY_ADMIN'|'DEVELOPER_ADMIN',
  isActive: boolean,
  lastLoginAt: Date,
  createdBy: ObjectId<User>,
  createdAt, updatedAt
}
// indexes: { email: 1 } unique
```

### `loginAttempts` (brute-force protection)
```ts
{ identifier: string (email|ip), count: number, lockedUntil: Date, createdAt: Date }
// TTL index on createdAt (e.g. 15 min window)
```

### `eventThemes` (reusable templates)
```ts
{
  _id, name, slug (unique), description,
  category: 'hackathon'|'workshop'|'webinar'|'bootcamp'|'competition'|'custom',
  layout: {                       // which sections render, in order
    sections: [{ type, enabled, order, config }] // hero, about, schedule, sponsors, gallery, faq, register
  },
  registrationSchema: ObjectId<FormSchema> | embedded,  // default form for events using this theme
  isActive, createdBy, createdAt, updatedAt
}
// indexes: { slug: 1 } unique, { isActive: 1 }
```

### `events`
```ts
{
  _id, title, slug (unique), themeId: ObjectId<EventTheme>,
  status: 'draft'|'published'|'archived',
  startsAt, endsAt, venue, summary, content (sanitized HTML/blocks),
  registration: {
    enabled: boolean,
    opensAt, closesAt,
    formSchemaId: ObjectId<FormSchema>,
    teamConfig: { min, max },         // null => individual
    fee: number, currency: 'INR',
    requiresPayment: boolean,
    requiresApproval: boolean,
  },
  media: { cover: ObjectId<Media>, gallery: [ObjectId<Media>] },
  sponsors: [{ name, logo: ObjectId<Media>, tier, url }],
  faqs: [{ q, a }],
  createdBy, updatedBy, createdAt, updatedAt
}
// indexes: { slug:1 } unique, { status:1, startsAt:-1 }, { themeId:1 }
```

### `formSchemas` (dynamic registration forms)
```ts
{
  _id, name, version: number,
  fields: [{
    key, label, type: 'text'|'email'|'phone'|'select'|'number'|'file'|'checkbox'|'textarea',
    required: boolean, options?: string[], validation?: { min,max,pattern },
    conditional?: { fieldKey, equals }    // show field only if condition met
  }],
  createdBy, createdAt, updatedAt
}
```

### `registrations` (restructured)
```ts
{
  _id, eventId: ObjectId<Event>,
  formSchemaVersion: number,
  team: { name?: string },
  responses: Record<string, unknown>,   // keyed by form field key (validated against schema)
  leader: { fullName, email, phone, college },
  members: [{ fullName, email }],
  payment: {
    transactionId?: string,
    proof: ObjectId<Media> | null,       // Cloudinary ref, NOT base64
    amount: number,
    status: 'none'|'submitted'|'verified'|'rejected',
    verifiedBy?: ObjectId<User>, verifiedAt?: Date, note?: string
  },
  status: 'pending'|'approved'|'rejected'|'waitlisted',
  reviewedBy?: ObjectId<User>, reviewedAt?: Date,
  certificateEligible: boolean,
  createdAt, updatedAt
}
// indexes: { eventId:1, status:1, createdAt:-1 }, { 'leader.email':1 }, { 'payment.status':1 }
```

### `certificates` (kept, hardened)
```ts
{ certificateNumber (unique), eventId?, name, email (indexed), product,
  date, asset: ObjectId<Media>|null, status:'generated'|'downloaded'|'shared'|'revoked',
  downloadCount, shareCount, lastAccessed, createdBy, createdAt, updatedAt }
// indexes: { certificateNumber:1 } unique, { email:1 }, { eventId:1 }
```

### `mediaAssets`
```ts
{ _id, provider:'cloudinary', publicId, url, secureUrl, type:'image'|'video'|'pdf',
  width, height, bytes, folder, uploadedBy: ObjectId<User>,
  refType:'registration_proof'|'event_cover'|'gallery'|'sponsor'|'certificate'|'cms',
  refId?: ObjectId, createdAt }
// indexes: { publicId:1 } unique, { refType:1, refId:1 }
```

### `auditLogs`
```ts
{ _id, actorId: ObjectId<User>|'SYSTEM', actorRole, action: string,
  resource: { type, id }, before?, after?, ip, userAgent, createdAt }
// indexes: { createdAt:-1 }, { 'resource.type':1, 'resource.id':1 }, { actorId:1 }
// optional TTL (e.g. 365d) if retention is desired
```

### `cmsContent` (centralized content)
```ts
{ _id, type:'team'|'faq'|'sponsor'|'announcement'|'page'|'social'|'gallery',
  key?: string,                       // for singletons (e.g. 'home_hero')
  status:'draft'|'published',
  data: Record<string, unknown>,      // shape validated per-type by Zod
  version: number,
  publishedAt?, createdBy, updatedBy, createdAt, updatedAt }
// indexes: { type:1, status:1 }, { type:1, key:1 }
```

### `settings` (singleton, business + technical)
```ts
{ _id, scope:'business'|'technical',
  data: { /* business: upiId, registrationOpen, contactEmails, whatsappLink, fee ...
            technical: rateLimits, featureFlags, maintenanceMode ... */ },
  updatedBy, updatedAt }
// indexes: { scope:1 } unique
```

### `messages` (contact, hardened)
```ts
{ name (required), email (required, lowercase), contact (required),
  message (required, sanitized), createdAt }
// indexes: { email:1 }, { createdAt:-1 }
```

### Indexing & scalability strategy

- Add the compound indexes above (esp. `registrations { eventId, status, createdAt }`) — eliminates collection scans for admin filtering.
- **Pagination everywhere**: admin list endpoints use cursor (`createdAt`+`_id`) or page/limit with a hard max page size.
- **No large blobs in documents** — media externalized to Cloudinary.
- `maxPoolSize` configured on the Mongoose connection.
- TTL indexes on `loginAttempts` and optionally `auditLogs`.

---

## Event Engine

### Concept

Move from "one hardcoded event in code" to a **theme-driven dynamic event engine**. A Faculty Admin:

1. Picks (or creates) an **Event Theme** (e.g. Hackathon, Workshop, Webinar).
2. The theme defines the **default page layout** (which sections appear and in what order) and a **default registration form**.
3. Creates an **Event** from the theme, overriding content/dates/media as needed.
4. Publishes — the public page renders dynamically from the event document.

### Rendering

```
/events/[slug]  (server component)
   -> eventService.getPublishedBySlug(slug)
   -> resolve theme.layout.sections
   -> for each enabled section, render <SectionRenderer type config data />
```

Section types map to existing UI strengths (hero, about, schedule, sponsors, gallery, FAQ, register). The current beautiful event/past-event cards and carousels are **kept** and refactored to consume dynamic data instead of hardcoded arrays.

### Theme controls (per requirements)

Each theme controls: page design (section set + order), registration flow (form + team config), payment flow (fee, requiresPayment), schedules, sponsors, galleries, and FAQs. Themes are reusable across multiple events.

### Why no over-engineering

We do **not** build a drag-and-drop site builder. Themes are **structured JSON layouts** chosen and configured from the dashboard — practical, predictable, and fully admin-controlled.

---

## Registration System

### Dynamic form builder

- Faculty Admin builds a form by adding fields (text/email/phone/select/number/file/checkbox/textarea), marking required, adding options, and optional **conditional visibility** (`show field B if field A == value`).
- Forms are versioned (`formSchemas.version`); each registration records the schema version it was submitted against, so historical data stays interpretable.
- Team configuration (min/max members) is part of the event, enabling individual or squad-based events.

### Registration pipeline

```
USER
  v
Dynamic Form (rendered from formSchema)        <- client validates with generated Zod
  v
Server validation (Zod built from schema)      <- authoritative, rejects bad/extra fields
  v
Payment upload (if requiresPayment)            <- direct-to-Cloudinary signed upload
  v
Create registration { status:'pending', payment.status:'submitted' }
  v
Admin Review (Faculty)                         <- approve / reject / waitlist + verify payment
  v
Approval/Rejection                             <- audit logged
  v
Confirmation (email/WhatsApp link)
  v
certificateEligible = true on approval (+ event ended)
```

### States

- `registration.status`: `pending → approved | rejected | waitlisted`.
- `payment.status`: `none | submitted | verified | rejected`.
- Approval is **gated**: a registration can only be `approved` when payment is `verified` (if payment required).

### Improvements over current

- Server-side schema validation (no more "accept any field").
- Duplicate-guard option (e.g. unique leader email per event).
- Proof stored as Cloudinary reference, served via access-controlled URL — no `?auth=` leak.
- Pagination + indexed filtering for admin review.

---

## CMS Architecture

### Goal

**Every editable surface is managed from the admin dashboard. Zero hardcoded content, zero direct DB edits.**

Managed content types (stored in `cmsContent` / dedicated collections): events, themes, team members, registrations (operational), certificates, galleries, announcements, FAQs, sponsors, pages, social links.

### Content lifecycle

```
Draft -> (preview) -> Publish -> Live
                         |
                         +-- version bump + audit log
                         +-- previous version retained for rollback
```

- **Draft/Publish**: public pages read only `status:'published'`. Faculty can preview drafts via a signed preview flag.
- **Validation**: each content type has a Zod schema; writes are rejected if invalid; rich text is sanitized with **DOMPurify** before storage.
- **Versioning & rollback**: each publish increments `version` and snapshots prior `data`. A "Restore version N" action re-publishes a previous snapshot (audit logged).
- **Approval**: optional second-step publish gate can be enabled per content type (Faculty-only).

### Migration of existing content

`src/data/team.ts`, `src/data/events.ts`, `public/staticdata/*.json`, and hardcoded `PastEvents.tsx` arrays are **migrated into the DB** via one-time scripts, then the static files are deleted. Components fetch from services instead.

---

## Media System

### Decision: Cloudinary

Cloudinary is chosen over raw S3 for this project because it bundles upload, transformation, optimization, and CDN delivery with minimal setup — appropriate for the team’s size. (S3 remains a drop-in alternative behind the same `mediaService` interface if ever needed.)

### Upload pipeline (no base64 in DB)

```
Client requests signed upload params  -> GET /api/media/sign (auth + permission)
   |  server returns { signature, timestamp, folder } (Cloudinary signed upload)
   v
Client uploads file DIRECTLY to Cloudinary (not through our server)
   |  returns { public_id, secure_url, ... }
   v
Client POSTs metadata -> /api/media  -> mediaService.record(...)
   |  validates ownership/refType, stores mediaAssets doc
   v
Reference (ObjectId<Media>) attached to registration/event/etc.
```

### Access control & optimization

- **Registration proofs** are uploaded to a private/authenticated Cloudinary folder; admin views them via short-lived **signed delivery URLs** generated server-side (replaces the insecure `?auth=` screenshot route).
- Public assets (event covers, gallery) use Cloudinary CDN with `next/image` + transformation params (resize/format/quality) — fixes the current `unoptimized` full-size loads.
- File type/size validated server-side before recording metadata.

### Migration

Existing base64 `paymentScreenshot` blobs are migrated by a script: decode → upload to Cloudinary → store `mediaAssets` ref on the registration → remove the base64 field. Run in batches; verify counts; keep a backup export first.

---

## Security Architecture

### Removed (insecure patterns)

- Basic Auth, Base64 credential handling, hardcoded credentials (`admin-auth.ts`).
- `?auth=` query-param authentication.
- `sessionStorage` token storage.

### Implemented

| Control | Implementation |
|---|---|
| **Authentication** | Auth.js Credentials + JWT, bcrypt password hashing |
| **Session storage** | HTTP-only, Secure, SameSite cookies (Auth.js managed) |
| **RBAC** | `withRbac(permission)` server middleware + `can()` UI gating |
| **Route guards** | `middleware.ts` matcher on `/admin`, `/api/admin`, `/api/cms` |
| **CSRF** | Auth.js CSRF for auth routes; double-submit cookie (`withCsrf`) for custom mutations |
| **Rate limiting** | `withRateLimit` middleware — fixed-window counters in MongoDB keyed by IP+route (no Redis needed at this scale) |
| **Brute-force** | `loginAttempts` collection with TTL + progressive lockout |
| **Input validation** | Zod schemas on every route (body, query, params) |
| **Sanitization** | DOMPurify on any stored/rendered rich text (contact messages, CMS content) |
| **Session expiry** | JWT `maxAge` (e.g. 8h) + sliding refresh; re-check role on sensitive ops |
| **Secrets** | `.env` only; `NEXTAUTH_SECRET`, `MONGODB_URI`, `CLOUDINARY_*`; validated at startup via a Zod env schema |
| **Headers** | Security headers (CSP, X-Frame-Options, Referrer-Policy) via `next.config.ts` |
| **SVG** | Set `dangerouslyAllowSVG: false` unless a sanitized pipeline is added |

### Rate limiting (practical, no Redis)

```ts
// withRateLimit: fixed window per (ip + routeKey)
// rateLimits collection: { key, count, windowStart, expiresAt(TTL) }
// public routes (register/contact/certificates): e.g. 10 req / 10 min / IP
// login: 5 attempts / 15 min / (email + ip) -> lockout
```

> Note on Vercel serverless: per-IP counters in MongoDB are correct across instances (shared state), unlike in-memory counters. This satisfies the requirement without Upstash/Redis.

---

## Audit Logging

### What gets logged

Every privileged or state-changing action: login success/failure, admin user CRUD, role changes, event publish/unpublish, registration approve/reject, payment verify/reject, certificate issue/revoke, CMS publish/rollback, settings changes, media delete.

### Shape & write path

- `auditService.record({ actorId, actorRole, action, resource, before, after, ip, userAgent })` is called **inside the service layer** (not the route) so it cannot be bypassed.
- `before`/`after` capture diffs for rollback context (sensitive fields like `passwordHash` are never stored).
- Stored in `auditLogs` with indexes for time-range and resource lookups.

### Access

- Both roles can **read** audit logs (`audit:read`); neither can edit or delete them (append-only). Optional retention via TTL index.
- Dashboard provides filters by actor, action, resource type, and date range with pagination.

---

## Cleanup Report

### KEEP (refactor to consume dynamic data, but preserve)

- UI strengths: `ProfileCard`, event cards, `imagecrousal`, shader background (add visibility-pause), `ui/*` primitives, loading/error-boundary.
- Core flows: registration, certificate lookup, contact, Excel/PDF export (move PDF libs to dynamic import).
- `lib/mongodb.ts` (add `maxPoolSize`), `lib/utils.ts`, `constants.ts`.

### REFACTOR

- `src/app/admin/page.tsx` → split into route-segmented dashboard with server data fetching + service calls; remove auth/sessionStorage logic.
- All API routes → thin controllers over services + Zod + middleware.
- `next.config.ts` → security headers, `dangerouslyAllowSVG:false`, Cloudinary image domains.
- Components doing direct `fetch()` → use typed service clients.

### REBUILD

- Auth (Basic → Auth.js/JWT/RBAC).
- Event system (hardcoded → theme engine).
- Registration (static → dynamic form builder + pipeline).
- Media (base64 → Cloudinary).

### REMOVE (dead/duplicate)

- `src/components/ui/lamp.tsx`, `ui/demo.tsx`.
- `src/lib/i18n.ts` (non-functional) — defer i18n entirely.
- `src/components/social/social.tsx` placeholder (replace with CMS-driven social page or drop route).
- `src/lib/admin-auth.ts` (after Auth.js lands).
- `src/data/team.ts`, `src/data/events.ts`, `public/staticdata/*` (after DB migration).
- Empty: `public/SE.json`, `public/uploads/`, `public/fonts/`, `api/certificate-image/`, `api/linkedin/`, `tsconfig.tsbuildinfo`.
- Default Next SVGs (verify no refs).

### FIX

- Rename `public/assests/` → `public/assets/` (update all references first).
- Resolve `@ts-expect-error` / `no-explicit-any` once schemas are typed.
- Broken className in `Teams.tsx` (`relativ\ne`).

---

## Technical Debt Strategy

| Debt | Classification | Strategy |
|---|---|---|
| Hardcoded creds / Basic Auth | Critical security | Replace first (Phase 1–2), delete old module |
| Query-param auth | Critical security | Remove with media refactor (Phase 8) — interim: gate behind session |
| Base64 media in DB | Performance/cost | Migrate in batches with verification + backup (Phase 8) |
| Duplicate data sources | Maintainability | Consolidate to DB during CMS migration (Phase 5) |
| No service layer | Architecture | Introduce incrementally per module as routes are touched |
| Type-safety suppressions | Quality | Remove as each model gains Zod/Mongoose types |
| Dead code / typos | Hygiene | Batch cleanup at end of each phase (low risk) |

**Principles:** fix root causes not symptoms; prefer minimal upstream changes; migrate data with backups + verification + rollback; never weaken or delete tests; land security fixes before features.

---

## Dashboard Architecture

### Faculty Dashboard (`/admin`)

```
/admin
  /overview          KPIs: registrations, pending approvals, recent events
  /events            list/create/edit/publish; theme picker
  /events/themes     theme + layout + form template management
  /registrations     filter by event/status; approve/reject; verify payment; export
  /certificates      issue/edit/revoke; analytics
  /content           CMS: team, FAQs, sponsors, announcements, pages, social, gallery
  /media             library; upload; delete
  /admins            user management (create/edit/deactivate)
  /settings          business settings (UPI, fees, registration open/close, contacts)
  /audit             audit log viewer (filter + paginate)
```

### Developer Dashboard (`/admin/system`)

```
/admin/system
  /health            DB connectivity, build info, uptime, env checks
  /monitoring        API latency/error counts (from audit + lightweight metrics)
  /database          collection counts, index status (read-only)
  /logs              recent error/audit stream (read-only)
  /settings          technical settings (rate limits, feature flags, maintenance mode)
  /tools             cache clear, reconnect DB, run safe diagnostics
```

Each module renders server-side, calls the service layer, and conditionally shows actions via `can(permission)`. Developer routes are blocked from business-data mutations at the **middleware + service** level (defense in depth).

---

## Implementation Phases

Ordered for dependency-safety and risk reduction. Each phase ends with verification and is independently shippable.

### Phase 1 — Security Stabilization (immediate)
- Remove hardcoded credential fallback; require env creds (interim).
- Kill `?auth=` query param; gate screenshot route behind existing auth.
- Add `withRateLimit` (MongoDB) to public routes; sanitize contact input (DOMPurify).
- Add env validation (Zod) + security headers; `dangerouslyAllowSVG:false`.
- **Risk:** low. **Rollback:** revert middleware; no schema change.

### Phase 2 — Authentication & RBAC
- Install Auth.js; `users`, `loginAttempts` models; bcrypt; seed first Faculty Admin.
- Implement permission matrix, `withRbac`, `can()`, `middleware.ts` gate, login UI.
- Migrate `/admin` to session auth; delete `admin-auth.ts` + sessionStorage logic.
- **Risk:** medium (auth cutover). **Rollback:** feature-flag old gate until verified.

### Phase 3 — Database Refactor
- Add indexes; configure `maxPoolSize`; harden `messages`/`registrations` schemas (add status/payment fields, keep base64 field temporarily).
- Add pagination to admin list endpoints.
- Introduce service layer + standard error envelope for existing routes.
- **Risk:** medium. **Rollback:** additive changes; old fields retained.

### Phase 4 — Event Engine
- `eventThemes`, `events`, `formSchemas` models + services.
- Dynamic `/events/[slug]` renderer + section components (reusing current UI).
- Migrate current hardcoded events into DB (script).
- **Risk:** medium.

### Phase 5 — CMS Layer
- `cmsContent`, `settings` models + services with draft/publish/version/rollback.
- Migrate team/past-events/static JSON into DB; delete static sources.
- **Risk:** medium (content cutover) — keep static fallback until verified.

### Phase 6 — Dashboard Rebuild
- Build Faculty + Developer dashboards over the new services.
- Wire audit log viewer, settings, admin management UIs.
- **Risk:** low-medium (mostly additive UI).

### Phase 7 — Registration Infrastructure
- Dynamic form builder UI; server Zod-from-schema validation.
- Approval/payment-verify pipeline + states; duplicate guard.
- **Risk:** medium (touches live registration flow) — run parallel with old form behind flag, then switch.

### Phase 8 — Media Migration
- Cloudinary integration; signed uploads; `mediaAssets`.
- Migrate base64 proofs → Cloudinary (batched, backed up, verified); drop base64 field.
- Switch proof/gallery delivery to signed/CDN URLs.
- **Risk:** medium-high (data migration) — full export backup + reversible mapping.

### Phase 9 — Cleanup & Optimization
- Remove dead code/dirs, fix `assests` typo, resolve type suppressions.
- Shader visibility-pause, dynamic-import PDF libs, image optimization.
- Final audit pass + index/perf verification.
- **Risk:** low.

---

## Migration Strategy

### Principles
- **Backup first**: export every affected collection before destructive steps (`mongodump`/Atlas snapshot).
- **Additive then subtractive**: add new fields/collections, dual-write/dual-read during transition, remove old only after verification.
- **Batched + idempotent scripts**: migrations re-runnable; track progress; verify counts before/after.
- **Feature flags**: gate auth cutover, registration form swap, and CMS content source so rollback is instant.

### Key migrations
1. **Admin auth** → seed users, switch gate behind flag, verify login + RBAC, then remove Basic Auth.
2. **Static content → DB** → import scripts for team/events/static JSON; verify rendered parity; delete static files.
3. **Base64 → Cloudinary** → batch decode+upload+ref, verify each registration resolves an asset, then `$unset` base64.

### Rollback considerations
- Phases 1–3 are additive/low-risk (revert code).
- Phases 4–7 keep old sources until parity verified (flag flip back).
- Phase 8 retains backup + reversible asset mapping; can restore base64 from backup if needed.

### Risk register (top items)
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Auth cutover locks out admins | Low | High | Seed + verify before removing old gate; keep flag |
| Media migration data loss | Low | High | Backup + verify counts + reversible mapping |
| Content parity gaps after CMS migration | Medium | Medium | Dual-read + visual QA before deleting static files |
| Registration flow regression | Medium | High | Parallel old/new behind flag; staged rollout |

---

## Final Recommended Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js (App Router)** | Server components + Route Handlers |
| Language | **TypeScript (strict)** | Types inferred from Zod where possible |
| UI | **React + Tailwind + shadcn/ui** | Existing UI strengths preserved |
| Animation | Framer Motion | Kept; shader gets visibility-pause |
| API | **Next.js Route Handlers + Service Layer** | Thin controllers, modular services |
| Auth | **Auth.js (NextAuth) + JWT + RBAC** | Credentials provider, bcrypt, HttpOnly cookies |
| DB | **MongoDB Atlas + Mongoose** | Indexed, paginated, pooled |
| Validation | **Zod + DOMPurify** | Request validation + sanitization |
| Storage | **Cloudinary** | Signed uploads, CDN, access-controlled proofs |
| Security | **CSRF, rate limiting (Mongo), audit logging, security headers** | No Redis/Sentry/Pino needed |
| Deploy | **Vercel** | Serverless-friendly choices throughout |

### Explicitly excluded (per constraints)
Pino, Winston, Sentry, Upstash Redis, PostHog, Prisma, Stripe billing, multi-tenancy, distributed caching, enterprise observability, mobile app. These are not needed for the platform’s current scale and would add maintenance burden without value.

---

## Definition of Done

The restructure is complete when:

- No credentials, content, or operational settings live in source code.
- Faculty Admins manage events, themes, registrations, certificates, content, media, admins, and settings **entirely from the dashboard**.
- Developer Admins can observe/operate the system but cannot touch business data, PII exports, certificates, or admin identity.
- No endpoint accepts unvalidated input; all mutations are audited; all admin lists are paginated and indexed.
- No image data is stored in MongoDB; all media is on Cloudinary with appropriate access control.
- Operating the platform requires **zero direct database access and zero code edits**.
