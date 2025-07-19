"use client";
import { useState } from 'react'; // 👈 PASO 1: Importar useState

export default function ContactForm() {
  // 👇 PASO 2: Definir los estados para cada campo
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // 👇 PASO 3: Crear la función para manejar el envío
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    const formData = { name, email, message };
    console.log("Enviando datos desde el frontend:", formData);

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Respuesta del servidor:", result);
            alert("¡Mensaje enviado con éxito!");
            // Opcional: Limpiar el formulario después del envío
            setName('');
            setEmail('');
            setMessage('');
        } else {
            console.error("Error del servidor:", result);
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert("Hubo un problema al enviar el mensaje.");
    }
};

  // 👇 PASO 4: Conectar todo al JSX
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-8">
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
            value={name} // Conecta el valor al estado 'name'
            onChange={(e) => setName(e.target.value)} // Actualiza el estado cuando el usuario escribe
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
            value={email} // Conecta el valor al estado 'email'
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
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
            value={message} // Conecta el valor al estado 'message'
            onChange={(e) => setMessage(e.target.value)} // Actualiza el estado
          ></textarea>
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="w-full">
          <button className="shadow bg-cyan-600 hover:bg-cyan-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
            Enviar Mensaje
          </button>
        </div>
      </div>
    </form>
  );
}