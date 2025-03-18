import { PortableText } from "next-sanity";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Header } from "./components";
import { fetchPage, fetchSettings, constructMetadata } from "./utilities";

export const dynamic = process.env.NODE_ENV === 'development' ? 'force-dynamic' : 'auto';
export const revalidate = process.env.NODE_ENV === 'development' ? 0 : 60;

export async function generateMetadata() {
  const settings = await fetchSettings();
  const page = await fetchPage({ slug: null });

  return constructMetadata({
    settings,
    title: !page?.hideTitle && page?.title,
    description: page?.description,
  });
}

export default async function Homepage() {
  const page = await fetchPage({ slug: null });

  return (
    <div>
      <Header />
      <main>
        {!page?.hideTitle && <h1>{page.title}</h1>}
        <div className="px-2">
          <div className="markdown mb-2 md:max-w-16">
            <PortableText value={page.body} />
          </div>
          {Boolean(page?.media?.length) && (
            <div>
                {page.media.map(({ _key, size, ...media }) => (
                  // TODO: Lightbox
                  <Link href={media.asset?.url} key={_key}>
                    <Image
                      src={media.asset?.url}
                      width={media.asset?.metadata?.dimensions?.width}
                      height={media.asset?.metadata?.dimensions?.height}
                      alt={media.alt}
                      className="w-full max-w-8"
                    />
                  </Link>
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
