// src/components/SkillsCloudLoader.tsx
"use client"; // 👈 Esto lo convierte en un Componente de Cliente

import dynamic from 'next/dynamic';

// La lógica de importación dinámica ahora vive aquí adentro
const SkillsCloud = dynamic(() => import('@/components/SkillsCloud'), {
  ssr: false,
  loading: () => <p className="text-center">Cargando nube de habilidades...</p>,
});

export default function SkillsCloudLoader() {
  // Este componente simplemente renderiza la SkillsCloud cargada dinámicamente
  return <SkillsCloud />;
}