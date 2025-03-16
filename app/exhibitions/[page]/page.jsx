import { Exhibition, Header, Pagination, Post } from "../../components";
import { fetchExhibitions, constructMetadata } from "../../utilities";

export async function generateMetadata() {
  const settings = await fetchSettings();
  
  return constructMetadata({
    settings,
    title: "Exhibitions",
  });
}

export default async function ExhibitionsIndex({ params }) {
  const { page } = params;
  const { data: exhibitions, meta } = await fetchExhibitions({ page });

  return (
    <div>
      <Header />
      <main>
        {exhibitions.map((exhibition) => (
          <Exhibition key={exhibition.slug} exhibition={exhibition} />
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
