import { Header, Pagination, Post } from "../../components";
import { fetchExhibitions } from "../../utilities";

export async function generateMetadata() {
  const settings = await fetchSettings();
  console.log('Metadata', settings)

  return {
    title: `Exhibitions | ${settings?.title}`,
    description: settings?.description,
  };
}

export default async function ExhibitionsIndex({ params }) {
  const { page } = params
  const { data: exhibitions, meta } = await fetchExhibitions({ page });

  return (
    <div>
      <Header />
      <main>
        {exhibitions.map((exhibition) => (
          <Post
            key={exhibition._id}
            title={exhibition.title}
            description={exhibition.description}
            media={exhibition.media}
            externalUrl={exhibition.externalUrl}
          />
        ))}
        {/* Pagination */}
        {meta.totalPages > 1 && (
          <Pagination
            currentPage={1}
            totalPages={meta.totalPages}
            basePath="/exhibitions"
            windowSize={3}
          />
        )}
      </main>
    </div>
  );
}
