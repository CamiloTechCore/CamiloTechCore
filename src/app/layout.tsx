import type { Metadata } from "next";
import { Inter } from "next/font/google"; // <-- 1. Importamos la fuente 'Inter'
import "./globals.css";
import Navbar from "@/components/Navbar";

// 2. Inicializamos la fuente 'Inter'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portafolio de Camilo",
  description: "Portafolio técnico Full-Stack JavaScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 3. Aplicamos la clase de la fuente 'Inter' al body */}
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}