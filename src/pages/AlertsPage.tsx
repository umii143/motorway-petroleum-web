import React from "react";
import { useStore } from "../store/StoreContext";
import { computeAlerts } from "../utils/calculations";

export default function AlertsPage() {
  const { state } = useStore();
  const alerts = computeAlerts(state);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Alerts Engine</h1>
        <p className="text-sm text-slate-500">Low stock, credit limits, and shift mismatches.</p>
      </header>

      <div className="glass-card p-6">
        {alerts.length === 0 ? (
          <p className="text-sm text-slate-500">No active alerts.</p>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert} className="rounded-2xl bg-white/70 p-4 text-sm">
                {alert}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
