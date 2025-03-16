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
    <div className={clsx("text-0", className)} {...args}>
      <div>
        <h3 className="text-1">{title}</h3>
        {additionalInfo && additionalInfo()}
        <div
          className={clsx(
            "markdown",
            "mt-em/4",
            "first:mt-0",
            "mb-em/2",
            "last:mb-0",
            "max-w-[50ch]",
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
          <Link
            href={externalUrl}
            className="underline underline-offset-[0.25em] decoration-[1px]"
          >
            More info.
          </Link>
        )}
      </div>
      {Boolean(media?.length) && (
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
    </div>
  );
}
