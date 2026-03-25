# MBX LMS — Next.js + Supabase + Vercel

Plataforma de aprendizado com área pública institucional e dashboard autenticado.

## 🗂 Estrutura do Projeto

```
mbx-lms/
├── src/
│   ├── app/
│   │   ├── page.tsx                    ← / (site institucional)
│   │   ├── layout.tsx                  ← Root layout
│   │   ├── globals.css                 ← Design tokens + globals
│   │   └── dashboard/
│   │       ├── layout.tsx              ← Layout autenticado (valida sessão)
│   │       ├── page.tsx                ← /dashboard (Início)
│   │       ├── calendario/page.tsx     ← /dashboard/calendario
│   │       ├── aulas/page.tsx          ← /dashboard/aulas
│   │       ├── avaliacoes/page.tsx     ← /dashboard/avaliacoes
│   │       ├── cursos/page.tsx         ← /dashboard/cursos
│   │       ├── financeiro/page.tsx     ← /dashboard/financeiro
│   │       ├── serie/page.tsx          ← /dashboard/serie
│   │       ├── biblioteca/page.tsx     ← /dashboard/biblioteca
│   │       └── indicacao/page.tsx      ← /dashboard/indicacao
│   ├── components/
│   │   ├── MbxLogo.tsx                 ← SVG logo reutilizável
│   │   ├── LoginModal.tsx              ← Modal de login (Supabase Auth)
│   │   ├── Sidebar.tsx                 ← Sidebar com todos os ícones
│   │   └── Topbar.tsx                  ← Topbar com notificações e perfil
│   ├── lib/supabase/
│   │   ├── client.ts                   ← Client-side Supabase
│   │   └── server.ts                   ← Server-side Supabase (SSR)
│   ├── types/
│   │   └── database.ts                 ← Tipos TypeScript das tabelas
│   └── middleware.ts                   ← Proteção de rotas /dashboard
├── supabase/migrations/
│   └── 001_initial_schema.sql          ← Tabelas + RLS + seed data
├── .env.local                          ← Variáveis locais (não committar!)
├── .env.example                        ← Template de variáveis
└── next.config.ts
```

---

## 🚀 Passo a Passo: Deploy Completo

### 1. Supabase (Backend)

#### 1.1 Criar projeto
1. Acesse [supabase.com](https://supabase.com) e clique em **New Project**
2. Escolha nome, senha forte e região (South America - São Paulo)
3. Aguarde o projeto inicializar (~2 min)

#### 1.2 Rodar a migration
1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Cole o conteúdo de `supabase/migrations/001_initial_schema.sql`
4. Clique em **Run** ✓

#### 1.3 Copiar as chaves
Vá em **Project Settings → API** e copie:
- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 1.4 Configurar Auth
Vá em **Authentication → URL Configuration** e adicione:
- **Site URL:** `https://seu-projeto.vercel.app`
- **Redirect URLs:** `https://seu-projeto.vercel.app/**`

---

### 2. GitHub (Repositório)

```bash
# Clone ou crie o repo
git init
git add .
git commit -m "feat: initial MBX LMS setup"

# Crie repo no GitHub e conecte
git remote add origin https://github.com/SEU_USUARIO/mbx-lms.git
git branch -M main
git push -u origin main
```

> ⚠️ **Nunca commite** `.env.local` — ele está no `.gitignore`

---

### 3. Vercel (Frontend)

#### 3.1 Importar projeto
1. Acesse [vercel.com](https://vercel.com) → **Add New Project**
2. Importe o repositório `mbx-lms` do GitHub
3. Framework: **Next.js** (detectado automaticamente)

#### 3.2 Variáveis de ambiente
Em **Environment Variables**, adicione:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` |
| `NEXT_PUBLIC_SITE_URL` | `https://seu-projeto.vercel.app` |

#### 3.3 Deploy
Clique em **Deploy** e aguarde. Pronto! 🎉

---

### 4. Desenvolvimento local

```bash
# 1. Instale as dependências
npm install

# 2. Configure as variáveis
cp .env.example .env.local
# Edite .env.local com suas chaves do Supabase

# 3. Rode o servidor
npm run dev
# → http://localhost:3000
```

---

## 🔐 Fluxo de Autenticação

```
/ (página pública)
 └─ Botão "Entrar" → LoginModal (Supabase Auth)
      └─ Login bem-sucedido → router.push('/dashboard')
           └─ middleware.ts valida sessão em TODAS as rotas /dashboard/*
                └─ Sem sessão → redirect para /?login=1 (abre modal auto)

Topbar → "Sair" → supabase.auth.signOut() → redirect para /
Sidebar → "Sair" → mesma ação
```

---

## 🗄 Tabelas do Supabase

| Tabela | Descrição |
|--------|-----------|
| `profiles` | Perfis dos usuários (criado automaticamente via trigger) |
| `courses` | Catálogo de cursos |
| `enrollments` | Matrículas dos alunos nos cursos |
| `classes` | Aulas de cada curso |
| `class_progress` | Progresso de cada aluno por aula |
| `payments` | Histórico de pagamentos |
| `exams` | Avaliações/provas |
| `exam_results` | Resultados das avaliações |
| `ebooks` | E-books da biblioteca |
| `referrals` | Programa Aluno Indica Aluno |

---

## 🔒 Row Level Security (RLS)

Todas as tabelas têm RLS ativado:
- **Alunos** só veem seus próprios dados
- **Admins** têm acesso total
- **Professores** gerenciam aulas e cursos
- Dados de outros usuários são invisíveis

---

## 📦 Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 15 (App Router) + TypeScript |
| Estilo | Tailwind CSS 3 |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| Deploy Frontend | Vercel |
| Deploy Backend | Supabase Cloud |
| Auth | Supabase Auth (email/senha, magic link) |

---

## 🛠 Próximos Passos

- [ ] Gerar tipos TypeScript atualizados: `npx supabase gen types typescript --project-id SEU_ID > src/types/database.ts`
- [ ] Implementar player de vídeo (Supabase Storage ou Vimeo)
- [ ] Adicionar Supabase Storage para upload de avatares e PDFs
- [ ] Integrar Stripe/Asaas para pagamentos reais
- [ ] Implementar notificações em tempo real com Supabase Realtime
- [ ] Adicionar painel admin completo
