import type { Metadata } from "next";
import Link from "next/link";
import { ProductTile } from "@/components/product/ProductTile";
import { ProductMessage } from "@/components/product/ProductMessage";
import { Reveal } from "@/components/motion/Reveal";
import { getCatalog, getCollections, getProductsByCollection } from "@/lib/shopify/products";
import type { LaunchProduct, StoreCollection } from "@/lib/shopify/types";

export const metadata: Metadata = {
  title: "Tienda — BIMO Shop",
  description: "El catálogo completo de BIMO Shop.",
};

/** Fase 5 -- catálogo completo (Paso 2) + mejora editorial (Paso siguiente):
 * primer producto en tratamiento "featured" (panorámico, 2 columnas) para
 * romper el grid parejo de ecommerce tradicional, entrada con Reveal
 * escalonado por índice. El filtro por categoría sigue siendo un link
 * ?categoria=handle (sin JS de cliente para el filtrado en sí) -- la
 * `key` en el contenedor de la grilla fuerza un remount al cambiar de
 * categoría, así los Reveal (whileInView) se disparan de nuevo en vez de
 * quedar "ya revelados" de la vista anterior. */
export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;

  let products: LaunchProduct[] = [];
  let collections: StoreCollection[] = [];
  let unavailable = false;

  try {
    [products, collections] = await Promise.all([
      categoria ? getProductsByCollection(categoria, 100) : getCatalog(100),
      getCollections(),
    ]);
  } catch (err) {
    console.error("shopify catalog fetch failed (tienda):", err);
    unavailable = true;
  }

  const activeTitle = collections.find((c) => c.handle === categoria)?.title;

  return (
    <main className="px-6 pb-24 pt-40 md:pb-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <span aria-hidden="true" className="mx-auto block h-0.5 w-8 bg-amber-600" />
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 text-h1 font-semibold text-neutral-900">
            {activeTitle ?? "El sistema, completo."}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 text-body-lg text-neutral-700">
            {activeTitle
              ? `Cada pieza de ${activeTitle.toLowerCase()}, elegida con el mismo criterio que el resto del sistema.`
              : "Todo el catálogo de BIMO Shop — elegido para convivir entre sí, no para llenar una vitrina."}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-3 font-mono text-caption uppercase tracking-wide text-amber-700">
            Catálogo en rotación — nuevas piezas cada 1 a 2 semanas
          </p>
        </Reveal>
      </div>

      {!unavailable && collections.length > 0 && (
        <Reveal delay={0.24}>
          <nav aria-label="Categorías" className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
            <Link
              href="/tienda"
              className={`rounded-full border px-4 py-1.5 text-small transition-all duration-200 ${
                !categoria
                  ? "border-amber-700 bg-amber-700 text-white"
                  : "border-neutral-200 text-neutral-700 hover:border-amber-600 hover:text-neutral-900"
              }`}
            >
              Todos
            </Link>
            {collections.map((c) => (
              <Link
                key={c.handle}
                href={`/tienda?categoria=${c.handle}`}
                className={`rounded-full border px-4 py-1.5 text-small transition-all duration-200 ${
                  categoria === c.handle
                    ? "border-amber-700 bg-amber-700 text-white"
                    : "border-neutral-200 text-neutral-700 hover:border-amber-600 hover:text-neutral-900"
                }`}
              >
                {c.title}
              </Link>
            ))}
          </nav>
        </Reveal>
      )}

      {unavailable ? (
        <ProductMessage>No pudimos cargar el catálogo en este momento. Volvé a intentarlo en unos minutos.</ProductMessage>
      ) : products.length === 0 ? (
        <ProductMessage>
          {categoria ? "Todavía no hay productos en esta categoría." : "Todavía estamos preparando la colección de lanzamiento."}
        </ProductMessage>
      ) : (
        <div key={categoria ?? "todos"} className="mx-auto mt-16 grid max-w-5xl gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={Math.min(i * 0.05, 0.4)}>
              <div className={i === 0 ? "sm:col-span-2" : undefined}>
                <ProductTile product={product} index={i} showDescription featured={i === 0} />
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
