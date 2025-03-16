import { Header, Pagination, Post, Publication } from "../components";
import {
  fetchPublications,
  fetchSettings,
  constructMetadata,
} from "../utilities";

export async function generateMetadata() {
  const settings = await fetchSettings();

  return constructMetadata({
    settings,
    title: "Exhibitions",
  });
}

export default async function PublicationsIndex() {
  const { data: publications, meta } = await fetchPublications();

  return (
    <div>
      <Header />
      <main>
        {publications.map((publication) => (
          <Publication key={publication.slug} publication={publication} />
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
