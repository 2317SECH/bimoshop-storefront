# BIMO Shop -- Storefront

Tienda de cara al cliente. Proyecto independiente de `dashboard/` (panel
interno) y del backend Python (`core/`, `agents/`) -- stack, repo de
despliegue y ciclo de vida separados a propósito.

Estado: Fase 8.2 del roadmap. Home completa (7 secciones) + Navbar/Footer
sitewide. La sección Colección de lanzamiento ya consume la Storefront API
real (`lib/shopify/`), sin datos hardcodeados -- si falta el token, degrada
a un mensaje controlado en vez de romperse (ver §"Sin token todavía" abajo).
Ver Brand Book y Design System de BIMO Shop para las decisiones que
gobiernan todo lo que se construye acá.

## Stack

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion +
Shopify Storefront API (GraphQL). Checkout, pagos, inventario y pedidos
quedan 100% en Shopify -- este proyecto solo lee catálogo y arma el
carrito (`lib/shopify/client.ts` -- transporte; `lib/shopify/queries.ts`
-- GraphQL; `lib/shopify/products.ts` -- transformación a los tipos que
consume la UI).

## Sin token todavía

Mientras `SHOPIFY_STOREFRONT_API_TOKEN` no esté configurado, cualquier
sección que dependa de Shopify (hoy: Colección de lanzamiento) muestra un
mensaje controlado ("No pudimos cargar la colección...") y registra el
error en el log del servidor -- nunca rompe la página. Es el
comportamiento esperado en desarrollo hasta completar el paso manual de
abajo, y también el comportamiento esperado en producción si Shopify
llegara a fallar.

## Setup local

```
npm install
cp .env.example .env.local   # completar los dos pasos manuales de abajo
npm run dev
```

## Pasos manuales pendientes (no automatizables desde acá)

1. **Token de Storefront API** -- generarlo en Shopify Admin (instrucciones
   dentro de `.env.example`). Es una credencial de solo lectura de
   catálogo/carrito, distinta de las credenciales de Admin API que ya usa
   `store_builder` en el backend.
2. **Dominio propio** (ej. bimoshop.com) -- comprar en cualquier
   registrador y apuntarlo al proyecto de Vercel una vez desplegado.
3. **Proyecto en Vercel** -- conectar este directorio (`storefront/`) como
   Root Directory del proyecto Vercel, cargar las mismas variables de
   `.env.example` en la configuración de entorno de Vercel.

Ninguno de estos tres pasos requiere cambios de código -- son
configuración externa que solo se puede hacer con acceso real a las
cuentas de Shopify/Vercel/registrador de dominio.
