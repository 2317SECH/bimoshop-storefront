import { Reveal } from "@/components/motion/Reveal";

/** Sección 2/7 del Home -- Filosofía (Brand Book §5). Solo el porqué, sin
 * catálogo ni beneficios listados todavía (eso es la sección 4). */
export function Philosophy() {
  return (
    <section id="filosofia" className="bg-neutral-50 px-6 py-24 md:py-32">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <Reveal>
          <span aria-hidden="true" className="block h-0.5 w-8 bg-amber-600" />
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="text-h2 font-semibold text-neutral-900">
            No vendemos accesorios. Vendemos una mejor experiencia de trabajo.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="text-body-lg text-neutral-700">
            Cada producto que ves acá tuvo que responder una pregunta simple: ¿esto hace que tu escritorio esté
            más ordenado, cómodo o fácil de usar? Si la respuesta no era clara, no entró al catálogo. No
            competimos por precio — competimos por el resultado que se siente al sentarte a trabajar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
