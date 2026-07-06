"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCarrito } from "@/context/CarritoContext";
import { useAuth } from "@/context/AuthContext";
import { SECTORES_CONCEPCION, ENVIO_SOLO_CONCEPCION_MSG } from "@/lib/constantes";

export default function CheckoutPage() {
  const { items, total } = useCarrito();
  const { usuario } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState(usuario?.email ?? "");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [depto, setDepto] = useState("");
  const [sector, setSector] = useState("");
  const [referencia, setReferencia] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="font-display text-3xl text-cafe-oscuro">
          Tu carrito está vacío
        </h1>
        <p className="mt-3 font-body text-cafe/70">
          Agrega alguna pulsera antes de continuar.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    try {
      const resp = await fetch("/api/ordenes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          items,
          direccion: { calle, numero, depto, sector, referencia, telefono },
        }),
      });
      const data = await resp.json();

      if (!resp.ok) {
        setError(data.error ?? "No se pudo procesar el pedido.");
        setEnviando(false);
        return;
      }

      // Redirige al cliente a la pasarela de pago de Flow.
      window.location.href = data.urlPago;
    } catch {
      setError("No se pudo conectar con el servidor.");
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-display text-3xl font-semibold text-cafe-oscuro">
        Datos de entrega
      </h1>
      <p className="mt-2 rounded-2xl border border-piedra/40 bg-piedra/10 p-4 font-body text-sm text-cafe">
        {ENVIO_SOLO_CONCEPCION_MSG}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <Campo
          label="Correo para avisos del pedido"
          value={email}
          onChange={setEmail}
          type="email"
        />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Campo label="Calle" value={calle} onChange={setCalle} />
          </div>
          <Campo label="N°" value={numero} onChange={setNumero} />
        </div>
        <Campo
          label="Depto / casa (opcional)"
          value={depto}
          onChange={setDepto}
          requerido={false}
        />

        <label className="font-body text-sm text-cafe">
          Sector dentro de Concepción
        </label>
        <select
          required
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="rounded-full border border-arena bg-white px-5 py-3 font-body text-cafe outline-none focus:border-terracota"
        >
          <option value="" disabled>
            Selecciona tu sector
          </option>
          {SECTORES_CONCEPCION.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <Campo
          label="Referencia (opcional)"
          value={referencia}
          onChange={setReferencia}
          requerido={false}
        />
        <Campo label="Teléfono de contacto" value={telefono} onChange={setTelefono} />

        <div className="mt-4 flex items-center justify-between border-t border-arena pt-4">
          <span className="font-display text-lg text-cafe-oscuro">Total</span>
          <span className="font-display text-xl text-terracota-oscuro">
            ${total.toLocaleString("es-CL")}
          </span>
        </div>

        {error && (
          <p className="font-body text-sm text-terracota-oscuro">{error}</p>
        )}

        <button
          type="submit"
          disabled={enviando}
          className="mt-2 rounded-full bg-terracota px-6 py-3 font-body font-medium text-crema shadow-suave transition hover:bg-terracota-oscuro disabled:opacity-60"
        >
          {enviando ? "Redirigiendo a Flow…" : "Pagar con Flow"}
        </button>
      </form>
    </div>
  );
}

function Campo({
  label,
  value,
  onChange,
  type = "text",
  requerido = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  requerido?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-body text-sm text-cafe">{label}</label>
      <input
        required={requerido}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-full border border-arena bg-white px-5 py-3 font-body text-cafe outline-none focus:border-terracota"
      />
    </div>
  );
}
