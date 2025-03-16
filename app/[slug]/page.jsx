import { Header, Pagination, Post } from "../components";
import { fetchExhibitions, fetchPage, fetchSettings } from "../utilities";

export async function generateMetadata({ params }) {
  const settings = await fetchSettings();
  const { slug } = params;
  const page = await fetchPage({ slug });

  return {
    title: `${page.title} | ${settings?.title}`,
    description: settings?.description,
  };
}

export default async function AdhocPage({ params }) {
  const { slug } = params;
  const page = await fetchPage({ slug });

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
