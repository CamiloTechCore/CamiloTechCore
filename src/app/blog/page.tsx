// src/app/blog/page.tsx

import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import PageTransition from '@/components/PageTransition';

// --- Esta función lee todos los posts y devuelve sus metadatos ---
async function getAllPosts() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = await fs.readdir(postsDirectory);

    const posts = filenames.map(async (filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        
        // Usamos gray-matter para obtener los metadatos
        const matterResult = matter(fileContents);
        
        return {
            slug: filename.replace(/\.md$/, ''),
            title: matterResult.data.title,
            date: matterResult.data.date,
        };
    });

    // Esperamos a que todas las promesas se resuelvan y ordenamos los posts por fecha
    return (await Promise.all(posts))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}


// --- El componente de la página que mostrará la lista de posts ---
export default async function BlogPage() {
    const allPosts = await getAllPosts();

    return (
        <PageTransition>
            <main className="container mx-auto p-4 md:p-8">
                <h1 className="text-4xl font-bold text-center mb-12">Blog Técnico</h1>

                <div className="max-w-3xl mx-auto">
                    <ul>
                        {allPosts.map((post) => (
                            <li key={post.slug} className="mb-6 pb-6 border-b border-gray-200">
                                <Link href={`/blog/${post.slug}`} className="block">
                                    <h2 className="text-2xl font-semibold text-gray-800 hover:text-cyan-600 transition-colors">
                                        {post.title}
                                    </h2>
                                    <time dateTime={post.date} className="text-gray-500 text-sm">
                                        {post.date}
                                    </time>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </PageTransition>
    );
}