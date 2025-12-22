# Deploy: Vercel (frontend) + Supabase (Postgres) — Quick Guide

This guide shows the recommended free long-term setup: Frontend on **Vercel** and database on **Supabase**. The backend can be deployed to Render / Fly / Railway or kept as serverless (see `DEPLOY_BACKEND.md`).

## Overview
- Frontend: Vercel — automatic builds from Git, SSL, CDN, preview deployments. Uses Next app in `App/`.
- Database: Supabase — managed Postgres (free tier), includes pooling and connection string you can use from the backend.
- Backend: Deploy `services/api` to any host (instructions: `docs/DEPLOY_BACKEND.md`).

## Steps

1. Create a Supabase project
   - Sign in at https://supabase.com and create a new project.
   - Copy the Postgres connection string (`DATABASE_URL`) from the Project Settings > Database > Connection string.

2. Create a Vercel project
   - Go to https://vercel.com and create a project from your Git repo (connect GitHub/GitLab/Bitbucket).
   - Vercel detects Next.js and will use `npm run build` by default.

3. Add environment variables to Vercel
   - In your Vercel project, open Settings > Environment Variables and add:
     - `NEXT_PUBLIC_API_BASE_URL` -> `https://your-backend.example.com` (or leave blank if backend is serverless on Vercel)
     - `JWT_SECRET` -> a secure random string (same as used by your backend)
     - Any other necessary envs for the frontend.

4. Deploy the backend (recommended: Render)
   - Deploy steps are in `docs/DEPLOY_BACKEND.md`. Point `DATABASE_URL` to the Supabase connection string.
   - Ensure the backend's `JWT_SECRET` matches the value set in Vercel.

5. Run migrations on the Supabase DB
   - From your local machine or CI, run:
     ```bash
     cd services/api
     npx prisma generate
     npx prisma migrate deploy --schema=./prisma/schema.prisma
     ```
   - When using Render, you can run a one-off deploy command or include `npx prisma migrate deploy` in a deploy hook.

6. Confirm everything is working
   - Visit your Vercel deployment URL; the frontend should perform API calls to the `NEXT_PUBLIC_API_BASE_URL` backend.

## Notes & Tips
- If you use serverless backends (Vercel Serverless / Supabase Functions), use a connection pooling solution (Supabase pooling or Prisma Data Proxy) to avoid exhausting Postgres connections.
- Keep secrets out of source control. Use Vercel and Render env var settings.
- Add monitoring and back ups for production DB.

