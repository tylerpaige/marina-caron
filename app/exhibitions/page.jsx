import { Exhibition, Header, Pagination } from "../components";
import { fetchExhibitions, fetchSettings, constructMetadata } from "../utilities";

export async function generateMetadata() {
  const settings = await fetchSettings();

  return constructMetadata({
    settings,
    title: "Exhibitions",
  })
}

export default async function ExhibitionsIndex() {
  const { data: exhibitions, meta } = await fetchExhibitions();

  return (
    <div>
      <Header />
      <main>
        {exhibitions.map((exhibition) => (
          <Exhibition key={exhibition._id} exhibition={exhibition} />
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
