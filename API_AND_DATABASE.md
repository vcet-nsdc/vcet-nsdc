# NSDC VCET — API & Database Documentation

> **Project:** National Student Data Corps (NSDC) — VCET Chapter Website  
> **Version:** 1.0.0  
> **Last Updated:** 2026-06-02

---

## API_DOCS — Endpoint Reference

### Base URL

- **Local:** `http://localhost:3000/api`
- **Production:** `https://vcet-nsdc.vercel.app/api`

---

### Public Endpoints

#### `POST /api/register`

Creates a new event registration with payment proof.

**Request:** `multipart/form-data`

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `squadName` | string | Yes | Non-empty |
| `domain` | string | Yes | One of: `ai`, `vibeathon`, `uiux` |
| `leaderFullName` | string | Yes | Non-empty |
| `leaderEmail` | string | Yes | Valid email format |
| `leaderPhone` | string | Yes | Non-empty |
| `leaderCollege` | string | Yes | Non-empty |
| `member2FullName` | string | Yes | Non-empty |
| `member2Email` | string | Yes | Valid email |
| `member3FullName` | string | No | Optional |
| `member3Email` | string | No | Optional |
| `transactionId` | string | Yes | Non-empty |
| `paymentScreenshot` | File | Yes | Image, max 5MB |

**Success Response (201):**
```json
{ "success": true, "message": "Registration successful" }
```

**Error Responses:**
- `400` — Missing required fields or file too large (>5MB)
- `503` — Database connection timeout (`ETIMEOUT` / `ECONNREFUSED`)
- `500` — Internal server error

**Implementation Notes:**
- Converts uploaded image to base64 data URI and stores directly in MongoDB
- File size enforced at 5MB before conversion
- Members 2 and 3 are dynamically parsed from form fields
- No duplicate squad name validation currently implemented

---

#### `POST /api/contact`

Stores a contact message.

**Request:** `application/json`

| Field | Type | Required |
|-------|------|----------|
| `name` | string | Yes |
| `email` | string | Yes |
| `contact` | string | Yes |
| `message` | string | Yes |

**Success Response (200):**
```json
{ "success": true, "message": "Message received!" }
```

**Error Response (500):**
```json
{ "success": false, "message": "Failed to send message" }
```

**Implementation Notes:**
- No input sanitization — messages stored as raw strings
- No rate limiting — susceptible to spam
- No email notification triggered — data only stored in DB

---

#### `GET /api/certificates?email={email}`

Search certificate by email (case-insensitive).

**Query Parameters:**

| Parameter | Type | Required |
|-----------|------|----------|
| `email` | string | Yes |

**Success Response (200):**
```json
{
  "success": true,
  "certificate": {
    "id": "...",
    "certificateNumber": "NSDC-2026-0001",
    "name": "Jane Doe",
    "product": "Techblitz",
    "email": "jane@example.com",
    "date": "2026-03-28",
    "status": "generated",
    "downloadCount": 0,
    "shareCount": 0,
    "createdAt": "..."
  }
}
```

**Error Responses:**
- `400` — Email parameter missing
- `404` — No certificate found for email
- `500` — Database error

**Implementation Notes:**
- Returns the most recent certificate (`sort({ createdAt: -1 })`)
- Updates `lastAccessed` timestamp automatically
- Uses `@ts-expect-error` to suppress Mongoose typing issues

---

#### `POST /api/certificates`

Create a new certificate.

**Request:** `application/json`

| Field | Type | Required |
|-------|------|----------|
| `certificateNumber` | string | Yes (unique) |
| `name` | string | Yes |
| `product` | string | Yes |
| `email` | string | Yes |
| `date` | string | Yes |

**Success Response (200):**
```json
{
  "success": true,
  "certificate": {
    "id": "...",
    "certificateNumber": "NSDC-2026-0001",
    "name": "Jane Doe",
    "product": "Techblitz",
    "email": "jane@example.com",
    "date": "2026-03-28",
    "status": "generated",
    "createdAt": "..."
  }
}
```

**Error Response (409):**
```json
{ "success": false, "message": "Certificate number already exists" }
```

**Implementation Notes:**
- Checks uniqueness of `certificateNumber` before creation
- Email normalized to lowercase and trimmed
- Status defaults to `"generated"`

---

#### `GET /api/certificates/{id}`

Get certificate by MongoDB document ID.

**Path Parameters:**

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | string (ObjectId) | Yes |

**Success Response (200):**
```json
{
  "success": true,
  "certificate": {
    "id": "...",
    "certificateNumber": "...",
    "name": "...",
    "product": "...",
    "email": "...",
    "date": "...",
    "status": "...",
    "downloadCount": 0,
    "shareCount": 0,
    "createdAt": "..."
  }
}
```

**Error Response (404):**
```json
{ "success": false, "message": "Certificate not found" }
```

---

#### `PUT /api/certificates/{id}`

Update certificate tracking (download/share analytics).

**Path Parameters:**

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | string (ObjectId) | Yes |

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | string | Yes | `"download"` or `"share"` |
| `imageData` | string | No | Base64 image data for share action |

**Success Response (200):**
```json
{
  "success": true,
  "certificate": {
    "id": "...",
    "certificateNumber": "...",
    "status": "downloaded",
    "downloadCount": 1,
    "shareCount": 0,
    "createdAt": "..."
  }
}
```

**Implementation Notes:**
- Increments `downloadCount` or `shareCount` based on action
- Updates `status` to `"downloaded"` or `"shared"`
- Sets `lastAccessed` to current date
- Optional `imageData` can be stored for share previews

---

#### `DELETE /api/certificates/{id}`

Delete certificate by ID.

**Path Parameters:**

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | string (ObjectId) | Yes |

**Success Response (200):**
```json
{ "success": true, "message": "Certificate deleted successfully" }
```

**Error Response (404):**
```json
{ "success": false, "message": "Certificate not found" }
```

---

### Admin Endpoints (Basic Auth Required)

All admin endpoints require `Authorization: Basic <base64(username:password)>` header.

#### `GET /api/admin/registrations?domain={all|ai|vibeathon|uiux}`

List registrations with optional domain filter. Excludes `paymentScreenshot` blob from response.

**Query Parameters:**

| Parameter | Type | Required | Default |
|-----------|------|----------|---------|
| `domain` | string | No | `all` |

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "squadName": "Byte Brawlers",
      "domain": "ai",
      "leader": {
        "fullName": "Jane Doe",
        "email": "jane@example.com",
        "phone": "9999999999",
        "college": "VCET"
      },
      "members": [...],
      "transactionId": "TXN123",
      "hasScreenshot": true,
      "createdAt": "..."
    }
  ]
}
```

**Error Response (401):**
```json
{ "error": "Authentication required" }
```

**Implementation Notes:**
- Uses `{ paymentScreenshot: 0 }` projection to exclude large blob
- Sorted by `createdAt` descending (newest first)
- `hasScreenshot` flag is hardcoded to `true` since it's a required field
- `lean()` used for performance

---

#### `GET /api/admin/export?domain={all|ai|vibeathon|uiux}`

Download Excel (.xlsx) export of registrations.

**Query Parameters:**

| Parameter | Type | Required | Default |
|-----------|------|----------|---------|
| `domain` | string | No | `all` |

**Success Response (200):**
- Content-Type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- Content-Disposition: `attachment; filename="registrations_{domain}_{timestamp}.xlsx"`

**Excel Columns:**

| Column | Source |
|--------|--------|
| S.No | Auto-incremented |
| Squad Name | `squadName` |
| Domain | `domain` |
| Leader Name | `leader.fullName` |
| Leader Email | `leader.email` |
| Leader Phone | `leader.phone` |
| College | `leader.college` |
| Member 2 Name | `members[0].fullName` |
| Member 2 Email | `members[0].email` |
| Member 3 Name | `members[1].fullName` |
| Member 3 Email | `members[1].email` |
| Transaction ID | `transactionId` |
| Screenshot URL | `/api/admin/screenshot/{id}?auth={token}` |
| Registered At | `createdAt` (en-IN locale) |

---

#### `GET /api/admin/screenshot/{id}?auth={token}`

Serve payment screenshot as a binary image. Supports both header-based and query-param authentication.

**Path Parameters:**

| Parameter | Type | Required |
|-----------|------|----------|
| `id` | string (ObjectId) | Yes |

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `auth` | string | No | Base64-encoded `username:password` for direct link opening |

**Success Response (200):**
- Content-Type: Dynamic based on image MIME type (`image/jpeg`, `image/png`, etc.)
- Body: Binary image data
- Cache-Control: `public, max-age=31536000` (1 year)

**Error Responses:**
- `401` — Invalid or missing authentication
- `404` — Registration not found or no screenshot attached
- `500` — Server error during image processing

**Implementation Notes:**
- Extracts base64 data from stored data URI
- Decodes to `Uint8Array` for binary response
- Falls back to redirect if not a data URI (legacy path-based storage)

---

## Middleware & Error Handling

### Authentication Middleware

`@/lib/admin-auth.ts` — `verifyAdminAuth(req)`

```typescript
function verifyAdminAuth(req: NextRequest): NextResponse | null
```

- Returns `null` if authenticated
- Returns `401 NextResponse` if unauthenticated
- Supports `Authorization: Basic <base64>` header format
- **Fallback credentials (CRITICAL RISK):** `NSDC@AIDS` / `VCETNSDC@AIDS` if env vars missing

### Error Handling Patterns

All API routes follow this structure:

```typescript
try {
  // ... logic
} catch (error: unknown) {
  console.error('Error:', error);
  const msg = error instanceof Error ? error.message : 'Internal Server Error';
  return NextResponse.json({ error: msg }, { status: 500 });
}
```

**Issues:**
- Generic 500 responses leak no context to client
- Console logging is not suitable for production observability
- No structured error codes for client handling
- `unknown` typed errors with instanceof checks are verbose

---

## DATABASE_DOCS — Schema & Relationships

### MongoDB Collections

```
+---------------------+     +---------------------+     +---------------------+
|    registrations    |     |      messages       |     |    certificates     |
+---------------------+     +---------------------+     +---------------------+
| _id (ObjectId)      |     | _id (ObjectId)      |     | _id (ObjectId)      |
| squadName (String)  |     | name (String)       |     | certificateNumber   |
| domain (String)     |     | email (String)      |     |   (String, unique)  |
| leader: {           |     | contact (String)    |     | name (String)       |
|   fullName          |     | message (String)    |     | product (String)    |
|   email             |     | createdAt (Date)    |     | email (String)      |
|   phone             |     +---------------------+     | date (String)       |
|   college           |                                   | imageData (String)  |
| }                   |                                   | status (String)     |
| members: [{         |                                   | downloadCount (Num) |
|   fullName          |                                   | shareCount (Num)    |
|   email             |                                   | lastAccessed (Date) |
| }]                  |                                   | createdAt (Date)    |
| transactionId       |                                   | updatedAt (Date)    |
| paymentScreenshot   |                                   +---------------------+
|   (String, base64)  |
| createdAt (Date)    |
+---------------------+
```

### Schema Definitions

#### Registration Schema

```typescript
interface IRegistration {
  squadName: string;
  domain: string;
  leader: {
    fullName: string;
    email: string;
    phone: string;
    college: string;
  };
  members: Array<{
    fullName: string;
    email: string;
  }>;
  transactionId: string;
  paymentScreenshot: string;  // base64 data URI
  createdAt: Date;
}
```

**Mongoose Schema (`@/models/Registration.ts`):**
- All fields marked `required: true`
- `paymentScreenshot` stores complete base64 data URI (up to ~5MB)
- `members` array uses embedded subdocuments
- `createdAt` default: `Date.now`

#### Message Schema

```typescript
interface IMessage {
  name: string;
  email: string;
  contact: string;
  message: string;
  createdAt: Date;
}
```

**Mongoose Schema (`@/models/Message.ts`):**
- All fields as simple `String` types (no required constraints)
- Minimal schema — no validation at database level
- `createdAt` default: `Date.now`

#### Certificate Schema

```typescript
interface ICertificate {
  certificateNumber: string;   // unique, indexed
  name: string;
  product: string;
  email: string;               // indexed
  date: string;
  imageData?: string;          // optional base64
  status: 'generated' | 'downloaded' | 'shared';
  downloadCount: number;      // default: 0
  shareCount: number;         // default: 0
  lastAccessed: Date;         // default: Date.now
  createdAt: Date;
  updatedAt: Date;
}
```

**Mongoose Schema (`@/models/Certificate.ts`):**
- `timestamps: true` — automatic `createdAt` and `updatedAt`
- `toJSON` transform hides `_id` and `__v`, exposes `id`
- Pre-save hook updates `updatedAt`
- Status enum: `['generated', 'downloaded', 'shared']`

### Indexing Strategy

| Collection | Index | Type | Purpose |
|------------|-------|------|---------|
| `certificates` | `certificateNumber` | Unique | Prevent duplicate certificates |
| `certificates` | `email` | Standard | Fast email lookup |
| `certificates` | `{ email: 1, certificateNumber: 1 }` | Compound | Combined search optimization |
| `certificates` | `createdAt: -1` | Descending | Recent-first sorting |

### Missing Indexes (Critical Gaps)

| Collection | Missing Index | Impact |
|------------|-------------|--------|
| `registrations` | `domain` | Admin domain-filtered queries scan entire collection |
| `registrations` | `createdAt: -1` | Sorting by date scans all documents |
| `registrations` | `leader.email` | Cannot efficiently look up by leader email |
| `messages` | `email` | No efficient contact lookup |
| `messages` | `createdAt: -1` | Message chronology requires full scan |

### Optimization Opportunities

1. **Base64 Image Storage (`paymentScreenshot`)**
   - Current: Full base64 data URI stored in MongoDB document
   - Problem: 5MB+ documents bloat database, slow queries, high memory usage
   - Solution: Upload to S3/Cloudinary, store URL reference only

2. **No TTL (Time-To-Live) Indexes**
   - Old registrations, messages, and certificates accumulate forever
   - Solution: Add TTL indexes or scheduled cleanup jobs

3. **No Text Search Index**
   - Cannot perform full-text search on event descriptions or messages
   - Solution: Add MongoDB text indexes or integrate Atlas Search

4. **No Pagination**
   - `/api/admin/registrations` returns ALL documents
   - At scale, this will timeout and crash the admin page
   - Solution: Implement cursor-based pagination

5. **No Database Connection Pooling**
   - `connectToDatabase()` creates a global cache but does not configure pool size
   - Solution: Configure `maxPoolSize` in mongoose connection options

### Database Connection Configuration

```typescript
// @/lib/mongodb.ts
mongoose.connect(MONGODB_URI, {
  bufferCommands: false,
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 20000,
  family: 4,  // Force IPv4
});
```

**Strengths:**
- Global cache prevents duplicate connections during Next.js hot reload
- Aggressive timeouts prevent hanging requests
- IPv4 forcing fixes SRV ETIMEOUT on many networks
- Promise caching with reset on failure (retry support)

**Weaknesses:**
- No connection pool size limit
- No retry with exponential backoff
- No health check endpoint for DB status
- Connection string validated only at runtime (not build time)
