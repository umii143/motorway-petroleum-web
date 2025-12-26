import React, { useState } from "react";
import { useStore } from "../store/StoreContext";

export default function BankPage() {
  const { state, dispatch } = useStore();
  const [amount, setAmount] = useState(0);
  const [reference, setReference] = useState("");

  const handleDeposit = () => {
    if (amount <= 0 || !reference) return;
    dispatch({
      type: "ADD_BANK_DEPOSIT",
      payload: {
        id: crypto.randomUUID(),
        date: new Date().toISOString().slice(0, 10),
        amount,
        reference,
      },
    });
    setAmount(0);
    setReference("");
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Bank Deposits</h1>
        <p className="text-sm text-slate-500">Record deposits and reconcile cash.</p>
      </header>

      <div className="glass-card p-6 space-y-3">
        <h2 className="text-sm font-semibold">New Deposit</h2>
        <input
          type="number"
          className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <input
          className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
          placeholder="Bank reference"
          value={reference}
          onChange={(event) => setReference(event.target.value)}
        />
        <button
          className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
          onClick={handleDeposit}
        >
          Record Deposit
        </button>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold">Deposit History</h2>
        <div className="mt-4 space-y-3">
          {state.bankDeposits.map((deposit) => (
            <div key={deposit.id} className="rounded-2xl bg-white/70 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span>{deposit.reference}</span>
                <span>PKR {deposit.amount.toLocaleString()}</span>
              </div>
              <p className="text-xs text-slate-500">{deposit.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
