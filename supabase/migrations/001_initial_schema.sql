create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  slug text not null unique,
  title text not null,
  purpose text not null check (purpose in ('buy', 'rent')),
  property_type text not null check (property_type in ('house', 'condo', 'land', 'shophouse')),
  province text not null,
  district text not null,
  subdistrict text,
  location_text text not null,
  address_text text,
  price numeric(14,2) not null,
  land_area_sqw numeric(10,2),
  usable_area_sqm numeric(10,2),
  floor_count integer,
  bedrooms integer,
  bathrooms integer,
  parking integer,
  highlights text[] not null default '{}',
  short_description text,
  full_description text not null,
  map_url text,
  line_message text,
  is_featured boolean not null default false,
  is_latest boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'sold', 'rented')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  image_url text not null,
  sort_order integer not null default 0,
  alt_text text,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  inquiry_type text not null,
  source_page text,
  property_id uuid references public.properties(id) on delete set null,
  name text not null,
  phone text not null,
  email text,
  line_id text,
  message text not null,
  payload jsonb,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_status_idx on public.properties(status);
create index if not exists properties_purpose_idx on public.properties(purpose);
create index if not exists properties_province_idx on public.properties(province);
create index if not exists property_images_property_id_idx on public.property_images(property_id);
create index if not exists inquiries_property_id_idx on public.inquiries(property_id);
create index if not exists articles_published_idx on public.articles(is_published, published_at);
create index if not exists faqs_published_idx on public.faqs(is_published, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger properties_set_updated_at
before update on public.properties
for each row execute function public.set_updated_at();

create trigger articles_set_updated_at
before update on public.articles
for each row execute function public.set_updated_at();

create trigger faqs_set_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();

create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.inquiries enable row level security;
alter table public.articles enable row level security;
alter table public.faqs enable row level security;
alter table public.site_settings enable row level security;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

create policy "public read published properties"
on public.properties
for select
using (status = 'published');

create policy "public read property images of published properties"
on public.property_images
for select
using (
  exists (
    select 1 from public.properties
    where public.properties.id = property_images.property_id
      and public.properties.status = 'published'
  )
);

create policy "public insert inquiries"
on public.inquiries
for insert
with check (true);

create policy "public read published articles"
on public.articles
for select
using (is_published = true);

create policy "public read published faqs"
on public.faqs
for select
using (is_published = true);

create policy "admins manage properties"
on public.properties
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admins manage property images"
on public.property_images
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admins manage articles"
on public.articles
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admins manage faqs"
on public.faqs
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admins manage site settings"
on public.site_settings
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admins read inquiries"
on public.inquiries
for select
using (public.is_admin_user());
