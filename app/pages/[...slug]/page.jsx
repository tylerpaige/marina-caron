import { PortableText } from "next-sanity";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Header } from "../../components";
import { fetchPage, fetchSettings } from "../../utilities";

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
  // If the last segment contains a dot (.), it might be a file extension.
  const lastSegment = params.slug[params.slug.length - 1];
  if (lastSegment.includes('.') && /\.(js|css|map)$/i.test(lastSegment)) {
    // Return a 404 so that Next.js internal handling takes over.
    notFound();
  }

  const { slug } = params;
  const page = await fetchPage({ slug });

  return (
    <div>
      <Header />
      <main>
        <h1>{page.title}</h1>
        <div>
          {Boolean(page?.media?.length) && (
            <div className="mb-1/2">
              <div className={clsx("flex", "flex-wrap", "gap-1/4")}>
                {media.map(({ _key, size, ...media }) => (
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
