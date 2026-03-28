<p align="center">
  <img src="public/assests/white NSDC logo.png" alt="NSDC VCET banner" width="100%" />
</p>

<p align="center">
  <img src="public/assests/white%20NSDC%20logo.png" alt="NSDC VCET Logo" width="120" />
</p>

<p align="center">
  <a href="https://github.com/vcet-nsdc/vcet-nsdc">
    <img alt="repo" src="https://img.shields.io/badge/repo-vcet--nsdc%2Fvcet--nsdc-111827" />
  </a>
  <img alt="build" src="https://img.shields.io/badge/build-passing-brightgreen" />
  <a href="./LICENSE">
    <img alt="license" src="https://img.shields.io/badge/license-MIT-blue" />
  </a>
  <img alt="version" src="https://img.shields.io/badge/version-1.0.0-0ea5e9" />
</p>

# NSDC VCET Website

Official website for **National Students Data Corps (NSDC) – VCET**, a student-led data science community at **Vidyavardhini College of Engineering & Technology, Vasai**.

This repository powers the public site experience (home, team, events, socials, contact) plus operational flows like event registrations (with payment proof), an admin dashboard (with export), and certificate search/management.

**Live site:** https://vcet-nsdc.vercel.app  
**Repository:** https://github.com/vcet-nsdc/vcet-nsdc  
**Author (license holder):** Surajphirke3

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [API](#api)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- Landing page sections (hero, about, highlights, quick links)
- Events: upcoming, ongoing, and past events
- Team directory pages (BE/SE/TE, developers)
- Contact form that stores messages in MongoDB
- Registration flow:
  - Team/squad registration
  - Payment screenshot upload (stored as base64 in MongoDB)
  - Transaction ID tracking
- Admin endpoints protected with HTTP Basic Auth:
  - View registrations (with domain filter)
  - Export registrations to Excel (.xlsx)
  - View payment screenshots by registration ID
- Certificates API:
  - Search certificates by email
  - Create, update (download/share tracking), and delete certificates

## Tech Stack

- **Next.js (App Router)** + **React**
- **TypeScript**
- **Tailwind CSS**
- **MongoDB** + **Mongoose**
- **React Hook Form** + **Zod** (forms & validation)
- **Framer Motion** (animation)
- **xlsx** and **jsPDF** (exports/reporting utilities)

## Prerequisites

- Node.js 18.18+ (or newer)
- npm (comes with Node.js)
- A MongoDB instance (local or cloud)

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/vcet-nsdc/vcet-nsdc.git
   cd vcet-nsdc
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a local environment file

   ```bash
   # .env.local
   MONGODB_URI="mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority"

   # Recommended (admin API protection)
   ADMIN_USERNAME="your-admin-username"
   ADMIN_PASSWORD="your-admin-password"

   # Optional
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_API_URL="/api"
   GOOGLE_SITE_VERIFICATION=""
   LOGGING_ENDPOINT=""
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Open the app

   - http://localhost:3000

## Usage

### Common scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### Registration (UI)

- Go to `/register`
- Fill in squad/team details
- Upload a payment screenshot
- Submit to create a registration entry in MongoDB

### Admin (API)

Admin endpoints under `/api/admin/*` require HTTP Basic Auth.

Example: generate the Basic token

```bash
node -e "console.log(Buffer.from(process.env.U+':'+process.env.P).toString('base64'))"
```

Then use it as:

```bash
curl -H "Authorization: Basic <base64(username:password)>" http://localhost:3000/api/admin/registrations
```

## Screenshots

If you don’t have your own screenshots yet, you can start with the included assets:

- Banner: `public/assests/final.png`
- Sample imagery: `public/assests/image.png`, `public/assests/techblitz.jpeg`

Example embed:

![NSDC VCET banner](public/assests/final.png)

## API

Base URL (local): `http://localhost:3000`  
Base path: `/api`

### POST /api/register

Creates a registration record from multipart form data.

Required form fields:

- `squadName` (string)
- `domain` (string)
- `leaderFullName` (string)
- `leaderEmail` (string)
- `leaderPhone` (string)
- `leaderCollege` (string)
- `transactionId` (string)
- `paymentScreenshot` (file, max 5MB)
- Optional members:
  - `member2FullName`, `member2Email`
  - `member3FullName`, `member3Email`

Example:

```bash
curl -X POST "http://localhost:3000/api/register" \
  -F "squadName=Team Alpha" \
  -F "domain=AI/ML" \
  -F "leaderFullName=Jane Doe" \
  -F "leaderEmail=jane@example.com" \
  -F "leaderPhone=9999999999" \
  -F "leaderCollege=VCET" \
  -F "transactionId=TXN123" \
  -F "paymentScreenshot=@./payment.jpeg"
```

### POST /api/contact

Stores a contact message in MongoDB.

Body (JSON):

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "contact": "9999999999",
  "message": "Hello NSDC!"
}
```

Example:

```bash
curl -X POST "http://localhost:3000/api/contact" \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","contact":"9999999999","message":"Hello NSDC!"}'
```

### GET /api/certificates?email=...

Searches the latest certificate by email.

Example:

```bash
curl "http://localhost:3000/api/certificates?email=jane@example.com"
```

### POST /api/certificates

Creates a new certificate.

Body (JSON):

```json
{
  "certificateNumber": "NSDC-2026-0001",
  "name": "Jane Doe",
  "product": "Techblitz",
  "email": "jane@example.com",
  "date": "2026-03-28"
}
```

### GET /api/certificates/:id

Fetches a certificate by MongoDB document ID.

### PUT /api/certificates/:id

Updates a certificate (download/share tracking) and optionally stores `imageData`.

Body (JSON):

```json
{ "action": "download" }
```

```json
{ "action": "share", "imageData": "data:image/png;base64,..." }
```

### DELETE /api/certificates/:id

Deletes a certificate by ID.

### GET /api/admin/registrations?domain=...

Returns registrations (excluding the screenshot blob). Requires Basic Auth.

- `domain` (optional): domain name, or `all`

Example:

```bash
curl -H "Authorization: Basic <token>" "http://localhost:3000/api/admin/registrations?domain=all"
```

### GET /api/admin/export?domain=...

Downloads an Excel export of registrations. Requires Basic Auth.

Example:

```bash
curl -L -H "Authorization: Basic <token>" "http://localhost:3000/api/admin/export?domain=all" --output registrations.xlsx
```

### GET /api/admin/screenshot/:id

Serves the stored payment screenshot for a registration. Requires Basic Auth.

Notes:

- You can also pass `?auth=<base64(username:password)>` for convenience when opening in a new tab.

## Configuration

Environment variables:

- `MONGODB_URI` (required): MongoDB connection string used by the API routes
- `ADMIN_USERNAME` (recommended): Basic Auth username for `/api/admin/*`
- `ADMIN_PASSWORD` (recommended): Basic Auth password for `/api/admin/*`
- `NEXT_PUBLIC_APP_URL` (optional): public app URL used for metadata/config
- `NEXT_PUBLIC_API_URL` (optional): API base URL (defaults to `/api`)
- `GOOGLE_SITE_VERIFICATION` (optional): Google Search Console verification token
- `LOGGING_ENDPOINT` (optional): remote logging endpoint (used in production)

## Folder Structure

```
.
├─ public/
│  ├─ assests/            # Images and logos
│  ├─ staticdata/         # JSON data used by pages/components
│  └─ uploads/            # Uploaded files (if used by older flows)
├─ src/
│  ├─ app/                # Next.js App Router pages + API routes
│  ├─ components/         # UI and feature components
│  ├─ data/               # Local TS data sources
│  ├─ hooks/              # Reusable hooks
│  ├─ lib/                # Shared utilities (db, auth, config)
│  ├─ models/             # Mongoose models
│  └─ types/              # Shared TypeScript types
└─ package.json
```

## Roadmap

- Add GitHub Actions CI (build, lint, typecheck) and replace the build badge with a workflow badge
- Add integration tests for API routes (registration, admin export, certificates)
- Add rate limiting for public APIs (contact/register) to reduce spam/abuse
- Add admin UI improvements (search, pagination, export filters)
- Improve observability (structured logs + production monitoring)

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, workflow, and guidelines.

## License

Licensed under the MIT License. See [LICENSE](./LICENSE).

## Acknowledgements

- NSDC VCET community and contributors
- Vidyavardhini College of Engineering & Technology (VCET), Vasai
- Next.js, React, Tailwind CSS, and the open-source ecosystem powering the project
