"use client";

import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie
} from "recharts";

export default function Charts({ areaData, pieMonth, pieYear }: any) {
  return (
    <div className="grid gap-6">

      {/* 📈 Área */}
      <div className="bg-slate-800 p-6 rounded-xl h-[300px]">
        <ResponsiveContainer>
          <AreaChart data={areaData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area dataKey="receita" />
            <Area dataKey="despesa" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 🍩 Donuts */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieMonth} dataKey="value" nameKey="name" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl h-[300px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieYear} dataKey="value" nameKey="name" />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
