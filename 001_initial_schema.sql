-- ═══════════════════════════════════════════════════════════════
--  MBX LMS — Migration inicial
--  Cole no: Supabase Dashboard → SQL Editor → New Query → Run
-- ═══════════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- ── PROFILES ────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text not null,
  full_name   text,
  avatar_url  text,
  role        text not null default 'student'
                  check (role in ('admin','student','teacher')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "profiles: usuário vê o próprio" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles: usuário atualiza o próprio" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles: admin vê todos" on public.profiles
  for select using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Trigger: cria profile ao criar usuário
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id, new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  ) on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger: updated_at automático
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ── COURSES ─────────────────────────────────────────────────────
create table if not exists public.courses (
  id               uuid primary key default uuid_generate_v4(),
  title            text not null,
  description      text,
  thumbnail_url    text,
  instructor_id    uuid references public.profiles(id) on delete set null,
  duration_months  int,
  price_monthly    numeric(10,2),
  status           text not null default 'active'
                       check (status in ('active','draft','archived')),
  created_at       timestamptz not null default now()
);
alter table public.courses enable row level security;
create policy "courses: todos veem ativos" on public.courses
  for select using (status = 'active');
create policy "courses: admin gerencia" on public.courses
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ── ENROLLMENTS ─────────────────────────────────────────────────
create table if not exists public.enrollments (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.profiles(id) on delete cascade not null,
  course_id   uuid references public.courses(id) on delete cascade not null,
  progress    int not null default 0 check (progress between 0 and 100),
  status      text not null default 'active'
                   check (status in ('active','completed','cancelled')),
  enrolled_at timestamptz not null default now(),
  unique (user_id, course_id)
);
alter table public.enrollments enable row level security;
create policy "enrollments: próprias" on public.enrollments
  for select using (auth.uid() = user_id);
create policy "enrollments: atualiza própria" on public.enrollments
  for update using (auth.uid() = user_id);
create policy "enrollments: admin gerencia" on public.enrollments
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ── CLASSES ─────────────────────────────────────────────────────
create table if not exists public.classes (
  id               uuid primary key default uuid_generate_v4(),
  course_id        uuid references public.courses(id) on delete cascade not null,
  title            text not null,
  description      text,
  video_url        text,
  duration_minutes int,
  order_index      int not null default 0,
  module_number    int not null default 1,
  created_at       timestamptz not null default now()
);
alter table public.classes enable row level security;
create policy "classes: alunos matriculados veem" on public.classes
  for select using (
    exists (
      select 1 from public.enrollments e
      where e.user_id = auth.uid() and e.course_id = classes.course_id and e.status = 'active'
    )
  );
create policy "classes: admin/professor gerencia" on public.classes
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','teacher'))
  );

-- ── CLASS PROGRESS ──────────────────────────────────────────────
create table if not exists public.class_progress (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid references public.profiles(id) on delete cascade not null,
  class_id   uuid references public.classes(id) on delete cascade not null,
  completed  bool not null default false,
  watched_at timestamptz,
  unique (user_id, class_id)
);
alter table public.class_progress enable row level security;
create policy "class_progress: próprio" on public.class_progress
  for all using (auth.uid() = user_id);

-- ── PAYMENTS ────────────────────────────────────────────────────
create table if not exists public.payments (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references public.profiles(id) on delete cascade not null,
  course_id   uuid references public.courses(id) on delete cascade not null,
  amount      numeric(10,2) not null,
  status      text not null default 'pending'
                   check (status in ('paid','pending','overdue','cancelled')),
  due_date    date not null,
  paid_at     timestamptz,
  description text,
  created_at  timestamptz not null default now()
);
alter table public.payments enable row level security;
create policy "payments: próprios" on public.payments
  for select using (auth.uid() = user_id);
create policy "payments: admin gerencia" on public.payments
  for all using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ── EXAMS ───────────────────────────────────────────────────────
create table if not exists public.exams (
  id         uuid primary key default uuid_generate_v4(),
  course_id  uuid references public.courses(id) on delete cascade not null,
  title      text not null,
  due_date   timestamptz,
  status     text not null default 'open' check (status in ('open','closed')),
  created_at timestamptz not null default now()
);
alter table public.exams enable row level security;
create policy "exams: alunos matriculados" on public.exams
  for select using (
    exists (
      select 1 from public.enrollments e
      where e.user_id = auth.uid() and e.course_id = exams.course_id
    )
  );

-- ── EXAM RESULTS ────────────────────────────────────────────────
create table if not exists public.exam_results (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references public.profiles(id) on delete cascade not null,
  exam_id      uuid references public.exams(id) on delete cascade not null,
  score        numeric(5,2),
  status       text not null default 'pending'
                    check (status in ('pending','submitted','graded')),
  submitted_at timestamptz,
  unique (user_id, exam_id)
);
alter table public.exam_results enable row level security;
create policy "exam_results: próprios" on public.exam_results
  for select using (auth.uid() = user_id);
create policy "exam_results: cria próprio" on public.exam_results
  for insert with check (auth.uid() = user_id);

-- ── EBOOKS ──────────────────────────────────────────────────────
create table if not exists public.ebooks (
  id           uuid primary key default uuid_generate_v4(),
  course_id    uuid references public.courses(id) on delete set null,
  title        text not null,
  author       text,
  file_url     text not null,
  file_size_mb numeric(6,2),
  pages        int,
  created_at   timestamptz not null default now()
);
alter table public.ebooks enable row level security;
create policy "ebooks: alunos matriculados" on public.ebooks
  for select using (
    course_id is null or
    exists (
      select 1 from public.enrollments e
      where e.user_id = auth.uid() and e.course_id = ebooks.course_id and e.status = 'active'
    )
  );

-- ── REFERRALS ───────────────────────────────────────────────────
create table if not exists public.referrals (
  id              uuid primary key default uuid_generate_v4(),
  referrer_id     uuid references public.profiles(id) on delete cascade not null,
  referred_email  text not null,
  code            text not null unique,
  status          text not null default 'pending' check (status in ('pending','converted')),
  discount_amount numeric(10,2) not null default 50,
  created_at      timestamptz not null default now()
);
alter table public.referrals enable row level security;
create policy "referrals: próprias" on public.referrals
  for select using (auth.uid() = referrer_id);
create policy "referrals: cria própria" on public.referrals
  for insert with check (auth.uid() = referrer_id);

-- ═══════════════════════════════════════════════════════════════
--  SEED (curso exemplo para testar)
-- ═══════════════════════════════════════════════════════════════
insert into public.courses (id, title, description, duration_months, price_monthly, status)
values (
  'a0000000-0000-0000-0000-000000000001',
  'MBA Gestão Empresarial',
  'Formação completa em gestão estratégica, finanças e liderança.',
  18, 597.00, 'active'
) on conflict (id) do nothing;

insert into public.classes (course_id, title, duration_minutes, order_index, module_number)
values
  ('a0000000-0000-0000-0000-000000000001', 'Gestão Estratégica — Fundamentos', 38, 1, 4),
  ('a0000000-0000-0000-0000-000000000001', 'Análise SWOT na Prática',          42, 2, 4),
  ('a0000000-0000-0000-0000-000000000001', 'Canvas de Valor',                   55, 3, 4),
  ('a0000000-0000-0000-0000-000000000001', 'OKRs e Planejamento Estratégico',   47, 4, 4),
  ('a0000000-0000-0000-0000-000000000001', 'Case: Magazine Luiza',              61, 5, 4)
on conflict do nothing;
