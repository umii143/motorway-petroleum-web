# PR: Add deploy docs & configs for Vercel + Supabase

This PR adds the following changes to make it easy to deploy the project using Vercel (frontend) and Supabase (Postgres), plus an option for self-hosting with Docker Compose:

- Add root `package.json` and `tsconfig.json` for the Next frontend
- Add `vercel.json` and `docs/DEPLOY_VERCEL_SUPABASE.md`
- Add `docs/DEPLOY_BACKEND.md`, `docs/DEPLOY_CHECKLIST.md` for backend deploy guidance and checklist
- Add `Dockerfile` (root) and `services/api/Dockerfile` and `docker-compose.prod.yml` for self-hosted deploys
- Minor package.json script to support `prisma migrate deploy`

Acceptance criteria:
- `npm ci` in root installs Next and frontend builds
- Documentation enables creating Vercel and Supabase projects and running migrations
- User can follow the docs to deploy the backend and frontend

