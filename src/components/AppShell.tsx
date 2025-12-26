import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  AlertTriangle,
  BarChart3,
  CreditCard,
  Fuel,
  Home,
  Package,
  Settings,
  Users,
  Wallet,
  Bell,
  ChevronDown,
} from "lucide-react";
import { useStore } from "../store/StoreContext";

const navSections = [
  {
    title: "Core",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: Home },
      { label: "Fuel POS", to: "/fuel-pos", icon: Fuel },
      { label: "Tuck Shop", to: "/tuck-shop", icon: Package },
      { label: "Lube Shop", to: "/lube-shop", icon: Package },
      { label: "Shifts", to: "/shifts", icon: Users },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Inventory", to: "/inventory", icon: Package },
      { label: "Credits", to: "/credits", icon: CreditCard },
      { label: "Cashbook", to: "/cashbook", icon: Wallet },
      { label: "Bank", to: "/bank", icon: Wallet },
      { label: "Prices", to: "/prices", icon: Settings },
      { label: "Employees", to: "/employees", icon: Users },
    ],
  },
  {
    title: "Insights",
    items: [
      { label: "Reports", to: "/reports", icon: BarChart3 },
      { label: "Alerts", to: "/alerts", icon: AlertTriangle },
    ],
  },
];

const mobileNav = [
  { label: "Home", to: "/dashboard", icon: Home },
  { label: "POS", to: "/fuel-pos", icon: Fuel },
  { label: "Inventory", to: "/inventory", icon: Package },
  { label: "Reports", to: "/reports", icon: BarChart3 },
  { label: "Alerts", to: "/alerts", icon: AlertTriangle },
];

export default function AppShell() {
  const { resetDemo, state } = useStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-ice to-blue-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col justify-between bg-slateDeep/95 px-6 py-8 text-white lg:flex">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-royal text-lg font-semibold shadow-[0_12px_30px_rgba(37,99,235,0.45)]">
                MF
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  MOTORWAY
                </p>
                <p className="text-xs text-blue-200/70">{state.station.name || "Fuel Station"}</p>
              </div>
            </div>
            <nav className="space-y-6">
              {navSections.map((section) => (
                <div key={section.title} className="space-y-2">
                  <p className="px-2 text-xs uppercase tracking-[0.2em] text-blue-200/70">
                    {section.title}
                  </p>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `nav-item ${isActive ? "nav-item-active" : ""}`
                        }
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </NavLink>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>
          <div className="glass-card space-y-3 p-4 text-slate-900">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Demo Controls
            </p>
            <button
              className="w-full rounded-xl bg-royal px-3 py-2 text-xs font-semibold text-white"
              onClick={resetDemo}
            >
              Reset Seed Data
            </button>
          </div>
        </aside>
        <main className="flex-1 px-6 pb-28 pt-6 lg:px-12 lg:pt-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 lg:hidden">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-blue-600">
                {state.station.location || "Station Control"}
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {state.station.name || "MOTORWAY Fuel Station"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="glass-card flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600">
                Today <ChevronDown className="h-4 w-4" />
              </button>
              <button className="relative rounded-2xl bg-white/80 p-2 text-slate-600 shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-royal"></span>
              </button>
            </div>
          </div>
          <Outlet />
        </main>
      </div>

      <nav className="fixed bottom-5 left-1/2 z-20 flex w-[92%] -translate-x-1/2 items-center justify-between rounded-[999px] bg-white/90 px-5 py-3 shadow-[0_20px_45px_rgba(15,23,42,0.18)] backdrop-blur-xl lg:hidden">
        {mobileNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-[11px] ${
                  isActive ? "text-royal" : "text-slate-500"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
