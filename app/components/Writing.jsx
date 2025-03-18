import { Post } from "./Post";
import { renderDateDisplay } from "../utilities";

export function Writing({ writing }) {
  return (
    <Post
      title={writing.title}
      additionalInfo={() => (
        <>
          {writing.contributors && <p>{writing.contributors}</p>}
          {writing.publisher && <p>{writing.publisher}</p>}
          {(writing.displayDate || writing.date) && (
            <p>
              {renderDateDisplay({
                displayDate: writing.displayDate,
                date: writing.date,
              })}
            </p>
          )}
        </>
      )}
      description={writing.description}
      media={writing.media}
      externalUrl={writing.externalUrl}
    />
  );
}
