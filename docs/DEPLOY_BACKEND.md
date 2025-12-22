# Deploy the Backend (services/api)

This guide walks through deploying the Fastify + Prisma API to Render (recommended free-friendly option) or converting endpoints to serverless functions.

## Option A — Render (recommended)
1. Create a new Web Service in Render:
   - Connect your Git repo and pick the `services/api` folder as the root.
   - Build Command: `npm ci && npx prisma generate && npm run build`
   - Start Command: `npm start`
   - Set environment variables in Render:
     - `DATABASE_URL` — the Supabase Postgres connection string
     - `JWT_SECRET` — a secure random string
     - `NODE_ENV=production`
2. Migrations:
   - On first deploy, run `npx prisma migrate deploy` against the database (Render allows running one-off commands from the dashboard).

## Option B — Serverless (Vercel / Supabase Edge Functions)
- Converting the full Fastify app to serverless is non-trivial. For a small number of endpoints you can create serverless handlers under the frontend (`app/api` or `pages/api`) that proxy to the database or call internal services.
- If you use serverless, use **Prisma Data Proxy** or Supabase pooling to avoid connection limits.

## Run migrations (Render / one-off)
- After pointing `DATABASE_URL` to your production DB (Supabase), run migrations once:
  ```bash
  # from local machine with correct env vars
  cd services/api
  npx prisma generate
  npx prisma migrate deploy --schema=./prisma/schema.prisma
  ```
- On Render you can run a one-off command from the dashboard (or include `npx prisma migrate deploy` in a deploy hook).

## Recommended runtime & settings
- Node 20
- Add health checks for `/health` or `/api/health`
- Run `npx prisma generate` in build step

## Example env vars
- `DATABASE_URL` (from Supabase)
- `JWT_SECRET`
- Optional: `LOW_STOCK_THRESHOLD`, `LOW_STOCK_LITERS`

