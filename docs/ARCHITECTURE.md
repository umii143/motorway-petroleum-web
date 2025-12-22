# Architecture — Motorway Petroleum Web (High Level)

## Goals
- Modular services: API, IoT Gateway, Web Dashboard, Mobile POS
- Scalable, fault-tolerant design that can start small (single-node) and grow to Kubernetes
- Secure by default (TLS, RBAC, tokenized payments)

## Components
- **Web Dashboard (Next.js)** — Admin and long-form UIs
- **API (Fastify / Node.js or Go)** — Business logic, auth, data access
- **IoT Gateway** — MQTT / HTTP bridge to pumps and sensors
- **DB:** PostgreSQL (primary), Timescale for time-series telemetry
- **Realtime:** Redis Pub/Sub (or MQTT for device comms)
- **Queue:** RabbitMQ or Redis Streams for async tasks
- **Payments:** External gateway (Stripe/Adyen) with tokenization
- **Monitoring:** Prometheus + Grafana, Sentry for errors
- **Realtime events:** Alerts, pump, and tank events are emitted via Server-Sent Events (`/events`) for dashboard clients. For production, replace the in-memory emitter with Redis pub/sub or a managed streaming system for multi-instance scaling. 
- **Alerting:** Alerts stored in DB and surfaced to dashboards; future push via WebSocket/MQTT/email/SMS
- **CI/CD:** GitHub Actions → container registry → infra deploy (Terraform)

## Data Flow (Simplified)
1. Pump telemetry → IoT Gateway (MQTT) → Telemetry service → Time-series DB
2. Cashier starts session → API creates transaction → Gateway emits to pump → pump returns totals
3. Payment tokenization via gateway → API finalizes transaction → receipt generated

## Deployment Patterns
- Start with single-region PostgreSQL + single-node app containers
- Use Docker Compose for local + simple staging; move to K8s for production

## Simple ASCII Diagram

Web UI  <--->  API  <--->  Postgres
  ^            |
  |            v
 Mobile POS  IoT Gateway (MQTT) --> Telemetry DB
            

## Security Considerations
- No PAN storage. Use gateway tokenization.
- Mutual TLS for IoT Gateway to devices where possible.
- Role-based access control and detailed audit logs.

## Next Steps
- Produce ER diagram and OpenAPI spec
- Add small prototype API server and begin integration tests
