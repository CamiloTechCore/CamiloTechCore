import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          CamiloTechCore | Data Analys | Developer
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Inicio</Link>
          <Link href="/about" className="hover:text-cyan-400 transition-colors">Acerca de Mí</Link>
          <Link href="/projects" className="hover:text-cyan-400 transition-colors">Proyectos</Link>
          <Link href="/contact" className="hover:text-cyan-400 transition-colors">Contacto</Link>
        </div>
      </div>
    </nav>
  );
}