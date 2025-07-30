// src/components/blog/PostLayout.tsx

// Definimos un tipo para los datos que el post recibirá
type PostData = {
  title: string;
  date: string;
  contentHtml: string;
};

export default function PostLayout({ postData }: { postData: PostData }) {
  return (
    <article className="prose lg:prose-xl mx-auto">
      {/* Título y Fecha del Post */}
      <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
      <time dateTime={postData.date} className="text-gray-500">{postData.date}</time>

      <hr className="my-8" />

      {/* Contenido del Post (convertido de Markdown a HTML) */}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}