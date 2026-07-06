"use client";

import Image from "next/image";
import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";

export default function CarritoPage() {
  const { items, actualizarCantidad, quitar, total } = useCarrito();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="font-display text-3xl text-cafe-oscuro">
          Tu carrito está vacío
        </h1>
        <p className="mt-3 font-body text-cafe/70">
          Explora el catálogo y encuentra tu próxima pulsera favorita.
        </p>
        <Link
          href="/catalogo"
          className="mt-8 inline-block rounded-full bg-terracota px-8 py-3 font-body font-medium text-crema shadow-suave transition hover:bg-terracota-oscuro"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <h1 className="font-display text-3xl font-semibold text-cafe-oscuro">
        Tu carrito
      </h1>

      <div className="mt-8 flex flex-col gap-4">
        {items.map(({ producto, cantidad }) => (
          <div
            key={producto.id}
            className="flex items-center gap-4 rounded-2xl border border-arena bg-white/60 p-4"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-piedra border border-arena">
              <Image
                src={producto.imagen_url}
                alt={producto.nombre}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-display text-base text-cafe-oscuro">
                {producto.nombre}
              </h3>
              <p className="font-body text-sm text-cafe/60">
                ${producto.precio.toLocaleString("es-CL")}
              </p>
            </div>

            <div className="flex items-center rounded-full border border-arena">
              <button
                className="px-3 py-1 text-cafe"
                onClick={() => actualizarCantidad(producto.id, cantidad - 1)}
              >
                −
              </button>
              <span className="w-6 text-center font-body">{cantidad}</span>
              <button
                className="px-3 py-1 text-cafe"
                onClick={() => actualizarCantidad(producto.id, cantidad + 1)}
              >
                +
              </button>
            </div>

            <button
              onClick={() => quitar(producto.id)}
              aria-label="Quitar del carrito"
              className="text-cafe/50 hover:text-terracota-oscuro"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-arena pt-6">
        <span className="font-display text-xl text-cafe-oscuro">Total</span>
        <span className="font-display text-2xl text-terracota-oscuro">
          ${total.toLocaleString("es-CL")}
        </span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block rounded-full bg-terracota px-8 py-3 text-center font-body font-medium text-crema shadow-suave transition hover:bg-terracota-oscuro"
      >
        Continuar a la entrega
      </Link>
    </div>
  );
}
