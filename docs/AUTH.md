# Authentication & RBAC

This document describes the simple auth system implemented for the API.

Endpoints
- POST /auth/register — create a user (defaults to `role: cashier`) with `email` and `password`.
- POST /auth/login — returns `{ token }` (JWT). Token payload contains `{ id, email, role }`.

Roles
- `admin` — full system access (create alerts, resolve alerts, create pumps/tanks, manage users)
- `manager` — can create pumps/tanks and resolve alerts
- `cashier` — can create transactions

Protecting endpoints
- Protected endpoints use route `preHandler` with role checks. Example protected routes: `POST /pumps`, `POST /tanks`, `POST /transactions` (requires token with `cashier|manager|admin`), `POST /alerts` and `POST /alerts/:id/resolve` (`admin|manager`).

Notes
- Passwords are hashed using `bcryptjs`.
- Tokens are JWTs signed with `JWT_SECRET`.
- This is a minimal RBAC implementation for the MVP; future improvements: user invite flows, password reset, 2FA, and account locking.
