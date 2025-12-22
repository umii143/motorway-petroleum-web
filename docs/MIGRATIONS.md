# Migrations — Prisma

Guidelines for creating and applying schema migrations.

Local development
1. Update `services/api/prisma/schema.prisma` with your changes.
2. Run:

   cd services/api
   npx prisma generate
   npx prisma migrate dev --name <migration_name>

This will create a new migration under `prisma/migrations` and apply it to your local dev DB.

If you prefer to iterate quickly without committing migrations during local development, you can use `npx prisma db push` to sync the schema to your local DB, but rely on committed migrations for production and CI workflows.

CI and production
- The CI workflow currently runs `npx prisma generate` to ensure client generation.
- For integration tests in CI we use `npx prisma db push` to apply the schema to the ephemeral test DB (this avoids having to commit migrations for test-only setups). For production and controlled deployments, prefer `npx prisma migrate deploy` and committed migrations instead.
- To run migrations in CI or during deploy (production), run:

  npx prisma migrate deploy

- For production deploys, run `prisma generate` before building the service, and run `prisma migrate deploy` with a DB user that can apply schema changes (or run migrations as part of a controlled deployment step).

Notes
- Keep migrations small and well-documented.
- Review migration SQL in `prisma/migrations` before applying to production.
- Backup production DB before applying migrations.
