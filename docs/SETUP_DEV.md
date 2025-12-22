# Local Development — Postgres + Prisma

Steps to get the API running locally with a Postgres database.

1. Copy env file

   cp services/api/.env.example services/api/.env
   Edit `DATABASE_URL` and `JWT_SECRET` if needed.

2. Start Postgres + Adminer

   cd dev
   docker compose up -d

3. Install dependencies

   cd services/api
   npm ci

4. Generate Prisma client and run migrations

   npx prisma generate
   npx prisma migrate dev --name init

   (If you want a quick sync without creating a migration file: `npx prisma db push` — but prefer `migrate dev` for committed migrations.)

Environment variables useful for alerting
- `LOW_STOCK_THRESHOLD` (decimal fraction, e.g., `0.1`) — triggers an alert when remaining liters / capacity <= threshold
- `LOW_STOCK_LITERS` (integer) — trigger when remaining liters <= value

   npx prisma generate
   npx prisma migrate dev --name init

   (If you want a quick sync without creating a migration file: `npx prisma db push` — but prefer `migrate dev` for committed migrations.)

5. Start the API

   npm run dev

6. Open Adminer at http://localhost:8080 and connect with:
   - System: PostgreSQL
   - Server: host.docker.internal (or localhost)
   - Username: postgres
   - Password: postgres
   - Database: motorway

Notes:
- The first migration will create core tables for `Station`, `Pump`, etc. If you change the schema, create a new migration.
- For CI, add a step that runs `npx prisma migrate deploy` against the production DB and `npx prisma generate` before building the service.
