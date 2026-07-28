const WHATSAPP_NUMBER = "573136682674";

/** Botón de WhatsApp en la ficha de producto -- ahí es donde la gente duda
 * (talla, tiempo de entrega, si la tienda es real) y donde se pierde la
 * venta si no hay a quién preguntarle. Mensaje prellenado con el nombre del
 * producto para que el mensaje llegue con contexto, sin que el cliente
 * tenga que escribirlo. Es un link plano (sin "use client"): no necesita
 * estado ni el server action de compra. */
export function WhatsAppButton({ productTitle }: { productTitle: string }) {
  const message = `Hola, estoy viendo ${productTitle} en BIMO Shop`;
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-12 w-full items-center justify-center rounded-lg border border-neutral-300 px-6 text-body font-medium text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50 sm:w-auto sm:min-w-64"
    >
      Preguntar por WhatsApp
    </a>
  );
}
