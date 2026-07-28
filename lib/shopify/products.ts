import { shopifyStorefront } from "./client";
import { PRODUCTS_BY_COLLECTION_QUERY, PRODUCT_BY_HANDLE_QUERY, COLLECTIONS_QUERY } from "./queries";
import type {
  ShopifyProductNode,
  LaunchProduct,
  ProductByHandleResponse,
  ProductDetail,
  ProductsByCollectionResponse,
  CollectionsResponse,
  StoreCollection,
} from "./types";

/** Colección maestra: `store_builder` agrega acá todo producto aprobado al
 * publicarlo (49/49 confirmado en vivo, Fase 5 Paso 2) -- es el catálogo
 * completo real, sin los productos de descarte/pruebas que existen en la
 * tienda pero nunca se publicaron a ningún canal ni colección. */
const MASTER_COLLECTION_HANDLE = "el-sistema-bimo";

/** Colecciones que existen en Shopify pero no son categorías reales para
 * mostrarle al cliente -- "frontpage" es la colección default de Shopify
 * (legacy, 1 solo producto), y la maestra ya se usa como "Todos". */
const HIDDEN_COLLECTION_HANDLES = new Set(["frontpage", MASTER_COLLECTION_HANDLE]);

function toLaunchProduct(node: ShopifyProductNode): LaunchProduct {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    price: node.priceRange.minVariantPrice,
    image: node.featuredImage,
  };
}

/** Productos de una colección real de Shopify, más recientes primero.
 * [] si la colección no existe o está vacía -- nunca inventa productos. */
export async function getProductsByCollection(handle: string, count: number): Promise<LaunchProduct[]> {
  const data = await shopifyStorefront<ProductsByCollectionResponse>(PRODUCTS_BY_COLLECTION_QUERY, {
    handle,
    first: count,
  });
  return (data.collection?.products.nodes ?? []).map(toLaunchProduct);
}

/** Los productos de la colección de lanzamiento (Home, sección 3) --
 * ahora escopeados a la colección maestra (Fase 5 Paso 2), no a
 * `products()` sin filtro: eso dejaba colar productos de descarte que
 * nunca se publicaron a ningún canal (ver STATUS_BIMOSHOP.md). */
export async function getLaunchProducts(count = 5): Promise<LaunchProduct[]> {
  return getProductsByCollection(MASTER_COLLECTION_HANDLE, count);
}

/** Catálogo completo -- `/tienda` (Fase 5 Paso 2). 100 cubre de sobra el
 * tamaño actual (49) y cualquier ronda de curaduría futura cercana. */
export async function getCatalog(count = 100): Promise<LaunchProduct[]> {
  return getProductsByCollection(MASTER_COLLECTION_HANDLE, count);
}

/** Categorías reales para el filtro de `/tienda` -- excluye la maestra, la
 * default de Shopify, y cualquier categoría sin productos activos (la
 * Storefront API solo devuelve productos ACTIVE/publicados, así que una
 * colección con todo en borrador --p.ej. tras una depuración-- llega acá
 * con `products.nodes` vacío). Ninguna categoría se inventa. */
export async function getCollections(): Promise<StoreCollection[]> {
  const data = await shopifyStorefront<CollectionsResponse>(COLLECTIONS_QUERY, {});
  return data.collections.nodes
    .filter((c) => !HIDDEN_COLLECTION_HANDLES.has(c.handle) && c.products.nodes.length > 0)
    .map((c) => ({ handle: c.handle, title: c.title }));
}

/** Producto individual por handle -- `/producto/[handle]` (Fase 4). null si
 * Shopify no tiene ningun producto con ese handle publicado en Online Store
 * (handle invalido o producto no publicado en este canal) -- el caller
 * decide como degradar (hoy: notFound()), esta funcion no inventa nada. */
export async function getProductByHandle(handle: string): Promise<ProductDetail | null> {
  const data = await shopifyStorefront<ProductByHandleResponse>(PRODUCT_BY_HANDLE_QUERY, { handle });
  const node = data.product;
  if (!node) return null;

  const variant = node.variants.nodes[0];
  // preferir una categoría especifica (no la maestra) para "relacionados"
  // y el breadcrumb -- da productos más parecidos entre sí que "cualquiera
  // de los 49" y un breadcrumb más útil que "El Sistema BIMO" siempre.
  const preferredCollection =
    node.collections.nodes.find((c) => !HIDDEN_COLLECTION_HANDLES.has(c.handle)) ?? node.collections.nodes[0] ?? null;

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    price: node.priceRange.minVariantPrice,
    images: node.images.nodes,
    variantId: variant?.id ?? null,
    availableForSale: variant?.availableForSale ?? false,
    collectionHandle: preferredCollection?.handle ?? null,
    collectionTitle: preferredCollection?.title ?? null,
  };
}

/** Productos relacionados -- otros productos de la misma colección que el
 * actual, excluyéndolo. [] si no hay colección o no hay más productos ahí
 * (el caller simplemente no muestra la sección, no rellena con nada). */
export async function getRelatedProducts(
  collectionHandle: string | null,
  excludeHandle: string,
  count = 4
): Promise<LaunchProduct[]> {
  if (!collectionHandle) return [];
  const products = await getProductsByCollection(collectionHandle, count + 1);
  return products.filter((p) => p.handle !== excludeHandle).slice(0, count);
}
