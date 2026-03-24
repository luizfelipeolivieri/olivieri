# Olivieri LMS — Frontend

Plataforma de aprendizado com área pública institucional e dashboard autenticado.

## 📁 Estrutura de arquivos

```
lumina/
├── index.html                  ← Site institucional (rota /)
└── dashboard/
    ├── style.css               ← CSS compartilhado do dashboard
    ├── app.js                  ← JS compartilhado (topbar, sidebar, logout)
    ├── index.html              ← /dashboard (Início)
    ├── calendario.html         ← /dashboard/calendario
    ├── aulas.html              ← /dashboard/aulas
    ├── avaliacoes.html         ← /dashboard/avaliacoes
    ├── cursos.html             ← /dashboard/cursos
    ├── financeiro.html         ← /dashboard/financeiro
    ├── serie.html              ← /dashboard/serie
    ├── biblioteca.html         ← /dashboard/biblioteca
    └── indicacao.html          ← /dashboard/indicacao
```

## 🚀 Deploy no GitHub Pages

1. Faça upload de todos os arquivos para um repositório GitHub
2. Vá em **Settings → Pages**
3. Source: **Deploy from a branch** → branch `main`, pasta `/ (root)`
4. Acesse: `https://seu-usuario.github.io/nome-do-repo/`

## 🔗 Fluxo de navegação

```
/ (index.html)
  └─ Botão "Entrar" → Modal de login
       └─ Login → /dashboard/index.html
            ├─ Sidebar: Início          → /dashboard/index.html
            ├─ Sidebar: Calendário      → /dashboard/calendario.html
            ├─ Sidebar: Aulas           → /dashboard/aulas.html
            ├─ Sidebar: Avaliações      → /dashboard/avaliacoes.html
            ├─ Sidebar: Meus Cursos     → /dashboard/cursos.html
            ├─ Sidebar: Financeiro      → /dashboard/financeiro.html
            ├─ Sidebar: Série Acadêmica → /dashboard/serie.html
            ├─ Sidebar: Biblioteca      → /dashboard/biblioteca.html
            ├─ Sidebar: Indicação       → /dashboard/indicacao.html
            └─ Logout                   → / (index.html)
```

## 🛠 Próximos passos (Supabase + Vercel)

### Backend (Supabase)
- Autenticação com `supabase.auth.signInWithPassword()`
- Tabelas: `users`, `courses`, `classes`, `enrollments`, `payments`
- Storage: uploads de vídeos e PDFs
- Row Level Security (RLS) por usuário

### Frontend (Vercel + Next.js)
- Migrar os HTMLs para componentes React/Next.js
- Usar `next/router` para as rotas `/dashboard/*`
- Middleware de autenticação com Supabase Auth Helpers
- `getServerSideProps` para dados protegidos

## 🎨 Design System

- **Font:** Inter
- **Cor principal:** `#1A1A1A`
- **Background:** `#F2F2F2`
- **Surface:** `#FFFFFF`
- **Border:** `#E5E5E5`
- **Sidebar:** `64px` de largura, ícones com tooltips
- **Topbar:** `56px` de altura

## 🔐 Login demo

Use qualquer email e senha na tela de login para acessar o dashboard.
