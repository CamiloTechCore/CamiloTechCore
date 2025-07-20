// src/components/ProjectCard.tsx
import Image from 'next/image';

// Definimos los tipos de datos que espera el componente
type ProjectCardProps = {
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubUrl: string;
    liveUrl?: string; // Hacemos la URL en vivo opcional
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <Image src={project.image} alt={`Imagen de ${project.title}`} width={500} height={300} className="w-full object-cover"/>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-700 mb-4">{project.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="flex gap-4">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-800 font-bold">Ver en GitHub</a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:text-cyan-800 font-bold">Demo en Vivo</a>
          )}
        </div>
      </div>
    </div>
  );
}