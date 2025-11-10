# OpsBoard Pro

OpsBoard Pro is a production-style **B2B dashboard / admin panel** starter built for a personal portfolio or live Vercel demo.

It uses:
- **Next.js 16 App Router**
- **Auth.js** credentials login
- **Prisma ORM 7**
- **Hosted Postgres** (recommended: Neon or Vercel Postgres)
- **Role-aware multi-tenant SaaS structure**
- **Customers, invoices, tickets, team, audit logs, feature flags, API keys, webhooks, and AI insights**

## Why this version is better

The previous SQLite-based build was awkward for Vercel. Vercel does not support SQLite for persistent serverless production use, so this version is rebuilt around hosted Postgres instead. That makes it much more believable as a real SaaS personal project and much easier to deploy on a free Vercel account. citeturn898836search5turn427473view2

Prisma 7 changed how clients are generated and configured: the new `prisma-client` generator requires a custom `output`, datasource URLs move to `prisma.config.ts`, and direct database access now uses a driver adapter such as `@prisma/adapter-pg`. citeturn427473view2

Auth.js’s current Next.js docs recommend a root-level `auth.ts` file and `next-auth@beta` for the latest setup, with `proxy.ts` replacing `middleware.ts` in Next.js 16. citeturn427473view0turn427473view1turn898836search8

## Demo credentials

- **Email:** `owner@opsboard.dev`
- **Password:** `demo1234`

## Local setup

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

On Windows PowerShell use:

```powershell
copy .env.example .env
```

## Recommended deployment stack

- **Database:** Neon Postgres or Vercel Postgres
- **Hosting:** Vercel Hobby

Prisma’s current upgrade guide shows Prisma 7 direct connections using `@prisma/adapter-pg`, and their Auth.js + Next.js guide uses Prisma Postgres in an App Router app. citeturn427473view2turn427473view3

## Vercel deployment steps

1. Push the repo to GitHub.
2. Create a hosted Postgres database and copy the direct `postgres://...` URL.
3. Import the repo into Vercel.
4. Add `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `DEMO_EMAIL`, and `DEMO_PASSWORD` to Vercel env vars.
5. Seed the database before launch.
6. Redeploy.

## Good next upgrades

1. Add organization switching.
2. Add edit/delete flows.
3. Add invite-member flow.
4. Add search, filters, pagination, and saved views.
5. Add a real AI integration on the insights page.
6. Add tests and GitHub Actions.
7. Add screenshots and a short architecture diagram.

## References

- Auth.js installation and root `auth.ts` guidance. citeturn427473view0
- NextAuth.js v5 migration notes, including `next-auth@beta` and Next.js 16 `proxy.ts`. citeturn427473view1
- Prisma ORM 7 upgrade guide: custom client output, `prisma.config.ts`, and driver adapters. citeturn427473view2
- Prisma guide for Auth.js + Next.js + Prisma Postgres. citeturn427473view3
- Next.js latest docs and deployment guidance. citeturn898836search8turn898836search5turn898836search17


## Latest refresh

- fixed the demo login flow by moving the credentials submit UX to a client component with loading and error states
- refreshed the overall UI with a brighter SaaS-style shell, cleaner cards, and a more polished auth page
- kept the existing multi-tenant data model and API surfaces so the project remains deployable as a portfolio demo


## Common local fixes

- If the UI looks unstyled, run `npm install` again after pulling this update so `@tailwindcss/postcss` is installed. Tailwind v4 needs that PostCSS plugin.
- If login rejects the demo user, run `npm run db:seed` again and confirm `.env` points to the same database your app uses.


## Development Notes

See `docs/devlog.md` and `docs/history/` for a summarized development journal.

<!-- history:047 2025-03-01 -->
<!-- history:065 2025-03-22 -->
<!-- history:069 2025-03-27 -->
<!-- history:079 2025-04-08 -->
<!-- history:147 2025-06-28 -->
<!-- history:179 2025-08-06 -->
<!-- history:188 2025-08-16 -->
<!-- history:190 2025-08-19 -->
<!-- history:240 2025-10-18 -->
<!-- history:242 2025-10-21 -->
<!-- history:252 2025-11-02 -->
<!-- history:253 2025-11-03 -->
<!-- history:259 2025-11-10 -->