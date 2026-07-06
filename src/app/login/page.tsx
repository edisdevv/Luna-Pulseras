"use client";

import { useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { enviarMagicLink, usuario } = useAuth();
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    const { error } = await enviarMagicLink(email);
    setEnviando(false);
    if (error) setError(error);
    else setEnviado(true);
  }

  if (usuario) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center">
        <h1 className="font-display text-3xl text-cafe-oscuro">
          Ya iniciaste sesión
        </h1>
        <p className="mt-3 font-body text-cafe/70">
          Estás conectado como <strong>{usuario.email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-center font-display text-3xl text-cafe-oscuro">
        Iniciar sesión
      </h1>
      <p className="mt-3 text-center font-body text-cafe/70">
        Solo necesitamos tu correo para saber quién eres. Te enviaremos un
        enlace, sin contraseñas.
      </p>

      {enviado ? (
        <p className="mt-8 rounded-2xl border border-piedra/40 bg-piedra/10 p-4 text-center font-body text-cafe">
          Revisa tu correo <strong>{email}</strong> y haz clic en el enlace
          para entrar.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="font-body text-sm text-cafe" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className="rounded-full border border-arena bg-white px-5 py-3 font-body text-cafe outline-none focus:border-terracota"
          />
          {error && (
            <p className="font-body text-sm text-terracota-oscuro">{error}</p>
          )}
          <button
            type="submit"
            disabled={enviando}
            className="rounded-full bg-terracota px-6 py-3 font-body font-medium text-crema shadow-suave transition hover:bg-terracota-oscuro disabled:opacity-60"
          >
            {enviando ? "Enviando…" : "Enviarme el enlace"}
          </button>
        </form>
      )}
    </div>
  );
}
