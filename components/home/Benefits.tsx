import { Reveal } from "@/components/motion/Reveal";

const OUTCOMES = [
  {
    statement: "Más orden. Menos fricción.",
    support: "Cada cosa en su lugar, para que tu atención no tenga que buscarla.",
  },
  {
    statement: "Menos decisiones pequeñas. Más foco real.",
    support: "Un escritorio que ya está resuelto no te interrumpe antes de empezar.",
  },
  {
    statement: "Un espacio que se siente tuyo.",
    support: "El control sobre tu entorno se nota en cómo te sentís al sentarte a trabajar.",
  },
] as const;

/** Sección 4/7 del Home -- Beneficios del sistema. Habla del resultado en
 * el día del cliente, no del producto (eso ya lo cubrió la Colección) ni
 * del porqué de la marca (eso lo cubrió la Filosofía). Deliberadamente
 * solo 3 mensajes -- no lista larga de características. */
export function Benefits() {
  return (
    <section className="bg-neutral-50 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span aria-hidden="true" className="mx-auto block h-0.5 w-8 bg-amber-600" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-h2 font-semibold text-neutral-900">¿Qué cambia en tu día?</h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-12 md:grid-cols-3 md:gap-8">
        {OUTCOMES.map(({ statement, support }, i) => (
          <Reveal key={statement} delay={0.16 + i * 0.08}>
            <div className="flex flex-col gap-3 text-center md:text-left">
              <span aria-hidden="true" className="mx-auto block h-0.5 w-6 bg-amber-600 md:mx-0" />
              <h3 className="text-h4 font-medium text-neutral-900">{statement}</h3>
              <p className="text-body text-neutral-700">{support}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
