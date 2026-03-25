"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Charts from "@/components/Charts";

import { supabase } from "@/services/supabaseClient";
import { getFinanceData } from "@/services/financeService";
import { processChartData, processCategoryData } from "@/utils/financeUtils";

export default function Dashboard() {
  const [areaData, setAreaData] = useState([]);
  const [pieMonth, setPieMonth] = useState([]);
  const [pieYear, setPieYear] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) return;

      const finance = await getFinanceData(userData.user.id);

      setAreaData(processChartData(finance));

      const currentMonth = new Date().getMonth() + 1;

      const monthData = finance.filter(f => f.mes === currentMonth);

      setPieMonth(processCategoryData(monthData));
      setPieYear(processCategoryData(finance));
    }

    loadData();
  }, []);

  return (
    <ProtectedRoute>
      <Header />
      <Sidebar />

      <main className="ml-20 mt-16 p-6">
        <h1 className="text-2xl mb-6">Dashboard</h1>

        <Charts
          areaData={areaData}
          pieMonth={pieMonth}
          pieYear={pieYear}
        />
      </main>
    </ProtectedRoute>
  );
}
