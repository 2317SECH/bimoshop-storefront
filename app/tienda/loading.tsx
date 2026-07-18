/** Convención de ruta de Next.js -- envuelve TiendaPage en Suspense
 * automáticamente mientras resuelve la consulta a Shopify. Mismas
 * dimensiones que el resultado final para no generar salto de layout. */
export default function Loading() {
  return (
    <main className="px-6 pb-24 pt-40 md:pb-32" aria-hidden="true">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto h-0.5 w-8 bg-amber-600" />
        <div className="mx-auto mt-6 h-10 w-64 max-w-full motion-safe:animate-pulse rounded bg-neutral-100" />
        <div className="mx-auto mt-4 h-6 w-96 max-w-full motion-safe:animate-pulse rounded bg-neutral-100" />
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="h-4 w-6 motion-safe:animate-pulse rounded bg-neutral-100" />
            <div className="aspect-[4/5] motion-safe:animate-pulse rounded-xl bg-neutral-100" />
            <div className="h-5 w-3/4 motion-safe:animate-pulse rounded bg-neutral-100" />
          </div>
        ))}
      </div>
    </main>
  );
}
