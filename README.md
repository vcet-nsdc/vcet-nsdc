
# NSDC Next.js App

This is a [Next.js](https://nextjs.org) project for the NSDC, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and customized with TypeScript and TailwindCSS.

## Project Structure

```
src/
	app/
		layout.tsx        # Root layout with custom fonts and metadata
		page.tsx          # Home page with Next.js and Vercel links
		globals.css       # Global styles, TailwindCSS, and color variables
		events/           # Event-related routes (ongoing, past, upcoming)
		team/             # Team structure (BE, TE, Developers)
		home/, socials/, contact/  # Placeholder folders for future pages
	components/
		ui/               # (Currently empty, for UI components)
	model/              # (Currently empty, for data models)
	utils/              # (Currently empty, for utility functions)
public/
	*.svg, favicon.ico  # Static assets
```

## Main Features

- **Next.js 15** with the App Router
- **TypeScript** for type safety
- **TailwindCSS 4** for utility-first styling
- **Custom Google Fonts** (Geist, Geist Mono)
- **ESLint** for code linting

## Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

- `dev`   – Start the development server with Turbopack
- `build` – Build the app for production
- `start` – Start the production server
- `lint`  – Run ESLint

## Customization

- Edit `src/app/page.tsx` for the home page
- Add new routes/pages in `src/app/`
- Add components in `src/components/`
- Add styles in `src/app/globals.css`

## Dependencies

- next@15.5.2
- react@19.1.0
- react-dom@19.1.0
- tailwindcss@4
- typescript@5
- eslint@9

## Linting & Formatting

ESLint is configured with Next.js and TypeScript support. See `eslint.config.mjs` for details.

## Notes

- Most folders (components/ui, model, utils, events, team, etc.) are currently empty and ready for future development.
- The project uses the new Next.js App Router and custom font setup.

---

For more, see the [Next.js Documentation](https://nextjs.org/docs) and [TailwindCSS Documentation](https://tailwindcss.com/docs).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
