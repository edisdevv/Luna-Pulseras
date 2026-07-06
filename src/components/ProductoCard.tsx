"use client";

import Image from "next/image";
import { Producto } from "@/types";

export default function ProductoCard({
  producto,
  onClick,
}: {
  producto: Producto;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center rounded-2xl border border-arena bg-white/60 p-5 text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-suave focus-visible:-translate-y-1"
    >
      <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-piedra border-2 border-arena bg-crema transition-transform duration-300 group-hover:scale-105">
        <Image
          src={producto.imagen_url}
          alt={producto.nombre}
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
      <span className="font-body text-xs uppercase tracking-wide text-piedra-oscuro">
        {producto.piedra}
      </span>
      <h3 className="mt-1 font-display text-lg font-semibold text-cafe-oscuro">
        {producto.nombre}
      </h3>
      <p className="mt-1 font-body text-sm text-cafe/70">
        ${producto.precio.toLocaleString("es-CL")}
      </p>
    </button>
  );
}
