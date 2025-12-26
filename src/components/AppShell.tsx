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
} from "lucide-react";
import { useStore } from "../store/StoreContext";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Fuel POS", to: "/fuel-pos", icon: Fuel },
  { label: "Tuck Shop", to: "/tuck-shop", icon: Package },
  { label: "Lube Shop", to: "/lube-shop", icon: Package },
  { label: "Shifts", to: "/shifts", icon: Users },
  { label: "Inventory", to: "/inventory", icon: Package },
  { label: "Credits", to: "/credits", icon: CreditCard },
  { label: "Cashbook", to: "/cashbook", icon: Wallet },
  { label: "Bank", to: "/bank", icon: Wallet },
  { label: "Prices", to: "/prices", icon: Settings },
  { label: "Employees", to: "/employees", icon: Users },
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
            <nav className="space-y-2">
              {navItems.map((item) => {
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
        <main className="flex-1 px-6 pb-24 pt-8 lg:px-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
