import { shopifyStorefront } from "./client";
import { LAUNCH_PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY } from "./queries";
import type {
  ProductsQueryResponse,
  ShopifyProductNode,
  LaunchProduct,
  ProductByHandleResponse,
  ProductDetail,
} from "./types";

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

/** Los productos de la colección de lanzamiento (Home, sección 3).
 *
 * Devuelve [] cuando Shopify responde OK pero todavía no hay productos
 * publicados -- eso no es un error, es un catálogo real todavía vacío
 * (Store Builder no publicó nada aún). El caller decide cómo mostrarlo.
 *
 * Relanza el error si la llamada en sí falla (token/config/red/Shopify
 * caído) -- el caller decide cómo degradar, esta función no oculta fallos
 * ni inventa datos de reemplazo. */
export async function getLaunchProducts(count = 5): Promise<LaunchProduct[]> {
  const data = await shopifyStorefront<ProductsQueryResponse>(LAUNCH_PRODUCTS_QUERY, { first: count });
  return data.products.nodes.map(toLaunchProduct);
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
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    price: node.priceRange.minVariantPrice,
    images: node.images.nodes,
    variantId: variant?.id ?? null,
    availableForSale: variant?.availableForSale ?? false,
  };
}
