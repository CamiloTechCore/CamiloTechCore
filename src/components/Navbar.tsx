"use client"; 

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Aplicamos el fondo blanco y la nueva sombra de color neón
    <nav className="bg-white text-teal-dark p-4 shadow-neon sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">

        <Link href="/" className="font-bold text-xl hover:text-teal-medium transition-colors">
          Camilo.dev
        </Link>

        {/* Enlaces para pantallas grandes con nuevos colores de hover */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-teal-medium transition-colors">Inicio</Link>
          <Link href="/about" className="hover:text-teal-medium transition-colors">Acerca de Mí</Link>
          <Link href="/projects" className="hover:text-teal-medium transition-colors">Proyectos</Link>
          <Link href="/contact" className="hover:text-teal-medium transition-colors">Contacto</Link>
        </div>

        {/* Botón de Hamburguesa para pantallas pequeñas */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú Desplegable para Móviles con el nuevo estilo */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-white rounded-custom shadow-neon">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link href="/" className="hover:text-teal-medium transition-colors" onClick={() => setIsOpen(false)}>Inicio</Link>
            <Link href="/about" className="hover:text-teal-medium transition-colors" onClick={() => setIsOpen(false)}>Acerca de Mí</Link>
            <Link href="/projects" className="hover:text-teal-medium transition-colors" onClick={() => setIsOpen(false)}>Proyectos</Link>
            <Link href="/contact" className="hover:text-teal-medium transition-colors" onClick={() => setIsOpen(false)}>Contacto</Link>
          </div>
        </div>
      )}
    </nav>
  );
}