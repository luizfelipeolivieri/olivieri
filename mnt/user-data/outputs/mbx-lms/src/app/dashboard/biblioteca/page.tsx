export default function BibliotecaPage() {
  const books = [
    { icon: '📘', title: 'Fundamentos de Estratégia',     author: 'Porter, M.',           size: '8.4 MB', bg: '#F5F3EE' },
    { icon: '📗', title: 'Gestão de Pessoas na Era Digital', author: 'Chiavenato, I.',     size: '5.1 MB', bg: '#EEF4FF' },
    { icon: '📙', title: 'Finanças Corporativas',          author: 'Damodaran, A.',        size: '12.3 MB', bg: '#EDFAF3' },
    { icon: '📒', title: 'Marketing Digital Avançado',     author: 'Kotler, P.',           size: '4.8 MB', bg: '#FFF3EC' },
    { icon: '📓', title: 'Inovação Disruptiva',            author: 'Christensen, C.',      size: '6.2 MB', bg: '#F5EEFF' },
    { icon: '📔', title: 'Liderança Situacional',          author: 'Hersey & Blanchard',   size: '3.5 MB', bg: '#FFFBF0' },
  ]
  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-[26px] font-bold tracking-tight mb-1">Biblioteca Digital</h1>
      <p className="text-sm text-[var(--text-3)] mb-6">Acervo completo de e-books, artigos e materiais</p>
      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="flex items-center gap-2.5 bg-white border-[1.5px] border-[var(--border)] rounded-xl px-4 py-2.5 flex-1 focus-within:border-[var(--text)] transition-colors">
          <span className="text-[var(--text-3)]">🔍</span>
          <input type="text" placeholder="Buscar por título, autor ou tema..." className="flex-1 text-sm outline-none bg-transparent text-[var(--text)] placeholder-[var(--text-3)]"/>
        </div>
        <button className="px-4 py-2.5 border-[1.5px] border-[var(--border)] rounded-xl text-[13px] font-semibold text-[var(--text)] hover:border-[var(--text-3)] transition-colors bg-white">
          Filtrar ▾
        </button>
      </div>
      <p className="text-[13px] text-[var(--text-3)] mb-4">Mostrando {books.length} de 247 materiais</p>
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
        {books.map(b => (
          <div key={b.title} className="bg-white border border-[var(--border)] rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-[var(--shadow)] transition-all cursor-pointer">
            <div className="h-[130px] flex items-center justify-center text-4xl" style={{ background: b.bg }}>{b.icon}</div>
            <div className="p-3.5">
              <h5 className="text-[13px] font-bold leading-snug mb-1 tracking-tight">{b.title}</h5>
              <p className="text-[11px] text-[var(--text-3)] mb-3">{b.author}</p>
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-[var(--text-3)]">{b.size}</span>
                <span className="text-[13px] text-[var(--text-3)] hover:text-[var(--text)] cursor-pointer">↓</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
