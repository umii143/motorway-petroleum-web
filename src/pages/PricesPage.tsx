import React, { useState } from "react";
import { useStore } from "../store/StoreContext";
import { FuelType } from "../store/types";

export default function PricesPage() {
  const { state, dispatch } = useStore();
  const [fuelType, setFuelType] = useState<FuelType>("petrol");
  const [selling, setSelling] = useState(0);
  const [cost, setCost] = useState(0);

  const handleUpdate = () => {
    if (selling <= 0 || cost <= 0) return;
    dispatch({
      type: "UPDATE_PRICE",
      payload: {
        fuelType,
        sellingPricePerLiter: selling,
        costPricePerLiter: cost,
        effectiveDate: new Date().toISOString().slice(0, 10),
      },
    });
    setSelling(0);
    setCost(0);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Price Management</h1>
        <p className="text-sm text-slate-500">Update prices with effective dates.</p>
      </header>

      <div className="glass-card p-6 space-y-3">
        <h2 className="text-sm font-semibold">Update Price</h2>
        <select
          className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
          value={fuelType}
          onChange={(event) => setFuelType(event.target.value as FuelType)}
        >
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>
        <input
          type="number"
          className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
          placeholder="Selling price per liter"
          value={selling}
          onChange={(event) => setSelling(Number(event.target.value))}
        />
        <input
          type="number"
          className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
          placeholder="Cost price per liter"
          value={cost}
          onChange={(event) => setCost(Number(event.target.value))}
        />
        <button
          className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
          onClick={handleUpdate}
        >
          Save Price
        </button>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold">Price History</h2>
        <div className="mt-4 space-y-3">
          {state.prices.map((price) => (
            <div key={`${price.fuelType}-${price.effectiveDate}`} className="rounded-2xl bg-white/70 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{price.fuelType.toUpperCase()}</span>
                <span>PKR {price.sellingPricePerLiter} / L</span>
              </div>
              <p className="text-xs text-slate-500">Cost PKR {price.costPricePerLiter} · {price.effectiveDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
