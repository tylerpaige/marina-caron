import { Post } from "./Post";
import { renderDateDisplay } from "../utilities";
import { PortableText } from "@portabletext/react";

export function Publication({ publication }) {
  return (
    <Post
      title={publication.title}
      additionalInfo={() => (
        <>
          {publication.publisher && (
            <p className="mb-em/2">{publication.publisher}</p>
          )}
          {(publication.displayDate || publication.date) && (
            <p className="mb-em/2">
              {renderDateDisplay({
                date: publication.date,
                displayDate: publication.displayDate,
              })}
            </p>
          )}
          {publication.contributors && (
            <div className="markdown mb-em/2">
              <PortableText value={publication.contributors} />
            </div>
          )}
        </>
      )}
      description={publication.description}
      media={publication.media}
      externalUrl={publication.externalUrl}
      footer={() =>
        publication.photoCredits && (
          <div className="-text-2 uppercase markdown mb-em/2 last:mb-0">
            <PortableText value={publication.photoCredits} />
          </div>
        )
      }
    />
  );
}
