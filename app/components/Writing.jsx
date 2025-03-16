import { Post } from "./Post";
import { formatDate } from "../utilities";

export function Writing({ writing }) {
  return (
    <Post
      title={writing.title}
      additionalInfo={() => (
        <>
          {writing.contributors && (<p>{writing.contributors}</p>)}
          {writing.publisher && (<p>{writing.publisher}</p>)}
          {writing.date && (<p>{formatDate(writing.date)}</p>)}
        </>
      )}
      description={writing.description}
      media={writing.media}
      externalUrl={writing.externalUrl}
    />
  );
}
