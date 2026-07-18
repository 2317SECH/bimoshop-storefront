/** Fallback de Suspense para Collection.tsx mientras resuelve la consulta
 * real a Shopify -- mismas dimensiones que el resultado final para no
 * generar salto de layout cuando llegan los datos. */
export function CollectionSkeleton() {
  return (
    <section className="bg-neutral-0 px-6 py-24 md:py-32" aria-hidden="true">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto block h-0.5 w-8 bg-amber-600" />
        <div className="mx-auto mt-6 h-9 w-72 max-w-full motion-safe:animate-pulse rounded bg-neutral-100" />
        <div className="mx-auto mt-4 h-6 w-80 max-w-full motion-safe:animate-pulse rounded bg-neutral-100" />
      </div>

      <div className="mx-auto mt-16 max-w-6xl">
        <div className="h-px w-full bg-amber-600/20" />
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="h-4 w-6 motion-safe:animate-pulse rounded bg-neutral-100" />
              <div className="aspect-[4/5] motion-safe:animate-pulse rounded-xl bg-neutral-100" />
              <div className="h-5 w-3/4 motion-safe:animate-pulse rounded bg-neutral-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
