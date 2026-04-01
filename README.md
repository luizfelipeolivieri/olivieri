# 🚀 Meu Site — Guia Passo a Passo

Site com login via Supabase, painel com menu fixo no topo e sidebar lateral.

---

## 📁 Estrutura do Projeto

```
meu-site/
├── app/
│   ├── page.tsx              ← Tela de Login
│   ├── layout.tsx            ← Layout raiz
│   ├── globals.css           ← Estilos globais
│   ├── auth/callback/        ← Rota de autenticação
│   └── dashboard/
│       ├── layout.tsx        ← Menu topo + sidebar
│       └── page.tsx          ← Página principal do painel
├── lib/supabase/
│   ├── client.ts             ← Cliente Supabase (browser)
│   └── server.ts             ← Cliente Supabase (servidor)
├── middleware.ts              ← Proteção de rotas
├── .env.local                ← Variáveis de ambiente (NÃO vai pro GitHub)
└── .env.local.example        ← Exemplo das variáveis (vai pro GitHub)
```

---

## ✅ PASSO 1 — Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e entre no seu projeto
2. No menu lateral, clique em **Authentication → Users**
3. Clique em **"Add user"** → **"Create new user"**
4. Preencha um **e-mail** e uma **senha** e clique em **"Create User"**
   > Esse será o usuário de teste para fazer login no site

---

## ✅ PASSO 2 — Instalar o Node.js (se não tiver)

1. Acesse [nodejs.org](https://nodejs.org)
2. Baixe a versão **LTS** (recomendada) e instale normalmente
3. Para verificar se funcionou, abra o **Terminal** (no Windows: `cmd` ou `PowerShell`) e digite:
   ```
   node -v
   ```
   Deve aparecer algo como `v20.x.x`

---

## ✅ PASSO 3 — Instalar o Git (se não tiver)

1. Acesse [git-scm.com](https://git-scm.com) e baixe para o seu sistema
2. Instale com as opções padrão
3. Verifique no terminal:
   ```
   git --version
   ```

---

## ✅ PASSO 4 — Subir o projeto no GitHub

### 4.1 — Crie uma conta no GitHub (se não tiver)
- Acesse [github.com](https://github.com) e crie uma conta gratuita

### 4.2 — Crie um repositório novo
1. Clique no botão verde **"New"** (ou acesse github.com/new)
2. Dê um nome ao repositório, ex: `meu-site`
3. Deixe como **Public** ou **Private** (qualquer um funciona)
4. **NÃO** marque "Add a README file"
5. Clique em **"Create repository"**

### 4.3 — Envie os arquivos
Abra o terminal na pasta do projeto (onde estão os arquivos) e execute:

```bash
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/meu-site.git
git push -u origin main
```

> ⚠️ Substitua `SEU_USUARIO` pelo seu usuário do GitHub e `meu-site` pelo nome do repositório que criou.

---

## ✅ PASSO 5 — Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e crie uma conta **usando o GitHub** (facilita muito)
2. Clique em **"New Project"**
3. Você verá seus repositórios do GitHub — clique em **"Import"** ao lado do `meu-site`
4. Na tela de configuração:
   - **Framework Preset**: já deve detectar `Next.js` automaticamente
   - Clique em **"Environment Variables"** e adicione:

     | Nome | Valor |
     |------|-------|
     | `NEXT_PUBLIC_SUPABASE_URL` | `https://zgstzbthnzrygxgaleqm.supabase.co` |
     | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (sua chave completa) |

5. Clique em **"Deploy"**
6. Aguarde ~1 minuto — o Vercel vai buildar e publicar seu site
7. No final você receberá uma URL como `https://meu-site-xxx.vercel.app` 🎉

---

## ✅ PASSO 6 — Configurar a URL de Callback no Supabase

Este passo é **obrigatório** para o login funcionar em produção.

1. Acesse seu projeto no Supabase
2. Vá em **Authentication → URL Configuration**
3. Em **"Site URL"**, coloque sua URL do Vercel:
   ```
   https://meu-site-xxx.vercel.app
   ```
4. Em **"Redirect URLs"**, adicione:
   ```
   https://meu-site-xxx.vercel.app/**
   ```
5. Clique em **"Save"**

---

## ✅ PASSO 7 — Testar o site

1. Acesse a URL do Vercel
2. Você verá a **tela de login**
3. Use o e-mail e senha que cadastrou no Passo 1
4. Após o login, será redirecionado para o **painel** com menu no topo e sidebar lateral
5. O botão **"Sair"** no canto superior direito faz logout

---

## 🔧 Rodando localmente (opcional)

Se quiser ver o site na sua máquina antes de publicar:

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` no navegador.

> O arquivo `.env.local` já está configurado com suas credenciais do Supabase.

---

## ❓ Problemas Comuns

| Problema | Solução |
|----------|---------|
| Login não funciona | Verifique se criou um usuário em Supabase → Authentication → Users |
| Erro de redirect | Configure a URL no Supabase → Authentication → URL Configuration |
| Site não carrega no Vercel | Verifique se as variáveis de ambiente foram adicionadas corretamente |
| `npm install` dá erro | Certifique-se de que o Node.js está instalado (`node -v`) |
