"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Composición geométrica abstracta -- nunca ilustración figurativa ni
 * fotografía de stock (Design System §9 / Brand Book §9). Decorativa,
 * oculta a lectores de pantalla; el contraste bajo es intencional, es
 * fondo, no información. */
function SystemGrid() {
  const nodes = [
    { x: 80, y: 60 }, { x: 200, y: 60 }, { x: 320, y: 60 }, { x: 440, y: 60 },
    { x: 80, y: 160 }, { x: 200, y: 160 }, { x: 320, y: 160 }, { x: 440, y: 160 },
    { x: 80, y: 260 }, { x: 200, y: 260 }, { x: 320, y: 260 }, { x: 440, y: 260 },
  ];
  const accentIndex = 6;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 520 320"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35]"
    >
      <line x1="80" y1="60" x2="440" y2="60" stroke="var(--color-neutral-200)" strokeWidth="1" />
      <line x1="80" y1="160" x2="440" y2="160" stroke="var(--color-neutral-200)" strokeWidth="1" />
      <line x1="80" y1="260" x2="440" y2="260" stroke="var(--color-neutral-200)" strokeWidth="1" />
      <line x1="200" y1="160" x2="320" y2="160" stroke="var(--color-amber-400)" strokeWidth="1" />
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === accentIndex ? 5 : 3}
          fill={i === accentIndex ? "var(--color-amber-600)" : "var(--color-neutral-400)"}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6">
      <SystemGrid />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12 }}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
      >
        <motion.h1
          variants={rise}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-h1 md:text-display font-semibold text-neutral-900"
        >
          Tu escritorio, resuelto.
        </motion.h1>

        <motion.p
          variants={rise}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-body-lg max-w-lg text-neutral-700"
        >
          No vendemos accesorios sueltos: armamos un sistema completo para que tu espacio de trabajo te ayude a
          pensar con más claridad.
        </motion.p>

        <motion.a
          href="#filosofia"
          variants={rise}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="group mt-4 flex flex-col items-center gap-2 text-small text-neutral-700 transition-colors hover:text-neutral-900"
        >
          <span>Descubrí el sistema</span>
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={reduceMotion ? "" : "animate-bounce"}
          >
            <path
              d="M3 6L8 11L13 6"
              stroke="var(--color-amber-600)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
