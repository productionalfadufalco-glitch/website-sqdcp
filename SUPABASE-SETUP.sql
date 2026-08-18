-- ============================================================
-- S+QDCP Dashboard — PT. ALFA VALVES INDONESIA
-- Jalankan SELURUH script ini di Supabase > SQL Editor > Run.
-- Mode akses: PUBLIC (tanpa login), sesuai pilihan pengguna.
-- ============================================================

create table if not exists public.sqdcp_dashboard (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.sqdcp_dashboard enable row level security;

-- Hapus policy lama agar script aman dijalankan kembali.
drop policy if exists "Public can read S+QDCP dashboard" on public.sqdcp_dashboard;
drop policy if exists "Public can insert S+QDCP dashboard" on public.sqdcp_dashboard;
drop policy if exists "Public can update S+QDCP dashboard" on public.sqdcp_dashboard;

-- PERINGATAN: policy berikut sengaja membuka akses baca/tulis tanpa login.
create policy "Public can read S+QDCP dashboard"
on public.sqdcp_dashboard for select
to anon, authenticated
using (true);

create policy "Public can insert S+QDCP dashboard"
on public.sqdcp_dashboard for insert
to anon, authenticated
with check (true);

create policy "Public can update S+QDCP dashboard"
on public.sqdcp_dashboard for update
to anon, authenticated
using (true)
with check (true);

-- Aktifkan tabel pada Supabase Realtime publication.
do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'sqdcp_dashboard'
  ) then
    alter publication supabase_realtime add table public.sqdcp_dashboard;
  end if;
end $$;

-- Buat record utama jika belum ada.
insert into public.sqdcp_dashboard (id, payload)
values ('pt-alfa-valves-indonesia-main', '{}'::jsonb)
on conflict (id) do nothing;

-- Verifikasi hasil.
select id, updated_at, payload from public.sqdcp_dashboard;
