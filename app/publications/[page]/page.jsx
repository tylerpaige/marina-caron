import { Header, Pagination, Post } from "../../components";
import {
  fetchPublications,
  fetchSettings,
  constructMetadata,
} from "../../utilities";

export async function generateMetadata() {
  const settings = await fetchSettings();

  return constructMetadata({
    settings,
    title: "Exhibitions",
  });
}

export default async function PublicationsIndex({ params }) {
  const { page } = params;
  const { data: publications, meta } = await fetchPublications({ page });

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
