"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Header />
      <Sidebar />

      <main className="ml-20 mt-16 p-6">
        <h1 className="text-2xl mb-6">Dashboard</h1>

        <div className="bg-slate-800 p-6 rounded-xl">
          Aqui vão os gráficos (próxima etapa)
        </div>
      </main>
    </ProtectedRoute>
  );
}
