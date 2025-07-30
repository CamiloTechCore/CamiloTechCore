import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import PageTransitionLoader from '@/components/PageTransitionLoader';
import ShareButtons from '@/components/ShareButtons';
import PostLayout from '@/components/blog/PostLayout'; // 👈 Importamos el nuevo componente


async function getPostData(slug: string) {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        ...(matterResult.data as { title: string; date: string }),
    };
}

export default async function PostPage({ params }: { params: { slug:string } }) {
    const postData = await getPostData(params.slug);

    return (
        <PageTransitionLoader>
            <main className="container mx-auto p-4 md:p-8">
                {/* 👇 Ahora solo llamamos a nuestro componente de layout */}
                <PostLayout postData={postData} />
                <div className="max-w-3xl mx-auto mt-8">
                  <ShareButtons title={postData.title} slug={postData.slug} />
                </div>
            </main>
        </PageTransitionLoader>
    );
}

export async function generateStaticParams() {
    const postsDirectory = path.join(process.cwd(), 'posts');
    const filenames = await fs.readdir(postsDirectory);

    return filenames.map((filename) => ({
        slug: filename.replace(/\.md$/, ''),
    }));
}