import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import { StoreProvider } from "./store/StoreContext";
import DashboardPage from "./pages/DashboardPage";
import FuelPosPage from "./pages/FuelPosPage";
import TuckShopPage from "./pages/TuckShopPage";
import LubeShopPage from "./pages/LubeShopPage";
import ShiftsPage from "./pages/ShiftsPage";
import InventoryPage from "./pages/InventoryPage";
import CreditsPage from "./pages/CreditsPage";
import CashbookPage from "./pages/CashbookPage";
import BankPage from "./pages/BankPage";
import PricesPage from "./pages/PricesPage";
import EmployeesPage from "./pages/EmployeesPage";
import ReportsPage from "./pages/ReportsPage";
import AlertsPage from "./pages/AlertsPage";

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/fuel-pos" element={<FuelPosPage />} />
          <Route path="/tuck-shop" element={<TuckShopPage />} />
          <Route path="/lube-shop" element={<LubeShopPage />} />
          <Route path="/shifts" element={<ShiftsPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/credits" element={<CreditsPage />} />
          <Route path="/cashbook" element={<CashbookPage />} />
          <Route path="/bank" element={<BankPage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
        </Route>
      </Routes>
    </StoreProvider>
  );
}
