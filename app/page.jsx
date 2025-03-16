import { Header } from "./components";
import { fetchPage, fetchSettings } from "./utilities";

export async function generateMetadata() {
  const settings = await fetchSettings();
  const page = await fetchPage({ slug: null });

  return {
    title: `${page.title} | ${settings?.title}`,
    description: settings?.description,
  };
}

export default async function AdhocPage() {
  const page = await fetchPage({ slug: null });

  return (
    <div>
      <Header />
      <main>
        {JSON.stringify(page)}
        {/* <h1>{page.title}</h1> */}
        <div>
          {/* {page.body.map((block, index) => (
            <Post key={index} block={block} />
          ))} */}
        </div>
      </main>
    </div>
  );
}
