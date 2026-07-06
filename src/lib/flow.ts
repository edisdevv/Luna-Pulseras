import crypto from "crypto";

// Flow exige que todos los parámetros de una petición se ordenen
// alfabéticamente por nombre de campo y se firmen con HMAC-SHA256
// usando tu Secret Key. Esta función hace exactamente eso.
export function firmarParametrosFlow(
  params: Record<string, string | number>
): string {
  const secretKey = process.env.FLOW_SECRET_KEY!;
  const claves = Object.keys(params).sort();
  const cadena = claves.map((k) => `${k}${params[k]}`).join("");
  return crypto.createHmac("sha256", secretKey).update(cadena).digest("hex");
}

export function construirFormFlow(params: Record<string, string | number>) {
  const apiKey = process.env.FLOW_API_KEY!;
  const paramsCompletos = { ...params, apiKey };
  const s = firmarParametrosFlow(paramsCompletos);
  return { ...paramsCompletos, s };
}

// Crea una orden de pago en Flow y devuelve la URL a la que hay que
// redirigir al cliente para que pague.
export async function crearOrdenFlow(opts: {
  commerceOrder: string;
  subject: string;
  amount: number;
  email: string;
}) {
  const baseUrl = process.env.FLOW_API_URL!;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const params = construirFormFlow({
    commerceOrder: opts.commerceOrder,
    subject: opts.subject,
    currency: "CLP",
    amount: Math.round(opts.amount),
    email: opts.email,
    urlConfirmation: `${siteUrl}/api/flow/confirmacion`,
    urlReturn: `${siteUrl}/pago/retorno`,
  });

  const body = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  );

  const resp = await fetch(`${baseUrl}/payment/create`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!resp.ok) {
    const texto = await resp.text();
    throw new Error(`Error creando orden en Flow: ${texto}`);
  }

  const data = (await resp.json()) as { url: string; token: string; flowOrder: number };
  return data; // { url, token, flowOrder }
}

// Consulta el estado real de un pago en Flow a partir del token.
export async function consultarEstadoFlow(token: string) {
  const baseUrl = process.env.FLOW_API_URL!;
  const params = construirFormFlow({ token });
  const query = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  );

  const resp = await fetch(`${baseUrl}/payment/getStatus?${query.toString()}`, {
    method: "GET",
  });

  if (!resp.ok) {
    const texto = await resp.text();
    throw new Error(`Error consultando estado en Flow: ${texto}`);
  }

  return resp.json(); // incluye status: 1 pendiente, 2 pagada, 3 rechazada, 4 anulada
}
