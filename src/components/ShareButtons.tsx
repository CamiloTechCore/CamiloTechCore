"use client"; // Convertimos este componente a uso del cliente 

import { useState } from "react";

//Definimos que propíedades (props) acepta el componente

type ShareButtonsProps = {
    title: string;
    slug: string;
};
export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  // Estado para dar feedback al usuario cuando copia el enlace
  const [copyText, setCopyText] = useState('Copiar Link');

  // Construimos la URL completa del post
  // process.env.NEXT_PUBLIC_BASE_URL sería la URL de tu sitio (ej: https://camilo-tech-core.vercel.app)
  // Por ahora, usaremos una URL relativa que funcionará bien.
  const postUrl = `https://camilo-tech-core.vercel.app/blog/${slug}`;

  // URL formateada para compartir en LinkedIn
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(title)}`;

  // Función que se ejecuta al hacer clic en "Copiar Link"
  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      // Si la copia es exitosa, cambiamos el texto del botón
      setCopyText('¡Copiado!');
      // Después de 2 segundos, volvemos al texto original
      setTimeout(() => {
        setCopyText('Copiar Link');
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar el enlace: ', err);
      setCopyText('Error');
    });
  };

  return (
    <div className="flex items-center gap-4 mt-8">
      <p className="font-semibold">Compartir:</p>
      <a
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors"
      >
        LinkedIn
      </a>
      <button
        onClick={handleCopyLink}
        className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
      >
        {copyText}
      </button>
    </div>
  );
}