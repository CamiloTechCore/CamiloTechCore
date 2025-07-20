// src/app/projects/page.tsx
import PageTransition from "@/components/PageTransition";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/data/projects"; // Importamos los datos

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold text-center mb-12">Mis Proyectos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </main>
    </PageTransition>
  );
}