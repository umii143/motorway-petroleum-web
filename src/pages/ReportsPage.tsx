import React from "react";
import { useStore } from "../store/StoreContext";
import { calculateProfit, stockValue } from "../utils/calculations";

export default function ReportsPage() {
  const { state } = useStore();
  const totalSales = state.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalCost = state.sales.reduce((sum, sale) => sum + sale.costAmount, 0);
  const profit = calculateProfit(state);
  const stockVal = stockValue(state);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-sm text-slate-500">Sales, stock, and ledger summaries.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="glass-card p-5">
          <p className="text-xs text-slate-500">Total Sales</p>
          <p className="text-xl font-semibold">PKR {totalSales.toLocaleString()}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-xs text-slate-500">Total Cost</p>
          <p className="text-xl font-semibold">PKR {totalCost.toLocaleString()}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-xs text-slate-500">Profit</p>
          <p className="text-xl font-semibold">PKR {profit.toLocaleString()}</p>
        </div>
        <div className="glass-card p-5">
          <p className="text-xs text-slate-500">Stock Value</p>
          <p className="text-xl font-semibold">PKR {stockVal.toLocaleString()}</p>
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold">Ledger Snapshot</h2>
        <p className="text-xs text-slate-500">Customers and suppliers balances.</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase text-slate-500">Customers</p>
            {state.customers.map((customer) => (
              <div key={customer.id} className="mt-2 rounded-2xl bg-white/70 p-3 text-sm">
                {customer.name} · PKR {customer.balance.toLocaleString()}
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs uppercase text-slate-500">Suppliers</p>
            {state.supplierLedgers.map((supplier) => (
              <div key={supplier.id} className="mt-2 rounded-2xl bg-white/70 p-3 text-sm">
                {supplier.name} · PKR {supplier.balance.toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
