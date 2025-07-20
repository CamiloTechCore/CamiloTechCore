"use client";
import { useState } from 'react';

export default function ContactForm() {
  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Nuevos estados para manejar el envío
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatusMessage('');

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();

        if (response.ok) {
            setStatusMessage("¡Mensaje enviado con éxito! Gracias por contactarme.");
            setIsError(false);
            // Limpiar el formulario
            setName('');
            setEmail('');
            setMessage('');
        } else {
            setStatusMessage(result.message || "Hubo un error al enviar el mensaje.");
            setIsError(true);
        }
    } catch (error) {
        // 👇 AQUÍ ESTÁ LA CORRECCIÓN: Usamos la variable 'error'
        console.error("Detalle del error de envío:", error);
        setStatusMessage("No se pudo conectar con el servidor. Por favor, inténtalo más tarde.");
        setIsError(true);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">Nombre</label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">E-mail</label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">Mensaje</label>
          <textarea className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white h-48 resize-none" id="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        </div>
      </div>

      <div className="w-full">
        <button 
          className="shadow bg-cyan-600 hover:bg-cyan-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:bg-gray-400" 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </div>

      {statusMessage && (
        <p className={`mt-4 text-sm font-semibold ${isError ? 'text-red-600' : 'text-green-600'}`}>
          {statusMessage}
        </p>
      )}
    </form>
  );
}