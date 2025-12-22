# Deploy the API to Render (recommended free-friendly host)

This guide shows how to connect the `services/api` service to Render and run migrations safely.

1. Create a Render account and new Web Service
   - Import your GitHub repo and select the `services/api` folder as the service root.
   - Use the `render.yaml` manifest (already added) or configure these fields manually:
     - Environment: Node
     - Plan: Free (Hobby)
     - Branch: main
     - Build command: `npm ci && npx prisma generate && npm run build`
     - Start command: `npm start`

2. Set environment variables
   - `DATABASE_URL` = your Supabase Postgres connection string
   - `JWT_SECRET` = secure random string

3. Migrations
   - On the first deploy, run the CI workflow (Actions > Run workflow) or use the Render dashboard to run a one-off command:
     ```bash
     cd services/api
     npx prisma generate
     npx prisma migrate deploy --schema=./prisma/schema.prisma
     ```
   - After initial migration, the GitHub Action `prisma-migrate.yml` will automatically apply migrations on pushes to `main`.

4. Confirm health
   - Visit `https://<your-render-service>.onrender.com/health` to confirm the service is up.

Notes
- If you ever convert to serverless, use Prisma Data Proxy or Supabase pooling to avoid connection limits.
- For production, use a managed DB with backups (Supabase provides backups on paid plans).
