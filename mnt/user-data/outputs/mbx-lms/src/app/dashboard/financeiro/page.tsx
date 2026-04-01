'use client'

import { useState } from 'react'

const PAYMENTS = [
  { desc: 'MBA Gestão — Mar/2026', due: '01/03/2026', paid: '28/02/2026', amount: 'R$ 597,00', status: 'paid' },
  { desc: 'MBA Gestão — Fev/2026', due: '01/02/2026', paid: '29/01/2026', amount: 'R$ 597,00', status: 'paid' },
  { desc: 'MBA Gestão — Jan/2026', due: '01/01/2026', paid: '30/12/2025', amount: 'R$ 597,00', status: 'paid' },
  { desc: 'MBA Gestão — Dez/2025', due: '01/12/2025', paid: '28/11/2025', amount: 'R$ 597,00', status: 'paid' },
  { desc: 'MBA Gestão — Nov/2025', due: '01/11/2025', paid: '31/10/2025', amount: 'R$ 597,00', status: 'paid' },
  { desc: 'MBA Gestão — Out/2025', due: '01/10/2025', paid: '30/09/2025', amount: 'R$ 597,00', status: 'paid' },
  { desc: 'MBA Gestão — Set/2025', due: '01/09/2025', paid: '29/08/2025', amount: 'R$ 597,00', status: 'paid' },
  { desc: 'MBA Gestão — Ago/2025', due: '01/08/2025', paid: '31/07/2025', amount: 'R$ 597,00', status: 'paid' },
  { desc: 'MBA Gestão — Jul/2025', due: '01/07/2025', paid: '30/06/2025', amount: 'R$ 597,00', status: 'paid' },
]

export default function FinanceiroPage() {
  const [tab, setTab] = useState('Mensal')

  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-[26px] font-bold tracking-tight mb-1">Financeiro</h1>
      <p className="text-sm text-[var(--text-3)] mb-6">Histórico de pagamentos e situação financeira</p>

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--border)] p-1 rounded-xl w-fit mb-6">
        {['Mensal','Trimestral','Anual'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${tab === t ? 'bg-white text-[var(--text)] shadow-sm' : 'text-[var(--text-3)] hover:text-[var(--text)]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Pago',          value: 'R$ 5.373', sub: '↑ Em dia',              subCls: 'text-[#1A7A4A]' },
          { label: 'Próximo Vencimento',  value: 'R$ 597',   sub: '📅 01 Abr 2026',       subCls: 'text-[var(--text-3)]' },
          { label: 'Mensalidade Atual',   value: 'R$ 597',   sub: '✓ Pago',                subCls: 'text-[#1A7A4A]' },
        ].map(k => (
          <div key={k.label} className="bg-white border border-[var(--border)] rounded-xl p-5">
            <p className="text-[11px] font-bold tracking-widest uppercase text-[var(--text-3)] mb-1.5">{k.label}</p>
            <p className="text-[26px] font-extrabold tracking-tight mb-1">{k.value}</p>
            <p className={`text-[12px] ${k.subCls}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabela */}
      <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <span className="text-[15px] font-bold tracking-tight">Histórico de Pagamentos</span>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EDFAF3] text-[#1A7A4A]">Em dia</span>
        </div>
        <div className="overflow-x-auto">
          <table className="tbl">
            <thead><tr><th>Descrição</th><th>Vencimento</th><th>Pagamento</th><th>Valor</th><th>Status</th></tr></thead>
            <tbody>
              {PAYMENTS.map((p, i) => (
                <tr key={i}>
                  <td>{p.desc}</td><td>{p.due}</td><td>{p.paid}</td>
                  <td><strong>{p.amount}</strong></td>
                  <td><span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#EDFAF3] text-[#1A7A4A]">Pago</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
