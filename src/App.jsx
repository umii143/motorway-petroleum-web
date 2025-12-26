import React from "react";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Fuel,
  LayoutDashboard,
  LineChart,
  LogOut,
  Package,
  Settings,
  Users,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Transactions", icon: Fuel },
  { label: "Fuel Inventory", icon: Package },
  { label: "Sales Reports", icon: LineChart },
  { label: "Customers", icon: Users },
  { label: "Settings", icon: Settings },
  { label: "Logout", icon: LogOut },
];

const stats = [
  {
    label: "Total Sales (PKR)",
    value: "PKR 1,245,000",
    accent: "from-emerald-500 to-emerald-600",
  },
  {
    label: "Fuel Sold",
    value: "8,920 Liters",
    accent: "from-blue-500 to-blue-600",
  },
  {
    label: "Active Transactions",
    value: "24",
    accent: "from-orange-400 to-orange-500",
  },
  {
    label: "Station Status",
    value: "Operational",
    accent: "from-slate-700 to-slate-800",
  },
];

const quickActions = [
  { label: "Add New Transaction", icon: Fuel },
  { label: "Generate Report", icon: LineChart },
  { label: "View Inventory", icon: Package },
];

const fuelDistribution = [
  { label: "Petrol", value: 45, color: "bg-blue-500" },
  { label: "Diesel", value: 32, color: "bg-emerald-500" },
  { label: "Hi-Octane", value: 23, color: "bg-orange-400" },
];

const weeklyTrend = [40, 55, 42, 63, 48, 70, 64];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-ice to-blue-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col justify-between bg-slateDeep/95 px-6 py-8 text-white lg:flex">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal text-lg font-semibold shadow-[0_12px_30px_rgba(37,99,235,0.45)]">
                MF
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  MOTORWAY
                </p>
                <p className="text-xs text-blue-200/70">Fuel Station</p>
              </div>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`nav-item w-full ${item.active ? "nav-item-active" : ""}`}
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
              Manager on Duty
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Saad Ali</span>
              <span className="chip">Shift A</span>
            </div>
            <p className="text-xs text-slate-500">Last sync 2 mins ago</p>
          </div>
        </aside>

        <main className="flex-1 px-6 pb-24 pt-8 lg:px-12">
          <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-blue-600">
                Islamabad Motorway M-2
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500">
                Welcome back · Live operations overview for MOTORWAY Fuel Station
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="glass-card flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700">
                <CalendarDays className="h-4 w-4 text-blue-500" />
                Last 7 Days
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="relative rounded-2xl bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-royal"></span>
              </button>
              <div className="flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
                <div className="h-9 w-9 rounded-full bg-blue-100"></div>
                <div>
                  <p className="text-sm font-semibold">Owner View</p>
                  <p className="text-xs text-slate-500">Premium Access</p>
                </div>
              </div>
            </div>
          </header>

          <section className="mt-10 grid gap-4 lg:grid-cols-4">
            {stats.map((card) => (
              <div key={card.label} className="glass-card overflow-hidden">
                <div className={`h-2 w-full bg-gradient-to-r ${card.accent}`}></div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {card.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-900">
                    {card.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">Updated 2 mins ago</p>
                </div>
              </div>
            ))}
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Daily Sales Trend</p>
                  <p className="text-xs text-slate-500">Sales last 7 days (PKR)</p>
                </div>
                <LineChart className="h-5 w-5 text-royal" />
              </div>
              <div className="mt-6">
                <div className="relative h-48 rounded-2xl bg-blue-50">
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 240 120">
                    <defs>
                      <linearGradient id="trend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polyline
                      points={weeklyTrend
                        .map((value, index) => `${index * 34},${120 - value}`)
                        .join(" ")}
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3"
                    />
                    <polygon
                      points={`0,120 ${weeklyTrend
                        .map((value, index) => `${index * 34},${120 - value}`)
                        .join(" ")} 204,120`}
                      fill="url(#trend)"
                    />
                  </svg>
                </div>
                <div className="mt-4 flex justify-between text-xs text-slate-500">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <p className="text-sm font-semibold text-slate-900">Quick Actions</p>
              <p className="text-xs text-slate-500">Operations shortcuts</p>
              <div className="mt-5 space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      className="flex w-full items-center gap-3 rounded-2xl bg-white/80 px-4 py-3 text-left text-sm font-semibold text-slate-700 shadow-[0_12px_24px_rgba(15,23,42,0.08)] transition hover:-translate-y-1"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-royal">
                        <Icon className="h-5 w-5" />
                      </span>
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="glass-card p-6">
              <p className="text-sm font-semibold text-slate-900">Fuel Type Distribution</p>
              <p className="text-xs text-slate-500">Mix by fuel category</p>
              <div className="mt-6 space-y-4">
                {fuelDistribution.map((fuel) => (
                  <div key={fuel.label}>
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>{fuel.label}</span>
                      <span>{fuel.value}%</span>
                    </div>
                    <div className="mt-2 h-3 rounded-full bg-slate-100">
                      <div
                        className={`h-3 rounded-full ${fuel.color}`}
                        style={{ width: `${fuel.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <p className="text-sm font-semibold text-slate-900">Station Pulse</p>
              <p className="text-xs text-slate-500">Live operations status</p>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Nozzles active</span>
                  <span className="chip">7/8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cash in hand</span>
                  <span className="font-semibold">PKR 985,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Credit outstanding</span>
                  <span className="font-semibold">PKR 1.32M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tank low stock</span>
                  <span className="font-semibold text-orange-600">Diesel 32%</span>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <nav className="fixed bottom-6 left-1/2 flex w-[90%] -translate-x-1/2 items-center justify-between rounded-[999px] bg-white/90 px-6 py-3 shadow-[0_20px_45px_rgba(15,23,42,0.15)] backdrop-blur-xl lg:hidden">
        <button className="flex flex-col items-center gap-1 text-xs text-royal">
          <LayoutDashboard className="h-5 w-5" />
          Home
        </button>
        <button className="flex flex-col items-center gap-1 text-xs text-slate-500">
          <Fuel className="h-5 w-5" />
          Sales
        </button>
        <button className="flex flex-col items-center gap-1 rounded-full bg-royal px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_25px_rgba(37,99,235,0.4)]">
          New Sale
        </button>
        <button className="flex flex-col items-center gap-1 text-xs text-slate-500">
          <Package className="h-5 w-5" />
          Inventory
        </button>
        <button className="flex flex-col items-center gap-1 text-xs text-slate-500">
          <Users className="h-5 w-5" />
          Customers
        </button>
      </nav>
    </div>
  );
}
