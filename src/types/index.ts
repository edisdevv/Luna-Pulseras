export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  piedra: string; // tipo de piedra: cuarzo rosa, amatista, obsidiana, etc.
  imagen_url: string;
  stock: number;
  activo: boolean;
  creado_en?: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

export interface Direccion {
  calle: string;
  numero: string;
  depto?: string;
  sector: string; // barrio/sector dentro de Concepción
  referencia?: string;
  telefono: string;
}

export type EstadoOrden =
  | "pendiente_pago"
  | "pagada"
  | "rechazada"
  | "en_preparacion"
  | "en_camino"
  | "entregada"
  | "cancelada";

export interface Orden {
  id: string;
  usuario_id: string | null;
  usuario_email: string;
  items: ItemCarrito[];
  direccion: Direccion;
  total: number;
  estado: EstadoOrden;
  flow_token?: string | null;
  flow_order?: number | null;
  creado_en?: string;
}
