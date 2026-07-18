import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { Philosophy } from "@/components/home/Philosophy";
import { Collection } from "@/components/home/Collection";
import { CollectionSkeleton } from "@/components/home/CollectionSkeleton";
import { Benefits } from "@/components/home/Benefits";
import { SocialProof } from "@/components/home/SocialProof";
import { WaitlistCTA } from "@/components/home/WaitlistCTA";

/** Fase 7.4 -- Home construido por secciones (Design System §12 / Brand
 * Book). Cada sección se agrega solo cuando la anterior está aprobada.
 * Collection es async (Fase 8.2, datos reales de Shopify) -- Suspense la
 * streamea sin bloquear el resto de la página. */
export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <Suspense fallback={<CollectionSkeleton />}>
        <Collection />
      </Suspense>
      <Benefits />
      <SocialProof />
      <WaitlistCTA />
    </main>
  );
}
