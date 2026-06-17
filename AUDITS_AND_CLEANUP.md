# NSDC VCET — Security, Performance, Quality & Cleanup Audit

> **Project:** National Student Data Corps (NSDC) — VCET Chapter Website  
> **Version:** 1.0.0  
> **Last Updated:** 2026-06-02

---

## SECURITY_AUDIT — Risk Assessment

### Critical Risks

| # | Risk | Location | Severity | Details |
|---|------|----------|----------|---------|
| 1 | **Hardcoded admin credentials** | `src/lib/admin-auth.ts:3-4` | **CRITICAL** | Falls back to `NSDC@AIDS` / `VCETNSDC@AIDS` if env vars missing. These credentials are **visible in the source code** and therefore exposed to anyone who reads the repository. An attacker can authenticate as admin without needing env access. |
| 2 | **No rate limiting on public APIs** | All public API routes | **HIGH** | `/api/register`, `/api/contact`, `/api/certificates` have no IP-based or global throttling. An attacker can spam registrations indefinitely, flooding MongoDB with junk data and exhausting storage. |
| 3 | **Base64 auth token exposed in query params** | `src/app/admin/screenshot/[id]/route.ts` | **HIGH** | The `?auth=` parameter puts the Base64-encoded `username:password` into server logs, browser history, referrer headers, and any analytics tracking. If an admin clicks a screenshot link, credentials leak to third parties. |
| 4 | **No input sanitization on contact form** | `src/app/api/contact/route.ts` | **MEDIUM** | Messages are stored as raw strings. While currently not rendered back to users, any future feature that displays messages (e.g., admin inbox) could expose stored XSS. |
| 5 | **No CSRF protection** | All form submissions | **MEDIUM** | Registration and contact forms submit without CSRF tokens. While less critical for stateless APIs, it allows cross-origin form submissions from malicious sites. |
| 6 | **No CORS configuration** | API routes | **LOW** | Admin endpoints accept requests from any origin. An attacker could phish admin credentials and call endpoints from a malicious domain. |
| 7 | **`dangerouslyAllowSVG: true`** | `next.config.ts:9` | **LOW** | SVG images are allowed without sanitization. Currently only internal assets use SVG, but this is a risky default if user-uploaded SVGs are introduced later. |

### Authentication Flow Vulnerabilities

```
Admin Login Flow:
=================
Browser -> POST (no token) -> /api/admin/registrations
    |
    v
Server: verifyAdminAuth() checks header
    |
    v
If missing header -> 401 -> Client shows login form
    |
    v
User enters credentials -> Browser: btoa(`${username}:${password}`)
    |
    v
Token stored in sessionStorage (persists for browser session)
    |
    v
All subsequent requests: Authorization: Basic <token>
```

**Problems:**
- Token never expires (no JWT, no session timeout)
- Token stored in `sessionStorage` — survives page refreshes but not new tabs
- No HTTPS enforcement — if served over HTTP, credentials sent in plaintext
- No brute-force protection — unlimited login attempts
- No account lockout — attacker can guess passwords indefinitely

### Dependency Vulnerabilities

| Package | Version | Issue | Fix |
|---------|---------|-------|-----|
| `xlsx` | `0.18.5` | Known prototype pollution vulnerabilities | Upgrade to `xlsx@0.20.x` (SheetJS community edition) |
| `mongoose` | `8.18.1` | Connection string may expose credentials in logs | Audit all logging for connection string leakage |

### Secrets & Environment Variables

| Variable | Status | Risk |
|----------|--------|------|
| `MONGODB_URI` | gitignored | **HIGH** if committed accidentally — contains credentials |
| `ADMIN_USERNAME` | Not validated at build time | Falls back to hardcoded value |
| `ADMIN_PASSWORD` | Not validated at build time | Falls back to hardcoded value |
| `NEXT_PUBLIC_APP_URL` | Safe — public by design | None |
| `GOOGLE_SITE_VERIFICATION` | Safe — public token | None |

**Missing variables that should exist:**
- `NEXTAUTH_SECRET` or equivalent for session signing
- `RATE_LIMIT_REDIS_URL` for distributed rate limiting
- `UPLOAD_BUCKET` / `S3_*` for external file storage
- `SENTRY_DSN` for error tracking
- `RECAPTCHA_SECRET_KEY` for bot protection

---

## PERFORMANCE_AUDIT — Bottlenecks & Optimization

### Critical Performance Issues

| # | Issue | Location | Impact | Fix |
|---|-------|----------|--------|-----|
| 1 | **WebGL shader runs continuously** | `shader-background.tsx` | High GPU usage on all pages, even when tab is not visible or user has scrolled past hero | Pause `requestAnimationFrame` when `document.hidden` or use `IntersectionObserver` to detect visibility |
| 2 | **Base64 images stored in MongoDB** | `Registration.paymentScreenshot` | Documents can exceed 5MB, slowing queries, consuming RAM, increasing database costs | Store images in S3/Cloudinary, save URL references |
| 3 | **No image optimization for externals** | `ProfileCard.tsx`, `PastEvents.tsx` | Uses `unoptimized` prop on `next/image`, loads full-size external images without resizing | Use ImageKit/Cloudinary transforms with `next/image` sizing |
| 4 | **Large JSON data files** | `pasteventsdata.json` (22KB) | Parsed on client for PastEvents; data also duplicated in `events.ts` and `PastEvents.tsx` | Deduplicate sources, use server components to filter before sending to client |
| 5 | **Unused CSS in globals** | `globals.css` (272 lines) | Contains custom scrollbar/modal classes that may not all be used; increases CSS bundle | Audit with PurgeCSS or Tailwind JIT mode analysis |

### Bundle Size Concerns

| Library | Size | Used In | Optimization |
|---------|------|---------|------------|
| `jspdf` | ~300KB | `admin/page.tsx` | Dynamic import with `next/dynamic` |
| `jspdf-autotable` | ~50KB | `admin/page.tsx` | Dynamic import with `next/dynamic` |
| `xlsx` | ~500KB | `api/admin/export/route.ts` | Already server-side only; acceptable |
| `framer-motion` | ~90KB | Multiple components | Tree-shakeable; verify unused features are excluded |
| `lucide-react` | Variable | Multiple components | Uses individual icon imports (good); verify no full-library import |

**Total estimated admin page JS:** ~350KB extra for PDF generation that only runs on button click.

### Rendering Performance

| Issue | Location | Impact | Fix |
|-------|----------|--------|-----|
| React class component for ErrorBoundary | `error-boundary.tsx` | Larger bundle than functional equivalent | Use `react-error-boundary` package |
| Multiple `useEffect` hooks | `EventCard.tsx`, `upcoming.tsx` | More re-renders than necessary | Consolidate related effects into single hooks |
| Runtime JSON fetching | `Teams.tsx` | Layout shift, loading delay | Use `getStaticProps` or server component data fetching |
| Inline style objects | `eventmodal.tsx`, `upcoming.tsx` | Runtime style computation overhead | Use Tailwind classes or CSS modules |
| Global CSS in `<style jsx global>` | `upcoming.tsx` | Global CSS pollution, specificity conflicts | Move to CSS modules or Tailwind plugins |

### Database Performance

| Issue | Impact | Fix |
|-------|--------|-----|
| No pagination on admin list | Returns ALL documents — crashes at scale | Implement cursor-based pagination |
| `paymentScreenshot` in base64 | 5MB documents scanned for every admin query | Exclude field from queries (partially done) + external storage |
| Missing indexes on `registrations` | Collection scans for domain-filtered queries | Add compound index `{ domain: 1, createdAt: -1 }` |
| Missing indexes on `messages` | Collection scans for contact lookups | Add index `{ email: 1 }` and `{ createdAt: -1 }` |

### Network Performance

| Issue | Impact | Fix |
|-------|--------|-----|
| No API response caching | Same data fetched repeatedly | Add `Cache-Control` headers to read endpoints |
| No CDN for external images | ImageKit URLs not using `next/image` optimization | Configure `next/image` with ImageKit loader |
| Large initial HTML | Admin page is 18KB of client JS embedded in HTML | Split into separate route or use SSR for data |
| No service worker | No offline support, no asset caching | Consider `next-pwa` for caching static assets |

---

## CODE_QUALITY_AUDIT — Maintainability Review

### Architecture Issues

| # | Issue | Location | Severity | Recommendation |
|---|-------|----------|----------|----------------|
| 1 | **Duplicate data sources** | `src/data/team.ts` vs `public/staticdata/BE.json` + `TE.json` | **HIGH** | Consolidate into single source of truth; use JSON for runtime fetch, remove TS duplicate |
| 2 | **Duplicate past events** | `src/data/events.ts` vs `src/components/events/past/PastEvents.tsx` | **HIGH** | Extract all event data to `public/staticdata/`; components should only render, not define data |
| 3 | **Mixed data patterns** | TS modules, JSON files, and hardcoded arrays all coexist | **MEDIUM** | Standardize on one pattern per data type |
| 4 | **No API service layer** | Direct `fetch()` calls in 6+ components | **MEDIUM** | Create `src/services/` with typed API clients |
| 5 | **No centralized error handling** | Each API route has isolated try/catch | **LOW** | Create middleware wrapper for consistent error responses |
| 6 | **No validation middleware** | Validation scattered across routes | **LOW** | Create reusable Zod schemas for route validation |

### Naming & Consistency Issues

| Issue | Example | Fix |
|-------|---------|-----|
| Inconsistent component file naming | `upcoming.tsx` (lowercase), `EventCard.tsx` (Pascal), `eventmodal.tsx` (lowercase) | Standardize on PascalCase for components |
| Typo in directory name | `public/assests/` instead of `assets/` | Rename directory + update all references |
| Mixed quote styles | Single quotes in `register/route.ts`, double in `contact/route.ts` | Enforce single style via Prettier/ESLint |
| Broken className | `Teams.tsx:76` has `className="relativ\ne py-12"` (newline in string) | Fix string literal |
| Inconsistent import ordering | Some files group by type, others alphabetically | Use ESLint `import/order` rule |

### Type Safety Issues

| Issue | Count | Location Pattern |
|-------|-------|-------------------|
| `@ts-expect-error` suppressions | 6 | All certificate routes |
| `@typescript-eslint/no-explicit-any` disabled | 4 | `Certificate.ts`, admin routes |
| `eslint-disable react-hooks/exhaustive-deps` | 2 | `useAsync.ts`, `shader-background.tsx` |
| `// eslint-disable-next-line` | 3 | Admin routes for `any` types |

**Impact:** Type safety is weakened across the entire API surface. Future refactors will not catch breaking changes.

### Anti-Patterns

| Anti-Pattern | Location | Better Approach |
|--------------|----------|-----------------|
| Inline style objects with dynamic values | `eventmodal.tsx`, `upcoming.tsx` | Use Tailwind classes or CSS custom properties |
| Global CSS injection via `<style jsx global>` | `upcoming.tsx` (200+ lines) | CSS modules, Tailwind plugins, or PostCSS |
| `Buffer.from(bytes).toString('base64')` in route | `api/register/route.ts` | Use FileReader on client for base64, or streams on server |
| Hardcoded external URLs | `RegisterForm.tsx` (WhatsApp), `layout.tsx` (fonts) | Move to constants or environment variables |
| Hardcoded payment UPI ID | `RegisterForm.tsx:210` | Move to environment variable |
| `console.error` in production | Multiple API routes | Use structured logger (`@/lib/logger.ts`) |
| Commented-out code left in source | `upcoming.tsx` (lines 6-11), `eventmodal.tsx` (lines 116-131) | Remove or extract to git history |

### Code Duplication

| Duplicated Logic | Locations | Extract To |
|------------------|-----------|------------|
| Certificate response formatting | `certificates/route.ts`, `[id]/route.ts` | Shared `toCertificateJSON()` helper |
| Error response formatting | Every API route | `createErrorResponse(error, status)` utility |
| Auth header construction | `admin/page.tsx` | Shared `getAuthHeader(token)` in lib |
| Date formatting | `PastEvents.tsx`, `admin/export/route.ts` | `formatDate()` from `@/lib/utils` |
| Modal styling | `eventmodal.tsx`, `upcoming/EventCard.tsx` | Shared modal wrapper component |

### Dead Code

| Code | Status | Action |
|------|--------|--------|
| `src/components/ui/lamp.tsx` | Unused | Delete |
| `src/components/ui/demo.tsx` | Unused | Delete |
| `src/components/social/social.tsx` | Placeholder (returns `<div>Social</div>`) | Implement or remove route |
| `src/lib/i18n.ts` | Non-functional stub | Implement with `next-intl` or remove |
| `public/SE.json` | Empty file (0 bytes) | Delete |
| `public/uploads/` | Empty directory | Delete |
| `public/fonts/` | Empty directory | Delete |
| `src/components/shutdown/` | Empty directory | Already gitignored |
| `public/staticdata/pasteventsdata.json` | Partially used | Verify all events referenced |

---

## CLEANUP_REPORT — Trash File Inventory

### Safe to Delete (No Dependencies)

| File/Directory | Size | Reason | Safety |
|----------------|------|--------|--------|
| `tsconfig.tsbuildinfo` | ~169KB | TypeScript incremental build cache | **SAFE** — regenerated on every build |
| `src/components/shutdown/` | 0 bytes | Empty directory, already gitignored | **SAFE** |
| `src/components/ui/lamp.tsx` | ~4.3KB | Unused decorative component | **SAFE** — not imported anywhere |
| `src/components/ui/demo.tsx` | ~670 bytes | Unused demo wrapper | **SAFE** — not imported anywhere |
| `public/uploads/` | Empty | Legacy upload directory | **SAFE** |
| `public/fonts/` | Empty | Google Fonts loaded via CDN | **SAFE** |
| `public/SE.json` | 0 bytes | Empty file | **SAFE** |
| `public/file.svg` | ~391 bytes | Default Next.js SVG | **SAFE** — verify no references |
| `public/globe.svg` | ~1KB | Default Next.js SVG | **SAFE** — verify no references |
| `public/next.svg` | ~1.4KB | Default Next.js SVG | **SAFE** — verify no references |
| `public/vercel.svg` | ~128 bytes | Default Next.js SVG | **SAFE** — verify no references |
| `public/window.svg` | ~385 bytes | Default Next.js SVG | **SAFE** — verify no references |

### Requires Caution (Update References First)

| File/Directory | Size | Reason | Risk | Required Action |
|----------------|------|--------|------|-----------------|
| `public/assests/` | Varies | **Typo in name** — should be `assets/` | **HIGH** | Update ALL references in code from `assests` to `assets`, then rename directory |
| `src/data/team.ts` | ~11.5KB | Duplicates `BE.json` + `TE.json` | **MEDIUM** | Search for imports; if only used for types, replace with JSON imports |
| `src/data/events.ts` | ~5KB | Duplicates past event data | **MEDIUM** | Verify no unique utilities before deleting; may extract filter functions |
| `tailwind.config.js` | ~527 bytes | Mostly unused with Tailwind v4 | **LOW** | Verify build succeeds without it; may have subtle fontFamily side effects |

### Should Be Refactored (Not Deleted)

| File | Issue | Recommended Action |
|------|-------|---------------------|
| `src/components/social/social.tsx` | Empty placeholder | Implement social links page with actual content, or remove the `/socials` route |
| `src/lib/i18n.ts` | Non-functional stub | Either: (a) Implement with `next-intl` + translation files, or (b) Remove entirely |
| `src/app/(pages)/register/page.tsx` | Shows "Registrations Full" but `RegisterForm.tsx` still exists | Either: (a) Re-enable registration by updating page, or (b) Remove `RegisterForm.tsx` and registration API if permanently closed |
| `src/app/api/certificate-image/[id]/` | Empty directory | Remove empty route directories |
| `src/app/api/linkedin/callback/` | Empty directory | Remove empty route directories |

### Build Artifacts to Ignore

| File/Directory | Current Status | Recommendation |
|----------------|---------------|----------------|
| `.next/` | gitignored | Good — keep ignored |
| `node_modules/` | gitignored | Good — keep ignored |
| `out/` | gitignored | Good — keep ignored |
| `build/` | gitignored | Good — keep ignored |
| `.vercel/` | gitignored | Good — keep ignored |

### Cleanup Command Checklist

```bash
# 1. Remove empty/unused directories and files
rm -rf src/components/shutdown/
rm -rf public/uploads/
rm -rf public/fonts/
rm -rf public/SE.json
rm -rf src/components/ui/lamp.tsx
rm -rf src/components/ui/demo.tsx
rm -rf src/app/api/certificate-image/[id]/
rm -rf src/app/api/linkedin/callback/

# 2. Remove default Next.js SVGs (verify no imports first)
rm -f public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg

# 3. Remove TypeScript build cache
rm -f tsconfig.tsbuildinfo

# 4. Fix typo: rename assests to assets
# FIRST: sed -i 's/assests/assets/g' $(grep -rl 'assests' src/ public/)
# THEN: mv public/assests public/assets
```

---

## Summary of Critical Findings

| Category | Count of Critical/High Issues |
|----------|------------------------------|
| **Security** | 3 critical, 2 high |
| **Performance** | 2 critical, 3 high |
| **Code Quality** | 2 high |
| **Cleanup** | 1 high (typo directory) |

**Immediate Actions Required:**
1. Remove hardcoded admin credentials from `src/lib/admin-auth.ts`
2. Add rate limiting to public API routes
3. Remove or secure the `?auth=` query parameter on screenshot endpoint
4. Add indexes to `registrations` and `messages` collections
5. Fix `public/assests/` typo across all references
6. Remove or implement empty placeholder components
