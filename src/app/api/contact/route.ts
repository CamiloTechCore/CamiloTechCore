import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // 👈 Importar la conexión a la DB

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, message } = formData;

    // 1. Crear un nuevo documento en la colección "messages"
    const messageRef = await db.collection('messages').add({
      name,
      email,
      message,
      createdAt: new Date(), // Añadir una marca de tiempo es una buena práctica
    });

    console.log("Mensaje guardado en Firestore con ID:", messageRef.id);

    // 2. Enviar una respuesta de éxito de vuelta al cliente
    return NextResponse.json({
      message: "Mensaje recibido y guardado con éxito",
      id: messageRef.id
    }, { status: 200 });

  } catch (error) {
    console.error("Error al guardar en Firestore:", error);
    return NextResponse.json({
      message: "Error al procesar el mensaje"
    }, { status: 500 });
  }
}