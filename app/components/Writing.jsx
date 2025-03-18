import { Post } from "./Post";
import { renderDateDisplay } from "../utilities";
import Link from "next/link";
import { PortableText } from "next-sanity";

export function WritingTitle({ writing }) {
  const { publisher, title, externalUrl } = writing;
  const joinedTitle = publisher ? `${publisher}, ${title}` : title;
  if (externalUrl) {
    return (
      <Link href={externalUrl} className="underline">
        {joinedTitle}
      </Link>
    );
  }
  return <span>{joinedTitle}</span>;
}

export function WritingDate({ writing }) {
  const { displayDate, date } = writing;
  if (!displayDate && !date) {
    return <></>;
  }

  return (
    <span className="no-wrap">
      <span className="mx-em/2">—</span>
      {renderDateDisplay({ displayDate, date })}
    </span>
  );
}

export function Writing({ writing, ...props }) {
  const { pdf, description, type, contributors } = writing;
  return (
    <div className="px-2 max-w-xl mb-3 last:mb-0" {...props}>
      <p>
        <WritingTitle writing={writing} />
        <WritingDate writing={writing} />
        {pdf && (
          <>
            <Link href={pdf.asset.url} className="underline ms-em -text-2">
              (PDF)
            </Link>
          </>
        )}
        {type && (
          <>
            <span className="-text-2 uppercase ms-em">{type}</span>
          </>
        )}
      </p>
      {contributors && <p>{contributors}</p>}
      {description && (
        <div className="markdown">
          <PortableText value={description} />
        </div>
      )}
    </div>
  );
}
