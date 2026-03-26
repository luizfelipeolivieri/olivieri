# MBX LMS — Next.js + Supabase + Vercel

## Credenciais Supabase configuradas
- **Project URL:** `https://zgstzbthnzrygxgaleqm.supabase.co`
- **Projeto:** `zgstzbthnzrygxgaleqm`

---

## 📁 Estrutura completa de arquivos

```
mbx-lms/
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── .gitignore
├── .env.example                         ← Commitar (sem segredos)
│   ── NÃO commitar: .env.local          ← Só para dev local
├── src/
│   ├── middleware.ts                    ← Protege /dashboard/*
│   ├── types/
│   │   └── database.ts                 ← Tipos TypeScript Supabase
│   ├── lib/supabase/
│   │   ├── client.ts                   ← Supabase no browser
│   │   └── server.ts                   ← Supabase no servidor (SSR)
│   ├── components/
│   │   ├── MbxLogo.tsx                 ← Logo SVG
│   │   ├── LoginModal.tsx              ← Modal login/cadastro
│   │   ├── Sidebar.tsx                 ← Sidebar com ícones
│   │   └── Topbar.tsx                  ← Topbar com notificações
│   └── app/
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.tsx                    ← / site institucional
│       └── dashboard/
│           ├── layout.tsx              ← Valida sessão + monta chrome
│           ├── page.tsx                ← /dashboard (Início)
│           ├── calendario/page.tsx
│           ├── aulas/page.tsx
│           ├── avaliacoes/page.tsx
│           ├── cursos/page.tsx
│           ├── financeiro/page.tsx
│           ├── serie/page.tsx
│           ├── biblioteca/page.tsx
│           └── indicacao/page.tsx
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql      ← Cole no SQL Editor do Supabase
```

---

## 🚀 Passo a Passo Completo (sem terminal)

### PASSO 1 — Supabase: Rodar a Migration

1. Acesse [supabase.com](https://supabase.com) → seu projeto `zgstzbthnzrygxgaleqm`
2. Clique em **SQL Editor** no menu lateral
3. Clique em **New Query**
4. Abra o arquivo `supabase/migrations/001_initial_schema.sql` e copie todo o conteúdo
5. Cole no editor e clique em **Run** ✓

### PASSO 2 — Supabase: Configurar URL de Redirecionamento

1. Vá em **Authentication → URL Configuration**
2. Em **Site URL**, coloque: `https://SEU-PROJETO.vercel.app` (preencha depois do deploy)
3. Em **Redirect URLs**, adicione: `https://SEU-PROJETO.vercel.app/**`
4. Clique em **Save**

---

### PASSO 3 — GitHub: Criar repositório e fazer upload manual

1. Acesse [github.com](https://github.com) → **New repository**
2. Nome: `mbx-lms` → **Public** → **Create repository**
3. Na página do repo, clique em **uploading an existing file**
4. Faça upload de **todos os arquivos** respeitando a estrutura de pastas:

#### ⚠️ Como criar pastas no GitHub (upload manual)
O GitHub não aceita pastas vazias. Para criar a estrutura, ao fazer upload:
- Arraste os arquivos de **cada pasta** separadamente
- O caminho do arquivo define a pasta — ex: ao fazer upload de `src/app/page.tsx`, coloque o caminho completo

**Ordem recomendada de upload** (uma pasta por vez):

| Commit | Arquivos |
|--------|----------|
| `config` | `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.gitignore`, `.env.example` |
| `globals` | `src/app/globals.css`, `src/app/layout.tsx` |
| `lib` | `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts` |
| `middleware` | `src/middleware.ts`, `src/types/database.ts` |
| `components` | `src/components/MbxLogo.tsx`, `src/components/LoginModal.tsx`, `src/components/Sidebar.tsx`, `src/components/Topbar.tsx` |
| `pages` | `src/app/page.tsx`, `src/app/dashboard/layout.tsx`, `src/app/dashboard/page.tsx` |
| `dashboard-pages` | Todas as páginas dentro de `src/app/dashboard/*/page.tsx` |
| `sql` | `supabase/migrations/001_initial_schema.sql` |

---

### PASSO 4 — Vercel: Deploy automático pelo GitHub

1. Acesse [vercel.com](https://vercel.com) → **Add New Project**
2. Clique em **Import Git Repository** → selecione `mbx-lms`
3. Framework: **Next.js** (detectado automaticamente)
4. Em **Environment Variables**, adicione as 3 variáveis:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://zgstzbthnzrygxgaleqm.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnc3R6YnRobnpyeWd4Z2FsZXFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNDAwOTUsImV4cCI6MjA4OTYxNjA5NX0.VuPCZvb44xx1BtkQYCZqmEMy1WNfnAKf8QPhMLsjWBQ` |
| `NEXT_PUBLIC_SITE_URL` | `https://SEU-PROJETO.vercel.app` |

5. Clique em **Deploy** 🎉

---

### PASSO 5 — Atualizar URL no Supabase

Após o deploy, copie a URL gerada pelo Vercel (ex: `mbx-lms-xyz.vercel.app`) e:

1. Volte ao Supabase → **Authentication → URL Configuration**
2. Atualize o **Site URL** e **Redirect URLs** com a URL real do Vercel
3. Salve

---

## 🔐 Como funciona o login

1. Usuário acessa `/` (site institucional)
2. Clica em "Entrar" → abre `LoginModal`
3. Modal chama `supabase.auth.signInWithPassword()`
4. Sucesso → `router.push('/dashboard')`
5. `middleware.ts` valida sessão em **todas** as rotas `/dashboard/*`
6. Sem sessão → redirect para `/?login=1` (abre modal automaticamente)
7. Logout → `supabase.auth.signOut()` → redirect para `/`

## 🗄 Tabelas criadas

`profiles` · `courses` · `enrollments` · `classes` · `class_progress` · `payments` · `exams` · `exam_results` · `ebooks` · `referrals`

Todas com **Row Level Security (RLS)** — cada usuário só vê seus próprios dados.
