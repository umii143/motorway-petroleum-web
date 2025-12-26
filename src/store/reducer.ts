import { Action, AppState, Sale } from "./types";
import { computeSaleCost } from "../utils/calculations";

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SEED":
      return action.payload;
    case "RESET":
      return action.payload;
    case "ADD_TANK":
      return { ...state, tanks: [...state.tanks, action.payload] };
    case "ADD_NOZZLE":
      return { ...state, nozzles: [...state.nozzles, action.payload] };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "ADD_SALE": {
      const sale: Sale = action.payload;
      const updatedTanks = state.tanks.map((tank) => {
        if (sale.type === "fuel" && sale.fuelType && tank.fuelType === sale.fuelType) {
          return { ...tank, currentLiters: tank.currentLiters - sale.liters };
        }
        return tank;
      });

      const updatedProducts = state.products.map((product) => {
        if (sale.type !== "fuel" && sale.productId === product.id) {
          return { ...product, stock: product.stock - sale.liters };
        }
        return product;
      });

      let updatedCustomers = state.customers;
      let updatedCashbook = state.cashbookBalance;
      if (sale.paymentType === "credit" && sale.customerId) {
        updatedCustomers = state.customers.map((customer) =>
          customer.id === sale.customerId
            ? { ...customer, balance: customer.balance + sale.totalAmount }
            : customer
        );
      } else {
        updatedCashbook += sale.totalAmount;
      }

      return {
        ...state,
        tanks: updatedTanks,
        products: updatedProducts,
        customers: updatedCustomers,
        cashbookBalance: updatedCashbook,
        sales: [...state.sales, sale],
      };
    }
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        cashbookBalance: state.cashbookBalance - action.payload.amount,
      };
    case "ADD_BANK_DEPOSIT":
      return {
        ...state,
        bankDeposits: [...state.bankDeposits, action.payload],
        cashbookBalance: state.cashbookBalance - action.payload.amount,
      };
    case "RECEIVE_STOCK": {
      const { tankId, liters, costPerLiter, supplierId } = action.payload;
      const updatedTanks = state.tanks.map((tank) =>
        tank.id === tankId
          ? {
              ...tank,
              currentLiters: tank.currentLiters + liters,
              costPricePerLiter: costPerLiter,
            }
          : tank
      );
      const supplierLedgers = state.supplierLedgers.map((supplier) =>
        supplier.id === supplierId
          ? { ...supplier, balance: supplier.balance + liters * costPerLiter }
          : supplier
      );
      return { ...state, tanks: updatedTanks, supplierLedgers };
    }
    case "ADD_CUSTOMER":
      return { ...state, customers: [...state.customers, action.payload] };
    case "ADD_PAYMENT": {
      const { customerId, amount } = action.payload;
      return {
        ...state,
        customers: state.customers.map((customer) =>
          customer.id === customerId
            ? { ...customer, balance: Math.max(0, customer.balance - amount) }
            : customer
        ),
        cashbookBalance: state.cashbookBalance + amount,
      };
    }
    case "UPDATE_PRICE": {
      const existing = state.prices.filter(
        (price) => price.fuelType !== action.payload.fuelType
      );
      return { ...state, prices: [...existing, action.payload] };
    }
    case "OPEN_SHIFT":
      return { ...state, shifts: [...state.shifts, action.payload] };
    case "CLOSE_SHIFT": {
      const { shiftId, actualLiters } = action.payload;
      return {
        ...state,
        shifts: state.shifts.map((shift) =>
          shift.id === shiftId
            ? { ...shift, actualLiters, status: "closed" }
            : shift
        ),
      };
    }
    case "UPDATE_METER": {
      const { nozzleId, meterClosing } = action.payload;
      return {
        ...state,
        nozzles: state.nozzles.map((nozzle) =>
          nozzle.id === nozzleId ? { ...nozzle, meterClosing } : nozzle
        ),
      };
    }
    case "ADD_EMPLOYEE":
      return { ...state, employees: [...state.employees, action.payload] };
    case "ADD_ATTENDANCE": {
      const { employeeId, attendance } = action.payload;
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === employeeId
            ? { ...employee, attendance: [...employee.attendance, attendance] }
            : employee
        ),
      };
    }
    case "ADD_LOSS":
      return { ...state, lossAdjustments: [...state.lossAdjustments, action.payload] };
    default:
      return state;
  }
}

export function createSale(state: AppState, sale: Omit<Sale, "costAmount">): Sale {
  const costAmount = computeSaleCost(state, sale as Sale);
  return { ...sale, costAmount };
}
