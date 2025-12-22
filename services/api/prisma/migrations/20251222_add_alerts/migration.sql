-- Add alerts table

CREATE TABLE "Alert" (
  id TEXT PRIMARY KEY,
  stationId TEXT NOT NULL REFERENCES "Station"(id) ON DELETE CASCADE,
  tankId TEXT REFERENCES "Tank"(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  level TEXT DEFAULT 'warning',
  resolved BOOLEAN DEFAULT false,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT now(),
  resolvedAt TIMESTAMP WITH TIME ZONE
);
