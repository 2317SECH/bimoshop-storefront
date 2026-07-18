/** Consultas GraphQL contra la Storefront API. Separadas de client.ts
 * (transporte) y de products.ts (transformación) para que cada una se
 * pueda revisar/versionar por separado. */

export const LAUNCH_PRODUCTS_QUERY = /* GraphQL */ `
  query LaunchProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT) {
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
`;

/** Producto individual por handle -- `/producto/[handle]` (Fase 4). Trae
 * galeria completa (no solo featuredImage) y el id de la primera variante
 * disponible, que es lo que necesita cartCreate para el botón de compra. */
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
