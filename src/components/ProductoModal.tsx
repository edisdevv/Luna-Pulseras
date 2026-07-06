"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Producto } from "@/types";
import { useCarrito } from "@/context/CarritoContext";

export default function ProductoModal({
  producto,
  onCerrar,
}: {
  producto: Producto;
  onCerrar: () => void;
}) {
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);
  const { agregar } = useCarrito();
  const router = useRouter();

  function handleAgregar() {
    agregar(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1800);
  }

  function handleComprarAhora() {
    agregar(producto, cantidad);
    router.push("/checkout");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cafe-oscuro/50 px-4 backdrop-blur-sm"
      onClick={onCerrar}
    >
      <div
        className="w-full max-w-lg animate-aparecer rounded-3xl bg-crema p-8 shadow-suave"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            onClick={onCerrar}
            aria-label="Cerrar"
            className="text-cafe/60 hover:text-cafe"
          >
            ✕
          </button>
        </div>

        <div className="mx-auto mb-6 h-56 w-56 overflow-hidden rounded-piedra border-4 border-arena">
          <Image
            src={producto.imagen_url}
            alt={producto.nombre}
            width={224}
            height={224}
            className="h-full w-full object-cover"
          />
        </div>

        <span className="font-body text-xs uppercase tracking-wide text-piedra-oscuro">
          {producto.piedra}
        </span>
        <h2 className="mt-1 font-display text-2xl font-semibold text-cafe-oscuro">
          {producto.nombre}
        </h2>
        <p className="mt-2 font-body text-sm text-cafe/80">
          {producto.descripcion}
        </p>
        <p className="mt-3 font-display text-xl text-terracota-oscuro">
          ${producto.precio.toLocaleString("es-CL")}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <label htmlFor="cantidad" className="font-body text-sm text-cafe">
            Cantidad
          </label>
          <div className="flex items-center rounded-full border border-arena">
            <button
              className="px-3 py-1 text-cafe"
              onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              aria-label="Restar"
            >
              −
            </button>
            <span className="w-6 text-center font-body">{cantidad}</span>
            <button
              className="px-3 py-1 text-cafe"
              onClick={() =>
                setCantidad((c) => Math.min(producto.stock, c + 1))
              }
              aria-label="Sumar"
            >
              +
            </button>
          </div>
          <span className="font-body text-xs text-cafe/50">
            {producto.stock} disponibles
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handleAgregar}
            className="flex-1 rounded-full border border-terracota px-6 py-3 font-body font-medium text-terracota-oscuro transition hover:bg-terracota/10"
          >
            {agregado ? "¡Agregada! 🧶" : "Agregar al carrito"}
          </button>
          <button
            onClick={handleComprarAhora}
            className="flex-1 rounded-full bg-terracota px-6 py-3 font-body font-medium text-crema shadow-suave transition hover:bg-terracota-oscuro"
          >
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
}
