import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import PageTransitionLoader from '@/components/PageTransitionLoader';

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
                <article className="prose lg:prose-xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
                    <time dateTime={postData.date} className="text-gray-500">{postData.date}</time>
                    <hr className="my-8" />
                    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                </article>
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