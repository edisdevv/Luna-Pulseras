import Link from "next/link";
import { NOMBRE_TIENDA } from "@/lib/constantes";
import DivisorHilo from "@/components/DivisorHilo";

export default function InicioPage() {
  return (
    <div>
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center">
        <span className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-terracota-oscuro">
          Piedras naturales · Hechas a mano
        </span>
        <h1 className="font-display text-5xl font-semibold leading-tight text-cafe-oscuro sm:text-6xl">
          Cada pulsera cuenta
          <br />
          la historia de su piedra
        </h1>
        <p className="mt-6 max-w-xl font-body text-lg text-cafe/80">
          {NOMBRE_TIENDA} es un pequeño taller en Concepción donde anudamos
          piedras naturales una por una. Elige la tuya y te la llevamos hasta
          la puerta de tu casa.
        </p>
        <Link
          href="/catalogo"
          className="mt-10 rounded-full bg-terracota px-8 py-3 font-body font-medium text-crema shadow-suave transition hover:bg-terracota-oscuro"
        >
          Ver catálogo
        </Link>
      </section>

      <DivisorHilo />

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-16 sm:grid-cols-3">
        <div className="text-center">
          <h3 className="font-display text-xl text-cafe-oscuro">100% a mano</h3>
          <p className="mt-2 font-body text-sm text-cafe/70">
            Cada nudo se hace con las manos, sin moldes ni producción en serie.
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-display text-xl text-cafe-oscuro">
            Piedras naturales
          </h3>
          <p className="mt-2 font-body text-sm text-cafe/70">
            Cuarzo rosa, amatista, obsidiana y más, seleccionadas una a una.
          </p>
        </div>
        <div className="text-center">
          <h3 className="font-display text-xl text-cafe-oscuro">
            Entrega en Concepción
          </h3>
          <p className="mt-2 font-body text-sm text-cafe/70">
            Compras online y la vamos a dejar directo a tu puerta.
          </p>
        </div>
      </section>
    </div>
  );
}
