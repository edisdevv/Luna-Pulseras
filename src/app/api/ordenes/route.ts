import { NextResponse } from "next/server";
import { crearClienteSupabaseAdmin } from "@/lib/supabaseAdmin";
import { crearOrdenFlow } from "@/lib/flow";
import { SECTORES_CONCEPCION } from "@/lib/constantes";
import { Direccion, ItemCarrito } from "@/types";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, items, direccion } = body as {
    email: string;
    items: ItemCarrito[];
    direccion: Direccion;
  };

  if (!email || !items?.length || !direccion) {
    return NextResponse.json(
      { error: "Faltan datos del pedido." },
      { status: 400 }
    );
  }

  // Verificación de servidor: solo se despacha dentro de Concepción.
  if (!SECTORES_CONCEPCION.includes(direccion.sector)) {
    return NextResponse.json(
      { error: "Por ahora solo hacemos despacho dentro de Concepción." },
      { status: 400 }
    );
  }

  const total = items.reduce(
    (acc, i) => acc + i.producto.precio * i.cantidad,
    0
  );

  const supabase = crearClienteSupabaseAdmin();

  const { data: orden, error: errorInsert } = await supabase
    .from("ordenes")
    .insert({
      usuario_email: email,
      items,
      direccion,
      total,
      estado: "pendiente_pago",
    })
    .select()
    .single();

  if (errorInsert || !orden) {
    return NextResponse.json(
      { error: errorInsert?.message ?? "No se pudo crear la orden." },
      { status: 500 }
    );
  }

  try {
    const flowResp = await crearOrdenFlow({
      commerceOrder: orden.id,
      subject: `Pedido ${orden.id} - Piedra & Hilo`,
      amount: total,
      email,
    });

    await supabase
      .from("ordenes")
      .update({ flow_token: flowResp.token, flow_order: flowResp.flowOrder })
      .eq("id", orden.id);

    return NextResponse.json({
      urlPago: `${flowResp.url}?token=${flowResp.token}`,
    });
  } catch (e) {
    return NextResponse.json(
      { error: "No se pudo iniciar el pago con Flow." },
      { status: 500 }
    );
  }
}
