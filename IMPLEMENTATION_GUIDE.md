# NSDC VCET — Implementation Guide

> **Goal:** Go from "code is written" to "production-ready platform" in order.
> Every step below is something **you** must run or configure. Code changes were already done in Phases 1–9.

---

## Prerequisites

1. **Node.js** ≥ 18 (20+ recommended)
2. **MongoDB Atlas** cluster (free tier works) — or a local MongoDB instance
3. **Cloudinary account** (free tier) — only needed for Phase 8 media migration
4. A terminal with PowerShell / Bash / Zsh

---

## Step 0 — Environment Setup

### 0.1 Create your `.env` file

```powershell
cp .env.example .env
```

Open `.env` and fill in at least these **required** values:

```env
# Required
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/nsdc?retryWrites=true&w=majority
AUTH_SECRET=<paste-a-32-char-random-string>

# Recommended for local dev
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional — only if you want Cloudinary media storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# One-time seeding — remove after first run
SEED_ADMIN_EMAIL=admin@vcet.edu.in
SEED_ADMIN_PASSWORD=Min8Chars!
SEED_ADMIN_NAME=Faculty Admin
```

> **Generate `AUTH_SECRET`:**
> ```powershell
> openssl rand -base64 32
> ```
> Or use any strong random string (≥ 16 characters).

### 0.2 Install dependencies (if not already done)

```powershell
npm install
```

---

## Phase 1 — Security Headers (already in code)

**What you need to do:** Verify the headers are being sent.

```powershell
npm run dev
```

In another terminal:

```powershell
curl -I http://localhost:3000
```

Look for these headers in the response:
- `x-frame-options: SAMEORIGIN`
- `x-content-type-options: nosniff`
- `strict-transport-security: ...`
- `permissions-policy: camera=(), microphone=(), geolocation=()`

✅ If you see them, Phase 1 is active. If not, check `next.config.ts`.

---

## Phase 2 — Authentication & RBAC

### 2.1 Seed the first admin account

This creates the `FACULTY_ADMIN` user in MongoDB so you can log in.

```powershell
npm run seed:admin
```

**Expected output:**
```
[seed-admin] Creating FACULTY_ADMIN: admin@vcet.edu.in
[seed-admin] Done.
```

> ⚠️ **Important:** After the first successful run, **remove** `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, and `SEED_ADMIN_NAME` from your `.env` file. They are not needed by the app at runtime and should not be kept around.

### 2.2 Verify login works

1. Start dev server: `npm run dev`
2. Open `http://localhost:3000/admin/login`
3. Log in with the email and password you seeded
4. You should be redirected to `/admin` (the dashboard)

### 2.3 Verify middleware protection

Open `http://localhost:3000/admin` in an **incognito window** (not logged in). You should be redirected to `/admin/login`.

---

## Phase 3 — API Hardening

### 3.1 Verify the standardized API envelope

Test any public API to confirm the `{ data, error, meta }` format:

```powershell
curl http://localhost:3000/api/events
```

Expected response:
```json
{
  "data": [],
  "error": null,
  "meta": null
}
```

### 3.2 Verify pagination on admin registrations

Log in to the admin dashboard, open DevTools → Network tab, and check the response format for `/api/admin/registrations`. It should include:
- `data`: array of registrations
- `meta.pagination`: `{ page, limit, total, totalPages }`

---

## Phase 4 — Dynamic Events

### 4.1 Run the event migration

This migrates hardcoded events (from `public/staticdata/pasteventsdata.json`) into the `events` collection and creates a default theme.

```powershell
npm run migrate:events
```

**Expected output:**
```
[migrate-events] Default theme ready: standard-event
[migrate-events] Processed N events (X newly created).
```

### 4.2 Verify events are in the database

Log in to MongoDB Atlas (or use MongoDB Compass) and check:
- `events` collection — should have documents for Code‑o‑Fiesta and past events
- `eventthemes` collection — should have one document with `slug: "standard-event"`

### 4.3 Test the public event page

Visit: `http://localhost:3000/events/code-o-fiesta-2025`

You should see the event rendered with sections (Hero, About, Schedule, etc.).

### 4.4 Test admin event CRUD (optional)

Use a tool like Postman or `curl` with your session cookie:

```powershell
# Create an event (POST /api/admin/events)
curl -X POST http://localhost:3000/api/admin/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Workshop","slug":"test-workshop","status":"draft"}'
```

> Note: Since admin routes use session cookies (not Basic Auth), use a browser or include the `next-auth.session-token` cookie.

---

## Phase 5 — CMS + Settings

### 5.1 Run the CMS migration

This migrates team members from `BE.json` and `TE.json` into the `cmscontents` collection as published `type: "team"` entries.

```powershell
npm run migrate:cms
```

**Expected output:**
```
[migrate-cms] Processed N team members into CMS.
```

### 5.2 Verify CMS data

In MongoDB Compass / Atlas, check the `cmscontents` collection. You should see documents with:
- `type: "team"`
- `status: "published"`
- `key: "team:heads:1"`, `team:deputys:1`, etc.

### 5.3 Test public CMS API

```powershell
curl http://localhost:3000/api/cms/team
```

Expected: an array of team member objects in the `data` field.

### 5.4 Test business settings API

```powershell
curl http://localhost:3000/api/settings/business
```

Expected: `{}` (empty object) since nothing has been set yet.

### 5.5 Set business settings via admin dashboard

1. Go to `http://localhost:3000/admin/settings`
2. Enter JSON like:
   ```json
   {
     "upiId": "vcet-nsdc@upi",
     "registrationOpen": true,
     "contactEmail": "nsdc@vcet.edu.in"
   }
   ```
3. Click **Save Settings**
4. Verify: refresh the page and the saved JSON should reappear.

---

## Phase 6 — Dashboard Shell

### 6.1 Verify all admin pages load

| Page | URL | What to check |
|------|-----|---------------|
| Registrations | `/admin` | Table loads, domain filter works |
| Settings | `/admin/settings` | JSON editor loads and saves |
| Audit | `/admin/audit` | Table of audit entries appears |
| System | `/admin/system` | DB counts, uptime, node version |

### 6.2 Verify role-based navigation

- Log in as `FACULTY_ADMIN` — you should see all nav links
- (If you had a `DEVELOPER_ADMIN` account, you would also see all links — both roles have the same permissions currently)

### 6.3 Verify audit log is recording

1. Do an action that should be audited (e.g., update settings, approve a registration)
2. Go to `/admin/audit`
3. You should see a new row with the action name, actor role, and timestamp

---

## Phase 7 — Registration Review Pipeline

### 7.1 Submit a test registration (if registration is open)

If `registrationOpen` is `true` in business settings:
1. Go to `http://localhost:3000/register`
2. Fill out and submit a registration form

If registrations are closed:
1. Use MongoDB Compass to manually insert a test document into the `registrations` collection:
   ```json
   {
     "squadName": "Test Squad",
     "domain": "healthcare",
     "leader": {
       "fullName": "Test User",
       "email": "test@example.com",
       "phone": "1234567890",
       "college": "VCET"
     },
     "members": [],
     "transactionId": "TXN123",
     "paymentScreenshot": "data:image/png;base64,iVBORw0KGgo...",
     "status": "pending",
     "payment": { "status": "pending", "amount": 100, "currency": "INR" }
   }
   ```

### 7.2 Test the review API

```powershell
# Approve a registration (replace <id> with actual _id)
curl -X PATCH http://localhost:3000/api/admin/registrations/<id> \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-session-cookie>" \
  -d '{"action":"approve"}'
```

### 7.3 Test payment verification

```powershell
# Verify payment
curl -X PATCH http://localhost:3000/api/admin/registrations/<id> \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-session-cookie>" \
  -d '{"action":"verify-payment"}'
```

### 7.4 Verify guard: cannot approve with rejected payment

```powershell
# Reject payment first
curl -X PATCH http://localhost:3000/api/admin/registrations/<id> \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-session-cookie>" \
  -d '{"action":"reject-payment"}'

# Then try to approve — should return 409
curl -X PATCH http://localhost:3000/api/admin/registrations/<id> \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-session-cookie>" \
  -d '{"action":"approve"}'
```

Expected: `409 Cannot approve: payment was rejected`

---

## Phase 8 — Media (Cloudinary)

### 8.1 Set up Cloudinary (if not done)

1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier)
2. Go to Dashboard → copy **Cloud Name**, **API Key**, **API Secret**
3. Add them to your `.env` file

### 8.2 Test signed upload

```powershell
curl -X POST http://localhost:3000/api/media/sign \
  -H "Content-Type: application/json" \
  -H "Cookie: <your-session-cookie>" \
  -d '{"folder":"nsdc/test"}'
```

Expected: `{ "data": { "signature", "timestamp", "apiKey", "cloudName", "folder" } }`

### 8.3 Run proof migration (if you have existing registrations with base64 screenshots)

```powershell
# Dry run — uploads to Cloudinary but keeps base64 in DB
npm run migrate:proofs

# After verifying everything works, purge base64 data
node --env-file=.env scripts/migrate-proofs.mjs --purge
```

> ⚠️ **Back up your `registrations` collection before running `--purge`.**

### 8.4 Verify media records

After migration, check the `mediaassets` collection in MongoDB. Each migrated screenshot should have:
- `provider: "cloudinary"`
- `publicId: "nsdc/proofs/..."`
- `refType: "registration_proof"`
- `refId` pointing to the registration

---

## Phase 9 — Cleanup Verification

### 9.1 Verify dead files are gone

These files should NOT exist anymore:
- ❌ `src/lib/i18n.ts`
- ❌ `src/components/ui/lamp.tsx`
- ❌ `src/components/ui/demo.tsx`
- ❌ `public/staticdata/SE.json`

### 9.2 Verify shader pauses on tab hide

1. Open `http://localhost:3000` (homepage with shader background)
2. Open browser DevTools → Performance tab
3. Switch to another tab for 5 seconds
4. Switch back — the shader should resume smoothly (no crash)

### 9.3 Verify dynamic PDF import

1. Go to `/admin`
2. Open DevTools → Network tab → filter by `jspdf`
3. Click **Export PDF**
4. You should see a network request for `jspdf` and `jspdf-autotable` chunks loading **on demand**

---

## Production Deployment Checklist

### Before deploying to Vercel / any host:

- [ ] `.env` populated with real values (NOT committed to git)
- [ ] `AUTH_SECRET` is a strong random string (≥ 32 chars)
- [ ] `MONGODB_URI` points to production Atlas cluster (IP allowlist includes Vercel)
- [ ] `NEXT_PUBLIC_APP_URL` set to production domain
- [ ] `SEED_ADMIN_*` variables **removed** from `.env` after first seed
- [ ] `CLOUDINARY_*` variables set (if using media features)
- [ ] MongoDB indexes created automatically (Mongoose creates them on first connect)
- [ ] `npm run seed:admin` run once on production database
- [ ] `npm run migrate:events` run once on production database
- [ ] `npm run migrate:cms` run once on production database
- [ ] `npm run migrate:proofs` run once (if migrating from old base64 screenshots)

### Vercel-specific:

Add these Environment Variables in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | your-atlas-uri |
| `AUTH_SECRET` | your-secret |
| `NEXT_PUBLIC_APP_URL` | https://your-domain.vercel.app |
| `CLOUDINARY_CLOUD_NAME` | your-cloud-name |
| `CLOUDINARY_API_KEY` | your-api-key |
| `CLOUDINARY_API_SECRET` | your-api-secret |

### Build command

Vercel auto-detects, but if needed:

```bash
# No env validation during build (secrets are runtime)
SKIP_ENV_VALIDATION=1 npm run build
```

---

## Quick Reference — All npm scripts

| Script | Purpose | Run when? |
|--------|---------|-----------|
| `npm run dev` | Local development server | Every dev session |
| `npm run build` | Production build | CI / before deploy |
| `npm run seed:admin` | Create first admin user | Once per environment |
| `npm run migrate:events` | Migrate static events to DB | Once per environment |
| `npm run migrate:cms` | Migrate static team data to CMS | Once per environment |
| `npm run migrate:proofs` | Migrate base64 screenshots to Cloudinary | Once, when setting up media |

---

## Troubleshooting

### "MONGODB_URI is not set" error
- Your `.env` file is missing or the variable name is wrong. Check spelling.

### "Cannot find module '@auth/core/providers/credentials'" or similar
- Run `npm install` again. The `--legacy-peer-deps` flag was used during initial install.

### "Authentication required" on `/admin`
- You need to log in at `/admin/login` first. The middleware redirects unauthenticated users.

### "Invalid credentials" on login
- Check `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` in `.env`. The password must match what you used during `npm run seed:admin`.

### "Cannot approve: payment was rejected" (409)
- This is **by design**. Rejected payments cannot be approved. Re-verify or reject the registration instead.

### Cloudinary upload fails with "not configured"
- Add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` to `.env`.

### Audit log shows no entries
- Audit logs are only written for admin actions (approve, reject, publish, settings update, etc.). Do an admin action first.

---

## Done!

If you completed all steps above, your NSDC VCET platform is fully operational. The code implemented all 9 phases; this guide walked you through the **operational** steps to activate them.
