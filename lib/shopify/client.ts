const API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION ?? "2026-07";

export class ShopifyStorefrontError extends Error {
  constructor(message: string, readonly errors?: unknown) {
    super(message);
  }
}

/** Cliente minimo para la Storefront API de Shopify (GraphQL, token publico de
 * solo lectura de catalogo/carrito). No confundir con la Admin API que usa
 * Store Builder -- esta no tiene la limitacion de Client Credentials Grant en
 * tiendas de plan pago. */
export async function shopifyStorefront<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN;

  if (!domain || !token) {
    throw new ShopifyStorefrontError(
      "Faltan SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_API_TOKEN -- ver storefront/README.md"
    );
  }

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new ShopifyStorefrontError(`Storefront API respondio ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new ShopifyStorefrontError("Storefront API devolvio errores", json.errors);
  }

  return json.data as T;
}
