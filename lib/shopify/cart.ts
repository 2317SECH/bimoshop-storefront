import { shopifyStorefront } from "./client";
import { CART_CREATE_QUERY } from "./queries";
import type { CartCreateResponse } from "./types";

export class CartError extends Error {}

/** Arma un cart de Shopify con una sola linea y devuelve el checkoutUrl que
 * genera Shopify -- el checkout en si no se programa, ya existe del lado de
 * Shopify (ver STATUS_BIMOSHOP.md, bloqueador 3). Patron "comprar ahora":
 * sin cart persistente entre paginas, cada compra arma un cart nuevo. */
export async function createCheckoutUrl(variantId: string, quantity: number): Promise<string> {
  const data = await shopifyStorefront<CartCreateResponse>(CART_CREATE_QUERY, {
    lines: [{ merchandiseId: variantId, quantity }],
  });

  const { cart, userErrors } = data.cartCreate;
  if (userErrors.length > 0) {
    throw new CartError(userErrors.map((e) => e.message).join("; "));
  }
  if (!cart) {
    throw new CartError("Shopify no devolvio un cart -- respuesta inesperada");
  }
  return cart.checkoutUrl;
}
