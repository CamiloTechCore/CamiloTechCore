import Image from 'next/image';
// Importamos nuestros nuevos componentes "cargadores"
import PageTransitionLoader from '@/components/PageTransitionLoader';
import SkillsCloudLoader from '@/components/SkillsCloudLoader';

// La lista de skills se queda igual
const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Python", "SQL", "Google Firestore", "MongoDB", "Tailwind CSS",
  "Git", "Google Cloud Platform", "Vercel","Excel","Power BI"
];

export default function AboutPage() {
  return (
    // Usamos el cargador de PageTransition
    <PageTransitionLoader>
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Tu sección de Foto y Presentación no cambia */}
          <div>
            <Image src="/profile.png" alt="Foto de perfil de Camilo" width={150} height={150} className="rounded-full mx-auto mb-4 border-4 border-gray-300"/>
            <h1 className="text-4xl font-bold text-center">Acerca de Mí</h1>
            <p className="mt-4 text-lg text-gray-700">
              {/* ... Todo tu texto de presentación ... */}
            </p>
          </div>

          {/* Sección de Habilidades */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-6">Mis Habilidades</h2>

            {/* Usamos el cargador de SkillsCloud */}
            <SkillsCloudLoader />

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {skills.map((skill) => (
                <span key={skill} className="bg-cyan-100 text-cyan-800 text-sm font-semibold px-4 py-2 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tu sección de Descarga de CV no cambia */}
          <div className="mt-12 text-center">
            <h2 className="text-3xl font-bold text-center mb-6">¿Quieres saber más?</h2>
            <a href="/Brayan_Camilo_Molina_Vera.pdf" download="Brayan_Camilo_Molina_Vera.pdf" className="inline-block bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors">
              Descargar mi CV
            </a>
          </div>
        </div>
      </main>
    </PageTransitionLoader>
  );
}