import { Post } from "./Post";
import { renderDateDisplay } from "../utilities";

export function Publication({ publication }) {
  return (
    <Post
      title={publication.title}
      additionalInfo={() => (
        <>
          {publication.contributors && <p>{publication.contributors}</p>}
          {publication.publisher && <p>{publication.publisher}</p>}
          {(publication.displayDate || publication.date) && (
            <p>
              {renderDateDisplay({
                date: publication.date,
                displayDate: publication.displayDate,
              })}
            </p>
          )}
        </>
      )}
      description={publication.description}
      media={publication.media}
      externalUrl={publication.externalUrl}
    />
  );
}
