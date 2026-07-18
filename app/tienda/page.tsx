import type { Metadata } from "next";
import Link from "next/link";
import { ProductTile } from "@/components/product/ProductTile";
import { ProductMessage } from "@/components/product/ProductMessage";
import { getCatalog, getCollections, getProductsByCollection } from "@/lib/shopify/products";
import type { LaunchProduct, StoreCollection } from "@/lib/shopify/types";

export const metadata: Metadata = {
  title: "Tienda — BIMO Shop",
  description: "El catálogo completo de BIMO Shop.",
};

/** Fase 5 Paso 2 -- catálogo completo, con filtro por categoría real de
 * Shopify (chips por query param, sin JS de cliente: cada chip es un link
 * `?categoria=handle`, el filtrado corre server-side). Reemplaza la Fase
 * 8.4 (5 productos fijos, sin filtro). */
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
        <span aria-hidden="true" className="mx-auto block h-0.5 w-8 bg-amber-600" />
        <h1 className="mt-6 text-h1 font-semibold text-neutral-900">El sistema, completo.</h1>
        <p className="mt-4 text-body-lg text-neutral-700">
          {activeTitle ?? "Todo el catálogo de BIMO Shop — elegido para convivir entre sí, no para llenar una vitrina."}
        </p>
      </div>

      {!unavailable && collections.length > 0 && (
        <nav aria-label="Categorías" className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2">
          <Link
            href="/tienda"
            className={`rounded-full border px-4 py-1.5 text-small transition-colors ${
              !categoria
                ? "border-amber-700 bg-amber-700 text-white"
                : "border-neutral-200 text-neutral-700 hover:border-amber-600"
            }`}
          >
            Todos
          </Link>
          {collections.map((c) => (
            <Link
              key={c.handle}
              href={`/tienda?categoria=${c.handle}`}
              className={`rounded-full border px-4 py-1.5 text-small transition-colors ${
                categoria === c.handle
                  ? "border-amber-700 bg-amber-700 text-white"
                  : "border-neutral-200 text-neutral-700 hover:border-amber-600"
              }`}
            >
              {c.title}
            </Link>
          ))}
        </nav>
      )}

      {unavailable ? (
        <ProductMessage>No pudimos cargar el catálogo en este momento. Volvé a intentarlo en unos minutos.</ProductMessage>
      ) : products.length === 0 ? (
        <ProductMessage>
          {categoria ? "Todavía no hay productos en esta categoría." : "Todavía estamos preparando la colección de lanzamiento."}
        </ProductMessage>
      ) : (
        <div className="mx-auto mt-16 grid max-w-5xl gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <ProductTile key={product.id} product={product} index={i} showDescription />
          ))}
        </div>
      )}
    </main>
  );
}
