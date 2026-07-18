/** Navegación principal compartida entre Navbar y Footer -- un solo lugar
 * para agregar/renombrar páginas. Rutas reales (dan 404 hasta que existan,
 * a propósito, ver Footer.tsx / Navbar.tsx). */
export const NAV_LINKS = [
  { label: "Catálogo", href: "/tienda" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Preguntas frecuentes", href: "/faq" },
] as const;
