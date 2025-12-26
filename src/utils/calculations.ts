import { AppState, Sale } from "../store/types";

export function calculateLiters(opening: number, closing: number) {
  return Math.max(0, closing - opening);
}

export function calculateProfit(state: AppState) {
  const totalSales = state.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalCost = state.sales.reduce((sum, sale) => sum + sale.costAmount, 0);
  const totalExpenses = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalLoss = state.lossAdjustments.reduce((sum, loss) => sum + loss.amount, 0);
  return totalSales - totalCost - totalExpenses - totalLoss;
}

export function computeSaleCost(state: AppState, sale: Sale) {
  if (sale.type === "fuel" && sale.fuelType) {
    const price = state.prices.find((p) => p.fuelType === sale.fuelType);
    return sale.liters * (price?.costPricePerLiter ?? 0);
  }
  if (sale.productId) {
    const product = state.products.find((item) => item.id === sale.productId);
    return sale.liters * (product?.costPrice ?? 0);
  }
  return 0;
}

export function stockValue(state: AppState) {
  const fuelValue = state.tanks.reduce(
    (sum, tank) => sum + tank.currentLiters * tank.costPricePerLiter,
    0
  );
  const productValue = state.products.reduce(
    (sum, item) => sum + item.stock * item.costPrice,
    0
  );
  return fuelValue + productValue;
}

export function dailySales(state: AppState, date: string) {
  return state.sales.filter((sale) => sale.date === date);
}

export function computeAlerts(state: AppState) {
  const alerts: string[] = [];
  state.tanks.forEach((tank) => {
    if (tank.currentLiters <= tank.lowThresholdLiters) {
      alerts.push(`Low stock: ${tank.name}`);
    }
  });

  state.customers.forEach((customer) => {
    if (customer.balance > customer.creditLimit) {
      alerts.push(`Credit limit exceeded: ${customer.name}`);
    }
  });

  state.shifts.forEach((shift) => {
    if (shift.status === "open" && shift.expectedLiters !== shift.actualLiters) {
      alerts.push(`Shift mismatch: ${shift.name}`);
    }
  });

  state.products.forEach((product) => {
    if (product.stock <= 10) {
      alerts.push(`Low product stock: ${product.name}`);
    }
  });

  return alerts;
}
