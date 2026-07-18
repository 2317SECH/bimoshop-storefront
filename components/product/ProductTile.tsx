import Image from "next/image";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import type { LaunchProduct } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/format";

/** Sin fotografía todavía (Store Builder no la subió) -- placeholder
 * genérico, no un ícono adivinando qué producto es. */
function ImagePlaceholder() {
  return (
    <div className="flex aspect-[4/5] items-center justify-center rounded-xl bg-neutral-100">
      <ImageOff aria-hidden="true" className="h-8 w-8 text-neutral-400" strokeWidth={1.5} />
    </div>
  );
}

/** Tile de producto compartida entre Home (Colección de lanzamiento) y
 * `/tienda` (catálogo) -- una sola fuente de verdad visual, cada página
 * decide su propio layout/contenedor alrededor. Layout-agnóstica a
 * propósito (sin clases de tamaño de carrusel ni de grid) para poder
 * usarse en ambos contextos sin pelear con las clases del padre. */
export function ProductTile({
  product,
  index,
  showDescription = false,
}: {
  product: LaunchProduct;
  index: number;
  showDescription?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-caption text-neutral-700">{String(index + 1).padStart(2, "0")}</span>

      <Link href={`/producto/${product.handle}`} className="group block">
        {product.image ? (
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
            <Image
              src={product.image.url}
              alt={product.image.altText ?? product.title}
              fill
              sizes="(min-width: 1024px) 20vw, 60vw"
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <ImagePlaceholder />
        )}
      </Link>

      <div>
        <h3 className="text-h4 font-medium text-neutral-900">{product.title}</h3>
        <p className="mt-1 font-mono text-small text-neutral-700">{formatMoney(product.price)}</p>
        {showDescription && product.description && (
          <p className="mt-2 line-clamp-2 text-small text-neutral-700">{product.description}</p>
        )}
      </div>
    </div>
  );
}
