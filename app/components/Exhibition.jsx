import { PortableText } from "@portabletext/react";
import { Post } from "./Post";
import { renderDateDisplay } from "../utilities";

function formatLocationAndDate(exhibition) {
  const { location, startDate, endDate, displayDate } = exhibition;
  return [location, renderDateDisplay({ displayDate, startDate, endDate })]
    .filter(Boolean)
    .join(", ");
}

function renderAdditionalInfo(exhibition) {
  const formattedLocationAndDate = formatLocationAndDate(exhibition);
  const { team } = exhibition;
  return (
    <>
      {formattedLocationAndDate && (
        <p className="mb-em/2">{formattedLocationAndDate}</p>
      )}
      {/* Render `team` if it's present with markdown */}
      {team && (
        <div className="mb-em/2 markdown">
          <PortableText value={team} />
        </div>
      )}
    </>
  );
}

export function Exhibition({ exhibition }) {
  return (
    <Post
      title={exhibition.title}
      additionalInfo={() => renderAdditionalInfo(exhibition)}
      description={exhibition.description}
      media={exhibition.media}
      externalUrl={exhibition.externalUrl}
      footer={() =>
        exhibition.photoCredits && (
          <div className="-text-2 uppercase markdown mb-em/2 last:mb-0">
            <PortableText value={exhibition.photoCredits} />
          </div>
        )
      }
    />
  );
}
