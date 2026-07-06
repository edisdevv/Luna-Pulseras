"use client";

import { useEffect, useState } from "react";
import { Producto } from "@/types";
import ProductoCard from "@/components/ProductoCard";
import ProductoModal from "@/components/ProductoModal";

export default function CatalogoPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seleccionado, setSeleccionado] = useState<Producto | null>(null);

  useEffect(() => {
    fetch("/api/productos")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setProductos(data.productos ?? []);
      })
      .catch(() => setError("No pudimos cargar el catálogo."))
      .finally(() => setCargando(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-display text-4xl font-semibold text-cafe-oscuro">
        Catálogo
      </h1>
      <p className="mt-2 max-w-xl font-body text-cafe/70">
        Toca una pulsera para verla más de cerca, agregarla al carrito o
        comprarla directamente.
      </p>

      {cargando && (
        <p className="mt-10 font-body text-cafe/60">Cargando pulseras…</p>
      )}

      {error && (
        <p className="mt-10 font-body text-terracota-oscuro">{error}</p>
      )}

      {!cargando && !error && productos.length === 0 && (
        <p className="mt-10 font-body text-cafe/60">
          Todavía no hay pulseras publicadas. Vuelve pronto.
        </p>
      )}

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {productos.map((p) => (
          <ProductoCard
            key={p.id}
            producto={p}
            onClick={() => setSeleccionado(p)}
          />
        ))}
      </div>

      {seleccionado && (
        <ProductoModal
          producto={seleccionado}
          onCerrar={() => setSeleccionado(null)}
        />
      )}
    </div>
  );
}
