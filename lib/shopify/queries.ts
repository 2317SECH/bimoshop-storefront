/** Consultas GraphQL contra la Storefront API. Separadas de client.ts
 * (transporte) y de products.ts (transformación) para que cada una se
 * pueda revisar/versionar por separado. */

/** Catálogo completo real -- "El Sistema BIMO" es la colección maestra a la
 * que `store_builder` agrega todo producto aprobado (49/49 confirmado en
 * vivo, Fase 5 Paso 2). Consultar por colección en vez de `products()` sin
 * filtro es a propósito: la tienda tiene productos de descarte/pruebas
 * (ACTIVE pero nunca publicados a ningún canal ni colección) que NO deben
 * poder colarse acá -- ver STATUS_BIMOSHOP.md. */
export const PRODUCTS_BY_COLLECTION_QUERY = /* GraphQL */ `
  query ProductsByCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first, sortKey: CREATED, reverse: true) {
        nodes {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

/** Categorías reales para el filtro de `/tienda` -- ya existen en Shopify
 * (armadas por store_builder al publicar), no se inventa ninguna acá. */
export const COLLECTIONS_QUERY = /* GraphQL */ `
  query StoreCollections {
    collections(first: 30) {
      nodes {
        handle
        title
      }
    }
  }
`;

/** Producto individual por handle -- `/producto/[handle]` (Fase 4). Trae
 * galeria completa (no solo featuredImage), el id de la primera variante
 * disponible (lo que necesita cartCreate) y sus colecciones (para armar
 * "productos relacionados" -- Fase 5 Paso 2). */
export const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 6) {
        nodes {
          url
          altText
          width
          height
        }
      }
      variants(first: 1) {
        nodes {
          id
          availableForSale
        }
      }
      collections(first: 5) {
        nodes {
          handle
        }
      }
    }
  }
`;

/** Crea un cart de Shopify con una sola línea y devuelve el checkoutUrl --
 * patrón "comprar ahora": no se persiste carrito entre páginas (no se pidió
 * una página de carrito), cada click en "Comprar" arma un cart nuevo y
 * redirige directo al checkout nativo de Shopify. */
export const CART_CREATE_QUERY = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;
