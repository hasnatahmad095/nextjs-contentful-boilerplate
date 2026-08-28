# Next.js + Contentful Headless CMS Boilerplate

A production-ready starter for building content-driven websites with Next.js and Contentful.

## Tech stack

- **Next.js 16** (Pages Router) with **React 19** and **Turbopack**
- **TypeScript** (strict mode)
- **Tailwind CSS 4** (CSS-first config)
- **ESLint 9** (flat config) + **Prettier** (with Tailwind class sorting)
- **Contentful GraphQL** content delivery, with Incremental Static Regeneration (ISR)

## Prerequisites

- Node.js 20.9+ (LTS recommended — see `.nvmrc`)
- A Contentful space with a Content Delivery API token (Preview token optional)

## Getting started

1. Install dependencies

```bash
npm install
```

2. Configure environment variables

Copy the example file and fill in your Contentful credentials:

```bash
cp .env.example .env.local
```

```env
CONTENTFUL_SPACE_ID=""
CONTENTFUL_ACCESS_TOKEN=""             # CDA (delivery) token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=""     # CPA (preview) token — optional
CONTENTFUL_PREVIEW_SECRET=""           # Guards draft/preview routes — optional
CONTENTFUL_REVALIDATE_SECRET=""        # Used for on-demand ISR — optional
```

> The Contentful image CDN (`images.ctfassets.net`) is already allow-listed in
> `next.config.ts`, so `next/image` works out of the box. Add any other image
> hosts to `images.remotePatterns` there.

3. Run the app

```bash
npm run dev
```

Visit http://localhost:3000

## Scripts

- `npm run dev` — Start the dev server (Turbopack)
- `npm run build` — Production build
- `npm run start` — Start the production server
- `npm run lint` — Lint with ESLint
- `npm run format` — Format the codebase with Prettier
- `npm run typecheck` — Type-check without emitting

## Contentful setup

This starter uses the Contentful GraphQL API. The sample queries (see
[`src/lib/contentful/api.ts`](src/lib/contentful/api.ts)) expect the following
example models/fields. Adjust the code or model IDs to match your space.

- **Post**
  - `posttitle` (Text)
  - `postslug` (Short text, unique)
  - `postimg` (Asset, image)

- **Header**
  - `title` (Text)
  - `description` (Text)
  - `allnews` (Reference, list of Post)

- **Banner** (used for the awards section in code)
  - `bannertitle` (Text)
  - `bannerdesc` (Text)

The data layer fails soft: if credentials are missing or a request fails, the
helpers return empty results instead of throwing, so the project still builds
and renders before you connect a real space.

## Project structure

- `src/pages/` — Routes (Pages Router)
- `src/components/` — Shared components (e.g. `Layout.tsx`)
- `src/lib/contentful/api.ts` — Typed GraphQL helpers (delivery or preview)
- `src/styles/globals.css` — Tailwind entry point and theme (`@theme`)
- `src/fonts/` — Local Montserrat font faces
- `next.config.ts` — Next.js config, including the image host allow-list
- `eslint.config.mjs` / `.prettierrc.json` — Lint & format config

## Draft mode and revalidation

- For draft/preview, set `CONTENTFUL_PREVIEW_ACCESS_TOKEN` and
  `CONTENTFUL_PREVIEW_SECRET`, and have your preview routes read that secret.
- For on-demand ISR, set `CONTENTFUL_REVALIDATE_SECRET`, expose a secure
  revalidation endpoint, and point a Contentful webhook at it. Pages already use
  `revalidate: 60` for time-based ISR. If you don't use ISR, you can ignore this.

## Deployment

- Recommended: Vercel. Add all environment variables to your project settings.
- Ensure `images.remotePatterns` in `next.config.ts` includes any external image
  hosts you use.

## Troubleshooting

- **Images not loading**: Confirm the host is listed in `images.remotePatterns`
  in `next.config.ts`.
- **401/403 from Contentful**: Verify your tokens and that you're using the
  correct API (Delivery vs Preview).
- **No data shown**: Ensure content exists in your space and the field IDs match
  the queries in `src/lib/contentful/api.ts`.

## License

MIT
