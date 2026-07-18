export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProductImage = {
  url: string;
  altText: string | null;
  width: number;
  height: number;
};

export type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: { minVariantPrice: ShopifyMoney };
  featuredImage: ShopifyProductImage | null;
};

export type ProductsQueryResponse = {
  products: { nodes: ShopifyProductNode[] };
};

/** Forma que consume la UI -- desacoplada del shape crudo de la respuesta
 * GraphQL para que un cambio de query no obligue a tocar componentes. */
export type LaunchProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: ShopifyMoney;
  image: ShopifyProductImage | null;
};

export type ShopifyProductDetailNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: { minVariantPrice: ShopifyMoney };
  images: { nodes: ShopifyProductImage[] };
  variants: { nodes: { id: string; availableForSale: boolean }[] };
};

export type ProductByHandleResponse = {
  product: ShopifyProductDetailNode | null;
};

/** Forma que consume la página de producto -- variantId es lo único que
 * necesita el botón de compra (cartCreate), availableForSale decide si se
 * muestra habilitado o "Agotado". */
export type ProductDetail = {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: ShopifyMoney;
  images: ShopifyProductImage[];
  variantId: string | null;
  availableForSale: boolean;
};

export type CartCreateResponse = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};
