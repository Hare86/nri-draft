create type public.app_role as enum ('admin','editor','viewer');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.can_edit(_user_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role in ('admin','editor'))
$$;

create policy "users read own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "admins manage roles" on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now()
);
grant select on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "profiles readable by editors" on public.profiles for select to authenticated
  using (id = auth.uid() or public.can_edit(auth.uid()));
create policy "own profile update" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name',''))
  on conflict (id) do nothing;
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create table public.site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid
);
grant select on public.site_content to anon;
grant select, insert, update, delete on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "public read content" on public.site_content for select to anon using (true);
create policy "auth read content" on public.site_content for select to authenticated using (true);
create policy "editors write content" on public.site_content for all to authenticated
  using (public.can_edit(auth.uid())) with check (public.can_edit(auth.uid()));

create table public.media (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null,
  url text not null,
  alt text not null default '',
  caption text not null default '',
  created_at timestamptz not null default now(),
  created_by uuid
);
grant select on public.media to anon;
grant select, insert, update, delete on public.media to authenticated;
grant all on public.media to service_role;
alter table public.media enable row level security;
create policy "public read media" on public.media for select to anon using (true);
create policy "auth read media" on public.media for select to authenticated using (true);
create policy "editors write media" on public.media for all to authenticated
  using (public.can_edit(auth.uid())) with check (public.can_edit(auth.uid()));

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null default '',
  message text not null,
  created_at timestamptz not null default now(),
  handled boolean not null default false
);
grant insert on public.contact_messages to anon;
grant select, insert, update, delete on public.contact_messages to authenticated;
grant all on public.contact_messages to service_role;
alter table public.contact_messages enable row level security;
create policy "anyone can submit" on public.contact_messages for insert to anon with check (true);
create policy "auth can submit" on public.contact_messages for insert to authenticated with check (true);
create policy "editors read messages" on public.contact_messages for select to authenticated
  using (public.can_edit(auth.uid()));
create policy "editors update messages" on public.contact_messages for update to authenticated
  using (public.can_edit(auth.uid())) with check (public.can_edit(auth.uid()));
create policy "editors delete messages" on public.contact_messages for delete to authenticated
  using (public.can_edit(auth.uid()));