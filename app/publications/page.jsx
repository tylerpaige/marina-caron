import { Header, Pagination, Post } from "../components";
import { fetchPublications, fetchSettings } from "../utilities";

export async function generateMetadata() {
  const settings = await fetchSettings();

  return {
    title: `Publications | ${settings?.title}`,
    description: settings?.description,
  };
}

export default async function PublicationsIndex() {
  const { data: publications, meta } = await fetchPublications();

  return (
    <div>
      <Header />
      <main>
        {publications.map((publication) => (
          <Post
            key={publication._id}
            title={publication.title}
            description={publication.description}
            media={publication.media}
            externalUrl={publication.externalUrl}
          />
        ))}
        {/* Pagination */}
        {meta.totalPages > 1 && (
          <Pagination
            currentPage={1}
            totalPages={meta.totalPages}
            basePath="/publications"
            windowSize={3}
          />
        )}
      </main>
    </div>
  );
}
