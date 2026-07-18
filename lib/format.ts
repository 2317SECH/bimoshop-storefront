import type { ShopifyMoney } from "@/lib/shopify/types";

/** Formato de moneda real (Intl), no concatenación manual de símbolo+monto
 * -- reutilizable dondequiera que se muestre un precio de Shopify. */
export function formatMoney({ amount, currencyCode }: ShopifyMoney): string {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: currencyCode }).format(Number(amount));
}
