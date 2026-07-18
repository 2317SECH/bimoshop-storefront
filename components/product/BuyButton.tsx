"use client";

import { useState, useTransition } from "react";
import { buyNow } from "@/app/producto/[handle]/actions";

/** Boton de compra -- llama al server action, que redirige al checkout de
 * Shopify si todo sale bien. Solo necesita manejar el caso de error (la
 * redireccion exitosa nunca vuelve al cliente). */
export function BuyButton({ variantId, availableForSale }: { variantId: string | null; availableForSale: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!variantId || !availableForSale) {
    return (
      <button
        type="button"
        disabled
        className="h-12 w-full rounded-lg bg-neutral-200 px-6 text-body font-medium text-neutral-500 disabled:cursor-not-allowed sm:w-auto sm:min-w-64"
      >
        Agotado
      </button>
    );
  }

  function handleClick() {
    setError(null);
    startTransition(async () => {
      const result = await buyNow(variantId!);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="h-12 w-full rounded-lg bg-amber-700 px-6 text-body font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto sm:min-w-64"
      >
        {isPending ? "Redirigiendo a pago..." : "Comprar ahora"}
      </button>
      {error && (
        <p role="alert" className="mt-3 text-small text-error-600">
          {error}
        </p>
      )}
    </div>
  );
}
