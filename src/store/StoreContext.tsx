import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Action, AppState } from "./types";
import { initialState, seedDemoData } from "./seed";
import { reducer } from "./reducer";

const STORAGE_KEY = "motorway-fuel-station";

interface StoreContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  resetDemo: () => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function loadState(): AppState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return seedDemoData();
  }
  try {
    return JSON.parse(raw) as AppState;
  } catch {
    return seedDemoData();
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const resetDemo = () => {
    const seeded = seedDemoData();
    dispatch({ type: "SEED", payload: seeded });
  };

  return (
    <StoreContext.Provider value={{ state, dispatch, resetDemo }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
}
