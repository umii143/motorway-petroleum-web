# MVP Specification — Motorway Petroleum Web (MVP)

## Overview
This document captures the Minimum Viable Product (MVP) scope for the Hyper Premium Fuel Station Management System. The MVP focuses on core capabilities to operate a single station and run a pilot deployment.

## User Roles
- **Admin** — full system access and configuration
- **Station Manager** — manage stations, pricing, staff, run reports
- **Cashier** — operate POS, take payments, close shifts
- **Technician** — monitor hardware, view telemetry, run maintenance

## Core Features (MVP)
- Station & pump registration
- Realtime pump status (idle, fueling, fault)
- POS flow: start fueling → authorize → pay (card or cash) → receipt
- Transaction ledger with receipts and exports (CSV)
- Inventory tracking (tank levels; manual entry + telemetry)
- Basic dashboard: daily sales, liters dispensed, active pumps
- Shift & employee management (clock-in/out, shift totals)
- Payment integration via a tokenized gateway (no PAN storage)
- Audit logs for transactions and admin actions

## Non-Functional Requirements
- TLS for all services
- RBAC for user roles
- Logging & basic monitoring
- Daily backups of DB
- Support for one-station pilot; scalable architecture

## Acceptance Criteria
- Cashier can start/stop a fuel session and complete a transaction with payment tokenized through the gateway
- Station Manager can view daily sales and tank levels
- System emits basic alerts (low tank level)

## Out-of-Scope for MVP (Phase 2+)
- Loyalty/CRM, advanced analytics, multi-station rollout, automated pricing rules, full offline POS replication

## Next Steps
1. Approve this MVP and pick the live pilot station
2. Design API and data model
3. Scaffold backend, frontend, and CI pipelines
