"use client"; // 👈 Necesitamos convertir esta página en un Componente de Cliente para usar estado (useState)

import { useState } from "react"; // 👈 Importamos useState
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/data/projects";

// Obtenemos todos los tags únicos de tus proyectos para crear los botones de filtro
const allTags = ["Todos", ...Array.from(new Set(projectsData.flatMap(p => p.tags)))];

export default function ProjectsPage() {
  // 1. Estado para guardar el tag seleccionado. Por defecto, mostramos "Todos".
  const [selectedTag, setSelectedTag] = useState("Todos");

  // 2. Filtramos los proyectos antes de mostrarlos.
  const filteredProjects = projectsData.filter(project => {
    if (selectedTag === "Todos") {
      return true; // Si el tag es "Todos", muestra todos los proyectos
    }
    return project.tags.includes(selectedTag); // Si no, muestra solo los que incluyen el tag
  });

  return (
    <PageTransition>
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold text-center mb-6">Mis Proyectos</h1>

        {/* 3. Botones para filtrar por tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
                ${selectedTag === tag 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`
              }
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 4. Mostramos la cuadrícula de proyectos ya filtrados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Mensaje por si no hay proyectos con el tag seleccionado */}
        {filteredProjects.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">No hay proyectos con el tag seleccionado.</p>
        )}

      </main>
    </PageTransition>
  );
}