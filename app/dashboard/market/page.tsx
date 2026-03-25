"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

import { supabase } from "@/services/supabaseClient";
import { getMarketData, upsertMarket } from "@/services/marketService";
import { marketStructure } from "@/utils/marketStructure";
import { getPrice, getIndicator } from "@/utils/marketUtils";

const supermercados = ["Assaí", "Atacadão", "Carrefour"];

export default function Market() {
  const [user, setUser] = useState<any>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      setUser(userData.user);

      const market = await getMarketData(userData.user.id);
      setData(market);
    }

    load();
  }, []);

  async function handleChange(produto: string, mercado: string, value: string) {
    await upsertMarket({
      user_id: user.id,
      produto,
      supermercado: mercado,
      preco: Number(value)
    });

    const updated = await getMarketData(user.id);
    setData(updated);
  }

  return (
    <ProtectedRoute>
      <Header />
      <Sidebar />

      <main className="ml-20 mt-16 p-6 overflow-auto">
        <h1 className="text-2xl mb-6">Mercado</h1>

        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th>Produto</th>
              {supermercados.map((m) => (
                <th key={m}>{m}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {marketStructure.map((cat, i) => (
              <>
                <tr key={i} className="bg-slate-700">
                  <td colSpan={supermercados.length + 1}>
                    {cat.categoria}
                  </td>
                </tr>

                {cat.produtos.map((p, j) => {
                  const valores = supermercados.map(m =>
                    getPrice(data, p.nome, m)
                  );

                  return (
                    <tr key={j}>
                      <td>
                        {p.nome} ({p.quantidade})
                      </td>

                      {supermercados.map((m, idx) => {
                        const valor = valores[idx];
                        const indicador = getIndicator(valor, valores);

                        return (
                          <td key={m}>
                            <input
                              className="w-20 bg-slate-800 p-1"
                              defaultValue={valor}
                              onBlur={(e) =>
                                handleChange(p.nome, m, e.target.value)
                              }
                            />

                            <span
                              className={
                                indicador === "▼"
                                  ? "text-green-400"
                                  : "text-red-400"
                              }
                            >
                              {indicador}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </>
            ))}
          </tbody>
        </table>
      </main>
    </ProtectedRoute>
  );
}
