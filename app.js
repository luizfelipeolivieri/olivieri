// MBX LMS — Shared Dashboard JS
// All hrefs are relative so GitHub Pages works at any base path

const MBX_SVG = `<svg viewBox="0 0 537 181" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M94.38 73.46C94.07 73.97 93.32 73.97 93.01 73.46L47.88 0H0V180.2H53.54L52.05 90.83L92.52 154.37C93.07 155.23 94.32 155.23 94.87 154.37L135.34 90.83L133.85 180.2H187.39V0H139.51L94.38 73.46Z" fill="#161616"/>
  <path d="M343.9 104.08C340.66 98.11 336.08 93.01 330.29 88.92L324.63 85.3L318.88 82.14L324.17 78.26C327.14 76.09 331.79 70.39L335.7 63.28C337.2 59.04 338.3 54.46C339.15 48.23 339.27 43.59C339.27 34.89 336.85 27.19 332.08 20.71C327.43 14.18 320.52 9.08 311.48 5.5C304.9 2.84 297.13 1.15 288.28 0.46C282.82 0.13 279.95 0.1H195.63V180.28H263.17L347.34 112.83C346.53 109.73 345.38 106.81 343.9 104.08ZM247.11 43.85H268.48C274.63 43.85 279.05 45.15 281.61 47.71C284.34 50.1 285.73 53.3 285.73 57.23C285.73 62.65 283.92 64.7C282.89 66.59 281.08 68.06 278.52 69.07C276.13 70.1 272.92 70.62 268.99 70.62H247.11V43.85ZM292.98 129.75C291.73 132.03 290.07 133.71 287.95 134.89C285.42 136.02 282.71 136.52 279.55 136.52H247.11V107.69H278.26C284.88 108.29 287.27 109.49C289.66 110.52 291.48 112.07 292.68 114.12C294.74 118.43 294.74 121.33C294.74 124.54 294.14 127.37 292.98 129.75Z" fill="#161616"/>
  <path d="M338.54 15.99C344.33 23.87 347.27 33.16 347.27 43.59L382.14 85.06L438.39 39.98L410.16 0.09H319.05C325.55 3.6 332.38 8.68 338.54 15.99Z" fill="#161616"/>
  <path d="M535.97 177.87L478.82 97.11L449.27 138.86L500.95 180.27H535.38C536.27 178.8 535.97 177.87Z" fill="#161616"/>
  <path d="M535.97 2.49C535.38 0.09H500.95L443.02 46.52L388.53 90.18L279.19 177.8C278.17 178.63 278.75 180.28 280.06 180.28H410.16L443.02 133.85L473.92 90.18L535.97 2.49Z" fill="#161616"/>
</svg>`;

// Icons (stroke, 18×18)
const IC = {
  home:     `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>`,
  video:    `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>`,
  exam:     `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"/></svg>`,
  courses:  `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"/></svg>`,
  tcc:      `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/></svg>`,
  financial:`<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`,
  series:   `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"/></svg>`,
  library:  `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>`,
  referral: `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"/></svg>`,
  logout:   `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"/></svg>`,
  inbox:    `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"/></svg>`,
  bell:     `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"/></svg>`,
  help:     `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/></svg>`,
  burger:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>`,
};

// Sidebar nav items — hrefs relative to /dashboard/
const NAV = [
  { icon:'home',     label:'Início',           href:'index.html',       match:'index' },
  { icon:'calendar', label:'Calendário',        href:'calendario.html',  match:'calendario' },
  { icon:'video',    label:'Aulas',             href:'aulas.html',       match:'aulas' },
  { icon:'exam',     label:'Avaliações',        href:'avaliacoes.html',  match:'avaliacoes' },
  { icon:'courses',  label:'Meus Cursos',       href:'cursos.html',      match:'cursos' },
  { icon:'tcc',      label:'Meu TCC',           href:'https://tcc.mbx.academy/', match:'tcc', external:true },
  { icon:'financial',label:'Financeiro',        href:'financeiro.html',  match:'financeiro' },
  { icon:'series',   label:'Série Acadêmica',   href:'serie.html',       match:'serie' },
  { sep: true },
  { icon:'library',  label:'Biblioteca Digital',href:'biblioteca.html',  match:'biblioteca' },
  { icon:'referral', label:'Aluno Indica Aluno',href:'indicacao.html',   match:'indicacao' },
];

// Detect active page from filename
function activePage() {
  const f = window.location.pathname.split('/').pop().replace('.html','') || 'index';
  return f === '' ? 'index' : f;
}

// ── Build Topbar ──
function buildTopbar() {
  const el = document.getElementById('topbar-mount');
  if (!el) return;
  el.className = 'topbar';
  el.innerHTML = `
    <button class="tb-hamburger" id="tb-burger" aria-label="Menu">${IC.burger}</button>
    <a class="tb-logo" href="../index.html">${MBX_SVG}</a>
    <div class="tb-spacer"></div>
    <div class="tb-actions">
      <button class="tb-btn" title="Caixa de Entrada" id="tb-inbox">${IC.inbox}</button>
      <button class="tb-btn" title="Notificações" id="tb-notif" style="position:relative">
        ${IC.bell}<span class="tb-notif-dot"></span>
      </button>
      <button class="tb-btn" title="Apoio e Dicas" id="tb-help">${IC.help}</button>
      <div class="tb-avatar" id="tb-avatar" title="Perfil">L</div>
    </div>`;

  document.getElementById('tb-notif').addEventListener('click', e => {
    e.stopPropagation(); toggleDrop('dp-notif', e.currentTarget, buildNotifPanel);
  });
  document.getElementById('tb-avatar').addEventListener('click', e => {
    e.stopPropagation(); toggleDrop('dp-profile', e.currentTarget, buildProfilePanel);
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('.drop-panel').forEach(p => p.remove());
  });
}

// ── Build Sidebar ──
function buildSidebar() {
  const el = document.getElementById('sidebar-mount');
  if (!el) return;
  el.className = 'sidebar';
  const active = activePage();

  let navHTML = '<div class="sb-nav">';
  NAV.forEach(item => {
    if (item.sep) { navHTML += '<div class="sb-divider"></div>'; return; }
    const isActive = active === item.match;
    const target = item.external ? ' target="_blank" rel="noopener"' : '';
    navHTML += `<a class="sb-item${isActive ? ' active' : ''}" href="${item.href}" data-tip="${item.label}" title="${item.label}"${target}>${IC[item.icon]||''}</a>`;
  });
  navHTML += '</div>';
  navHTML += `<div class="sb-bottom">
    <button class="sb-item" data-tip="Sair" title="Sair" onclick="doLogout()" style="border:none;cursor:pointer">${IC.logout}</button>
  </div>`;
  el.innerHTML = navHTML;
}

// ── Toggle dropdown ──
function toggleDrop(id, anchor, buildFn) {
  const old = document.getElementById(id);
  if (old) { old.remove(); return; }
  const panel = document.createElement('div');
  panel.className = 'drop-panel';
  panel.id = id;
  buildFn(panel);
  document.body.appendChild(panel);
  const r = anchor.getBoundingClientRect();
  panel.style.top  = (r.bottom + 6) + 'px';
  panel.style.right = (window.innerWidth - r.right) + 'px';
}

// ── Notification panel ──
function buildNotifPanel(panel) {
  panel.style.width = '330px';
  panel.innerHTML = `
    <div style="padding:14px 18px;border-bottom:1px solid #E5E5E5;display:flex;align-items:center;justify-content:space-between">
      <strong style="font-size:14px;letter-spacing:-.02em">Notificações</strong>
      <span style="font-size:12px;color:#999;cursor:pointer">Marcar lidas</span>
    </div>
    ${[
      {t:'Nova aula disponível',b:'Módulo 5 — Gestão Avançada foi liberado',ts:'há 2h',u:true},
      {t:'Avaliação em 3 dias',b:'Prova Final de Estratégia Empresarial',ts:'há 1 dia',u:true},
      {t:'Pagamento confirmado',b:'Mensalidade de Março processada',ts:'há 3 dias',u:false},
    ].map(n=>`
      <div style="display:flex;gap:12px;padding:13px 18px;border-bottom:1px solid #F5F5F5;cursor:pointer" onmouseover="this.style.background='#FAFAFA'" onmouseout="this.style.background=''">
        <div style="width:7px;height:7px;border-radius:50%;background:${n.u?'#E84545':'#DDD'};flex-shrink:0;margin-top:5px"></div>
        <div><div style="font-size:13px;font-weight:600;margin-bottom:2px">${n.t}</div><div style="font-size:12px;color:#999">${n.b}</div><div style="font-size:11px;color:#BBB;margin-top:3px">${n.ts}</div></div>
      </div>`).join('')}
    <div style="padding:10px 18px;text-align:center"><a href="#" style="font-size:12px;color:#999;text-decoration:none">Ver todas</a></div>`;
}

// ── Profile panel ──
function buildProfilePanel(panel) {
  panel.style.width = '230px';
  panel.innerHTML = `
    <div style="padding:16px 18px;border-bottom:1px solid #E5E5E5;display:flex;align-items:center;gap:12px">
      <div style="width:38px;height:38px;border-radius:50%;background:#CACAC8;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;color:#666;flex-shrink:0">L</div>
      <div><div style="font-size:14px;font-weight:600;letter-spacing:-.02em">Luiz</div><div style="font-size:12px;color:#999">luiz@mbx.academy</div></div>
    </div>
    <div style="padding:6px 8px">
      ${[['👤','Meu Perfil','#'],['⚙️','Configurações','#'],['🎓','Meus Cursos','cursos.html']].map(([i,l,h])=>`
        <a href="${h}" style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;text-decoration:none;color:#1A1A1A;font-size:13.5px;" onmouseover="this.style.background='#F5F5F5'" onmouseout="this.style.background=''"><span>${i}</span>${l}</a>`).join('')}
      <div style="height:1px;background:#EFEFEF;margin:5px 0"></div>
      <button onclick="doLogout()" style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;color:#C0392B;font-size:13.5px;width:100%;border:none;background:none;cursor:pointer;font-family:inherit" onmouseover="this.style.background='#FFF5F5'" onmouseout="this.style.background=''">← Sair da conta</button>
    </div>`;
}

// ── Logout ──
function doLogout() {
  window.location.href = '../index.html';
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  buildTopbar();
  buildSidebar();
});
