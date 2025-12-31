# Next.js + Contentful Headless CMS Boilerplate

A production‑ready starter to build content‑driven websites using Next.js and Contentful.

## Tech stack
- **Next.js 14** (React 18)
- **Tailwind CSS** with PostCSS/Autoprefixer
- **ESLint** + **Prettier** (with Tailwind plugin)
- Useful UI libs: **AOS**, **Swiper**, **react-icons**

## Prerequisites
- Node.js 18.17+ (LTS recommended)
- A Contentful space with Content Delivery and (optionally) Preview API tokens

## Getting started
1) Install dependencies

```bash
npm install
```

2) Configure environment variables

Create and fill `.env` (or `.env.local` for local only):

```env
CONTENTFUL_SPACE_ID=""
CONTENTFUL_ACCESS_TOKEN=""                 # CDA (delivery) token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=""         # CPA (preview) token, optional
CONTENTFUL_PREVIEW_SECRET=""               # Used for draft/preview routes (if enabled)
CONTENTFUL_REVALIDATE_SECRET=""            # Used for on-demand ISR (if enabled)
```

3) Allow Contentful image domain (important)

Update `next.config.mjs` to include Contentful Images CDN so Next Image can load assets:

```js
images: {
  domains: ["images.ctfassets.net"],
},
```

4) Run the app

```bash
npm run dev
```

Visit http://localhost:3000

## Scripts
- `npm run dev` — Start Next.js in development
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Lint with ESLint

## Contentful setup
This starter uses Contentful GraphQL API. Provide your space ID and tokens as shown above.

The sample queries (see `src/lib/contentful/api.js`) expect the following example models/fields in your space. You can adjust code or model IDs to match your setup.

- **Post**
  - `posttitle` (Text)
  - `postslug` (Short text, unique)
  - `postimg` (Asset, image)

- **Header**
  - `title` (Text)
  - `description` (Text)
  - `allnews` (Reference, list of Post)

- **Banner** (used for awards section in code)
  - `bannertitle` (Text)
  - `bannerdesc` (Text)

You can rename fields, but then update the queries in `src/lib/contentful/api.js` accordingly.

## Project structure highlights
- `src/lib/contentful/api.js` — GraphQL helpers to fetch entries (delivery or preview)
- `next.config.mjs` — Next.js config, including images domain allowlist
- `tailwind.config.js` / `postcss.config.js` — Styling pipeline

## Draft mode and revalidation
- If you plan to use draft/preview, ensure `CONTENTFUL_PREVIEW_ACCESS_TOKEN` and `CONTENTFUL_PREVIEW_SECRET` are set and that your preview routes read that secret.
- If you use on‑demand ISR, set `CONTENTFUL_REVALIDATE_SECRET` and configure a secure revalidation endpoint and Contentful webhook. If you don’t use ISR, you can ignore this.

## Deployment
- Recommended: Vercel. Add all environment variables to your project on Vercel.
- Ensure `images.domains` includes any external image hosts (e.g., `images.ctfassets.net`).

## Troubleshooting
- **Images not loading**: Add `images.ctfassets.net` to `next.config.mjs` `images.domains`.
- **401/403 from Contentful**: Verify tokens and that you’re using the correct API (Delivery vs Preview).
- **No data shown**: Ensure content exists in your space and the field IDs match the queries.

## License
MIT

