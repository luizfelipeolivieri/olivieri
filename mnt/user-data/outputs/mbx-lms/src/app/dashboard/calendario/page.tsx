'use client'

import { useState } from 'react'

const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

const EVENTS: Record<string, { label: string; color: string }[]> = {
  '2026-3-10': [{ label: 'Aula: Estratégia', color: '#EEF4FF' }],
  '2026-3-15': [{ label: 'Prova Finanças',   color: '#FFF3EC' }],
  '2026-3-25': [{ label: 'TCC: Entrega',      color: '#FFF3EC' }],
  '2026-3-28': [{ label: 'Aula: Marketing',   color: '#EEF4FF' }],
}

export default function CalendarioPage() {
  const [curr, setCurr] = useState(new Date(2026, 2, 1))

  const y = curr.getFullYear()
  const m = curr.getMonth()
  const firstDay = new Date(y, m, 1).getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const prevDays = new Date(y, m, 0).getDate()
  const today = new Date(2026, 2, 25)

  const cells: { day: number; cur: boolean; isToday: boolean; events: { label: string; color: string }[] }[] = []
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevDays - i, cur: false, isToday: false, events: [] })
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${y}-${m + 1}-${d}`
    cells.push({ day: d, cur: true, isToday: y === today.getFullYear() && m === today.getMonth() && d === today.getDate(), events: EVENTS[key] || [] })
  }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) cells.push({ day: d, cur: false, isToday: false, events: [] })

  return (
    <div className="p-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight mb-1">Calendário</h1>
          <p className="text-sm text-[var(--text-3)]">Seus compromissos e eventos acadêmicos</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurr(new Date(y, m - 1, 1))} className="w-8 h-8 border border-[var(--border)] rounded-lg bg-white flex items-center justify-center text-sm hover:bg-[var(--bg)] transition-colors">‹</button>
          <span className="text-[15px] font-semibold min-w-[140px] text-center">{MONTHS[m]} {y}</span>
          <button onClick={() => setCurr(new Date(y, m + 1, 1))} className="w-8 h-8 border border-[var(--border)] rounded-lg bg-white flex items-center justify-center text-sm hover:bg-[var(--bg)] transition-colors">›</button>
        </div>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="grid grid-cols-7 bg-[var(--bg)]">
          {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d => (
            <div key={d} className="py-3 text-center text-[11px] font-bold uppercase tracking-widest text-[var(--text-3)]">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((cell, i) => (
            <div key={i}
              className={`min-h-[90px] p-2.5 border-r border-b border-[var(--border-light)] last:border-r-0 cursor-pointer hover:bg-[#FAFAFA] transition-colors ${!cell.cur ? 'opacity-30' : ''} ${cell.isToday ? 'bg-[#FFFBF0]' : ''}`}
            >
              <span className={`text-[13px] font-semibold w-6 h-6 flex items-center justify-center rounded-full ${cell.isToday ? 'bg-[var(--text)] text-white' : ''}`}>
                {cell.day}
              </span>
              {cell.events.map((ev, j) => (
                <div key={j} className="mt-1 text-[11px] px-1.5 py-0.5 rounded font-medium truncate" style={{ background: ev.color }}>
                  {ev.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
