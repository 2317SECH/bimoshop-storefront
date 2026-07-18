"use server";

import { redirect } from "next/navigation";
import { createCheckoutUrl, CartError } from "@/lib/shopify/cart";

/** Server action del boton "Comprar" -- crea el cart en Shopify y redirige
 * directo al checkout nativo (Fase 4, bloqueadores 2 y 3 juntos: no hay
 * pagina de carrito propia, el "carrito" de BIMO Shop es este paso). */
export async function buyNow(variantId: string): Promise<{ error: string } | never> {
  let checkoutUrl: string;
  try {
    checkoutUrl = await createCheckoutUrl(variantId, 1);
  } catch (err) {
    const message = err instanceof CartError ? err.message : "No pudimos conectar con Shopify. Probá de nuevo.";
    return { error: message };
  }
  redirect(checkoutUrl);
}
