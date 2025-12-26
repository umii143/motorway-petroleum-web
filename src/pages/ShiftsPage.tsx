import React, { useMemo, useState } from "react";
import { useStore } from "../store/StoreContext";
import { calculateLiters } from "../utils/calculations";

export default function ShiftsPage() {
  const { state, dispatch } = useStore();
  const [selectedShift, setSelectedShift] = useState(state.shifts[0]?.id ?? "");
  const [actualLiters, setActualLiters] = useState(0);

  const shift = state.shifts.find((s) => s.id === selectedShift);

  const totalMeterLiters = useMemo(() => {
    return state.nozzles.reduce(
      (sum, nozzle) => sum + calculateLiters(nozzle.meterOpening, nozzle.meterClosing),
      0
    );
  }, [state.nozzles]);

  const handleCloseShift = () => {
    if (!shift) return;
    if (actualLiters !== shift.expectedLiters) return;
    dispatch({ type: "CLOSE_SHIFT", payload: { shiftId: shift.id, actualLiters } });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Shift Closing & Meter Readings</h1>
        <p className="text-sm text-slate-500">
          Enter closing readings or sync to calculate liters.
        </p>
      </header>

      <div className="glass-card p-6 space-y-4">
        <div>
          <label className="text-xs text-slate-500">Active Shift</label>
          <select
            className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={selectedShift}
            onChange={(event) => setSelectedShift(event.target.value)}
          >
            {state.shifts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} ({item.status})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-3">
          {state.nozzles.map((nozzle) => (
            <div key={nozzle.id} className="rounded-2xl bg-white/70 p-4">
              <p className="text-sm font-semibold">{nozzle.name}</p>
              <p className="text-xs text-slate-500">Opening: {nozzle.meterOpening}</p>
              <label className="text-xs text-slate-500">Closing</label>
              <input
                type="number"
                className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
                value={nozzle.meterClosing}
                onChange={(event) =>
                  dispatch({
                    type: "UPDATE_METER",
                    payload: { nozzleId: nozzle.id, meterClosing: Number(event.target.value) },
                  })
                }
              />
              <p className="text-xs text-slate-500">
                Liters: {calculateLiters(nozzle.meterOpening, nozzle.meterClosing)}
              </p>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-500">Meter total liters: {totalMeterLiters}</p>

        {shift && (
          <div>
            <p className="text-sm text-slate-500">Expected liters: {shift.expectedLiters}</p>
            <label className="text-xs text-slate-500">Actual liters</label>
            <input
              type="number"
              className="mt-2 w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
              value={actualLiters}
              onChange={(event) => setActualLiters(Number(event.target.value))}
            />
            {actualLiters !== shift.expectedLiters && (
              <p className="text-xs text-red-500 mt-2">
                Mismatch detected. Shift close blocked until matched.
              </p>
            )}
          </div>
        )}

        <button
          className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
          onClick={handleCloseShift}
        >
          Close Shift
        </button>
      </div>
    </div>
  );
}
