import React, { useState } from "react";
import { useStore } from "../store/StoreContext";

export default function CreditsPage() {
  const { state, dispatch } = useStore();
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(0);
  const [paymentCustomer, setPaymentCustomer] = useState(state.customers[0]?.id ?? "");
  const [paymentAmount, setPaymentAmount] = useState(0);

  const handleAddCustomer = () => {
    if (!name || limit <= 0) return;
    dispatch({
      type: "ADD_CUSTOMER",
      payload: { id: crypto.randomUUID(), name, creditLimit: limit, balance: 0 },
    });
    setName("");
    setLimit(0);
  };

  const handlePayment = () => {
    if (!paymentCustomer || paymentAmount <= 0) return;
    dispatch({ type: "ADD_PAYMENT", payload: { customerId: paymentCustomer, amount: paymentAmount } });
    setPaymentAmount(0);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Credit / Khata Ledger</h1>
        <p className="text-sm text-slate-500">Manage credit limits and customer payments.</p>
      </header>

      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold">Customers</h2>
        <div className="mt-4 space-y-3">
          {state.customers.map((customer) => (
            <div key={customer.id} className="rounded-2xl bg-white/70 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{customer.name}</span>
                <span>Balance PKR {customer.balance.toLocaleString()}</span>
              </div>
              <p className="text-xs text-slate-500">Limit PKR {customer.creditLimit.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6 space-y-3">
          <h2 className="text-sm font-semibold">Add Customer</h2>
          <input
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            placeholder="Customer name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="number"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            placeholder="Credit limit"
            value={limit}
            onChange={(event) => setLimit(Number(event.target.value))}
          />
          <button
            className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
            onClick={handleAddCustomer}
          >
            Save Customer
          </button>
        </div>

        <div className="glass-card p-6 space-y-3">
          <h2 className="text-sm font-semibold">Receive Payment</h2>
          <select
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={paymentCustomer}
            onChange={(event) => setPaymentCustomer(event.target.value)}
          >
            {state.customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            placeholder="Payment amount"
            value={paymentAmount}
            onChange={(event) => setPaymentAmount(Number(event.target.value))}
          />
          <button
            className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
            onClick={handlePayment}
          >
            Record Payment
          </button>
        </div>
      </div>
    </div>
  );
}
