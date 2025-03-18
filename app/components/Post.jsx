import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

export function Post({
  title,
  description,
  additionalInfo,
  media,
  externalUrl,
  className,
  ...args
}) {
  return (
    <div
      className={clsx(
        "text-0",
        "mb-3",
        className
      )}
      {...args}
    >
      <div className="md:grid md:grid-cols-[auto,1fr]">
        <div className="w-full bg-background z-10 relative px-2 md:max-w-16">
          <h3 className="font-bold mb-em/2">{title}</h3>
          {additionalInfo && additionalInfo()}
          <div
            className={clsx(
              "markdown",
              "mb-em/2",
              "last:mb-0",
              className
            )}
          >
            <PortableText
              value={description}
              components={{
                types: {
                  image: (block) => {
                    const url = block.value.image.asset.url;
                    const { width, height } =
                      block.value.image.asset.metadata.dimensions;
                    const alt = block.value.alt;
                    return (
                      <Image
                        src={url}
                        width={width}
                        height={height}
                        size="sm"
                        className="block-content"
                        alt={alt}
                      />
                    );
                  },
                },
              }}
            />
          </div>
          {externalUrl && (
            <p>
              <Link
                href={externalUrl}
                className="underline underline-offset-[0.25em] decoration-[1px] uppercase -text-2"
              >
                More info.
              </Link>
            </p>
          )}
        </div>

        {Boolean(media?.length) && (
          <div className="mt-2 px-2 overflow-auto md:mt-0 md:px-0">
            <div className={clsx("flex", "gap-4")}>
              {media.map(({ _key, size, ...media }) => (
                // TODO: Lightbox
                <div key={_key} className="relative shrink-0 grow-0">
                  <Link href={media.asset?.url}>
                    <Image
                      src={media.asset?.url}
                      width={media.asset?.metadata?.dimensions?.width}
                      height={media.asset?.metadata?.dimensions?.height}
                      alt={media.alt}
                      className="h-10 w-auto"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
