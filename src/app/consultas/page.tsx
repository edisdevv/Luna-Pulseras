"use client";

import { useState, FormEvent } from "react";
import { NOMBRE_TIENDA, ENVIO_SOLO_CONCEPCION_MSG } from "@/lib/constantes";

const PREGUNTAS = [
  {
    q: "¿Hacen despacho fuera de Concepción?",
    a: ENVIO_SOLO_CONCEPCION_MSG,
  },
  {
    q: "¿Cómo pago mi pedido?",
    a: "Todos los pagos se procesan de forma segura a través de Flow (tarjetas, transferencia, etc.).",
  },
  {
    q: "¿Cuánto tardan en llevar mi pulsera?",
    a: "Una vez confirmado el pago, coordinamos la entrega dentro de Concepción en 1 a 3 días hábiles.",
  },
  {
    q: "¿Las piedras son naturales?",
    a: "Sí, trabajamos con piedras naturales seleccionadas a mano, por lo que cada pulsera es única.",
  },
];

export default function ConsultasPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // Aquí puedes conectar un endpoint propio, un servicio de email
    // (Resend, etc.) o simplemente guardar la consulta en Supabase.
    setEnviado(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-4xl font-semibold text-cafe-oscuro">
        Consultas
      </h1>
      <p className="mt-2 font-body text-cafe/70">
        ¿Tienes dudas sobre {NOMBRE_TIENDA}, tu pedido o una pulsera a medida?
        Escríbenos.
      </p>

      <div className="mt-10 flex flex-col gap-4">
        {PREGUNTAS.map((p) => (
          <details
            key={p.q}
            className="group rounded-2xl border border-arena bg-white/60 p-5"
          >
            <summary className="cursor-pointer font-display text-lg text-cafe-oscuro">
              {p.q}
            </summary>
            <p className="mt-2 font-body text-sm text-cafe/70">{p.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-14 rounded-3xl border border-arena bg-white/60 p-8">
        <h2 className="font-display text-2xl text-cafe-oscuro">
          Escríbenos directamente
        </h2>

        {enviado ? (
          <p className="mt-4 font-body text-piedra-oscuro">
            ¡Gracias, {nombre || "amiga/o"}! Te responderemos pronto a{" "}
            {email}.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <input
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="rounded-full border border-arena bg-white px-5 py-3 font-body text-cafe outline-none focus:border-terracota"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo"
              className="rounded-full border border-arena bg-white px-5 py-3 font-body text-cafe outline-none focus:border-terracota"
            />
            <textarea
              required
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Cuéntanos tu consulta"
              rows={4}
              className="rounded-3xl border border-arena bg-white px-5 py-3 font-body text-cafe outline-none focus:border-terracota"
            />
            <button
              type="submit"
              className="self-start rounded-full bg-terracota px-6 py-3 font-body font-medium text-crema shadow-suave transition hover:bg-terracota-oscuro"
            >
              Enviar consulta
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
