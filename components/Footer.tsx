import Link from "next/link";
import { NAV_LINKS } from "@/lib/site-nav";

const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "WhatsApp", href: "https://wa.me/573136682674" },
];

/** Footer -- sitewide (vive en app/layout.tsx, no en cada página). La
 * columna de Políticas se sacó (Fase 5, corrección de dirección): son
 * compromisos legales reales (envíos/devoluciones/privacidad/términos),
 * no se inventa el texto -- vuelve cuando Sergio defina el contenido real. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 px-6 py-16 text-neutral-400">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3 md:gap-8">
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

        <div className="flex flex-col gap-3">
          <span className="text-caption font-medium uppercase tracking-wide text-neutral-400">Contacto</span>
          <ul className="flex gap-4">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-small text-neutral-0 hover:opacity-70"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-neutral-700 pt-8">
        <p className="text-caption text-neutral-400">© {year} BIMO Shop. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
