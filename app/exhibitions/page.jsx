import { Exhibition, Header, InfiniteExhibitionList } from "../components";
import {
  fetchExhibitions,
  fetchSettings,
  constructMetadata,
} from "../utilities";

export const dynamic =
  process.env.NODE_ENV === "development" ? "force-dynamic" : "auto";
export const revalidate = process.env.NODE_ENV === "development" ? 0 : 60;

export async function generateMetadata() {
  const settings = await fetchSettings();

  return constructMetadata({
    settings,
    title: "Exhibitions",
  });
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
        {meta.totalPages > 1 && <InfiniteExhibitionList />}
      </main>
    </div>
  );
}
