import { createClient } from "@supabase/supabase-js";

// ¡OJO! Este cliente usa la SERVICE_ROLE_KEY, que se salta las políticas de RLS.
// Nunca lo importes en un componente "use client" ni lo expongas al navegador.
// Solo se usa dentro de src/app/api/** (código que corre en el servidor).
export function crearClienteSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
