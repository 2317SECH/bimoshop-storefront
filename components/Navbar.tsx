"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-nav";

/** Navbar sitewide (vive en app/layout.tsx, Fase 8.1). Transparente sobre
 * el Hero, se solidifica con blur en los primeros 100px de scroll (Design
 * System §5.5) -- por eso mide el progreso de scroll en vez de un simple
 * boolean. Sin ícono de carrito a propósito (Fase 5): la compra es directa
 * (botón "Comprar ahora" -> cartCreate -> checkout), no hay página de
 * carrito ni estado de carrito persistente que mostrar acá. */
export function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setScrollProgress(Math.min(window.scrollY / 100, 1));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-neutral-200 bg-neutral-0/90 backdrop-blur-md"
        style={{ opacity: scrollProgress }}
      />

      <div className="relative mx-auto flex h-[72px] max-w-6xl items-center gap-4 px-6">
        <a
          href="https://bimo-hub.vercel.app/"
          aria-label="Volver a BIMO"
          className="flex items-center gap-1 text-body-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <span aria-hidden="true">←</span> BIMO
        </a>
        <Link href="/" className="text-h4 font-semibold text-neutral-900">
          BIMO Shop
        </Link>
        <div className="flex-1" />

        <nav aria-label="Navegación principal" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-body text-neutral-700 transition-colors hover:text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="text-neutral-900 md:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Navegación principal (móvil)"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative border-b border-neutral-200 bg-neutral-0 px-6 py-6 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-body-lg text-neutral-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
