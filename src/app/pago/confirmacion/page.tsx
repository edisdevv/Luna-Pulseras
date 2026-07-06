"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";

const MENSAJES: Record<string, { titulo: string; texto: string }> = {
  pagada: {
    titulo: "¡Pago confirmado! 🎉",
    texto: "Tu pulsera ya está en preparación. Te la llevaremos pronto.",
  },
  rechazada: {
    titulo: "El pago fue rechazado",
    texto: "Puedes intentarlo nuevamente desde tu carrito.",
  },
  cancelada: {
    titulo: "El pago fue cancelado",
    texto: "No se realizó ningún cobro. Tu carrito sigue disponible.",
  },
  pendiente: {
    titulo: "Tu pago está pendiente",
    texto: "Te avisaremos apenas se confirme.",
  },
  error: {
    titulo: "Algo salió mal",
    texto: "No pudimos verificar tu pago. Contáctanos en Consultas.",
  },
};

export default function ConfirmacionPagoPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmacionContenido />
    </Suspense>
  );
}

function ConfirmacionContenido() {
  const params = useSearchParams();
  const estado = params.get("estado") ?? "error";
  const orden = params.get("orden");
  const { vaciar } = useCarrito();
  const info = MENSAJES[estado] ?? MENSAJES.error;

  useEffect(() => {
    if (estado === "pagada") vaciar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado]);

  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1 className="font-display text-3xl text-cafe-oscuro">
        {info.titulo}
      </h1>
      <p className="mt-3 font-body text-cafe/70">{info.texto}</p>
      {orden && (
        <p className="mt-2 font-body text-xs text-cafe/50">
          N° de pedido: {orden}
        </p>
      )}
      <Link
        href="/catalogo"
        className="mt-10 inline-block rounded-full bg-terracota px-8 py-3 font-body font-medium text-crema shadow-suave transition hover:bg-terracota-oscuro"
      >
        Volver al catálogo
      </Link>
    </div>
  );
}
