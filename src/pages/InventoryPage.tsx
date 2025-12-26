import React, { useState } from "react";
import { useStore } from "../store/StoreContext";

export default function InventoryPage() {
  const { state, dispatch } = useStore();
  const [tankId, setTankId] = useState(state.tanks[0]?.id ?? "");
  const [liters, setLiters] = useState(0);
  const [cost, setCost] = useState(0);
  const [supplierId, setSupplierId] = useState(state.supplierLedgers[0]?.id ?? "");
  const [newTankName, setNewTankName] = useState("");
  const [newTankFuel, setNewTankFuel] = useState<"petrol" | "diesel">("petrol");
  const [newTankCapacity, setNewTankCapacity] = useState(0);
  const [newTankCurrent, setNewTankCurrent] = useState(0);
  const [newTankThreshold, setNewTankThreshold] = useState(0);
  const [newTankCost, setNewTankCost] = useState(0);
  const [newNozzleName, setNewNozzleName] = useState("");
  const [newNozzleFuel, setNewNozzleFuel] = useState<"petrol" | "diesel">("petrol");
  const [newNozzleTank, setNewNozzleTank] = useState(state.tanks[0]?.id ?? "");
  const [newNozzleOpening, setNewNozzleOpening] = useState(0);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState<"tuck" | "lube">("tuck");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductCost, setNewProductCost] = useState(0);
  const [newProductStock, setNewProductStock] = useState(0);

  const handleReceive = () => {
    if (liters <= 0 || cost <= 0) return;
    dispatch({ type: "RECEIVE_STOCK", payload: { tankId, liters, costPerLiter: cost, supplierId } });
    setLiters(0);
    setCost(0);
  };

  const handleAddTank = () => {
    if (
      !newTankName ||
      newTankCapacity <= 0 ||
      newTankThreshold < 0 ||
      newTankCost <= 0
    ) {
      return;
    }
    dispatch({
      type: "ADD_TANK",
      payload: {
        id: crypto.randomUUID(),
        name: newTankName,
        fuelType: newTankFuel,
        capacityLiters: newTankCapacity,
        currentLiters: newTankCurrent,
        lowThresholdLiters: newTankThreshold,
        costPricePerLiter: newTankCost,
      },
    });
    setNewTankName("");
    setNewTankCapacity(0);
    setNewTankCurrent(0);
    setNewTankThreshold(0);
    setNewTankCost(0);
  };

  const handleAddNozzle = () => {
    if (!newNozzleName || !newNozzleTank) return;
    dispatch({
      type: "ADD_NOZZLE",
      payload: {
        id: crypto.randomUUID(),
        name: newNozzleName,
        fuelType: newNozzleFuel,
        tankId: newNozzleTank,
        meterOpening: newNozzleOpening,
        meterClosing: newNozzleOpening,
      },
    });
    setNewNozzleName("");
    setNewNozzleOpening(0);
  };

  const handleAddProduct = () => {
    if (!newProductName || newProductPrice <= 0 || newProductCost <= 0) return;
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        id: crypto.randomUUID(),
        name: newProductName,
        category: newProductCategory,
        price: newProductPrice,
        costPrice: newProductCost,
        stock: newProductStock,
      },
    });
    setNewProductName("");
    setNewProductPrice(0);
    setNewProductCost(0);
    setNewProductStock(0);
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass-card p-6 space-y-3">
          <h2 className="text-sm font-semibold">Add Tank</h2>
          <input
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newTankName}
            onChange={(event) => setNewTankName(event.target.value)}
            placeholder="Tank name"
          />
          <select
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newTankFuel}
            onChange={(event) => setNewTankFuel(event.target.value as "petrol" | "diesel")}
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
          </select>
          <input
            type="number"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newTankCapacity}
            onChange={(event) => setNewTankCapacity(Number(event.target.value))}
            placeholder="Capacity (L)"
          />
          <input
            type="number"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newTankCurrent}
            onChange={(event) => setNewTankCurrent(Number(event.target.value))}
            placeholder="Current liters"
          />
          <input
            type="number"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newTankThreshold}
            onChange={(event) => setNewTankThreshold(Number(event.target.value))}
            placeholder="Low threshold"
          />
          <input
            type="number"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newTankCost}
            onChange={(event) => setNewTankCost(Number(event.target.value))}
            placeholder="Cost per liter"
          />
          <button
            className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
            onClick={handleAddTank}
          >
            Save Tank
          </button>
        </div>

        <div className="glass-card p-6 space-y-3">
          <h2 className="text-sm font-semibold">Add Nozzle</h2>
          <input
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newNozzleName}
            onChange={(event) => setNewNozzleName(event.target.value)}
            placeholder="Nozzle name"
          />
          <select
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newNozzleFuel}
            onChange={(event) => setNewNozzleFuel(event.target.value as "petrol" | "diesel")}
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
          </select>
          <select
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newNozzleTank}
            onChange={(event) => setNewNozzleTank(event.target.value)}
          >
            {state.tanks.map((tank) => (
              <option key={tank.id} value={tank.id}>
                {tank.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newNozzleOpening}
            onChange={(event) => setNewNozzleOpening(Number(event.target.value))}
            placeholder="Opening meter"
          />
          <button
            className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
            onClick={handleAddNozzle}
          >
            Save Nozzle
          </button>
        </div>

        <div className="glass-card p-6 space-y-3">
          <h2 className="text-sm font-semibold">Add Product</h2>
          <input
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newProductName}
            onChange={(event) => setNewProductName(event.target.value)}
            placeholder="Product name"
          />
          <select
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newProductCategory}
            onChange={(event) => setNewProductCategory(event.target.value as "tuck" | "lube")}
          >
            <option value="tuck">Tuck Shop</option>
            <option value="lube">Lube Shop</option>
          </select>
          <input
            type="number"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newProductPrice}
            onChange={(event) => setNewProductPrice(Number(event.target.value))}
            placeholder="Selling price"
          />
          <input
            type="number"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newProductCost}
            onChange={(event) => setNewProductCost(Number(event.target.value))}
            placeholder="Cost price"
          />
          <input
            type="number"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={newProductStock}
            onChange={(event) => setNewProductStock(Number(event.target.value))}
            placeholder="Opening stock"
          />
          <button
            className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
            onClick={handleAddProduct}
          >
            Save Product
          </button>
        </div>
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
