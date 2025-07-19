"use client"; // Las animaciones requieren ser componentes de cliente

import { motion } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }} // Estado inicial: 20px abajo y transparente
      animate={{ y: 0, opacity: 1 }}   // Estado final: en su posición original y opaco
      transition={{ ease: "easeInOut", duration: 0.75 }} // Tipo y duración de la animación
    >
      {children}
    </motion.div>
  );
}