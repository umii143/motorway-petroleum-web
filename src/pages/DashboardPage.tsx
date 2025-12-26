import React, { useState } from "react";
import { LineChart, AlertTriangle } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { calculateProfit, computeAlerts, dailySales, stockValue } from "../utils/calculations";

export default function DashboardPage() {
  const { state, dispatch } = useStore();
  const today = new Date().toISOString().slice(0, 10);
  const todaySales = dailySales(state, today);
  const totalSales = todaySales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalLiters = todaySales.reduce((sum, sale) => sum + sale.liters, 0);
  const profit = calculateProfit(state);
  const alerts = computeAlerts(state);
  const stockVal = stockValue(state);
  const [stationName, setStationName] = useState(state.station.name);
  const [stationLocation, setStationLocation] = useState(state.station.location);
  const [stationPhone, setStationPhone] = useState(state.station.phone);

  const handleStationSave = () => {
    dispatch({
      type: "UPDATE_STATION",
      payload: { name: stationName, location: stationLocation, phone: stationPhone },
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.25em] text-blue-600">
          Islamabad Motorway M-2
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Daily overview with profit/loss and operational alerts.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-4">
        <div className="glass-card p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Total Sales</p>
          <p className="mt-3 text-2xl font-semibold">PKR {totalSales.toLocaleString()}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Fuel Dispensed</p>
          <p className="mt-3 text-2xl font-semibold">{totalLiters.toLocaleString()} L</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Cash in Hand</p>
          <p className="mt-3 text-2xl font-semibold">PKR {state.cashbookBalance.toLocaleString()}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Profit / Loss</p>
          <p className="mt-3 text-2xl font-semibold">PKR {profit.toLocaleString()}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Profit Trend</p>
              <p className="text-xs text-slate-500">Rolling 7 days</p>
            </div>
            <LineChart className="h-5 w-5 text-royal" />
          </div>
          <div className="mt-6 h-40 rounded-2xl bg-blue-50"></div>
          <p className="mt-3 text-xs text-slate-500">Stock value: PKR {stockVal.toLocaleString()}</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Alerts</p>
            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>
          <div className="mt-4 space-y-3">
            {alerts.length === 0 && (
              <p className="text-sm text-slate-500">No alerts.</p>
            )}
            {alerts.map((alert) => (
              <div key={alert} className="rounded-xl bg-white/70 p-3 text-sm">
                {alert}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card p-6 space-y-3">
          <h2 className="text-sm font-semibold">Station Profile</h2>
          <input
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={stationName}
            onChange={(event) => setStationName(event.target.value)}
            placeholder="Station name"
          />
          <input
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={stationLocation}
            onChange={(event) => setStationLocation(event.target.value)}
            placeholder="Location"
          />
          <input
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={stationPhone}
            onChange={(event) => setStationPhone(event.target.value)}
            placeholder="Phone"
          />
          <button
            className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
            onClick={handleStationSave}
          >
            Save Profile
          </button>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-sm font-semibold">Financial Snapshot</h2>
          <p className="text-xs text-slate-500">Live totals from transactions</p>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Total sales</span>
              <span className="font-semibold">PKR {totalSales.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total cost</span>
              <span className="font-semibold">
                PKR {state.sales.reduce((sum, sale) => sum + sale.costAmount, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Expenses</span>
              <span className="font-semibold">
                PKR {state.expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Profit</span>
              <span className="font-semibold text-emerald-600">
                PKR {profit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
