"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/** Patrón de aparición al hacer scroll, compartido por las secciones del
 * Home debajo del pliegue (Design System §7 -- fade + rise discreto, una
 * sola vez, respeta prefers-reduced-motion).
 *
 * CSS transition + IntersectionObserver nativos, no Framer Motion: la
 * versión anterior escribía opacity/transform por JS en cada frame
 * (rAF), y si el tab perdía prioridad de rAF a mitad de la animación
 * (tab en background, throttling) el contenido quedaba congelado a
 * mitad de camino -- opacity ~0.5, invisible en la práctica, para
 * siempre (viewport once:true no reintenta). Con transición CSS pura el
 * navegador la corre en el compositor, no depende de que el hilo
 * principal siga entregando frames. */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px", threshold: 0 },
    );
    observer.observe(node);

    // Salvaguarda: si por lo que sea el observer nunca dispara (layout
    // raro, elemento ya fuera de vista al montar en una página larga),
    // el contenido no debe quedar invisible para siempre.
    const fallback = setTimeout(() => setVisible(true), 2000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="transition-[opacity,transform] duration-[400ms] ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : reduceMotion ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
