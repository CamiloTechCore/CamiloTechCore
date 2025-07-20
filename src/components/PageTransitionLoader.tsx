// src/components/PageTransitionLoader.tsx
"use client";

import dynamic from 'next/dynamic';

// Importamos dinámicamente el componente de transición
const PageTransition = dynamic(() => import('@/components/PageTransition'), {
  ssr: false,
});

// El componente Loader recibe 'children' y los pasa a PageTransition
export default function PageTransitionLoader({ children }: { children: React.ReactNode }) {
    return <PageTransition>{children}</PageTransition>;
}