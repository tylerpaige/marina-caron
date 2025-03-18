import { Post } from "./Post";
import { renderDateDisplay } from "../utilities";

function formatLocationAndDate(exhibition) {
  const { location, startDate, endDate, displayDate } = exhibition;
  if (!location && !startDate && !endDate) {
    return null;
  } else if (location && !startDate && !endDate) {
    return exhibition.location;
  } else {
    return `${location} ${renderDateDisplay({ displayDate, startDate, endDate })}`;
  }
}

export function Exhibition({ exhibition }) {
  return (
    <Post
      title={exhibition.title}
      additionalInfo={() => <>{formatLocationAndDate(exhibition)}</>}
      description={exhibition.description}
      media={exhibition.media}
      externalUrl={exhibition.externalUrl}
    />
  );
}
