import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main className="container mx-auto p-8">
        <h1 className="text-4xl font-bold">¡Hola! Soy Camilo | Analista de datos y desarrollador Web </h1>
        <p className="mt-4 text-lg text-gray-600">
        Me apasiona la intersección donde los datos se encuentran con el desarrollo. Como Analista de Datos y Desarrollador, no solo busco entender la información, sino construir las herramientas interactivas que le dan vida y sentido.
        <br></br>
        Mi especialidad es implementar soluciones web personalizadas que permiten a los equipos medir objetivos específicos y facilitar una toma de decisiones basada en evidencia. Mi metodología de trabajo se centra en el aprendizaje iterativo y en lo que llamo <strong>Cognitive Scaffolding:</strong> un andamiaje cognitivo donde la inteligencia artificial actúa como un socio estratégico para potenciar nuestras habilidades, permitiéndenos llegar a insights más profundos en menos tiempo.
        </p>
      </main>
    </PageTransition>
  );
}