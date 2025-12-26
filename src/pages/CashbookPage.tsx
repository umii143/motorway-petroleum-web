import React, { useState } from "react";
import { useStore } from "../store/StoreContext";

export default function CashbookPage() {
  const { state, dispatch } = useStore();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [notes, setNotes] = useState("");

  const handleExpense = () => {
    if (!category || amount <= 0) return;
    dispatch({
      type: "ADD_EXPENSE",
      payload: {
        id: crypto.randomUUID(),
        date: new Date().toISOString().slice(0, 10),
        category,
        amount,
        notes,
      },
    });
    setCategory("");
    setAmount(0);
    setNotes("");
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Cashbook & Expenses</h1>
        <p className="text-sm text-slate-500">Track cash position and expenses.</p>
      </header>

      <div className="glass-card p-6">
        <p className="text-sm text-slate-500">Cash Balance</p>
        <p className="text-2xl font-semibold">PKR {state.cashbookBalance.toLocaleString()}</p>
      </div>

      <div className="glass-card p-6 space-y-3">
        <h2 className="text-sm font-semibold">Add Expense</h2>
        <input
          className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <input
          type="number"
          className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <input
          className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
          placeholder="Notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
        <button
          className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
          onClick={handleExpense}
        >
          Save Expense
        </button>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold">Expenses</h2>
        <div className="mt-4 space-y-3">
          {state.expenses.map((exp) => (
            <div key={exp.id} className="rounded-2xl bg-white/70 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{exp.category}</span>
                <span>PKR {exp.amount.toLocaleString()}</span>
              </div>
              <p className="text-xs text-slate-500">{exp.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
