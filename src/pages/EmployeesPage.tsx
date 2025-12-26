import React, { useState } from "react";
import { useStore } from "../store/StoreContext";

export default function EmployeesPage() {
  const { state, dispatch } = useStore();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [attendanceEmployee, setAttendanceEmployee] = useState(state.employees[0]?.id ?? "");

  const handleAddEmployee = () => {
    if (!name || !role) return;
    dispatch({
      type: "ADD_EMPLOYEE",
      payload: {
        id: crypto.randomUUID(),
        name,
        role,
        salesPerformance: 0,
        attendance: [],
      },
    });
    setName("");
    setRole("");
  };

  const handleAttendance = (status: "present" | "absent") => {
    if (!attendanceEmployee) return;
    dispatch({
      type: "ADD_ATTENDANCE",
      payload: {
        employeeId: attendanceEmployee,
        attendance: { date: new Date().toISOString().slice(0, 10), status },
      },
    });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Employees & Attendance</h1>
        <p className="text-sm text-slate-500">Track staff and sales performance.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-card p-6 space-y-3">
          <h2 className="text-sm font-semibold">Add Employee</h2>
          <input
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            placeholder="Employee name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            placeholder="Role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
          <button
            className="rounded-2xl bg-royal px-4 py-2 text-sm font-semibold text-white"
            onClick={handleAddEmployee}
          >
            Save Employee
          </button>
        </div>

        <div className="glass-card p-6 space-y-3">
          <h2 className="text-sm font-semibold">Mark Attendance</h2>
          <select
            className="w-full rounded-xl border border-white/70 bg-white/70 px-3 py-2"
            value={attendanceEmployee}
            onChange={(event) => setAttendanceEmployee(event.target.value)}
          >
            {state.employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
          <div className="flex gap-3">
            <button
              className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => handleAttendance("present")}
            >
              Present
            </button>
            <button
              className="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white"
              onClick={() => handleAttendance("absent")}
            >
              Absent
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold">Team</h2>
        <div className="mt-4 space-y-3">
          {state.employees.map((employee) => (
            <div key={employee.id} className="rounded-2xl bg-white/70 p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{employee.name}</span>
                <span>{employee.role}</span>
              </div>
              <p className="text-xs text-slate-500">
                Performance PKR {employee.salesPerformance.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
