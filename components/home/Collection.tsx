import { Reveal } from "@/components/motion/Reveal";
import { ProductTile } from "@/components/product/ProductTile";
import { ProductMessage } from "@/components/product/ProductMessage";
import { getLaunchProducts } from "@/lib/shopify/products";
import type { LaunchProduct } from "@/lib/shopify/types";

function SectionHeader() {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <span aria-hidden="true" className="mx-auto block h-0.5 w-8 bg-amber-600" />
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 text-h2 font-semibold text-neutral-900">Cinco piezas. Un solo sistema.</h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-4 text-body-lg text-neutral-700">
          Elegidas para convivir entre sí — no compradas por separado.
        </p>
      </Reveal>
    </div>
  );
}

function ProductRow({ products }: { products: LaunchProduct[] }) {
  return (
    <div className="mx-auto mt-16 max-w-6xl">
      {/* hilo continuo -- el mismo recurso visual del Hero, conecta las piezas */}
      <div className="h-px w-full bg-amber-600/50" />
      <div className="scrollbar-hide -mx-6 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-8 lg:overflow-visible lg:px-0">
        {products.map((product, i) => (
          <div key={product.id} className="min-w-[68%] shrink-0 snap-start sm:min-w-[42%] lg:min-w-0">
            <ProductTile product={product} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Sección 3/7 del Home -- Colección de lanzamiento. Fase 8.2: datos reales
 * de la Storefront API (lib/shopify/), cero hardcodeo. Server Component
 * async -- Next.js la suspende con CollectionSkeleton.tsx mientras
 * resuelve. Misma capa de datos y misma ProductTile que `/tienda`
 * (Fase 8.4) -- ninguna consulta ni render de producto duplicado. */
export async function Collection() {
  let products: LaunchProduct[] = [];
  let unavailable = false;

  try {
    products = await getLaunchProducts(5);
  } catch (err) {
    console.error("shopify.getLaunchProducts failed (home):", err);
    unavailable = true;
  }

  return (
    <section className="bg-neutral-0 px-6 py-24 md:py-32">
      <SectionHeader />
      {unavailable ? (
        <ProductMessage>No pudimos cargar la colección en este momento. Volvé a intentarlo en unos minutos.</ProductMessage>
      ) : products.length === 0 ? (
        <ProductMessage>Todavía estamos preparando la colección de lanzamiento.</ProductMessage>
      ) : (
        <Reveal delay={0.24}>
          <ProductRow products={products} />
        </Reveal>
      )}
    </section>
  );
}
