"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCarrito } from "@/context/CarritoContext";
import { NOMBRE_TIENDA } from "@/lib/constantes";

export default function Navbar() {
  const { usuario, cerrarSesion } = useAuth();
  const { cantidadTotal } = useCarrito();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const inicial = usuario?.email?.charAt(0).toUpperCase() ?? null;

  return (
    <header className="sticky top-0 z-40 border-b border-arena bg-crema/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl font-semibold text-cafe-oscuro"
        >
          {NOMBRE_TIENDA}
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/catalogo"
            className="font-body text-sm font-medium text-cafe transition hover:text-terracota-oscuro"
          >
            Catálogo
          </Link>
          <Link
            href="/consultas"
            className="font-body text-sm font-medium text-cafe transition hover:text-terracota-oscuro"
          >
            Consultas
          </Link>

          {/* Carrito */}
          <Link
            href="/carrito"
            aria-label="Ver carrito"
            className="relative font-body text-sm font-medium text-cafe transition hover:text-terracota-oscuro"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            {cantidadTotal > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-terracota text-[10px] font-semibold text-crema">
                {cantidadTotal}
              </span>
            )}
          </Link>

          {/* Círculo de perfil / inicio de sesión */}
          <div className="relative">
            <button
              onClick={() => setMenuAbierto((v) => !v)}
              aria-label={usuario ? "Cuenta" : "Iniciar sesión"}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-piedra font-body text-sm font-semibold text-crema transition hover:bg-piedra-oscuro"
            >
              {inicial ?? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
                </svg>
              )}
            </button>

            {menuAbierto && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-arena bg-white p-2 shadow-suave">
                {usuario ? (
                  <>
                    <p className="truncate px-3 py-2 text-xs text-cafe/60">
                      {usuario.email}
                    </p>
                    <button
                      onClick={() => {
                        cerrarSesion();
                        setMenuAbierto(false);
                      }}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-cafe hover:bg-crema"
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMenuAbierto(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-cafe hover:bg-crema"
                  >
                    Iniciar sesión
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
