import { Header, Pagination, Post, Writing } from "../components";
import { fetchSettings, fetchWritings, constructMetadata } from "../utilities";

export const dynamic = process.env.NODE_ENV === 'development' ? 'force-dynamic' : 'auto';
export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 60;

export async function generateMetadata() {
  const settings = await fetchSettings();

  return constructMetadata({
    settings,
    title: "Exhibitions",
  });
}

export default async function WritingIndex() {
  const { data: writing, meta } = await fetchWritings();

  return (
    <div>
      <Header />
      <main>
        {writing.map((writing) => (
          <Writing key={writing.slug} writing={writing} />
        ))}
        {/* Pagination */}
        {meta.totalPages > 1 && (
          <Pagination
            currentPage={1}
            totalPages={meta.totalPages}
            basePath="/writing"
            windowSize={3}
          />
        )}
      </main>
    </div>
  );
}
