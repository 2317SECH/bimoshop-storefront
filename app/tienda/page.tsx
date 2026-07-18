import type { Metadata } from "next";
import { ProductTile } from "@/components/product/ProductTile";
import { ProductMessage } from "@/components/product/ProductMessage";
import { getLaunchProducts } from "@/lib/shopify/products";
import type { LaunchProduct } from "@/lib/shopify/types";

export const metadata: Metadata = {
  title: "Tienda — BIMO Shop",
  description: "Los primeros cinco productos de BIMO Shop, elegidos para convivir entre sí.",
};

/** Fase 8.4 -- catálogo. Misma capa de datos que la Colección del Home
 * (lib/shopify/products.ts, sin consulta nueva) y misma ProductTile --
 * solo cambia el layout (grid de página completa en vez de fila-sistema)
 * y el copy, porque el contexto es distinto. Grid 3/2/1 columnas (Design
 * System §4): con exactamente 5 productos nunca queda una fila huérfana
 * (3 + 2), a propósito no se pagina ni se filtra -- no hay volumen que lo
 * justifique todavía y agregarlo se sentiría más "e-commerce genérico",
 * justo lo que se pidió evitar. */
export default async function TiendaPage() {
  let products: LaunchProduct[] = [];
  let unavailable = false;

  try {
    products = await getLaunchProducts(5);
  } catch (err) {
    console.error("shopify.getLaunchProducts failed (tienda):", err);
    unavailable = true;
  }

  return (
    <main className="px-6 pb-24 pt-40 md:pb-32">
      <div className="mx-auto max-w-2xl text-center">
        <span aria-hidden="true" className="mx-auto block h-0.5 w-8 bg-amber-600" />
        <h1 className="mt-6 text-h1 font-semibold text-neutral-900">El sistema, completo.</h1>
        <p className="mt-4 text-body-lg text-neutral-700">
          Los primeros cinco productos de BIMO Shop — elegidos para convivir entre sí, no para llenar un
          catálogo.
        </p>
      </div>

      {unavailable ? (
        <ProductMessage>No pudimos cargar el catálogo en este momento. Volvé a intentarlo en unos minutos.</ProductMessage>
      ) : products.length === 0 ? (
        <ProductMessage>Todavía estamos preparando la colección de lanzamiento.</ProductMessage>
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
