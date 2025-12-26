import React, { useMemo, useState } from "react";
import {
  AlarmClock,
  BarChart3,
  ClipboardCheck,
  Droplets,
  FileDown,
  Fuel,
  Gauge,
  Layers3,
  LayoutDashboard,
  LineChart,
  NotebookTabs,
  Package,
  PieChart,
  ShoppingCart,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Fuel POS", icon: Fuel },
  { label: "Lube Shop (Bakhshali)", icon: Droplets },
  { label: "Inventory", icon: Gauge },
  { label: "Reports", icon: NotebookTabs },
];

const topCards = [
  {
    title: "Total Sales (PKR)",
    value: "PKR 6.82M",
    delta: "+11.4%",
    icon: Wallet,
  },
  {
    title: "Fuel Dispensed (Liters)",
    value: "24,680 L",
    delta: "+6.1%",
    icon: Fuel,
  },
  {
    title: "Cash in Hand",
    value: "PKR 985,000",
    delta: "+2.8%",
    icon: ShoppingCart,
  },
  {
    title: "Credit Outstanding",
    value: "PKR 1.32M",
    delta: "-3.2%",
    icon: BarChart3,
  },
];

const weeklySales = [
  { day: "Mon", value: 820 },
  { day: "Tue", value: 910 },
  { day: "Wed", value: 760 },
  { day: "Thu", value: 1020 },
  { day: "Fri", value: 1140 },
  { day: "Sat", value: 1280 },
  { day: "Sun", value: 970 },
];

const profitTrend = [38, 44, 52, 47, 60, 58, 65, 70];

const tankData = [
  {
    name: "Petrol Tank A",
    percent: 78,
    liters: "23,400 L",
    color: "bg-blue-500",
  },
  {
    name: "Diesel Tank B",
    percent: 32,
    liters: "9,850 L",
    color: "bg-orange-500",
  },
];

const oilProducts = [
  { name: "ZIC X7 10W-40", price: "PKR 3,200" },
  { name: "Shell Helix HX8", price: "PKR 4,600" },
  { name: "Guard Oil Filter", price: "PKR 850" },
  { name: "Caltex Havoline", price: "PKR 3,800" },
];

const activityFeed = [
  "Shift A closed · Variance PKR -3,000",
  "Tank-2 low stock alert triggered",
  "Credit limit updated · NLC Logistics",
  "POS terminal 2 synced successfully",
];

const quickActions = [
  { label: "New Fuel Sale", icon: Fuel },
  { label: "Raise Purchase Order", icon: Package },
  { label: "Close Shift", icon: ClipboardCheck },
  { label: "Send Reminder", icon: AlarmClock },
  { label: "Approve Credit", icon: ShieldCheck },
  { label: "New Customer", icon: Users },
];

const inventoryStats = [
  { label: "Total Stock", value: "33,250 L", tone: "text-blue-600" },
  { label: "Evaporation", value: "-0.42%", tone: "text-slate-500" },
  { label: "Low Stock Tanks", value: "1", tone: "text-orange-600" },
  { label: "Generator Usage", value: "120 L", tone: "text-emerald-600" },
];

const reportCards = [
  { title: "Daily Sales Report", meta: "Auto 6:00 PM", icon: FileDown },
  { title: "Nozzle Performance", meta: "Weekly summary", icon: Layers3 },
  { title: "Credit Aging", meta: "Real-time", icon: Users },
];

export default function App() {
  const [mileage, setMileage] = useState(45200);
  const nextDue = useMemo(() => mileage + 3000, [mileage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice via-white to-blue-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col justify-between bg-slateDeep/95 px-6 py-8 text-white lg:flex">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal text-lg font-semibold shadow-[0_12px_30px_rgba(37,99,235,0.45)]">
                MF
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
                  MOTORWAY
                </p>
                <p className="text-xs text-blue-200/70">Fuel Station Suite</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`nav-item w-full ${index === 0 ? "nav-item-active" : ""}`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="glass-card space-y-3 p-4 text-slate-900">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Cloud Status
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Online</span>
              <span className="chip">2 devices</span>
            </div>
            <p className="text-xs text-slate-500">Last backup 2 mins ago</p>
          </div>
        </aside>

        <main className="flex-1 px-6 pb-24 pt-8 lg:px-10">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-blue-600">
                Islamabad Motorway M-2
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                MOTORWAY FUEL STATION
              </h1>
              <p className="text-sm text-slate-500">
                Premium enterprise dashboard · Live shift A (08:00 - 16:00)
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="glass-card px-4 py-2 text-sm font-semibold text-slate-700">
                Download Report
              </button>
              <button className="rounded-2xl bg-royal px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)]">
                New Sale
              </button>
            </div>
          </header>

          <section className="mt-10 grid gap-4 lg:grid-cols-4">
            {topCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="metric-card">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-royal">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-600">
                      {card.delta}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {card.title}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">
                      {card.value}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      Updated 2 mins ago
                    </p>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  className="glass-card flex flex-col items-start gap-3 px-4 py-4 text-left transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(37,99,235,0.2)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-royal">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {action.label}
                  </span>
                  <span className="text-xs text-slate-500">Quick action</span>
                </button>
              );
            })}
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Weekly Sales</p>
                  <p className="text-xs text-slate-500">Bar chart · PKR (000s)</p>
                </div>
                <BarChart3 className="h-5 w-5 text-royal" />
              </div>
              <div className="mt-6 flex items-end gap-3">
                {weeklySales.map((item) => (
                  <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="h-28 w-full rounded-2xl bg-blue-100">
                      <div
                        className="w-full rounded-2xl bg-royal"
                        style={{ height: `${item.value / 13}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Profit Trends</p>
                  <p className="text-xs text-slate-500">Line chart · 8 weeks</p>
                </div>
                <LineChart className="h-5 w-5 text-royal" />
              </div>
              <div className="mt-6">
                <div className="relative h-28 w-full rounded-2xl bg-blue-50">
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 80">
                    <polyline
                      points={profitTrend
                        .map((value, index) => `${index * 28},${80 - value}`)
                        .join(" ")}
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>PKR 320k</span>
                <span>PKR 640k</span>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Live Tank Monitor</p>
                  <p className="text-xs text-slate-500">Underground storage status</p>
                </div>
                <Fuel className="h-5 w-5 text-royal" />
              </div>
              <div className="mt-6 space-y-5">
                {tankData.map((tank) => (
                  <div key={tank.name}>
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>{tank.name}</span>
                      <span>{tank.percent}% Full · {tank.liters}</span>
                    </div>
                    <div className="mt-3 h-3 w-full rounded-full bg-slate-100">
                      <div
                        className={`h-3 rounded-full ${tank.color}`}
                        style={{ width: `${tank.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="chip">Petrol: Blue</span>
                <span className="chip bg-orange-100 text-orange-600">Low Stock: Orange</span>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Operational Pulse</p>
                  <p className="text-xs text-slate-500">Alerts & quick actions</p>
                </div>
                <PieChart className="h-5 w-5 text-royal" />
              </div>
              <div className="mt-6 space-y-4">
                {activityFeed.map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="h-2 w-2 rounded-full bg-royal" />
                    {item}
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full rounded-2xl bg-royal/10 px-4 py-2 text-sm font-semibold text-royal">
                View All Alerts
              </button>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Fuel POS Snapshot</p>
                  <p className="text-xs text-slate-500">Live nozzle sales and payments</p>
                </div>
                <Fuel className="h-5 w-5 text-royal" />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs uppercase text-slate-500">Nozzle 03</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">4,120 L</p>
                  <p className="text-xs text-blue-600">PKR 1.12M revenue</p>
                </div>
                <div className="rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs uppercase text-slate-500">Cash vs Digital</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">62% / 38%</p>
                  <p className="text-xs text-slate-500">JazzCash + Cards</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip">Credit limit enforced</span>
                <span className="chip bg-emerald-100 text-emerald-700">Live POS sync</span>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Inventory Health</p>
                  <p className="text-xs text-slate-500">Real-time monitoring</p>
                </div>
                <Gauge className="h-5 w-5 text-royal" />
              </div>
              <div className="mt-5 space-y-3 text-sm">
                {inventoryStats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-slate-500">{stat.label}</span>
                    <span className={`font-semibold ${stat.tone}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full rounded-2xl bg-royal/10 px-4 py-2 text-sm font-semibold text-royal">
                Open Inventory Center
              </button>
            </div>
          </section>

          <section className="mt-10">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Motorway Oil Bakhshali
                </p>
                <p className="text-xs text-slate-500">
                  Dedicated lube shop module with premium service reminders.
                </p>
              </div>
              <span className="rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold text-amber-700">
                Premium Lube Bay
              </span>
            </div>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="glass-card p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  {oilProducts.map((product) => (
                    <div
                      key={product.name}
                      className="rounded-2xl border border-amber-100 bg-amber-50/80 p-4 text-sm text-slate-700"
                    >
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="mt-2 text-amber-700">{product.price}</p>
                      <button className="mt-4 w-full rounded-xl bg-amber-400/20 px-3 py-2 text-xs font-semibold text-amber-700">
                        Add to Service Bill
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Service Reminder</p>
                  <Droplets className="h-5 w-5 text-amber-600" />
                </div>
                <div className="mt-5 space-y-4 text-sm">
                  <div>
                    <label className="text-xs text-slate-500">Vehicle No</label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-4 py-2"
                      placeholder="LEB-2045"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Current Mileage</label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-4 py-2"
                      type="number"
                      value={mileage}
                      onChange={(event) => setMileage(Number(event.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500">Next Due Mileage</label>
                    <input
                      className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-4 py-2"
                      value={`${nextDue.toLocaleString()} km`}
                      readOnly
                    />
                  </div>
                </div>
                <button className="mt-6 w-full rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(245,158,11,0.35)]">
                  Schedule Reminder SMS
                </button>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Executive Reports</p>
                <p className="text-xs text-slate-500">
                  Export-ready reports for management and audit compliance.
                </p>
              </div>
              <button className="rounded-2xl bg-royal px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_28px_rgba(37,99,235,0.35)]">
                Generate All Reports
              </button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {reportCards.map((report) => {
                const Icon = report.icon;
                return (
                  <div key={report.title} className="glass-card p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-royal">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs text-slate-400">{report.meta}</span>
                    </div>
                    <p className="mt-4 text-sm font-semibold text-slate-900">
                      {report.title}
                    </p>
                    <button className="mt-4 w-full rounded-xl border border-blue-100 bg-white/70 px-3 py-2 text-xs font-semibold text-royal">
                      Export PDF
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      <nav className="fixed bottom-6 left-1/2 flex w-[90%] -translate-x-1/2 items-center justify-between rounded-[999px] bg-white/80 px-6 py-3 shadow-[0_20px_45px_rgba(15,23,42,0.15)] backdrop-blur-xl lg:hidden">
        <button className="flex flex-col items-center gap-1 text-xs text-slate-500">
          <LayoutDashboard className="h-5 w-5" />
          Home
        </button>
        <button className="flex flex-col items-center gap-1 text-xs text-slate-500">
          <Fuel className="h-5 w-5" />
          POS
        </button>
        <button className="flex flex-col items-center gap-1 rounded-full bg-royal px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_25px_rgba(37,99,235,0.4)]">
          New Sale
        </button>
        <button className="flex flex-col items-center gap-1 text-xs text-slate-500">
          <Gauge className="h-5 w-5" />
          Inventory
        </button>
        <button className="flex flex-col items-center gap-1 text-xs text-slate-500">
          <NotebookTabs className="h-5 w-5" />
          Reports
        </button>
      </nav>
    </div>
  );
}
