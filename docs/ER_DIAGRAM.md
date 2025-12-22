# ER Diagram — Core Entities (Draft)

This is a textual ER outline for the MVP. A formal diagram (draw.io / mermaid) can be created next.

Entities:

- User (id, name, email, role, hashed_password, created_at)
- Station (id, name, address, timezone, created_at)
- Pump (id, station_id, pump_number, status, created_at)
- Nozzle (id, pump_id, fuel_type, nozzle_number, price)
- Tank (id, station_id, fuel_type, capacity_liters, current_liters)
- Transaction (id, station_id, pump_id, nozzle_id, user_id, start_time, end_time, liters, unit_price, total_amount, payment_method, payment_token, receipt_id)
- Shift (id, station_id, user_id, start_time, end_time, totals)
- Telemetry (id, device_id, station_id, type, value, timestamp)

Relationships:
- Station has many Pumps
- Pump has many Nozzles
- Station has many Tanks
- User (cashier/manager) processes Transactions
- Telemetry is time-series; reference by station/device

Next: produce a visual ER diagram (mermaid) and JSON schema for each entity.
