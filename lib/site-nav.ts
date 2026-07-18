/** Navegación principal compartida entre Navbar y Footer -- un solo lugar
 * para agregar/renombrar páginas. "Nosotros" y "Preguntas frecuentes" se
 * sacaron de acá (Fase 5, corrección de dirección) -- daban 404 real:
 * necesitan historia de marca / contenido real de Sergio, no se inventan.
 * Volver a agregarlas cuando esas páginas existan de verdad. */
export const NAV_LINKS = [{ label: "Catálogo", href: "/tienda" }] as const;
