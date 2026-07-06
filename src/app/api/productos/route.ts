import { NextResponse } from "next/server";
import { crearClienteSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const supabase = crearClienteSupabaseAdmin();

  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("activo", true)
    .order("creado_en", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ productos: data });
}
