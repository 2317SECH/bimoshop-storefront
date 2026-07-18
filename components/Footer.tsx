import Link from "next/link";
import { NAV_LINKS } from "@/lib/site-nav";

const POLICY_LINKS = [
  { label: "Envíos", href: "/politicas/envios" },
  { label: "Devoluciones", href: "/politicas/devoluciones" },
  { label: "Privacidad", href: "/politicas/privacidad" },
  { label: "Términos", href: "/politicas/terminos" },
] as const;

/** Vacío a propósito -- sin cuentas reales todavía (Design System §5.6:
 * "sin íconos de redes sociales si no hay cuentas activas y mantenidas").
 * Activar agregando entradas acá; el render de abajo ya está listo para
 * iterarlo sin más cambios. */
const SOCIAL_LINKS: { label: string; href: string }[] = [];

/** Footer -- sitewide (vive en app/layout.tsx, no en cada página). Las
 * páginas de /tienda, /nosotros, /faq y /politicas/* todavía no existen
 * (fases siguientes del roadmap) -- los links son reales a propósito, no
 * decorativos, así que hoy dan 404 hasta que se construyan. Ningún dato de
 * contacto/redes se inventa mientras no exista de verdad. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 px-6 py-16 text-neutral-400">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-4 md:gap-8">
        <div className="flex flex-col gap-3 md:col-span-1">
          <span className="text-h4 font-semibold text-neutral-0">BIMO Shop</span>
          <p className="text-small">Un sistema para que tu espacio de trabajo te ayude a pensar mejor.</p>
        </div>

        <nav aria-label="Navegación principal" className="flex flex-col gap-3">
          <span className="text-caption font-medium uppercase tracking-wide text-neutral-400">Tienda</span>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-small text-neutral-0 transition-opacity hover:opacity-70">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Políticas" className="flex flex-col gap-3">
          <span className="text-caption font-medium uppercase tracking-wide text-neutral-400">Políticas</span>
          <ul className="flex flex-col gap-2">
            {POLICY_LINKS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-small text-neutral-0 transition-opacity hover:opacity-70">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3">
          <span className="text-caption font-medium uppercase tracking-wide text-neutral-400">Contacto</span>
          <p className="text-small">
            Todavía no tenemos canales de contacto ni redes activas. Vas a poder escribirnos apenas estén
            disponibles.
          </p>
          {SOCIAL_LINKS.length > 0 && (
            <ul className="flex gap-4">
              {SOCIAL_LINKS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-small text-neutral-0 hover:opacity-70">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-neutral-700 pt-8">
        <p className="text-caption text-neutral-400">© {year} BIMO Shop. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
