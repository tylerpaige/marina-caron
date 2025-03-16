import { PortableText } from "next-sanity";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Header } from "./components";
import { fetchPage, fetchSettings, constructMetadata } from "./utilities";

export async function generateMetadata() {
  const settings = await fetchSettings();
  const page = await fetchPage({ slug: null });

  return constructMetadata({
    settings,
    title: page?.title,
    description: page?.description,
  });
}

export default async function AdhocPage() {
  const page = await fetchPage({ slug: null });
  console.log({ page})

  return (
    <div>
      <Header />
      <main>
        {!page?.hideTitle && <h1>{page.title}</h1>}
        <div>
          {Boolean(page?.media?.length) && (
            <div className="mb-1/2">
              <div className={clsx("flex", "flex-wrap", "gap-1/4")}>
                {page.media.map(({ _key, size, ...media }) => (
                  // TODO: Lightbox
                  <Link href={media.asset?.url} key={_key}>
                    <Image
                      src={media.asset?.url}
                      width={media.asset?.metadata?.dimensions?.width}
                      height={media.asset?.metadata?.dimensions?.height}
                      alt={media.alt}
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
          <PortableText value={page.body} />
        </div>
      </main>
    </div>
  );
}
