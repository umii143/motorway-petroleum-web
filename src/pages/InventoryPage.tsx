import React, { useState } from "react";
import { useStore } from "../store/StoreContext";

export default function InventoryPage() {
  const { state, dispatch } = useStore();
  const [tankId, setTankId] = useState(state.tanks[0]?.id ?? "");
  const [liters, setLiters] = useState(0);
  const [cost, setCost] = useState(0);
  const [supplierId, setSupplierId] = useState(state.supplierLedgers[0]?.id ?? "");

  const handleReceive = () => {
    if (liters <= 0 || cost <= 0) return;
    dispatch({ type: "RECEIVE_STOCK", payload: { tankId, liters, costPerLiter: cost, supplierId } });
    setLiters(0);
    setCost(0);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Tank Inventory</h1>
        <p className="text-sm text-slate-500">Live levels and stock receiving.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {state.tanks.map((tank) => (
          <div key={tank.id} className="glass-card p-5">
            <p className="text-sm font-semibold">{tank.name}</p>
            <p className="text-xs text-slate-500">{tank.fuelType.toUpperCase()}</p>
            <p className="mt-2 text-lg font-semibold">{tank.currentLiters.toLocaleString()} L</p>
            <p className="text-xs text-slate-500">Low threshold: {tank.lowThresholdLiters} L</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-6 space-y-4">
        <h2 className="text-sm font-semibold">Stock Receiving</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs text-slate-500">Tank</label>
            <select
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={tankId}
              onChange={(event) => setTankId(event.target.value)}
            >
              {state.tanks.map((tank) => (
                <option key={tank.id} value={tank.id}>
                  {tank.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500">Supplier</label>
            <select
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={supplierId}
              onChange={(event) => setSupplierId(event.target.value)}
            >
              {state.supplierLedgers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500">Liters Received</label>
            <input
              type="number"
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={liters}
              onChange={(event) => setLiters(Number(event.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500">Cost per liter (PKR)</label>
            <input
              type="number"
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={cost}
              onChange={(event) => setCost(Number(event.target.value))}
            />
          </div>
        </div>
        <button
          className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
          onClick={handleReceive}
        >
          Receive Stock
        </button>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold">Store Inventory (Tuck + Lube)</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {state.products.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white/70 p-4">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-slate-500">Stock: {item.stock}</p>
              <p className="text-xs text-slate-500">Price: PKR {item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
