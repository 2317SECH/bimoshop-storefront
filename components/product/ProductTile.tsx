import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import type { LaunchProduct } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/format";

/** Sin fotografía todavía (Store Builder no la subió) -- placeholder
 * genérico, no un ícono adivinando qué producto es. */
function ImagePlaceholder({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-neutral-100 ${featured ? "aspect-[16/11]" : "aspect-[4/5]"}`}
    >
      <ImageOff aria-hidden="true" className="h-8 w-8 text-neutral-400" strokeWidth={1.5} />
    </div>
  );
}

/** Tile de producto compartida entre Home (Colección de lanzamiento) y
 * `/tienda` (catálogo) -- una sola fuente de verdad visual, cada página
 * decide su propio layout/contenedor alrededor. Layout-agnóstica a
 * propósito (sin clases de tamaño de carrusel ni de grid) para poder
 * usarse en ambos contextos sin pelear con las clases del padre.
 *
 * `featured` (Fase 5, mejora editorial): recorte panorámico + título más
 * grande para el primer ítem de `/tienda` -- rompe el grid parejo de
 * ecommerce tradicional sin necesitar fotografía nueva, solo composición. */
export function ProductTile({
  product,
  index,
  showDescription = false,
  featured = false,
}: {
  product: LaunchProduct;
  index: number;
  showDescription?: boolean;
  featured?: boolean;
}) {
  return (
    <Link href={`/producto/${product.handle}`} className="group flex flex-col gap-4">
      <span className="font-mono text-caption text-neutral-700">{String(index + 1).padStart(2, "0")}</span>

      {product.image ? (
        <div
          className={`relative overflow-hidden rounded-xl bg-neutral-100 ${featured ? "aspect-[16/11]" : "aspect-[4/5]"}`}
        >
          <Image
            src={product.image.url}
            alt={product.image.altText ?? product.title}
            fill
            sizes={featured ? "(min-width: 1024px) 60vw, 90vw" : "(min-width: 1024px) 20vw, 60vw"}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <ImagePlaceholder featured={featured} />
      )}

      <div>
        <h3 className={`font-medium text-neutral-900 ${featured ? "text-h3" : "text-h4"}`}>{product.title}</h3>
        <span
          aria-hidden="true"
          className="mt-1.5 block h-px w-6 bg-amber-600 transition-all duration-300 group-hover:w-10"
        />
        <p className="mt-1.5 font-mono text-small text-neutral-700">{formatMoney(product.price)}</p>
        {showDescription && product.description && (
          <p className="mt-2 line-clamp-2 text-small text-neutral-700">{product.description}</p>
        )}
      </div>
    </Link>
  );
}
