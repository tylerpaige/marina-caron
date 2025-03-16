import { Header, Pagination, Post } from "../../components";
import { fetchWritings, fetchSettings } from "../../utilities";

export async function generateMetadata() {
  const settings = await fetchSettings();

  return {
    title: `Writing | ${settings?.title}`,
    description: settings?.description,
  };
}

export default async function WritingIndex({ params}) {
  const { page } = params;
  const { data: writing, meta } = await fetchWritings({ page });

  return (
    <div>
      <Header />
      <main>
        {writing.map((writing) => (
          <Post
            key={writing._id}
            title={writing.title}
            description={writing.description}
            media={writing.media}
            externalUrl={writing.externalUrl}
          />
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
