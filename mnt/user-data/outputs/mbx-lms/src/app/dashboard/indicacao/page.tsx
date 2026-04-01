'use client'

import { useState } from 'react'

export default function IndicacaoPage() {
  const [copied, setCopied] = useState(false)

  function copyCode() {
    navigator.clipboard?.writeText('MBX-USER21').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const referrals = [
    { name: 'Mariana Costa', date: '15 Fev 2026', status: 'converted', discount: 'R$ 50,00' },
    { name: 'Felipe Souza',  date: '03 Mar 2026', status: 'converted', discount: 'R$ 50,00' },
    { name: 'Camila Lima',   date: '18 Mar 2026', status: 'pending',   discount: '—' },
  ]

  return (
    <div className="p-8 animate-fade-in max-w-[700px]">
      <h1 className="text-[26px] font-bold tracking-tight mb-1">Aluno Indica Aluno</h1>
      <p className="text-sm text-[var(--text-3)] mb-6">Ganhe descontos indicando amigos para a MBX</p>

      {/* Hero */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-10 text-center mb-5">
        <div className="text-5xl mb-4">🎁</div>
        <h2 className="text-[20px] font-extrabold tracking-tight mb-2.5">Indique e ganhe descontos!</h2>
        <p className="text-[14px] text-[var(--text-2)] leading-[1.7] max-w-[380px] mx-auto mb-6">
          Para cada amigo que se matricular usando seu código, você ganha{' '}
          <strong>R$ 50</strong> de desconto na próxima mensalidade.
        </p>
        <button
          onClick={copyCode}
          className="flex items-center gap-3 bg-[var(--bg)] border-[1.5px] border-dashed border-[var(--border)] rounded-xl px-6 py-3.5 mx-auto cursor-pointer hover:border-[var(--text-3)] transition-colors"
        >
          <span className="text-[20px] font-extrabold tracking-[.12em]">MBX-USER21</span>
          <span className="text-[12px] text-[var(--text-3)] font-medium">
            {copied ? '✓ Copiado!' : '📋 Copiar'}
          </span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[['3','Indicações feitas'],['2','Convertidas'],['R$ 100','Descontos ganhos']].map(([num, label]) => (
          <div key={label} className="bg-white border border-[var(--border)] rounded-xl p-5 text-center">
            <div className="text-[26px] font-extrabold tracking-tight mb-1">{num}</div>
            <div className="text-[12px] text-[var(--text-3)]">{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--border)]">
          <span className="text-[15px] font-bold tracking-tight">Suas indicações</span>
        </div>
        <table className="tbl">
          <thead><tr><th>Amigo</th><th>Data</th><th>Status</th><th>Desconto</th></tr></thead>
          <tbody>
            {referrals.map((r, i) => (
              <tr key={i}>
                <td><strong>{r.name}</strong></td>
                <td>{r.date}</td>
                <td>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${r.status === 'converted' ? 'bg-[#EDFAF3] text-[#1A7A4A]' : 'bg-[#FFF3EC] text-[#C8530A]'}`}>
                    {r.status === 'converted' ? 'Convertido' : 'Pendente'}
                  </span>
                </td>
                <td>{r.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
