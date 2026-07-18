"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/Reveal";

type Status = "idle" | "sending" | "done" | "error";

/** Sección 6/7 del Home -- CTA final. Sin tienda operativa ni fotografía
 * final todavía, así que el "siguiente paso" es la lista de espera
 * (waitlist_signups, ya existe en el backend), no una compra. Cierre
 * elegante, sin urgencia falsa. */
export function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error ?? "Algo salió mal. Probá de nuevo.");
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setErrorMessage("No pudimos conectar. Probá de nuevo en un momento.");
      setStatus("error");
    }
  }

  return (
    <section className="bg-neutral-50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-xl text-center">
        <Reveal>
          <span aria-hidden="true" className="mx-auto block h-0.5 w-8 bg-amber-600" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-h2 font-semibold text-neutral-900">Todavía estamos terminando el sistema.</h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 text-body-lg text-neutral-700">
            Dejanos tu correo para conocer la colección antes que nadie, recibir las novedades del lanzamiento y
            ser parte de los primeros clientes de BIMO Shop.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-8">
            {status === "done" ? (
              <p role="status" className="text-body text-neutral-900">
                Listo. Te vamos a escribir apenas esté todo preparado.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-center sm:gap-3"
              >
                <div className="flex flex-col items-start gap-1 text-left">
                  <label htmlFor="waitlist-email" className="text-small text-neutral-700">
                    Correo electrónico
                  </label>
                  <input
                    id="waitlist-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vos@ejemplo.com"
                    disabled={status === "sending"}
                    className="h-11 w-full rounded-lg border border-neutral-200 bg-neutral-0 px-4 text-body text-neutral-900 outline-none focus-visible:border-amber-600 focus-visible:ring-2 focus-visible:ring-amber-600/20 disabled:opacity-60 sm:w-64"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="h-11 shrink-0 rounded-lg bg-amber-700 px-6 text-body font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                >
                  {status === "sending" ? "Enviando..." : "Avisame cuando esté listo"}
                </button>
              </form>
            )}

            {status === "error" && errorMessage && (
              <p role="alert" className="mt-3 text-small text-error-600">
                {errorMessage}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
