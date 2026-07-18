# BIMO Shop -- Storefront

Tienda de cara al cliente. Proyecto independiente de `dashboard/` (panel
interno) y del backend Python (`core/`, `agents/`) -- stack, repo de
despliegue y ciclo de vida separados a propósito.

Estado: Fase 4 cerrada (2026-07-18). Home (7 secciones) + Navbar/Footer +
`/tienda` + `/producto/[handle]` + carrito (cartCreate) + redirect a
checkout nativo de Shopify, todo consumiendo la Storefront API real
(`lib/shopify/`), sin datos hardcodeados. Desplegado en producción:
https://bimoshop-storefront.vercel.app -- repo propio (`bimoshop-storefront`
en GitHub), auto-deploy en cada push a `main`. Ver Brand Book y Design
System de BIMO Shop para las decisiones que gobiernan todo lo que se
construye acá.

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

1. ~~Token de Storefront API~~ -- hecho, generado y verificado en vivo.
2. ~~Proyecto en Vercel~~ -- hecho, desplegado y verificado en vivo.
3. **Dominio propio** -- ya comprado por Sergio, falta conectarlo a este
   proyecto de Vercel y a Shopify.
4. **Configuración comercial en Shopify** (pagos, envíos, impuestos) --
   pendiente en Shopify Admin, no depende de este repo.

Ninguno de estos pasos requiere cambios de código acá -- son
configuración externa que solo se puede hacer con acceso real a las
cuentas de Shopify/Vercel/registrador de dominio.
