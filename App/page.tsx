import { Shell } from "@/components/Shell";

function StatCard({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
            <div className="text-sm opacity-80">{title}</div>
                  <div className="mt-2 text-2xl font-semibold">{value}</div>
                        <div className="mt-1 text-xs opacity-70">{hint}</div>
                            </div>
                              );
                              }

                              export default function Page() {
                                return (
                                    <Shell>
                                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                                  <StatCard title="Open Shift" value="No" hint="Open a shift to start sales & readings" />
                                                          <StatCard title="Today Sales" value="PKR 0.00" hint="Receipts + meter validation" />
                                                                  <StatCard title="Variance" value="PKR 0.00" hint="Expected (meter) vs POS collected" />
                                                                        </div>
                                                                            </Shell>
                                                                              );
                                                                              }