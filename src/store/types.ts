export type FuelType = "petrol" | "diesel";

export interface Tank {
  id: string;
  name: string;
  fuelType: FuelType;
  capacityLiters: number;
  currentLiters: number;
  lowThresholdLiters: number;
  costPricePerLiter: number;
}

export interface Nozzle {
  id: string;
  name: string;
  fuelType: FuelType;
  tankId: string;
  meterOpening: number;
  meterClosing: number;
}

export interface Product {
  id: string;
  name: string;
  category: "tuck" | "lube";
  price: number;
  costPrice: number;
  stock: number;
}

export interface Sale {
  id: string;
  date: string;
  type: "fuel" | "tuck" | "lube";
  fuelType?: FuelType;
  nozzleId?: string;
  productId?: string;
  liters: number;
  unitPrice: number;
  totalAmount: number;
  paymentType: "cash" | "card" | "jazzcash" | "easypaisa" | "credit";
  customerId?: string;
  costAmount: number;
}

export interface Customer {
  id: string;
  name: string;
  creditLimit: number;
  balance: number;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  notes: string;
}

export interface BankDeposit {
  id: string;
  date: string;
  amount: number;
  reference: string;
}

export interface PriceItem {
  fuelType: FuelType;
  sellingPricePerLiter: number;
  costPricePerLiter: number;
  effectiveDate: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  salesPerformance: number;
  attendance: Attendance[];
}

export interface Attendance {
  date: string;
  status: "present" | "absent";
}

export interface Shift {
  id: string;
  name: string;
  date: string;
  status: "open" | "closed";
  expectedLiters: number;
  actualLiters: number;
}

export interface SupplierLedger {
  id: string;
  name: string;
  balance: number;
}

export interface LossAdjustment {
  id: string;
  date: string;
  amount: number;
  reason: string;
}

export interface AppState {
  station: {
    name: string;
    location: string;
    phone: string;
  };
  tanks: Tank[];
  nozzles: Nozzle[];
  products: Product[];
  sales: Sale[];
  customers: Customer[];
  expenses: Expense[];
  bankDeposits: BankDeposit[];
  prices: PriceItem[];
  employees: Employee[];
  shifts: Shift[];
  supplierLedgers: SupplierLedger[];
  lossAdjustments: LossAdjustment[];
  cashbookBalance: number;
}

export type Action =
  | { type: "SEED"; payload: AppState }
  | { type: "RESET"; payload: AppState }
  | { type: "UPDATE_STATION"; payload: AppState["station"] }
  | { type: "ADD_TANK"; payload: Tank }
  | { type: "ADD_NOZZLE"; payload: Nozzle }
  | { type: "ADD_PRODUCT"; payload: Product }
  | { type: "ADD_SALE"; payload: Sale }
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "ADD_BANK_DEPOSIT"; payload: BankDeposit }
  | { type: "RECEIVE_STOCK"; payload: { tankId: string; liters: number; costPerLiter: number; supplierId: string } }
  | { type: "ADD_CUSTOMER"; payload: Customer }
  | { type: "ADD_PAYMENT"; payload: { customerId: string; amount: number } }
  | { type: "UPDATE_PRICE"; payload: PriceItem }
  | { type: "OPEN_SHIFT"; payload: Shift }
  | { type: "CLOSE_SHIFT"; payload: { shiftId: string; actualLiters: number } }
  | { type: "UPDATE_METER"; payload: { nozzleId: string; meterClosing: number } }
  | { type: "ADD_EMPLOYEE"; payload: Employee }
  | { type: "ADD_ATTENDANCE"; payload: { employeeId: string; attendance: Attendance } }
  | { type: "ADD_LOSS"; payload: LossAdjustment };
