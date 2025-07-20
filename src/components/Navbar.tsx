"use client"; // 👈 Paso 1: Convertir a Componente de Cliente para usar estado

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-4 relative">
      <div className="container mx-auto flex justify-between items-center">

        {/* Logo o Nombre */}
        <Link href="/" className="font-bold text-xl">
          CamilotechCore
        </Link>

        {/* Enlaces para pantallas grandes (md y superior) */}
        <div className="hidden md:flex gap-4">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Inicio</Link>
          <Link href="/about" className="hover:text-cyan-400 transition-colors">Acerca de Mí</Link>
          <Link href="/projects" className="hover:text-cyan-400 transition-colors">Proyectos</Link>
          <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contacto</Link>
        </div>

        {/* Botón de Hamburguesa para pantallas pequeñas (oculto en md y superior) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {/* Ícono de Hamburguesa (☰) o Cruz (X) */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> // Ícono de Cruz (X)
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /> // Ícono de Hamburguesa (☰)
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú Desplegable para Móviles */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-800">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link href="/" className="hover:text-cyan-400 transition-colors" onClick={() => setIsOpen(false)}>Inicio</Link>
            <Link href="/about" className="hover:text-cyan-400 transition-colors" onClick={() => setIsOpen(false)}>Acerca de Mí</Link>
            <Link href="/projects" className="hover:text-cyan-400 transition-colors" onClick={() => setIsOpen(false)}>Proyectos</Link>
            <Link href="/contact" className="hover:text-cyan-400 transition-colors" onClick={() => setIsOpen(false)}>Contacto</Link>
          </div>
        </div>
      )}
    </nav>
  );
}