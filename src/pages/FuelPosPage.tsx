import React, { useMemo, useState } from "react";
import { useStore } from "../store/StoreContext";
import { createSale } from "../store/reducer";
import { FuelType } from "../store/types";

export default function FuelPosPage() {
  const { state, dispatch } = useStore();
  const [fuelType, setFuelType] = useState<FuelType>("petrol");
  const [nozzleId, setNozzleId] = useState(state.nozzles[0]?.id ?? "");
  const [liters, setLiters] = useState(0);
  const [paymentType, setPaymentType] = useState("cash");
  const [customerId, setCustomerId] = useState(state.customers[0]?.id ?? "");

  const price = state.prices.find((p) => p.fuelType === fuelType);
  const totalAmount = useMemo(() => liters * (price?.sellingPricePerLiter ?? 0), [liters, price]);
  const canCredit = useMemo(() => {
    if (paymentType !== "credit") return true;
    const customer = state.customers.find((c) => c.id === customerId);
    return customer ? customer.balance + totalAmount <= customer.creditLimit : false;
  }, [paymentType, customerId, totalAmount, state.customers]);

  const handleSale = () => {
    if (liters <= 0 || !price) return;
    if (!canCredit) return;
    const sale = createSale(state, {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      type: "fuel",
      fuelType,
      nozzleId,
      liters,
      unitPrice: price.sellingPricePerLiter,
      totalAmount,
      paymentType: paymentType as "cash" | "card" | "jazzcash" | "easypaisa" | "credit",
      customerId: paymentType === "credit" ? customerId : undefined,
    });
    if (sale.liters > (state.tanks.find((t) => t.fuelType === fuelType)?.currentLiters ?? 0)) {
      return;
    }
    dispatch({ type: "ADD_SALE", payload: sale });
    setLiters(0);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Fuel POS</h1>
        <p className="text-sm text-slate-500">Process fuel sales with nozzle tracking.</p>
      </header>

      <div className="glass-card p-6 space-y-4">
        <div className="flex flex-wrap gap-3">
          <button
            className={`chip ${fuelType === "petrol" ? "" : "chip-soft"}`}
            onClick={() => setFuelType("petrol")}
          >
            Petrol
          </button>
          <button
            className={`chip ${fuelType === "diesel" ? "" : "chip-soft"}`}
            onClick={() => setFuelType("diesel")}
          >
            Diesel
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs text-slate-500">Nozzle</label>
            <select
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={nozzleId}
              onChange={(event) => setNozzleId(event.target.value)}
            >
              {state.nozzles
                .filter((nozzle) => nozzle.fuelType === fuelType)
                .map((nozzle) => (
                  <option key={nozzle.id} value={nozzle.id}>
                    {nozzle.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500">Liters</label>
            <input
              type="number"
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={liters}
              onChange={(event) => setLiters(Number(event.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500">Payment Type</label>
            <select
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={paymentType}
              onChange={(event) => setPaymentType(event.target.value)}
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="jazzcash">JazzCash</option>
              <option value="easypaisa">Easypaisa</option>
              <option value="credit">Credit</option>
            </select>
          </div>
          {paymentType === "credit" && (
            <div>
              <label className="text-xs text-slate-500">Customer</label>
              <select
                className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
                value={customerId}
                onChange={(event) => setCustomerId(event.target.value)}
              >
                {state.customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} (Limit PKR {customer.creditLimit.toLocaleString()})
                  </option>
                ))}
              </select>
              {!canCredit && (
                <p className="mt-2 text-xs text-red-500">
                  Credit limit exceeded. Payment blocked.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Unit price: PKR {price?.sellingPricePerLiter ?? 0}
          </p>
          <p className="text-lg font-semibold">Total: PKR {totalAmount.toLocaleString()}</p>
        </div>

        <button
          className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
          onClick={handleSale}
        >
          Complete Sale
        </button>
      </div>
    </div>
  );
}
