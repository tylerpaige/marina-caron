import { Post } from "./Post";
import { formatDate } from "../utilities";

export function Publication({ publication }) {
  return (
    <Post
      title={publication.title}
      additionalInfo={() => (
        <>
          {publication.contributors && (<p>{publication.contributors}</p>)}
          {publication.publisher && (<p>{publication.publisher}</p>)}
          {publication.date && (<p>{formatDate(publication.date)}</p>)}
        </>
      )}
      description={publication.description}
      media={publication.media}
      externalUrl={publication.externalUrl}
    />
  );
}
