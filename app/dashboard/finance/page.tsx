"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import PermissionGuard from "@/components/PermissionGuard";

import { supabase } from "@/services/supabaseClient";
import { getFinanceData, upsertFinance } from "@/services/financeService";
import { financeStructure } from "@/utils/financeStructure";

const months = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

export default function Finance() {
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      setUser(userData.user);

      const finance = await getFinanceData(userData.user.id);
      setData(finance);
    }

    load();
  }, []);

  function getValue(cat: string, sub: string, monthIndex: number) {
    const item = data.find(
      d =>
        d.categoria === cat &&
        d.subcategoria === sub &&
        d.mes === monthIndex + 1
    );

    return item?.valor || 0;
  }

  async function handleChange(cat: string, sub: string, monthIndex: number, value: string) {
    const numericValue = Number(value) || 0;

    await upsertFinance({
      user_id: user.id,
      categoria: cat,
      subcategoria: sub,
      mes: monthIndex + 1,
      ano: 2026,
      valor: numericValue
    });

    const updated = await getFinanceData(user.id);
    setData(updated);
  }

  function sumCategory(cat: string, monthIndex: number) {
    return data
      .filter(d => d.categoria === cat && d.mes === monthIndex + 1)
      .reduce((acc, item) => acc + Number(item.valor), 0);
  }

  function sumTotalYear() {
    return data.reduce((acc, item) => acc + Number(item.valor), 0);
  }

  return (
    <ProtectedRoute>
      <Header />
      <Sidebar />

      <main className="ml-20 mt-16 p-6 overflow-auto">

        {/* 🔐 PROTEÇÃO POR PERMISSÃO */}
        <PermissionGuard page="finance">

          <h1 className="text-2xl mb-6">Financeiro</h1>

          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="p-2">Despesas</th>
                {months.map((m, i) => (
                  <th key={i}>{m}-26</th>
                ))}
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {financeStructure.map((cat, i) => (
                <>
                  <tr key={i} className="bg-slate-700">
                    <td className="p-2 font-bold">{cat.categoria}</td>
                    {months.map((_, m) => (
                      <td key={m}>
                        {sumCategory(cat.categoria, m)}
                      </td>
                    ))}
                    <td>—</td>
                  </tr>

                  {cat.sub.map((sub, j) => (
                    <tr key={j}>
                      <td className="pl-6">{sub}</td>

                      {months.map((_, m) => (
                        <td key={m}>
                          <input
                            className="w-20 bg-slate-800 p-1"
                            defaultValue={getValue(cat.categoria, sub, m)}
                            onBlur={(e) =>
                              handleChange(cat.categoria, sub, m, e.target.value)
                            }
                          />
                        </td>
                      ))}

                      <td>
                        {months.reduce(
                          (acc, _, m) =>
                            acc + getValue(cat.categoria, sub, m),
                          0
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>

            <tfoot>
              <tr className="bg-slate-800">
                <td>Total Geral</td>
                {months.map((_, m) => (
                  <td key={m}>
                    {data
                      .filter(d => d.mes === m + 1)
                      .reduce((acc, item) => acc + Number(item.valor), 0)}
                  </td>
                ))}
                <td>{sumTotalYear()}</td>
              </tr>
            </tfoot>
          </table>

        </PermissionGuard>

      </main>
    </ProtectedRoute>
  );
}
