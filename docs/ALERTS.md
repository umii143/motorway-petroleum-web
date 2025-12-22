# Alerts & Alerting

This document describes the alert model and endpoints.

Model
- **Alert** (id, stationId, tankId?, type, message, level: warning|critical, resolved, createdAt, resolvedAt)

Endpoints
- GET /alerts — list alerts (most recent first)
- POST /alerts — create alert (typically used internally; requires `stationId`, `type`, `message`)
- POST /alerts/{id}/resolve — mark an alert resolved and set `resolvedAt`

Behavior
- Alerts are created automatically for low stock when transactions reduce a tank below configured thresholds.
- Config: `LOW_STOCK_THRESHOLD` (fraction, default 0.1) and `LOW_STOCK_LITERS` (absolute liters)

Next steps
- Add alert subscriptions / websocket push for realtime dashboards and SMS/email integrations. Current implementation provides a simple in-memory Server-Sent Events (`/events`) endpoint that emits `alert.created` and `alert.resolved` events; for production, replace with Redis pub/sub or a managed streaming system.
