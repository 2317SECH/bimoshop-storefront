import { Reveal } from "@/components/motion/Reveal";

type ProofEntry = {
  quote: string;
  /** Nombre/contexto real del cliente. Se omite deliberadamente hoy -- la
   * marca todavía no tiene clientes reales y no se fabrican testimonios
   * (nombres, ciudades, compras, estrellas). Cuando existan reseñas
   * reales, se agregan acá; el layout ya está listo para mostrarlas sin
   * ningún cambio de diseño. */
  attribution?: string;
};

const PROOF: ProofEntry[] = [
  { quote: "Diseñado para quienes disfrutan los espacios simples." },
  { quote: "Objetos pensados para durar y convivir con tu espacio." },
  { quote: "Las primeras historias de nuestros clientes van a aparecer acá." },
];

/** Sección 5/7 del Home -- Prueba social. Sin clientes reales todavía, así
 * que esto NO es un carrusel de reseñas de 5 estrellas: son declaraciones
 * de marca honestas, con la misma estructura de datos (quote +
 * attribution opcional) que va a usar la prueba social real más
 * adelante -- reemplazar PROOF alcanza, no hace falta tocar el JSX. */
export function SocialProof() {
  return (
    <section className="bg-neutral-0 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span aria-hidden="true" className="mx-auto block h-0.5 w-8 bg-amber-600" />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 text-h2 font-semibold text-neutral-900">Estamos empezando. Lo hacemos con cuidado.</h2>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
        {PROOF.map(({ quote, attribution }, i) => (
          <Reveal key={quote} delay={0.16 + i * 0.08}>
            <div className="flex h-full flex-col gap-4 rounded-xl bg-neutral-50 p-8">
              <span aria-hidden="true" className="block h-0.5 w-6 bg-amber-600" />
              <p className="text-body-lg text-neutral-900">{quote}</p>
              {attribution && <p className="text-small text-neutral-700">{attribution}</p>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
