"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ItemCarrito, Producto } from "@/types";

interface CarritoContextType {
  items: ItemCarrito[];
  agregar: (producto: Producto, cantidad?: number) => void;
  quitar: (productoId: string) => void;
  actualizarCantidad: (productoId: string, cantidad: number) => void;
  vaciar: () => void;
  total: number;
  cantidadTotal: number;
}

const CarritoContext = createContext<CarritoContextType | undefined>(
  undefined
);

const STORAGE_KEY = "pulseras-carrito";

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [listo, setListo] = useState(false);

  // Cargar el carrito guardado al montar
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) setItems(JSON.parse(guardado));
    } catch {
      // si el localStorage está corrupto, simplemente partimos vacío
    }
    setListo(true);
  }, []);

  // Guardar cada vez que cambie
  useEffect(() => {
    if (listo) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, listo]);

  function agregar(producto: Producto, cantidad = 1) {
    setItems((prev) => {
      const existente = prev.find((i) => i.producto.id === producto.id);
      if (existente) {
        return prev.map((i) =>
          i.producto.id === producto.id
            ? { ...i, cantidad: i.cantidad + cantidad }
            : i
        );
      }
      return [...prev, { producto, cantidad }];
    });
  }

  function quitar(productoId: string) {
    setItems((prev) => prev.filter((i) => i.producto.id !== productoId));
  }

  function actualizarCantidad(productoId: string, cantidad: number) {
    if (cantidad <= 0) return quitar(productoId);
    setItems((prev) =>
      prev.map((i) =>
        i.producto.id === productoId ? { ...i, cantidad } : i
      )
    );
  }

  function vaciar() {
    setItems([]);
  }

  const total = items.reduce(
    (acc, i) => acc + i.producto.precio * i.cantidad,
    0
  );
  const cantidadTotal = items.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{
        items,
        agregar,
        quitar,
        actualizarCantidad,
        vaciar,
        total,
        cantidadTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return ctx;
}
