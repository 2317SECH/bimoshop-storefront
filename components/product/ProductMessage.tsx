import type { ReactNode } from "react";

/** Mensaje calmo compartido para los estados "colección vacía" y "Shopify
 * no responde" -- misma pieza visual en Home y `/tienda`, cada llamador
 * pasa su propio texto según contexto. */
export function ProductMessage({ children }: { children: ReactNode }) {
  return <p className="mx-auto mt-16 max-w-md text-center text-body text-neutral-700">{children}</p>;
}
