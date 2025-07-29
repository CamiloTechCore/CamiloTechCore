"use client";
import { useState } from 'react';

export default function ContactForm() {
  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Estados para manejar el envío y el feedback al usuario
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');
    setIsError(false);

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwvMsVELe8qOYAj9xxe-JRThE74wuqoJZ6ZBEdB_UkMKFWJ2iRYqvVunZsR32TCgDw6Fw/exec";

    try {
      await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Importante para la comunicación con Apps Script
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
      });

      // Asumimos éxito si no hay un error de red
      setStatusMessage("¡Mensaje enviado con éxito! Gracias por contactarme.");
      setIsError(false);
      setName('');
      setEmail('');
      setMessage('');

    } catch (error) {
      console.error("Error al enviar a Google Sheets:", error);
      setStatusMessage("Hubo un error al enviar el mensaje. Inténtalo de nuevo.");
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
      {/* Campos del formulario */}
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input 
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
            id="name" 
            type="text" 
            placeholder="Tu Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
            E-mail
          </label>
          <input 
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            id="email" 
            type="email" 
            placeholder="tu@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">
            Mensaje
          </label>
          <textarea 
            className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" 
            id="message" 
            placeholder="Hola, Camilo..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
      </div>

      {/* Botón y Mensaje de Estado */}
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