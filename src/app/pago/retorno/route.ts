import { NextResponse } from "next/server";
import { consultarEstadoFlow } from "@/lib/flow";

// Flow redirige el navegador del cliente a esta URL con un POST que
// incluye el token. Consultamos el estado y mandamos al usuario a una
// página de confirmación legible, ya en GET.
export async function POST(req: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const form = await req.formData();
  const token = form.get("token") as string | null;

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/pago/confirmacion?estado=error`);
  }

  try {
    const estado = await consultarEstadoFlow(token);
    const texto =
      estado.status === 2
        ? "pagada"
        : estado.status === 3
        ? "rechazada"
        : estado.status === 4
        ? "cancelada"
        : "pendiente";

    return NextResponse.redirect(
      `${siteUrl}/pago/confirmacion?estado=${texto}&orden=${estado.commerceOrder}`
    );
  } catch {
    return NextResponse.redirect(`${siteUrl}/pago/confirmacion?estado=error`);
  }
}

export async function GET(req: Request) {
  // Por si alguien abre este enlace directamente por GET.
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const token = new URL(req.url).searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/pago/confirmacion?estado=error`);
  }

  try {
    const estado = await consultarEstadoFlow(token);
    const texto =
      estado.status === 2
        ? "pagada"
        : estado.status === 3
        ? "rechazada"
        : estado.status === 4
        ? "cancelada"
        : "pendiente";

    return NextResponse.redirect(
      `${siteUrl}/pago/confirmacion?estado=${texto}&orden=${estado.commerceOrder}`
    );
  } catch {
    return NextResponse.redirect(`${siteUrl}/pago/confirmacion?estado=error`);
  }
}
