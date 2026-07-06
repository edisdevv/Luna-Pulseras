-- Ejecuta este script en Supabase: Panel > SQL Editor > New query > pega y "Run".

-- Extensión necesaria para generar UUIDs
create extension if not exists "pgcrypto";

-- Tabla de productos (pulseras)
create table if not exists productos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text not null default '',
  precio integer not null,
  piedra text not null default '',
  imagen_url text not null,
  stock integer not null default 1,
  activo boolean not null default true,
  creado_en timestamptz not null default now()
);

-- Tabla de órdenes (pedidos)
create table if not exists ordenes (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references auth.users (id),
  usuario_email text not null,
  items jsonb not null,
  direccion jsonb not null,
  total integer not null,
  estado text not null default 'pendiente_pago',
  flow_token text,
  flow_order integer,
  creado_en timestamptz not null default now()
);

-- Habilitar Row Level Security
alter table productos enable row level security;
alter table ordenes enable row level security;

-- Cualquier visitante puede LEER los productos activos (catálogo público)
create policy "Productos activos son públicos"
  on productos for select
  using (activo = true);

-- Las órdenes NO son legibles/escribibles directamente desde el navegador:
-- todo pasa por las API routes del servidor, que usan la service_role key
-- y por lo tanto se saltan estas políticas. Esto evita que alguien lea
-- o modifique pedidos ajenos. No se crean policies de select/insert para
-- el rol "anon", así que queda bloqueado por defecto.

-- ------------------------------------------------------------------
-- Storage: crea un bucket público llamado "productos" para las fotos.
-- Puedes hacerlo desde Supabase > Storage > New bucket > "productos"
-- marcando la opción "Public bucket". O bien ejecuta:
-- insert into storage.buckets (id, name, public) values ('productos', 'productos', true);

-- Política para permitir lectura pública de las imágenes del bucket
-- (solo hace falta si no marcaste "Public bucket" al crearlo):
-- create policy "Lectura pública de fotos de productos"
--   on storage.objects for select
--   using (bucket_id = 'productos');
