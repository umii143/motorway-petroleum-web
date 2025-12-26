import { AppState } from "./types";

export const initialState: AppState = {
  tanks: [],
  nozzles: [],
  products: [],
  sales: [],
  customers: [],
  expenses: [],
  bankDeposits: [],
  prices: [],
  employees: [],
  shifts: [],
  supplierLedgers: [],
  lossAdjustments: [],
  cashbookBalance: 0,
};

export function seedDemoData(): AppState {
  return {
    tanks: [
      {
        id: "tank-petrol",
        name: "Petrol Tank A",
        fuelType: "petrol",
        capacityLiters: 30000,
        currentLiters: 22000,
        lowThresholdLiters: 6000,
        costPricePerLiter: 240,
      },
      {
        id: "tank-diesel",
        name: "Diesel Tank B",
        fuelType: "diesel",
        capacityLiters: 25000,
        currentLiters: 8500,
        lowThresholdLiters: 7000,
        costPricePerLiter: 235,
      },
    ],
    nozzles: [
      {
        id: "nozzle-1",
        name: "Nozzle 1",
        fuelType: "petrol",
        tankId: "tank-petrol",
        meterOpening: 120000,
        meterClosing: 121000,
      },
      {
        id: "nozzle-2",
        name: "Nozzle 2",
        fuelType: "diesel",
        tankId: "tank-diesel",
        meterOpening: 88000,
        meterClosing: 88550,
      },
    ],
    products: [
      {
        id: "tuck-1",
        name: "Mineral Water",
        category: "tuck",
        price: 80,
        costPrice: 55,
        stock: 320,
      },
      {
        id: "tuck-2",
        name: "Energy Drink",
        category: "tuck",
        price: 250,
        costPrice: 180,
        stock: 140,
      },
      {
        id: "lube-1",
        name: "ZIC X7 10W-40",
        category: "lube",
        price: 3200,
        costPrice: 2500,
        stock: 48,
      },
      {
        id: "lube-2",
        name: "Shell Helix HX8",
        category: "lube",
        price: 4600,
        costPrice: 3700,
        stock: 34,
      },
      {
        id: "lube-3",
        name: "Guard Oil Filter",
        category: "lube",
        price: 850,
        costPrice: 620,
        stock: 120,
      },
    ],
    sales: [],
    customers: [
      { id: "cust-1", name: "NLC Logistics", creditLimit: 200000, balance: 120000 },
      { id: "cust-2", name: "Faisal Transport", creditLimit: 150000, balance: 95000 },
    ],
    expenses: [
      {
        id: "exp-1",
        date: "2024-08-12",
        category: "Electricity",
        amount: 28000,
        notes: "WAPDA bill",
      },
    ],
    bankDeposits: [
      { id: "dep-1", date: "2024-08-12", amount: 200000, reference: "HBL" },
    ],
    prices: [
      {
        fuelType: "petrol",
        sellingPricePerLiter: 275,
        costPricePerLiter: 240,
        effectiveDate: "2024-08-10",
      },
      {
        fuelType: "diesel",
        sellingPricePerLiter: 285,
        costPricePerLiter: 235,
        effectiveDate: "2024-08-10",
      },
    ],
    employees: [
      {
        id: "emp-1",
        name: "Ali Attendant",
        role: "Attendant",
        salesPerformance: 245000,
        attendance: [{ date: "2024-08-12", status: "present" }],
      },
    ],
    shifts: [
      {
        id: "shift-a",
        name: "Shift A",
        date: "2024-08-12",
        status: "open",
        expectedLiters: 1550,
        actualLiters: 0,
      },
    ],
    supplierLedgers: [
      { id: "sup-1", name: "PSO", balance: 4200000 },
      { id: "sup-2", name: "Byco", balance: 2800000 },
    ],
    lossAdjustments: [],
    cashbookBalance: 650000,
  };
}
