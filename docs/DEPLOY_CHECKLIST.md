# Deploy Checklist

Basic checklist to run before exposing the app to customers:

- [ ] Use a managed Postgres DB (Supabase / RDS / Managed) with daily backups
- [ ] Apply migrations with `npx prisma migrate deploy`
- [ ] Add `JWT_SECRET` and other secrets to your host's environment settings
- [ ] Configure TLS (Vercel provides this automatically)
- [ ] Configure connection pooling for serverless DB access (Supabase pooling or Prisma Data Proxy)
- [ ] Set up logging/monitoring (Sentry, LogRocket, Datadog or Render logs)
- [ ] Add a health check endpoint and uptime monitor (UptimeRobot)
- [ ] Load test critical flows if you expect non-trivial traffic

