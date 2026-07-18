import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageOff } from "lucide-react";
import { getProductByHandle, getRelatedProducts } from "@/lib/shopify/products";
import { formatMoney } from "@/lib/format";
import { BuyButton } from "@/components/product/BuyButton";
import { ProductTile } from "@/components/product/ProductTile";
import { Reveal } from "@/components/motion/Reveal";

/** Fase 4 -- pagina de producto individual. Fase 5 -- breadcrumb con
 * categoría real, entrada escalonada (mismo patrón `Reveal` del Home) y
 * sección de relacionados con más peso editorial. Misma capa de datos que
 * el resto del storefront (lib/shopify/), sin nada hardcodeado -- ninguno
 * de estos cambios toca lógica de producto, carrito ni checkout. */
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
  const related = await getRelatedProducts(product.collectionHandle, product.handle);

  return (
    <main className="px-6 pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Ruta" className="flex items-center gap-2 text-small text-neutral-700">
          <Link href="/tienda" className="transition-colors hover:text-neutral-900">
            Catálogo
          </Link>
          {product.collectionTitle && product.collectionHandle && (
            <>
              <span aria-hidden="true">/</span>
              <Link
                href={`/tienda?categoria=${product.collectionHandle}`}
                className="transition-colors hover:text-neutral-900"
              >
                {product.collectionTitle}
              </Link>
            </>
          )}
        </nav>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
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
                    <div
                      key={image.url}
                      className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100 transition-opacity hover:opacity-80"
                    >
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
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-col gap-6">
              <div>
                {product.collectionTitle && (
                  <span className="font-mono text-caption uppercase tracking-wide text-amber-700">
                    {product.collectionTitle}
                  </span>
                )}
                <h1 className="mt-2 text-h2 font-semibold text-neutral-900">{product.title}</h1>
                <span aria-hidden="true" className="mt-3 block h-px w-10 bg-amber-600" />
                <p className="mt-3 font-mono text-h4 text-neutral-900">{formatMoney(product.price)}</p>
              </div>

              {product.description && <p className="text-body text-neutral-700">{product.description}</p>}

              <BuyButton variantId={product.variantId} availableForSale={product.availableForSale} />
            </div>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <Reveal>
              <span aria-hidden="true" className="block h-0.5 w-8 bg-amber-600" />
              <h2 className="mt-4 text-h3 font-semibold text-neutral-900">También te puede interesar</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
              {related.map((item, i) => (
                <Reveal key={item.id} delay={Math.min(i * 0.06, 0.3)}>
                  <ProductTile product={item} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
