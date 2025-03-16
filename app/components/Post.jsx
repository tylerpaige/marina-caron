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
    <div className={clsx("text-0", "md:overflow-auto", className)} {...args}>
      <div className="md:grid md:grid-cols-[50ch,1fr] md:gap-2">
        <div className="max-w-[50ch] bg-background z-10 relative md:sticky md:top-0 md:left-0 md:px-2">
          <h3 className="text-1">{title}</h3>
          {additionalInfo && additionalInfo()}
          <div
            className={clsx(
              "markdown",
              "mt-em/4",
              "first:mt-0",
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
                className="underline underline-offset-[0.25em] decoration-[1px]"
              >
                More info.
              </Link>
            </p>
          )}
        </div>

        {Boolean(media?.length) && (
          <div className="">
            <div className={clsx("flex", "gap-4", "pr-2")}>
              {media.map(({ _key, size, ...media }) => (
                // TODO: Lightbox
                <div key={_key} className="relative shrink-0 grow-0">
                  <Link href={media.asset?.url}>
                    <Image
                      src={media.asset?.url}
                      width={media.asset?.metadata?.dimensions?.width}
                      height={media.asset?.metadata?.dimensions?.height}
                      alt={media.alt}
                      className="max-w-lg max-h-lg h-full object-contain object-center"
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
