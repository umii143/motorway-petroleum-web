import React, { useMemo, useState } from "react";
import { useStore } from "../store/StoreContext";
import { createSale } from "../store/reducer";

export default function LubeShopPage() {
  const { state, dispatch } = useStore();
  const products = state.products.filter((item) => item.category === "lube");
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [vehicle, setVehicle] = useState("");
  const [mileage, setMileage] = useState(45000);

  const product = products.find((item) => item.id === productId);
  const totalAmount = useMemo(() => quantity * (product?.price ?? 0), [quantity, product]);
  const nextDue = mileage + 3000;

  const handleSale = () => {
    if (!product || quantity <= 0) return;
    if (quantity > product.stock) return;
    const sale = createSale(state, {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      type: "lube",
      productId: product.id,
      liters: quantity,
      unitPrice: product.price,
      totalAmount,
      paymentType: "cash",
    });
    dispatch({ type: "ADD_SALE", payload: sale });
    setQuantity(1);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Lube Shop POS</h1>
        <p className="text-sm text-slate-500">Sell oils and manage service reminders.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-card p-6 space-y-4">
          <div>
            <label className="text-xs text-slate-500">Lube Product</label>
            <select
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
            >
              {products.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} (Stock {item.stock})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500">Quantity</label>
            <input
              type="number"
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </div>
          <p className="text-sm text-slate-500">Unit price: PKR {product?.price ?? 0}</p>
          <p className="text-lg font-semibold">Total: PKR {totalAmount.toLocaleString()}</p>
          <button
            className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
            onClick={handleSale}
          >
            Complete Sale
          </button>
          {product && quantity > product.stock && (
            <p className="text-xs text-red-500">Not enough stock for this quantity.</p>
          )}
        </div>

        <div className="glass-card p-6 space-y-4">
          <p className="text-sm font-semibold">Service Reminder</p>
          <div>
            <label className="text-xs text-slate-500">Vehicle No</label>
            <input
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={vehicle}
              onChange={(event) => setVehicle(event.target.value)}
              placeholder="LEB-2045"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500">Current Mileage</label>
            <input
              type="number"
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={mileage}
              onChange={(event) => setMileage(Number(event.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500">Next Due Mileage</label>
            <input
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={`${nextDue.toLocaleString()} km`}
              readOnly
            />
          </div>
          <button className="rounded-2xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white">
            Save Reminder
          </button>
          {vehicle && (
            <p className="text-xs text-slate-500">Reminder stored for {vehicle}.</p>
          )}
        </div>
      </div>
    </div>
  );
}
