import { NextResponse } from "next/server";
import { consultarEstadoFlow } from "@/lib/flow";
import { crearClienteSupabaseAdmin } from "@/lib/supabaseAdmin";

// Flow llama a esta URL directamente desde sus servidores (no desde el
// navegador del cliente) para avisar que el estado de un pago cambió.
// Por seguridad, NUNCA confiamos en los datos que llegan aquí a ciegas:
// volvemos a preguntarle a Flow por el estado real usando el token.
export async function POST(req: Request) {
  const form = await req.formData();
  const token = form.get("token") as string | null;

  if (!token) {
    return NextResponse.json({ error: "Falta token" }, { status: 400 });
  }

  const supabase = crearClienteSupabaseAdmin();

  try {
    const estado = await consultarEstadoFlow(token);
    // status: 1 pendiente, 2 pagada, 3 rechazada, 4 anulada
    const nuevoEstado =
      estado.status === 2
        ? "pagada"
        : estado.status === 3
        ? "rechazada"
        : estado.status === 4
        ? "cancelada"
        : "pendiente_pago";

    await supabase
      .from("ordenes")
      .update({ estado: nuevoEstado })
      .eq("id", estado.commerceOrder);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: "No se pudo verificar el pago." },
      { status: 500 }
    );
  }
}
