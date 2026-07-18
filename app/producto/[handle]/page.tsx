import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageOff } from "lucide-react";
import { getProductByHandle } from "@/lib/shopify/products";
import { formatMoney } from "@/lib/format";
import { BuyButton } from "@/components/product/BuyButton";

/** Fase 4 -- pagina de producto individual. Antes de esto, cada tile de
 * producto (Home/tienda) apuntaba a `/producto/[handle]` y daba 404 --
 * ver STATUS_BIMOSHOP.md, bloqueador 1. Misma capa de datos que el resto
 * del storefront (lib/shopify/), sin nada hardcodeado. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Producto no encontrado — BIMO Shop" };
  return {
    title: `${product.title} — BIMO Shop`,
    description: product.description || undefined,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const [mainImage, ...restImages] = product.images;

  return (
    <main className="px-6 pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-5xl">
        <Link href="/tienda" className="text-small text-neutral-700 transition-opacity hover:opacity-70">
          ← Volver al catálogo
        </Link>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-4">
            {mainImage ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText ?? product.title}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center rounded-xl bg-neutral-100">
                <ImageOff aria-hidden="true" className="h-10 w-10 text-neutral-400" strokeWidth={1.5} />
              </div>
            )}

            {restImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {restImages.map((image, i) => (
                  <div key={image.url} className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                      src={image.url}
                      alt={image.altText ?? `${product.title} — foto ${i + 2}`}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-h2 font-semibold text-neutral-900">{product.title}</h1>
              <p className="mt-2 font-mono text-h4 text-neutral-900">{formatMoney(product.price)}</p>
            </div>

            {product.description && <p className="text-body text-neutral-700">{product.description}</p>}

            <BuyButton variantId={product.variantId} availableForSale={product.availableForSale} />
          </div>
        </div>
      </div>
    </main>
  );
}
