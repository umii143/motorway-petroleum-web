import React from "react";

const quickActions = [
  "New Sale",
  "Shift Close",
  "Stock Receive",
  "Add Expense",
  "New Credit",
  "Price Update",
  "Create PO",
  "Send Reminder",
];

const liveKpis = [
  { label: "Today Sales (Petrol)", value: "PKR 3.24M", delta: "+12%" },
  { label: "Today Sales (Diesel)", value: "PKR 2.18M", delta: "+8%" },
  { label: "Cash in Hand", value: "PKR 842K", delta: "+4%" },
  { label: "Credit Outstanding", value: "PKR 1.12M", delta: "-3%" },
  { label: "Expenses", value: "PKR 214K", delta: "+2%" },
  { label: "Net Profit", value: "PKR 486K", delta: "+6%" },
];

const alerts = [
  { title: "Tank-2 Low Stock", detail: "18% remaining", tone: "warning" },
  { title: "Meter Mismatch", detail: "Nozzle 03 variance 0.7%", tone: "danger" },
  { title: "Credit Limit Exceeded", detail: "Faisal Transport", tone: "danger" },
  { title: "Water Sensor Alert", detail: "Tank-1 detected", tone: "danger" },
  { title: "Predictive Reorder", detail: "Diesel in 2.5 days", tone: "info" },
  { title: "Generator Usage Spike", detail: "+22% vs avg", tone: "warning" },
];

const modules = [
  "Dashboard",
  "Fuel POS",
  "Tuck Shop POS",
  "Shift Closing",
  "Real-time Inventory",
  "Tank Monitoring",
  "Tank Management",
  "Nozzle Analytics",
  "Stock Receiving",
  "Credits / Khata",
  "Lube Shop",
  "Vendor & Purchase",
  "Expenses",
  "Attendance & Payroll",
  "Reports",
  "Price Management",
  "Bank & Finance",
  "Cloud & Devices",
  "Mobile Integration",
  "Settings",
  "Alerts Center",
  "Complaints & Feedback",
  "Bank Reconciliation",
];

const ledgerRows = [
  {
    name: "Faisal Transport",
    balance: "PKR 340,000",
    due: "12 Aug 2024",
    aging: "60+",
  },
  {
    name: "NLC Logistics",
    balance: "PKR 128,500",
    due: "18 Aug 2024",
    aging: "31-60",
  },
  {
    name: "Ali Traders",
    balance: "PKR 74,200",
    due: "29 Aug 2024",
    aging: "0-30",
  },
];

const reports = [
  "Daily Sales",
  "Nozzle-wise",
  "Shift-wise",
  "Inventory",
  "Credits",
  "Expenses",
  "Profit/Loss",
  "Tank Variance",
];

const purchases = [
  { vendor: "PSO", status: "Approved", amount: "PKR 6.2M" },
  { vendor: "Byco", status: "Pending", amount: "PKR 4.8M" },
  { vendor: "Total Parco", status: "In Transit", amount: "PKR 5.1M" },
];

const priceHistory = [
  { date: "08 Aug", fuel: "Petrol", price: "PKR 275" },
  { date: "08 Aug", fuel: "Diesel", price: "PKR 290" },
  { date: "01 Aug", fuel: "Petrol", price: "PKR 272" },
];

const deviceSessions = [
  { device: "Owner iPhone 15", status: "Active" },
  { device: "Manager Tablet", status: "Active" },
  { device: "POS Terminal-2", status: "Idle" },
];

function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <div>
        <p className="section-title">{title}</p>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      <button className="ghost-button">View details</button>
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return <div className={`glass-card ${className}`}>{children}</div>;
}

function Tag({ children, tone = "default" }) {
  return <span className={`tag ${tone}`}>{children}</span>;
}

export default function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">MF</div>
          <div>
            <p className="brand-title">MOTORWAY</p>
            <p className="brand-subtitle">Fuel Station Suite</p>
          </div>
        </div>
        <nav className="nav">
          {modules.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="sidebar-footer">
          <GlassCard className="status-card">
            <p className="status-label">Cloud Sync</p>
            <p className="status-value">Online · 2 devices</p>
            <p className="status-sub">Last backup 2 mins ago</p>
            <div className="status-row">
              <Tag tone="success">Backup healthy</Tag>
              <Tag tone="info">AES-256</Tag>
            </div>
          </GlassCard>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Islamabad Motorway M-2</p>
            <h1>MOTORWAY Fuel Station</h1>
            <p className="topbar-sub">
              Premium enterprise operations dashboard · Live shift: A (08:00 - 16:00)
            </p>
          </div>
          <div className="topbar-actions">
            <button className="ghost-button">Download Report</button>
            <button className="primary-button">New Sale</button>
          </div>
        </header>

        <section id="dashboard" className="section">
          <SectionHeader
            title="Dashboard"
            subtitle="Daily profit/loss, live KPIs, and alert control center."
          />
          <div className="kpi-grid">
            {liveKpis.map((kpi) => (
              <GlassCard key={kpi.label}>
                <p className="kpi-label">{kpi.label}</p>
                <p className="kpi-value">{kpi.value}</p>
                <span className="kpi-delta">{kpi.delta} vs yesterday</span>
              </GlassCard>
            ))}
          </div>
          <div className="dashboard-row">
            <GlassCard className="chart-card">
              <p className="card-title">Daily Profit/Loss</p>
              <div className="chart">
                <div className="chart-line"></div>
              </div>
              <div className="chart-footer">
                <div>
                  <p className="chart-label">Revenue</p>
                  <p className="chart-value">PKR 5.42M</p>
                </div>
                <div>
                  <p className="chart-label">Net Profit</p>
                  <p className="chart-value">PKR 486K</p>
                </div>
                <div>
                  <p className="chart-label">Margin</p>
                  <p className="chart-value">8.9%</p>
                </div>
              </div>
              <div className="insight-row">
                <Tag tone="success">+6% vs last week</Tag>
                <Tag tone="gold">High margin day</Tag>
              </div>
            </GlassCard>
            <GlassCard className="alerts-card">
              <p className="card-title">Alerts Summary</p>
              <div className="alerts">
                {alerts.map((alert) => (
                  <div key={alert.title} className={`alert ${alert.tone}`}>
                    <div>
                      <p className="alert-title">{alert.title}</p>
                      <p className="alert-detail">{alert.detail}</p>
                    </div>
                    <button className="ghost-button">Resolve</button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
          <div className="quick-actions">
            {quickActions.map((action) => (
              <button key={action} className="glass-pill">
                {action}
              </button>
            ))}
          </div>
        </section>

        <section id="fuel-pos" className="section">
          <SectionHeader
            title="Fuel POS"
            subtitle="Multi-nozzle fuel sales with smart payments and credit control."
          />
          <div className="pos-grid">
            <GlassCard className="pos-card">
              <p className="card-title">Fuel Type</p>
              <div className="toggle-row">
                <button className="toggle active">Petrol</button>
                <button className="toggle">Diesel</button>
                <button className="toggle">Hi-Octane</button>
              </div>
              <p className="card-title">Nozzles</p>
              <div className="nozzle-grid">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="nozzle">
                    <p>Nozzle {idx + 1}</p>
                    <span>{(1240 + idx * 32).toLocaleString()} L</span>
                    <Tag tone={idx === 2 ? "danger" : "success"}>
                      {idx === 2 ? "Variance" : "OK"}
                    </Tag>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="pos-card">
              <p className="card-title">Sale Builder</p>
              <div className="field-grid">
                <div>
                  <label>Liters</label>
                  <input placeholder="Enter liters" />
                </div>
                <div>
                  <label>Amount (PKR)</label>
                  <input placeholder="Enter amount" />
                </div>
                <div>
                  <label>Discount</label>
                  <input placeholder="Optional" />
                </div>
                <div>
                  <label>Rate</label>
                  <input defaultValue="PKR 275" />
                </div>
              </div>
              <div className="payment-row">
                {[
                  "Cash",
                  "Card",
                  "JazzCash",
                  "Easypaisa",
                  "Credit",
                ].map((item) => (
                  <button key={item} className="glass-pill">
                    {item}
                  </button>
                ))}
              </div>
              <div className="pos-footer">
                <div>
                  <p className="chart-label">Customer</p>
                  <p className="chart-value">Khan Transport (Loyalty 420)</p>
                </div>
                <button className="primary-button">Generate Invoice</button>
              </div>
            </GlassCard>
            <GlassCard className="pos-card">
              <p className="card-title">Receipt Preview</p>
              <div className="receipt">
                <div>
                  <p>MOTORWAY Fuel Station</p>
                  <p>Invoice #MS-28491</p>
                </div>
                <div className="receipt-row">
                  <span>Fuel: Petrol</span>
                  <span>90.5 L</span>
                </div>
                <div className="receipt-row">
                  <span>Rate</span>
                  <span>PKR 275</span>
                </div>
                <div className="receipt-row">
                  <span>Amount</span>
                  <span>PKR 24,887</span>
                </div>
                <div className="receipt-row total">
                  <span>Total</span>
                  <span>PKR 24,887</span>
                </div>
              </div>
              <div className="payment-row">
                <button className="ghost-button">Print</button>
                <button className="ghost-button">Share</button>
                <button className="ghost-button">WhatsApp</button>
              </div>
            </GlassCard>
          </div>
        </section>

        <section id="tuck-shop-pos" className="section">
          <SectionHeader
            title="Tuck Shop POS"
            subtitle="Dry stock sales with barcode scan and quick checkout."
          />
          <div className="pos-grid">
            <GlassCard className="pos-card">
              <p className="card-title">Product Catalog</p>
              <div className="chip-row">
                {["Snacks", "Beverages", "Lubricants", "Accessories"].map(
                  (item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  )
                )}
              </div>
              <div className="product-grid">
                {[
                  "Mineral Water",
                  "Engine Oil 4L",
                  "Car Freshener",
                  "Chips",
                ].map((item) => (
                  <div key={item} className="product">
                    <p>{item}</p>
                    <span>PKR 420</span>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard className="pos-card">
              <p className="card-title">Cart</p>
              <div className="cart-row">
                <span>Engine Oil 4L</span>
                <span>PKR 2,800</span>
              </div>
              <div className="cart-row">
                <span>Mineral Water x2</span>
                <span>PKR 240</span>
              </div>
              <div className="cart-row total">
                <span>Total</span>
                <span>PKR 3,040</span>
              </div>
              <div className="payment-row">
                <button className="glass-pill">Cash</button>
                <button className="glass-pill">Card</button>
                <button className="glass-pill">JazzCash</button>
              </div>
              <button className="primary-button">Checkout</button>
            </GlassCard>
          </div>
        </section>

        <section id="shift-closing" className="section">
          <SectionHeader
            title="Shift Closing & Meter Readings"
            subtitle="Opening locked, closing input with instant liters calculation."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Manual / Sync Meter Readings</p>
              <div className="meter-row">
                <div>
                  <p>Nozzle 01</p>
                  <span>Opening: 245,140</span>
                </div>
                <div>
                  <label>Closing</label>
                  <input placeholder="Enter closing" />
                </div>
                <span className="pill">+420 L</span>
              </div>
              <div className="meter-row">
                <div>
                  <p>Nozzle 02</p>
                  <span>Opening: 215,900</span>
                </div>
                <div>
                  <label>Closing</label>
                  <input placeholder="Enter closing" />
                </div>
                <span className="pill">+390 L</span>
              </div>
              <button className="ghost-button">Sync from Terminal</button>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Cash Reconciliation</p>
              <div className="recon-row">
                <div>
                  <p>Expected Cash</p>
                  <span>PKR 845,000</span>
                </div>
                <div>
                  <p>Actual Cash</p>
                  <span>PKR 842,000</span>
                </div>
                <div>
                  <p>Variance</p>
                  <span className="danger">-3,000</span>
                </div>
              </div>
              <label>Handover Notes (اختیاری)</label>
              <textarea placeholder="Add notes for manager"></textarea>
              <button className="primary-button">Submit Shift Report</button>
            </GlassCard>
          </div>
        </section>

        <section id="real-time-inventory" className="section">
          <SectionHeader
            title="Real-time Inventory Management"
            subtitle="Live tank insights, evaporation analysis, and sensor alerts."
          />
          <div className="info-grid">
            <GlassCard>
              <p className="card-title">Loss/Gain & Evaporation</p>
              <div className="metric-row">
                <span>Daily Variance</span>
                <strong>-0.42%</strong>
              </div>
              <div className="metric-row">
                <span>Evaporation Adjusted</span>
                <strong>+0.18%</strong>
              </div>
              <Tag tone="info">Temp compensation on (درجہ حرارت کے حساب سے)</Tag>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Water Sensor</p>
              <div className="status-list">
                <div>
                  <p>Tank-1</p>
                  <span className="caption">Clear · 0% water</span>
                </div>
                <div>
                  <p>Tank-2</p>
                  <span className="caption">Alert · 3% presence</span>
                </div>
              </div>
              <button className="ghost-button">Create Maintenance Ticket</button>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Generator Consumption</p>
              <div className="metric-row">
                <span>Today</span>
                <strong>120 L</strong>
              </div>
              <div className="metric-row">
                <span>7-day Avg</span>
                <strong>98 L</strong>
              </div>
              <Tag tone="warning">+22% abnormal usage</Tag>
            </GlassCard>
          </div>
        </section>

        <section id="tank-monitoring" className="section">
          <SectionHeader
            title="Tank Live Monitoring"
            subtitle="Real-time stock, evaporation insights, and water sensor alerts."
          />
          <div className="kpi-grid">
            {["Tank-1 Petrol", "Tank-2 Diesel", "Tank-3 Hi-Octane"].map(
              (tank, idx) => (
                <GlassCard key={tank}>
                  <p className="kpi-label">{tank}</p>
                  <p className="kpi-value">{82 - idx * 12}% Full</p>
                  <span className="kpi-delta">Temp adj +1.2%</span>
                  <div className="mini-chart"></div>
                  <p className="caption">Water sensor: Clear</p>
                </GlassCard>
              )
            )}
          </div>
        </section>

        <section id="tank-management" className="section">
          <SectionHeader
            title="Tank Management (Advanced)"
            subtitle="Calibration charts, predictive ordering, and delivery adjustments."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Calibration & Reminders</p>
              <div className="metric-row">
                <span>Last Calibration</span>
                <strong>15 May 2024</strong>
              </div>
              <div className="metric-row">
                <span>Next Due</span>
                <strong>15 Nov 2024</strong>
              </div>
              <button className="ghost-button">Upload Calibration Chart</button>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Predictive Ordering</p>
              <div className="metric-row">
                <span>Forecast Stockout</span>
                <strong>2.5 days</strong>
              </div>
              <p className="caption">
                سسٹم خود بتائے کہ پچھلی سیل دیکھ کر کب نیا آرڈر کرنا ہے
              </p>
              <button className="primary-button">Create Draft PO</button>
            </GlassCard>
          </div>
        </section>

        <section id="nozzle-analytics" className="section">
          <SectionHeader
            title="Multi-Nozzle Sales Tracking & Analytics"
            subtitle="Nozzle-wise liters, revenue, efficiency ranking, and mismatch alerts."
          />
          <GlassCard>
            <div className="table">
              <div className="table-row header">
                <span>Nozzle</span>
                <span>Liters</span>
                <span>Revenue</span>
                <span>Status</span>
              </div>
              {[1, 2, 3, 4].map((nozzle) => (
                <div key={nozzle} className="table-row">
                  <span>Nozzle {nozzle}</span>
                  <span>{(1200 + nozzle * 90).toLocaleString()} L</span>
                  <span>PKR {(240000 + nozzle * 12000).toLocaleString()}</span>
                  <Tag tone={nozzle === 3 ? "danger" : "success"}>
                    {nozzle === 3 ? "Mismatch" : "OK"}
                  </Tag>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section id="stock-receiving" className="section">
          <SectionHeader
            title="Stock Receiving"
            subtitle="Delivery verification with density/temperature adjustments."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Delivery Intake</p>
              <div className="field-grid">
                <div>
                  <label>Supplier</label>
                  <input placeholder="PSO / Byco / Total" />
                </div>
                <div>
                  <label>Invoice #</label>
                  <input placeholder="Enter invoice" />
                </div>
                <div>
                  <label>Density (optional)</label>
                  <input placeholder="0.745" />
                </div>
                <div>
                  <label>Temperature (°C)</label>
                  <input placeholder="28" />
                </div>
              </div>
              <button className="primary-button">Post to Inventory</button>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Receiving Summary</p>
              <div className="receipt-row">
                <span>Expected Volume</span>
                <span>24,000 L</span>
              </div>
              <div className="receipt-row">
                <span>Received Volume</span>
                <span>23,820 L</span>
              </div>
              <div className="receipt-row total">
                <span>Variance</span>
                <span>-180 L</span>
              </div>
              <p className="caption">Leakage adjustment logged automatically.</p>
            </GlassCard>
          </div>
        </section>

        <section id="credits-/-khata" className="section">
          <SectionHeader
            title="Credits / Khata Ledger"
            subtitle="Customer credit control with aging buckets and reminders."
          />
          <GlassCard>
            <div className="ledger-header">
              <div className="chip-row">
                {["All", "0-30", "31-60", "60+"].map((item) => (
                  <span key={item} className="chip">
                    {item}
                  </span>
                ))}
              </div>
              <button className="ghost-button">Send WhatsApp Reminder</button>
            </div>
            <div className="table">
              <div className="table-row header">
                <span>Customer</span>
                <span>Balance</span>
                <span>Due Date</span>
                <span>Aging</span>
              </div>
              {ledgerRows.map((row) => (
                <div key={row.name} className="table-row">
                  <span>{row.name}</span>
                  <span>{row.balance}</span>
                  <span>{row.due}</span>
                  <span className="pill">{row.aging}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section id="lube-shop" className="section">
          <SectionHeader
            title="Lube Shop POS + Inventory"
            subtitle="Service bay billing, stock tracking, and expiry alerts."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Service POS</p>
              <div className="cart-row">
                <span>Oil Change (10W-40)</span>
                <span>PKR 4,200</span>
              </div>
              <div className="cart-row">
                <span>Oil Filter</span>
                <span>PKR 1,200</span>
              </div>
              <div className="cart-row total">
                <span>Total</span>
                <span>PKR 5,400</span>
              </div>
              <button className="primary-button">Generate Invoice</button>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Inventory Alerts</p>
              <div className="alert info">
                <div>
                  <p className="alert-title">Shell Helix 4L</p>
                  <p className="alert-detail">Expiry in 45 days</p>
                </div>
                <span className="pill">Expiry</span>
              </div>
              <div className="alert warning">
                <div>
                  <p className="alert-title">Mobil 1 1L</p>
                  <p className="alert-detail">Low stock 12 units</p>
                </div>
                <span className="pill">Low</span>
              </div>
              <Tag tone="success">Auto SMS: Next service reminder</Tag>
            </GlassCard>
          </div>
        </section>

        <section id="vendor-&-purchase" className="section">
          <SectionHeader
            title="Vendor & Purchase Management"
            subtitle="Supplier profiles, purchase invoices, and PO approvals."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Active Purchase Orders</p>
              <div className="table">
                <div className="table-row header">
                  <span>Vendor</span>
                  <span>Status</span>
                  <span>Amount</span>
                  <span>Action</span>
                </div>
                {purchases.map((row) => (
                  <div key={row.vendor} className="table-row">
                    <span>{row.vendor}</span>
                    <span>{row.status}</span>
                    <span>{row.amount}</span>
                    <button className="ghost-button">Open</button>
                  </div>
                ))}
              </div>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Payments</p>
              <div className="receipt-row">
                <span>Outstanding</span>
                <span>PKR 2.1M</span>
              </div>
              <div className="receipt-row">
                <span>Paid (MTD)</span>
                <span>PKR 4.4M</span>
              </div>
              <button className="primary-button">Record Payment</button>
            </GlassCard>
          </div>
        </section>

        <section id="expenses" className="section">
          <SectionHeader
            title="Expenses Tracking"
            subtitle="Utility bills, maintenance, and receipt attachments."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Add Expense</p>
              <div className="field-grid">
                <div>
                  <label>Category</label>
                  <input placeholder="Utilities / Maintenance" />
                </div>
                <div>
                  <label>Amount</label>
                  <input placeholder="PKR" />
                </div>
                <div>
                  <label>Attach Receipt</label>
                  <input placeholder="Upload photo" />
                </div>
                <div>
                  <label>Approved By</label>
                  <input placeholder="Manager" />
                </div>
              </div>
              <button className="primary-button">Submit Expense</button>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Expense Summary</p>
              <div className="receipt-row">
                <span>MTD Utilities</span>
                <span>PKR 98,000</span>
              </div>
              <div className="receipt-row">
                <span>Maintenance</span>
                <span>PKR 42,000</span>
              </div>
              <div className="receipt-row total">
                <span>Approved</span>
                <span>PKR 214,000</span>
              </div>
            </GlassCard>
          </div>
        </section>

        <section id="attendance-&-payroll" className="section">
          <SectionHeader
            title="Attendance & Payroll"
            subtitle="Check-in/out, payroll processing, and performance rankings."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Attendance</p>
              <div className="table">
                <div className="table-row header">
                  <span>Employee</span>
                  <span>Shift</span>
                  <span>Status</span>
                  <span>Performance</span>
                </div>
                <div className="table-row">
                  <span>Ali Attendant</span>
                  <span>A</span>
                  <span className="pill">Checked In</span>
                  <span>#1 in Sales</span>
                </div>
                <div className="table-row">
                  <span>Saad Manager</span>
                  <span>A</span>
                  <span className="pill">Checked In</span>
                  <span>Shift Lead</span>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Payroll Snapshot</p>
              <div className="receipt-row">
                <span>Monthly Salary</span>
                <span>PKR 85,000</span>
              </div>
              <div className="receipt-row">
                <span>Advance Paid</span>
                <span>PKR 12,000</span>
              </div>
              <div className="receipt-row total">
                <span>Net Payable</span>
                <span>PKR 73,000</span>
              </div>
            </GlassCard>
          </div>
        </section>

        <section id="reports" className="section">
          <SectionHeader
            title="Reports"
            subtitle="Automated daily reporting with PDF/Excel export."
          />
          <div className="report-grid">
            {reports.map((report) => (
              <GlassCard key={report}>
                <p className="card-title">{report}</p>
                <p className="caption">Auto-generated · Schedule at 6:00 PM</p>
                <button className="ghost-button">Export PDF</button>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="price-management" className="section">
          <SectionHeader
            title="Price Management"
            subtitle="Fuel price revisions with effective dates and audit log."
          />
          <GlassCard>
            <div className="table">
              <div className="table-row header">
                <span>Date</span>
                <span>Fuel</span>
                <span>Price</span>
                <span>Action</span>
              </div>
              {priceHistory.map((row) => (
                <div key={`${row.date}-${row.fuel}`} className="table-row">
                  <span>{row.date}</span>
                  <span>{row.fuel}</span>
                  <span>{row.price}</span>
                  <button className="ghost-button">Audit</button>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section id="bank-&-finance" className="section">
          <SectionHeader
            title="Bank & Finance"
            subtitle="Deposits, reconciliations, and bank statement matching."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Bank Deposits</p>
              <div className="receipt-row">
                <span>Today Deposits</span>
                <span>PKR 320,000</span>
              </div>
              <div className="receipt-row">
                <span>Pending Deposit</span>
                <span>PKR 90,000</span>
              </div>
              <button className="primary-button">Record Deposit</button>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Reconciliation Status</p>
              <div className="receipt-row">
                <span>Matched</span>
                <span>92%</span>
              </div>
              <div className="receipt-row total">
                <span>Variance</span>
                <span>PKR 18,000</span>
              </div>
              <button className="ghost-button">Open Reconciliation</button>
            </GlassCard>
          </div>
        </section>

        <section id="cloud-&-devices" className="section">
          <SectionHeader
            title="Cloud Backup & Multi-Device Access"
            subtitle="Encrypted backups, session control, and owner mobile view."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Backup Center</p>
              <div className="receipt-row">
                <span>Last Sync</span>
                <span>2 mins ago</span>
              </div>
              <div className="receipt-row">
                <span>Backup Frequency</span>
                <span>Every 15 mins</span>
              </div>
              <button className="primary-button">Force Backup Now</button>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Active Sessions</p>
              <div className="status-list">
                {deviceSessions.map((session) => (
                  <div key={session.device}>
                    <p>{session.device}</p>
                    <span className="caption">{session.status}</span>
                  </div>
                ))}
              </div>
              <button className="ghost-button">Revoke Device</button>
            </GlassCard>
          </div>
        </section>

        <section id="mobile-integration" className="section">
          <SectionHeader
            title="Mobile App Integration"
            subtitle="Owner dashboard, push notifications, and offline-friendly mode."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Push Notifications</p>
              <div className="metric-row">
                <span>Critical Alerts</span>
                <strong>Enabled</strong>
              </div>
              <div className="metric-row">
                <span>Daily Report</span>
                <strong>6:00 PM</strong>
              </div>
              <button className="primary-button">Configure Alerts</button>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Offline-Friendly Mode</p>
              <div className="metric-row">
                <span>Status</span>
                <strong>Sync Ready</strong>
              </div>
              <div className="metric-row">
                <span>Queued Transactions</span>
                <strong>3</strong>
              </div>
              <Tag tone="info">Auto-sync on network</Tag>
            </GlassCard>
          </div>
        </section>

        <section id="settings" className="section">
          <SectionHeader
            title="Settings (Roles & Permissions)"
            subtitle="Granular access control with audit logs."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Roles</p>
              <div className="table">
                <div className="table-row header">
                  <span>Role</span>
                  <span>Access</span>
                  <span>Status</span>
                  <span>Action</span>
                </div>
                <div className="table-row">
                  <span>Owner</span>
                  <span>Full</span>
                  <span className="pill">Active</span>
                  <button className="ghost-button">Edit</button>
                </div>
                <div className="table-row">
                  <span>Manager</span>
                  <span>Operations + Finance</span>
                  <span className="pill">Active</span>
                  <button className="ghost-button">Edit</button>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Audit Logs</p>
              <div className="audit">
                <p>10:32 AM · Price updated (Petrol)</p>
                <p>09:50 AM · Credit limit change (NLC Logistics)</p>
                <p>08:15 AM · Shift opened (A)</p>
              </div>
            </GlassCard>
          </div>
        </section>

        <section id="alerts-center" className="section">
          <SectionHeader
            title="Alerts Center"
            subtitle="Operational alerts, predictive insights, and acknowledgements."
          />
          <GlassCard>
            <div className="alerts">
              {alerts.map((alert) => (
                <div key={alert.title} className={`alert ${alert.tone}`}>
                  <div>
                    <p className="alert-title">{alert.title}</p>
                    <p className="alert-detail">{alert.detail}</p>
                  </div>
                  <button className="ghost-button">Acknowledge</button>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section id="complaints-&-feedback" className="section">
          <SectionHeader
            title="Complaints & Feedback"
            subtitle="Ticketing workflow with status tracking and resolution notes."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">New Ticket</p>
              <label>Complaint Type</label>
              <input placeholder="Fuel Quality / Service" />
              <label>Description</label>
              <textarea placeholder="Add issue details"></textarea>
              <button className="primary-button">Create Ticket</button>
            </GlassCard>
            <GlassCard>
              <p className="card-title">Active Tickets</p>
              <div className="table">
                <div className="table-row header">
                  <span>Ticket</span>
                  <span>Status</span>
                  <span>Priority</span>
                  <span>Owner</span>
                </div>
                <div className="table-row">
                  <span>#CMP-1043</span>
                  <span className="pill">In Review</span>
                  <span>High</span>
                  <span>Manager</span>
                </div>
                <div className="table-row">
                  <span>#CMP-1042</span>
                  <span className="pill">Resolved</span>
                  <span>Normal</span>
                  <span>Supervisor</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        <section id="bank-reconciliation" className="section">
          <SectionHeader
            title="Bank Reconciliation"
            subtitle="Match deposits with system records (بینک میں جمع رقم اور سسٹم کا موازنہ)."
          />
          <div className="grid-two">
            <GlassCard>
              <p className="card-title">Bank Statement</p>
              <div className="table">
                <div className="table-row header">
                  <span>Date</span>
                  <span>Amount</span>
                  <span>Status</span>
                  <span>Action</span>
                </div>
                <div className="table-row">
                  <span>09 Aug</span>
                  <span>PKR 320,000</span>
                  <span className="pill">Matched</span>
                  <button className="ghost-button">View</button>
                </div>
                <div className="table-row">
                  <span>10 Aug</span>
                  <span>PKR 290,000</span>
                  <span className="pill">Pending</span>
                  <button className="ghost-button">Match</button>
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <p className="card-title">System Deposits</p>
              <div className="table">
                <div className="table-row header">
                  <span>Shift</span>
                  <span>Amount</span>
                  <span>Match</span>
                  <span>Status</span>
                </div>
                <div className="table-row">
                  <span>Shift A</span>
                  <span>PKR 320,000</span>
                  <button className="ghost-button">Link</button>
                  <span className="pill">OK</span>
                </div>
                <div className="table-row">
                  <span>Shift B</span>
                  <span>PKR 290,000</span>
                  <button className="ghost-button">Link</button>
                  <span className="pill">Pending</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </div>

      <nav className="mobile-nav">
        {[
          "Home",
          "POS",
          "Shifts",
          "New Sale",
          "Inventory",
          "Reports",
        ].map((item) => (
          <button
            key={item}
            className={`mobile-link ${item === "New Sale" ? "primary" : ""}`}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}
