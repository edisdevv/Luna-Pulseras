"use client";

import { createBrowserClient } from "@supabase/ssr";

// Cliente para usarse en componentes del lado del navegador ("use client").
// Usa la anon key, que es segura de exponer públicamente porque
// las políticas de Row Level Security (RLS) en Supabase controlan el acceso.
export function crearClienteSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
